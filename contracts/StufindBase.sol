// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title StufindBase
 * @dev Student marketplace on Base Network for Ghana
 * @author Stufind Team
 */
contract StufindBase is ERC721URIStorage, ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    // Platform configuration optimized for Base Network
    uint256 public listingPrice = 0.001 ether; // Lower fees on Base
    uint256 public platformFeePercent = 200; // 2% platform fee
    uint256 public constant MAX_ROYALTY = 500; // 5% max royalty
    
    // Escrow configuration
    uint256 public constant ESCROW_DURATION = 7 days;
    uint256 public constant DISPUTE_DURATION = 3 days;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 priceUSD; // Price in USD cents (to avoid decimals)
        bool sold;
        string category;
        string condition;
        uint256 royaltyPercent;
        address payable creator;
        uint256 createdAt;
        bool isActive;
        string university;
        string location;
        PaymentMethod[] acceptedPayments;
    }

    struct EscrowTransaction {
        uint256 tokenId;
        address payable buyer;
        address payable seller;
        uint256 amountUSD; // Amount in USD cents
        PaymentMethod paymentMethod;
        bool buyerConfirmed;
        bool sellerConfirmed;
        bool completed;
        bool disputed;
        uint256 createdAt;
        uint256 deadline;
        string meetingLocation;
        string paymentReference; // For mobile money/bank references
    }

    struct StudentProfile {
        bool isVerified;
        string university;
        string studentId;
        uint256 totalSales;
        uint256 totalPurchases;
        uint256 rating; // Average rating * 100
        uint256 ratingCount;
        bool isActive;
        string phoneNumber; // For mobile money
        PaymentMethod[] preferredPayments;
    }

    enum PaymentMethod {
        ETH,
        MOBILE_MONEY,
        BANK_CARD,
        USDC
    }

    // Mappings
    mapping(uint256 => MarketItem) private idToMarketItem;
    mapping(uint256 => EscrowTransaction) private escrowTransactions;
    mapping(address => StudentProfile) public studentProfiles;
    mapping(string => bool) public supportedUniversities;
    mapping(address => mapping(address => bool)) public hasRated;
    mapping(string => bool) public verifiedPhoneNumbers;

    // Payment integration mappings
    mapping(string => uint256) public mobileMoneyTransactions; // Reference -> TokenId
    mapping(string => uint256) public bankCardTransactions; // Reference -> TokenId

    // Events
    event MarketItemCreated(
        uint256 indexed tokenId,
        address indexed seller,
        uint256 priceUSD,
        string category,
        string university,
        PaymentMethod[] acceptedPayments
    );

    event EscrowCreated(
        uint256 indexed tokenId,
        address indexed buyer,
        address indexed seller,
        uint256 amountUSD,
        PaymentMethod paymentMethod,
        string paymentReference
    );

    event PaymentReceived(
        uint256 indexed tokenId,
        PaymentMethod method,
        string reference,
        uint256 amountUSD
    );

    event EscrowCompleted(
        uint256 indexed tokenId,
        address indexed buyer,
        address indexed seller,
        uint256 amountUSD
    );

    event StudentVerified(
        address indexed student,
        string university,
        string studentId
    );

    event MobileMoneyPayment(
        uint256 indexed tokenId,
        string phoneNumber,
        uint256 amount,
        string reference
    );

    constructor() ERC721("Stufind", "STUF") {
        // Add Ghanaian universities
        supportedUniversities["University of Ghana"] = true;
        supportedUniversities["KNUST"] = true;
        supportedUniversities["Ashesi University"] = true;
        supportedUniversities["University of Cape Coast"] = true;
        supportedUniversities["Ho Technical University"] = true;
        supportedUniversities["GIMPA"] = true;
        supportedUniversities["UDS"] = true;
        supportedUniversities["UEW"] = true;
        supportedUniversities["UMaT"] = true;
        supportedUniversities["UPSA"] = true;
        supportedUniversities["Valley View University"] = true;
    }

    modifier onlyVerifiedStudent() {
        require(studentProfiles[msg.sender].isVerified, "Must be verified student");
        _;
    }

    modifier validTokenId(uint256 tokenId) {
        require(_exists(tokenId), "Token does not exist");
        _;
    }

    // Admin functions
    function addUniversity(string memory university) external onlyOwner {
        supportedUniversities[university] = true;
    }

    function verifyStudent(
        address student,
        string memory university,
        string memory studentId,
        string memory phoneNumber
    ) external onlyOwner {
        require(supportedUniversities[university], "University not supported");
        require(!verifiedPhoneNumbers[phoneNumber], "Phone number already verified");
        
        PaymentMethod[] memory defaultPayments = new PaymentMethod[](2);
        defaultPayments[0] = PaymentMethod.MOBILE_MONEY;
        defaultPayments[1] = PaymentMethod.ETH;
        
        studentProfiles[student] = StudentProfile({
            isVerified: true,
            university: university,
            studentId: studentId,
            totalSales: 0,
            totalPurchases: 0,
            rating: 0,
            ratingCount: 0,
            isActive: true,
            phoneNumber: phoneNumber,
            preferredPayments: defaultPayments
        });

        verifiedPhoneNumbers[phoneNumber] = true;
        emit StudentVerified(student, university, studentId);
    }

    // Core marketplace functions
    function createToken(
        string memory tokenURI,
        uint256 priceUSD, // Price in USD cents
        string memory category,
        string memory condition,
        uint256 royaltyPercent,
        string memory location,
        PaymentMethod[] memory acceptedPayments
    ) external payable onlyVerifiedStudent nonReentrant returns (uint256) {
        require(priceUSD > 0, "Price must be greater than 0");
        require(msg.value >= listingPrice, "Must pay listing fee");
        require(royaltyPercent <= MAX_ROYALTY, "Royalty too high");
        require(acceptedPayments.length > 0, "Must accept at least one payment method");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        StudentProfile memory profile = studentProfiles[msg.sender];
        
        idToMarketItem[newTokenId] = MarketItem({
            tokenId: newTokenId,
            seller: payable(msg.sender),
            owner: payable(address(this)),
            priceUSD: priceUSD,
            sold: false,
            category: category,
            condition: condition,
            royaltyPercent: royaltyPercent,
            creator: payable(msg.sender),
            createdAt: block.timestamp,
            isActive: true,
            university: profile.university,
            location: location,
            acceptedPayments: acceptedPayments
        });

        _transfer(msg.sender, address(this), newTokenId);

        emit MarketItemCreated(
            newTokenId,
            msg.sender,
            priceUSD,
            category,
            profile.university,
            acceptedPayments
        );

        return newTokenId;
    }

    // Create escrow with different payment methods
    function createEscrowETH(
        uint256 tokenId,
        string memory meetingLocation
    ) external payable onlyVerifiedStudent validTokenId(tokenId) nonReentrant {
        MarketItem memory item = idToMarketItem[tokenId];
        require(item.isActive, "Item not available");
        require(msg.sender != item.seller, "Cannot buy own item");
        
        // Convert ETH to USD (simplified - in production use oracle)
        uint256 ethPriceUSD = 180000; // $1800 in cents
        uint256 expectedETH = (item.priceUSD * 1 ether) / ethPriceUSD;
        require(msg.value >= expectedETH, "Insufficient ETH payment");

        _createEscrow(tokenId, item.priceUSD, PaymentMethod.ETH, meetingLocation, "");
    }

    function createEscrowMobileMoney(
        uint256 tokenId,
        string memory meetingLocation,
        string memory paymentReference
    ) external onlyVerifiedStudent validTokenId(tokenId) nonReentrant {
        MarketItem memory item = idToMarketItem[tokenId];
        require(item.isActive, "Item not available");
        require(msg.sender != item.seller, "Cannot buy own item");

        // In production, integrate with mobile money API to verify payment
        _createEscrow(tokenId, item.priceUSD, PaymentMethod.MOBILE_MONEY, meetingLocation, paymentReference);
        
        emit MobileMoneyPayment(
            tokenId,
            studentProfiles[msg.sender].phoneNumber,
            item.priceUSD,
            paymentReference
        );
    }

    function _createEscrow(
        uint256 tokenId,
        uint256 amountUSD,
        PaymentMethod paymentMethod,
        string memory meetingLocation,
        string memory paymentReference
    ) private {
        escrowTransactions[tokenId] = EscrowTransaction({
            tokenId: tokenId,
            buyer: payable(msg.sender),
            seller: idToMarketItem[tokenId].seller,
            amountUSD: amountUSD,
            paymentMethod: paymentMethod,
            buyerConfirmed: false,
            sellerConfirmed: false,
            completed: false,
            disputed: false,
            createdAt: block.timestamp,
            deadline: block.timestamp + ESCROW_DURATION,
            meetingLocation: meetingLocation,
            paymentReference: paymentReference
        });

        idToMarketItem[tokenId].isActive = false;

        emit EscrowCreated(
            tokenId,
            msg.sender,
            idToMarketItem[tokenId].seller,
            amountUSD,
            paymentMethod,
            paymentReference
        );
    }

    function confirmReceipt(uint256 tokenId) external validTokenId(tokenId) {
        EscrowTransaction storage transaction = escrowTransactions[tokenId];
        require(transaction.buyer == msg.sender, "Only buyer can confirm receipt");
        require(!transaction.completed, "Transaction already completed");
        require(block.timestamp <= transaction.deadline, "Transaction expired");

        transaction.buyerConfirmed = true;

        if (transaction.sellerConfirmed) {
            _completeEscrow(tokenId);
        }
    }

    function confirmDelivery(uint256 tokenId) external validTokenId(tokenId) {
        EscrowTransaction storage transaction = escrowTransactions[tokenId];
        require(transaction.seller == msg.sender, "Only seller can confirm delivery");
        require(!transaction.completed, "Transaction already completed");
        require(block.timestamp <= transaction.deadline, "Transaction expired");

        transaction.sellerConfirmed = true;

        if (transaction.buyerConfirmed) {
            _completeEscrow(tokenId);
        }
    }

    function _completeEscrow(uint256 tokenId) private {
        EscrowTransaction storage transaction = escrowTransactions[tokenId];
        MarketItem storage item = idToMarketItem[tokenId];

        transaction.completed = true;
        item.sold = true;
        item.owner = transaction.buyer;
        _itemsSold.increment();

        // Update profiles
        studentProfiles[transaction.seller].totalSales++;
        studentProfiles[transaction.buyer].totalPurchases++;

        // Handle payments based on method
        if (transaction.paymentMethod == PaymentMethod.ETH) {
            _processETHPayment(tokenId, transaction, item);
        } else {
            // For mobile money/bank cards, payment already received off-chain
            // Just transfer the NFT
            _transfer(address(this), transaction.buyer, tokenId);
        }

        emit EscrowCompleted(tokenId, transaction.buyer, transaction.seller, transaction.amountUSD);
    }

    function _processETHPayment(
        uint256 tokenId,
        EscrowTransaction storage transaction,
        MarketItem storage item
    ) private {
        // Calculate fees and royalties
        uint256 platformFee = (transaction.amountUSD * platformFeePercent) / 10000;
        uint256 royalty = 0;
        
        if (item.creator != transaction.seller && item.royaltyPercent > 0) {
            royalty = (transaction.amountUSD * item.royaltyPercent) / 10000;
        }
        
        uint256 sellerAmount = transaction.amountUSD - platformFee - royalty;

        // Convert back to ETH for payments
        uint256 ethPriceUSD = 180000; // $1800 in cents
        
        if (royalty > 0) {
            uint256 royaltyETH = (royalty * 1 ether) / ethPriceUSD;
            item.creator.transfer(royaltyETH);
        }
        
        uint256 platformFeeETH = (platformFee * 1 ether) / ethPriceUSD;
        uint256 sellerETH = (sellerAmount * 1 ether) / ethPriceUSD;
        
        payable(owner()).transfer(platformFeeETH);
        transaction.seller.transfer(sellerETH);

        // Transfer NFT
        _transfer(address(this), transaction.buyer, tokenId);
    }

    function rateStudent(address student, uint256 rating) external onlyVerifiedStudent {
        require(rating >= 1 && rating <= 5, "Rating must be 1-5");
        require(student != msg.sender, "Cannot rate yourself");
        require(!hasRated[msg.sender][student], "Already rated this student");
        require(studentProfiles[student].isVerified, "Student not verified");

        StudentProfile storage profile = studentProfiles[student];
        
        uint256 totalRating = (profile.rating * profile.ratingCount) + (rating * 100);
        profile.ratingCount++;
        profile.rating = totalRating / profile.ratingCount;
        
        hasRated[msg.sender][student] = true;
    }

    // View functions
    function fetchMarketItems() external view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 unsoldItemCount = _tokenIds.current() - _itemsSold.current();
        uint256 currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(this) && idToMarketItem[i + 1].isActive) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        
        return items;
    }

    function fetchItemsByUniversity(string memory university) external view returns (MarketItem[] memory) {
        uint256 itemCount = _tokenIds.current();
        uint256 universityItemCount = 0;
        uint256 currentIndex = 0;

        // Count items from university
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(this) && 
                idToMarketItem[i + 1].isActive &&
                keccak256(bytes(idToMarketItem[i + 1].university)) == keccak256(bytes(university))) {
                universityItemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](universityItemCount);
        
        for (uint256 i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(this) && 
                idToMarketItem[i + 1].isActive &&
                keccak256(bytes(idToMarketItem[i + 1].university)) == keccak256(bytes(university))) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        
        return items;
    }

    function getMarketStats() external view returns (
        uint256 totalItems,
        uint256 totalSold,
        uint256 totalVolumeUSD,
        uint256 averagePriceUSD
    ) {
        totalItems = _tokenIds.current();
        totalSold = _itemsSold.current();
        
        uint256 volumeSum = 0;
        uint256 soldCount = 0;
        
        for (uint256 i = 1; i <= totalItems; i++) {
            if (idToMarketItem[i].sold) {
                volumeSum += idToMarketItem[i].priceUSD;
                soldCount++;
            }
        }
        
        totalVolumeUSD = volumeSum;
        averagePriceUSD = soldCount > 0 ? volumeSum / soldCount : 0;
    }

    // Mobile Money Integration (placeholder for API integration)
    function verifyMobileMoneyPayment(
        string memory reference,
        uint256 expectedAmount
    ) external view returns (bool) {
        // In production, this would call mobile money API
        // For now, return true for demo purposes
        return true;
    }

    // Emergency functions
    function emergencyRefund(uint256 tokenId) external validTokenId(tokenId) nonReentrant {
        EscrowTransaction storage transaction = escrowTransactions[tokenId];
        require(transaction.buyer == msg.sender, "Only buyer can request refund");
        require(block.timestamp > transaction.deadline + DISPUTE_DURATION, "Refund not available yet");
        require(!transaction.completed, "Transaction already completed");

        transaction.completed = true;
        
        if (transaction.paymentMethod == PaymentMethod.ETH) {
            // Refund ETH
            uint256 ethPriceUSD = 180000;
            uint256 refundETH = (transaction.amountUSD * 1 ether) / ethPriceUSD;
            transaction.buyer.transfer(refundETH);
        }
        
        // Reactivate listing
        idToMarketItem[tokenId].isActive = true;
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner()).transfer(balance);
    }

    // Override required functions
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
