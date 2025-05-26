// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

/**
 * @title StufindMarketplace
 * @dev Decentralized marketplace for students to buy and sell items as NFTs
 * @author Stufind Team
 */
contract StufindMarketplace is ERC721URIStorage, ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    // Platform configuration
    uint256 public listingPrice = 0.0025 ether;
    uint256 public platformFeePercent = 250; // 2.5% in basis points
    uint256 public constant MAX_ROYALTY = 1000; // 10% max royalty
    
    // Escrow configuration
    uint256 public constant ESCROW_DURATION = 7 days;
    uint256 public constant DISPUTE_DURATION = 3 days;

    struct MarketItem {
        uint256 tokenId;
        address payable seller;
        address payable owner;
        uint256 price;
        bool sold;
        string category;
        string condition;
        uint256 royaltyPercent;
        address payable creator;
        uint256 createdAt;
        bool isActive;
        string university; // New field for university verification
    }

    struct EscrowTransaction {
        uint256 tokenId;
        address payable buyer;
        address payable seller;
        uint256 amount;
        bool buyerConfirmed;
        bool sellerConfirmed;
        bool completed;
        bool disputed;
        uint256 createdAt;
        uint256 deadline;
        string meetingLocation;
    }

    struct StudentProfile {
        bool isVerified;
        string university;
        uint256 totalSales;
        uint256 totalPurchases;
        uint256 rating; // Average rating * 100 (to avoid decimals)
        uint256 ratingCount;
        bool isActive;
    }

    // Mappings
    mapping(uint256 => MarketItem) private idToMarketItem;
    mapping(uint256 => EscrowTransaction) private escrowTransactions;
    mapping(address => StudentProfile) public studentProfiles;
    mapping(string => bool) public supportedUniversities;
    mapping(address => mapping(address => bool)) public hasRated;

    // Events
    event MarketItemCreated(
        uint256 indexed tokenId,
        address indexed seller,
        address indexed owner,
        uint256 price,
        string category,
        string condition,
        string university
    );

    event MarketItemSold(
        uint256 indexed tokenId,
        address indexed seller,
        address indexed buyer,
        uint256 price
    );

    event EscrowCreated(
        uint256 indexed tokenId,
        address indexed buyer,
        address indexed seller,
        uint256 amount,
        string meetingLocation
    );

    event EscrowCompleted(
        uint256 indexed tokenId,
        address indexed buyer,
        address indexed seller,
        uint256 amount
    );

    event EscrowDisputed(
        uint256 indexed tokenId,
        address indexed disputer,
        string reason
    );

    event StudentVerified(
        address indexed student,
        string university
    );

    event StudentRated(
        address indexed ratedStudent,
        address indexed rater,
        uint256 rating
    );

    event UniversityAdded(string university);

    constructor() ERC721("Stufind", "STUF") {
        // Add some initial supported universities
        supportedUniversities["MIT"] = true;
        supportedUniversities["Stanford"] = true;
        supportedUniversities["Harvard"] = true;
        supportedUniversities["UC Berkeley"] = true;
        supportedUniversities["NYU"] = true;
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
    function updateListingPrice(uint256 _listingPrice) external onlyOwner {
        listingPrice = _listingPrice;
    }

    function updatePlatformFee(uint256 _platformFeePercent) external onlyOwner {
        require(_platformFeePercent <= 1000, "Fee cannot exceed 10%");
        platformFeePercent = _platformFeePercent;
    }

    function addUniversity(string memory university) external onlyOwner {
        supportedUniversities[university] = true;
        emit UniversityAdded(university);
    }

    function verifyStudent(
        address student,
        string memory university
    ) external onlyOwner {
        require(supportedUniversities[university], "University not supported");
        
        studentProfiles[student] = StudentProfile({
            isVerified: true,
            university: university,
            totalSales: 0,
            totalPurchases: 0,
            rating: 0,
            ratingCount: 0,
            isActive: true
        });

        emit StudentVerified(student, university);
    }

    // Core marketplace functions
    function createToken(
        string memory tokenURI,
        uint256 price,
        string memory category,
        string memory condition,
        uint256 royaltyPercent,
        string memory meetingLocation
    ) external payable onlyVerifiedStudent nonReentrant returns (uint256) {
        require(price > 0, "Price must be greater than 0");
        require(msg.value == listingPrice, "Must pay listing fee");
        require(royaltyPercent <= MAX_ROYALTY, "Royalty too high");
        require(bytes(tokenURI).length > 0, "Token URI required");
        require(bytes(category).length > 0, "Category required");
        require(bytes(condition).length > 0, "Condition required");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);

        createMarketItem(
            newTokenId,
            price,
            category,
            condition,
            royaltyPercent,
            meetingLocation
        );

        return newTokenId;
    }

    function createMarketItem(
        uint256 tokenId,
        uint256 price,
        string memory category,
        string memory condition,
        uint256 royaltyPercent,
        string memory meetingLocation
    ) private {
        StudentProfile memory profile = studentProfiles[msg.sender];
        
        idToMarketItem[tokenId] = MarketItem({
            tokenId: tokenId,
            seller: payable(msg.sender),
            owner: payable(address(this)),
            price: price,
            sold: false,
            category: category,
            condition: condition,
            royaltyPercent: royaltyPercent,
            creator: payable(msg.sender),
            createdAt: block.timestamp,
            isActive: true,
            university: profile.university
        });

        _transfer(msg.sender, address(this), tokenId);

        emit MarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            category,
            condition,
            profile.university
        );
    }

    function createEscrow(
        uint256 tokenId,
        string memory meetingLocation
    ) external payable onlyVerifiedStudent validTokenId(tokenId) nonReentrant {
        MarketItem memory item = idToMarketItem[tokenId];
        require(item.isActive, "Item not available");
        require(msg.value == item.price, "Incorrect payment amount");
        require(msg.sender != item.seller, "Cannot buy own item");
        require(bytes(meetingLocation).length > 0, "Meeting location required");

        escrowTransactions[tokenId] = EscrowTransaction({
            tokenId: tokenId,
            buyer: payable(msg.sender),
            seller: item.seller,
            amount: msg.value,
            buyerConfirmed: false,
            sellerConfirmed: false,
            completed: false,
            disputed: false,
            createdAt: block.timestamp,
            deadline: block.timestamp + ESCROW_DURATION,
            meetingLocation: meetingLocation
        });

        // Mark item as pending
        idToMarketItem[tokenId].isActive = false;

        emit EscrowCreated(tokenId, msg.sender, item.seller, msg.value, meetingLocation);
    }

    function confirmReceipt(uint256 tokenId) external validTokenId(tokenId) {
        EscrowTransaction storage transaction = escrowTransactions[tokenId];
        require(transaction.buyer == msg.sender, "Only buyer can confirm receipt");
        require(!transaction.completed, "Transaction already completed");
        require(!transaction.disputed, "Transaction is disputed");
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
        require(!transaction.disputed, "Transaction is disputed");
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

        // Update student profiles
        studentProfiles[transaction.seller].totalSales++;
        studentProfiles[transaction.buyer].totalPurchases++;

        // Calculate payments
        uint256 platformFee = (transaction.amount * platformFeePercent) / 10000;
        uint256 royalty = 0;

        if (item.creator != transaction.seller && item.royaltyPercent > 0) {
            royalty = (transaction.amount * item.royaltyPercent) / 10000;
        }

        uint256 sellerAmount = transaction.amount - platformFee - royalty;

        // Transfer payments
        if (royalty > 0) {
            item.creator.transfer(royalty);
        }
        payable(owner()).transfer(platformFee);
        transaction.seller.transfer(sellerAmount);

        // Transfer NFT
        _transfer(address(this), transaction.buyer, tokenId);

        emit EscrowCompleted(tokenId, transaction.buyer, transaction.seller, transaction.amount);
        emit MarketItemSold(tokenId, transaction.seller, transaction.buyer, transaction.amount);
    }

    function disputeTransaction(
        uint256 tokenId,
        string memory reason
    ) external validTokenId(tokenId) {
        EscrowTransaction storage transaction = escrowTransactions[tokenId];
        require(
            transaction.buyer == msg.sender || transaction.seller == msg.sender,
            "Only buyer or seller can dispute"
        );
        require(!transaction.completed, "Transaction already completed");
        require(!transaction.disputed, "Already disputed");
        require(block.timestamp <= transaction.deadline + DISPUTE_DURATION, "Dispute period expired");

        transaction.disputed = true;

        emit EscrowDisputed(tokenId, msg.sender, reason);
    }

    function resolveDispute(
        uint256 tokenId,
        bool favorBuyer
    ) external onlyOwner validTokenId(tokenId) {
        EscrowTransaction storage transaction = escrowTransactions[tokenId];
        require(transaction.disputed, "No dispute to resolve");
        require(!transaction.completed, "Transaction already completed");

        transaction.completed = true;

        if (favorBuyer) {
            // Refund buyer
            transaction.buyer.transfer(transaction.amount);
            // Reactivate listing
            idToMarketItem[tokenId].isActive = true;
        } else {
            // Pay seller (minus platform fee)
            uint256 platformFee = (transaction.amount * platformFeePercent) / 10000;
            uint256 sellerAmount = transaction.amount - platformFee;
            
            payable(owner()).transfer(platformFee);
            transaction.seller.transfer(sellerAmount);
            
            // Transfer NFT to buyer
            _transfer(address(this), transaction.buyer, tokenId);
            idToMarketItem[tokenId].owner = transaction.buyer;
            idToMarketItem[tokenId].sold = true;
            _itemsSold.increment();
        }
    }

    function emergencyRefund(uint256 tokenId) external validTokenId(tokenId) nonReentrant {
        EscrowTransaction storage transaction = escrowTransactions[tokenId];
        require(transaction.buyer == msg.sender, "Only buyer can request refund");
        require(block.timestamp > transaction.deadline + DISPUTE_DURATION, "Refund not available yet");
        require(!transaction.completed, "Transaction already completed");
        require(!transaction.disputed, "Transaction is disputed");

        transaction.completed = true;
        
        // Refund buyer
        transaction.buyer.transfer(transaction.amount);
        
        // Reactivate listing
        idToMarketItem[tokenId].isActive = true;
    }

    function rateStudent(address student, uint256 rating) external onlyVerifiedStudent {
        require(rating >= 1 && rating <= 5, "Rating must be 1-5");
        require(student != msg.sender, "Cannot rate yourself");
        require(!hasRated[msg.sender][student], "Already rated this student");
        require(studentProfiles[student].isVerified, "Student not verified");

        StudentProfile storage profile = studentProfiles[student];
        
        // Calculate new average rating
        uint256 totalRating = (profile.rating * profile.ratingCount) + (rating * 100);
        profile.ratingCount++;
        profile.rating = totalRating / profile.ratingCount;
        
        hasRated[msg.sender][student] = true;

        emit StudentRated(student, msg.sender, rating);
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

    function fetchMyNFTs() external view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        
        return items;
    }

    function fetchItemsListed() external view returns (MarketItem[] memory) {
        uint256 totalItemCount = _tokenIds.current();
        uint256 itemCount = 0;
        uint256 currentIndex = 0;

        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        
        for (uint256 i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint256 currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        
        return items;
    }

    function getEscrowDetails(uint256 tokenId) external view validTokenId(tokenId) returns (EscrowTransaction memory) {
        return escrowTransactions[tokenId];
    }

    function getMarketItem(uint256 tokenId) external view validTokenId(tokenId) returns (MarketItem memory) {
        return idToMarketItem[tokenId];
    }

    function getStudentProfile(address student) external view returns (StudentProfile memory) {
        return studentProfiles[student];
    }

    function getMarketStats() external view returns (
        uint256 totalItems,
        uint256 totalSold,
        uint256 totalVolume,
        uint256 averagePrice
    ) {
        totalItems = _tokenIds.current();
        totalSold = _itemsSold.current();
        
        // Calculate total volume and average price
        uint256 volumeSum = 0;
        uint256 soldCount = 0;
        
        for (uint256 i = 1; i <= totalItems; i++) {
            if (idToMarketItem[i].sold) {
                volumeSum += idToMarketItem[i].price;
                soldCount++;
            }
        }
        
        totalVolume = volumeSum;
        averagePrice = soldCount > 0 ? volumeSum / soldCount : 0;
    }

    function withdraw() external onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        payable(owner()).transfer(balance);
    }

    // Emergency functions
    function pause() external onlyOwner {
        // In a production contract, this would implement pausable functionality
        // For now, we'll just emit an event
    }

    function unpause() external onlyOwner {
        // In a production contract, this would implement pausable functionality
        // For now, we'll just emit an event
    }

    // Override required functions
    function supportsInterface(bytes4 interfaceId) public view virtual override(ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
