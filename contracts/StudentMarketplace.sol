// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract StudentMarketplace is ERC721URIStorage, ReentrancyGuard, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;

    uint256 listingPrice = 0.0025 ether;
    uint256 platformFeePercent = 250; // 2.5%

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
    }

    struct EscrowTransaction {
        uint256 tokenId;
        address buyer;
        address seller;
        uint256 amount;
        bool buyerConfirmed;
        bool sellerConfirmed;
        bool completed;
        uint256 createdAt;
        uint256 deadline;
    }

    mapping(uint256 => MarketItem) private idToMarketItem;
    mapping(uint256 => EscrowTransaction) private escrowTransactions;
    mapping(address => bool) public verifiedStudents;
    mapping(address => uint256) public userRatings;
    mapping(address => uint256) public totalRatings;

    event MarketItemCreated(
        uint256 indexed tokenId,
        address seller,
        address owner,
        uint256 price,
        string category,
        string condition
    );

    event MarketItemSold(
        uint256 indexed tokenId,
        address seller,
        address buyer,
        uint256 price
    );

    event EscrowCreated(
        uint256 indexed tokenId,
        address buyer,
        address seller,
        uint256 amount
    );

    event EscrowCompleted(
        uint256 indexed tokenId,
        address buyer,
        address seller
    );

    event StudentVerified(address student);

    constructor() ERC721("StudentMarket", "STMKT") {}

    // Update listing price (only owner)
    function updateListingPrice(uint _listingPrice) public payable onlyOwner {
        listingPrice = _listingPrice;
    }

    // Get listing price
    function getListingPrice() public view returns (uint256) {
        return listingPrice;
    }

    // Verify student (only owner - would integrate with university systems)
    function verifyStudent(address student) public onlyOwner {
        verifiedStudents[student] = true;
        emit StudentVerified(student);
    }

    // Create NFT and list item
    function createToken(
        string memory tokenURI,
        uint256 price,
        string memory category,
        string memory condition,
        uint256 royaltyPercent
    ) public payable nonReentrant returns (uint) {
        require(price > 0, "Price must be at least 1 wei");
        require(msg.value == listingPrice, "Price must be equal to listing price");
        require(royaltyPercent <= 1000, "Royalty cannot exceed 10%");

        _tokenIds.increment();
        uint256 newTokenId = _tokenIds.current();

        _mint(msg.sender, newTokenId);
        _setTokenURI(newTokenId, tokenURI);
        createMarketItem(newTokenId, price, category, condition, royaltyPercent);

        return newTokenId;
    }

    function createMarketItem(
        uint256 tokenId,
        uint256 price,
        string memory category,
        string memory condition,
        uint256 royaltyPercent
    ) private {
        idToMarketItem[tokenId] = MarketItem(
            tokenId,
            payable(msg.sender),
            payable(address(this)),
            price,
            false,
            category,
            condition,
            royaltyPercent,
            payable(msg.sender),
            block.timestamp,
            true
        );

        _transfer(msg.sender, address(this), tokenId);

        emit MarketItemCreated(
            tokenId,
            msg.sender,
            address(this),
            price,
            category,
            condition
        );
    }

    // Create escrow transaction
    function createEscrow(uint256 tokenId) public payable nonReentrant {
        uint256 price = idToMarketItem[tokenId].price;
        require(msg.value == price, "Please submit the asking price");
        require(idToMarketItem[tokenId].isActive, "Item not available");
        require(msg.sender != idToMarketItem[tokenId].seller, "Cannot buy your own item");

        // Create escrow with 7-day deadline
        escrowTransactions[tokenId] = EscrowTransaction(
            tokenId,
            msg.sender,
            idToMarketItem[tokenId].seller,
            msg.value,
            false,
            false,
            false,
            block.timestamp,
            block.timestamp + 7 days
        );

        emit EscrowCreated(tokenId, msg.sender, idToMarketItem[tokenId].seller, msg.value);
    }

    // Buyer confirms receipt
    function confirmReceipt(uint256 tokenId) public {
        require(escrowTransactions[tokenId].buyer == msg.sender, "Only buyer can confirm");
        require(!escrowTransactions[tokenId].completed, "Transaction already completed");
        require(block.timestamp <= escrowTransactions[tokenId].deadline, "Transaction expired");

        escrowTransactions[tokenId].buyerConfirmed = true;
        
        if (escrowTransactions[tokenId].sellerConfirmed) {
            completeEscrow(tokenId);
        }
    }

    // Seller confirms delivery
    function confirmDelivery(uint256 tokenId) public {
        require(escrowTransactions[tokenId].seller == msg.sender, "Only seller can confirm");
        require(!escrowTransactions[tokenId].completed, "Transaction already completed");
        require(block.timestamp <= escrowTransactions[tokenId].deadline, "Transaction expired");

        escrowTransactions[tokenId].sellerConfirmed = true;
        
        if (escrowTransactions[tokenId].buyerConfirmed) {
            completeEscrow(tokenId);
        }
    }

    // Complete escrow and transfer NFT
    function completeEscrow(uint256 tokenId) private {
        EscrowTransaction storage transaction = escrowTransactions[tokenId];
        MarketItem storage item = idToMarketItem[tokenId];
        
        require(transaction.buyerConfirmed && transaction.sellerConfirmed, "Both parties must confirm");
        
        transaction.completed = true;
        item.sold = true;
        item.isActive = false;
        item.owner = payable(transaction.buyer);
        _itemsSold.increment();

        // Calculate fees and royalties
        uint256 platformFee = (transaction.amount * platformFeePercent) / 10000;
        uint256 royalty = 0;
        
        if (item.creator != item.seller) {
            royalty = (transaction.amount * item.royaltyPercent) / 10000;
        }
        
        uint256 sellerAmount = transaction.amount - platformFee - royalty;

        // Transfer payments
        if (royalty > 0) {
            item.creator.transfer(royalty);
        }
        payable(owner()).transfer(platformFee);
        payable(transaction.seller).transfer(sellerAmount);

        // Transfer NFT
        _transfer(address(this), transaction.buyer, tokenId);

        emit EscrowCompleted(tokenId, transaction.buyer, transaction.seller);
        emit MarketItemSold(tokenId, transaction.seller, transaction.buyer, transaction.amount);
    }

    // Emergency refund (if deadline passed without confirmation)
    function emergencyRefund(uint256 tokenId) public nonReentrant {
        EscrowTransaction storage transaction = escrowTransactions[tokenId];
        require(msg.sender == transaction.buyer, "Only buyer can request refund");
        require(block.timestamp > transaction.deadline, "Deadline not reached");
        require(!transaction.completed, "Transaction already completed");

        transaction.completed = true;
        payable(transaction.buyer).transfer(transaction.amount);
    }

    // Rate user after transaction
    function rateUser(address user, uint256 rating) public {
        require(rating >= 1 && rating <= 5, "Rating must be between 1 and 5");
        // In production, would verify that msg.sender had a transaction with user
        
        userRatings[user] = ((userRatings[user] * totalRatings[user]) + rating) / (totalRatings[user] + 1);
        totalRatings[user]++;
    }

    // Get market items
    function fetchMarketItems() public view returns (MarketItem[] memory) {
        uint itemCount = _tokenIds.current();
        uint unsoldItemCount = _tokenIds.current() - _itemsSold.current();
        uint currentIndex = 0;

        MarketItem[] memory items = new MarketItem[](unsoldItemCount);
        for (uint i = 0; i < itemCount; i++) {
            if (idToMarketItem[i + 1].owner == address(this) && idToMarketItem[i + 1].isActive) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // Get user's NFTs
    function fetchMyNFTs() public view returns (MarketItem[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].owner == msg.sender) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // Get user's listed items
    function fetchItemsListed() public view returns (MarketItem[] memory) {
        uint totalItemCount = _tokenIds.current();
        uint itemCount = 0;
        uint currentIndex = 0;

        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                itemCount += 1;
            }
        }

        MarketItem[] memory items = new MarketItem[](itemCount);
        for (uint i = 0; i < totalItemCount; i++) {
            if (idToMarketItem[i + 1].seller == msg.sender) {
                uint currentId = i + 1;
                MarketItem storage currentItem = idToMarketItem[currentId];
                items[currentIndex] = currentItem;
                currentIndex += 1;
            }
        }
        return items;
    }

    // Get escrow details
    function getEscrowDetails(uint256 tokenId) public view returns (EscrowTransaction memory) {
        return escrowTransactions[tokenId];
    }

    // Withdraw contract balance (only owner)
    function withdraw() public onlyOwner {
        uint balance = address(this).balance;
        payable(owner()).transfer(balance);
    }
}
