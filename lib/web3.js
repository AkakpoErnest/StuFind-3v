import { ethers } from "ethers"

// Contract addresses (would be deployed addresses)
export const MARKETPLACE_ADDRESS = "0x..." // Deploy address
export const MARKETPLACE_ABI = [
  // ABI would be generated from contract compilation
  "function createToken(string memory tokenURI, uint256 price, string memory category, string memory condition, uint256 royaltyPercent) public payable returns (uint)",
  "function createEscrow(uint256 tokenId) public payable",
  "function confirmReceipt(uint256 tokenId) public",
  "function confirmDelivery(uint256 tokenId) public",
  "function fetchMarketItems() public view returns (tuple(uint256,address,address,uint256,bool,string,string,uint256,address,uint256,bool)[])",
  "function fetchMyNFTs() public view returns (tuple(uint256,address,address,uint256,bool,string,string,uint256,address,uint256,bool)[])",
  "function fetchItemsListed() public view returns (tuple(uint256,address,address,uint256,bool,string,string,uint256,address,uint256,bool)[])",
  "function getEscrowDetails(uint256 tokenId) public view returns (tuple(uint256,address,address,uint256,bool,bool,bool,uint256,uint256))",
  "function verifyStudent(address student) public",
  "function rateUser(address user, uint256 rating) public",
  "function getListingPrice() public view returns (uint256)",
  "event MarketItemCreated(uint256 indexed tokenId, address seller, address owner, uint256 price, string category, string condition)",
  "event MarketItemSold(uint256 indexed tokenId, address seller, address buyer, uint256 price)",
  "event EscrowCreated(uint256 indexed tokenId, address buyer, address seller, uint256 amount)",
  "event EscrowCompleted(uint256 indexed tokenId, address buyer, address seller)",
]

// Web3 connection utilities
export const connectWallet = async () => {
  if (typeof window !== "undefined" && window.ethereum) {
    try {
      await window.ethereum.request({ method: "eth_requestAccounts" })
      const provider = new ethers.providers.Web3Provider(window.ethereum)
      const signer = provider.getSigner()
      const address = await signer.getAddress()
      return { provider, signer, address }
    } catch (error) {
      console.error("Error connecting wallet:", error)
      throw error
    }
  } else {
    throw new Error("MetaMask not found")
  }
}

export const getContract = (provider, withSigner = false) => {
  const signerOrProvider = withSigner ? provider.getSigner() : provider
  return new ethers.Contract(MARKETPLACE_ADDRESS, MARKETPLACE_ABI, signerOrProvider)
}

// IPFS utilities for metadata storage
export const uploadToIPFS = async (file) => {
  // In production, would use services like Pinata, Infura IPFS, or Web3.Storage
  const formData = new FormData()
  formData.append("file", file)

  try {
    const response = await fetch("/api/ipfs/upload", {
      method: "POST",
      body: formData,
    })
    const data = await response.json()
    return data.ipfsHash
  } catch (error) {
    console.error("Error uploading to IPFS:", error)
    throw error
  }
}

export const createNFTMetadata = async (itemData, imageHash) => {
  const metadata = {
    name: itemData.title,
    description: itemData.description,
    image: `ipfs://${imageHash}`,
    attributes: [
      {
        trait_type: "Category",
        value: itemData.category,
      },
      {
        trait_type: "Condition",
        value: itemData.condition,
      },
      {
        trait_type: "Seller",
        value: itemData.seller,
      },
      {
        trait_type: "Created",
        value: new Date().toISOString(),
      },
    ],
  }

  const metadataBlob = new Blob([JSON.stringify(metadata)], { type: "application/json" })
  return await uploadToIPFS(metadataBlob)
}

// Contract interaction functions
export const createMarketItem = async (provider, itemData, imageFile) => {
  try {
    const contract = getContract(provider, true)
    const listingPrice = await contract.getListingPrice()

    // Upload image to IPFS
    const imageHash = await uploadToIPFS(imageFile)

    // Create and upload metadata
    const metadataHash = await createNFTMetadata(itemData, imageHash)
    const tokenURI = `ipfs://${metadataHash}`

    // Create NFT and list on marketplace
    const transaction = await contract.createToken(
      tokenURI,
      ethers.utils.parseEther(itemData.price),
      itemData.category,
      itemData.condition,
      itemData.royaltyPercent * 100, // Convert to basis points
      { value: listingPrice },
    )

    await transaction.wait()
    return transaction
  } catch (error) {
    console.error("Error creating market item:", error)
    throw error
  }
}

export const buyItem = async (provider, tokenId, price) => {
  try {
    const contract = getContract(provider, true)
    const transaction = await contract.createEscrow(tokenId, {
      value: ethers.utils.parseEther(price),
    })
    await transaction.wait()
    return transaction
  } catch (error) {
    console.error("Error buying item:", error)
    throw error
  }
}

export const confirmReceipt = async (provider, tokenId) => {
  try {
    const contract = getContract(provider, true)
    const transaction = await contract.confirmReceipt(tokenId)
    await transaction.wait()
    return transaction
  } catch (error) {
    console.error("Error confirming receipt:", error)
    throw error
  }
}

export const confirmDelivery = async (provider, tokenId) => {
  try {
    const contract = getContract(provider, true)
    const transaction = await contract.confirmDelivery(tokenId)
    await transaction.wait()
    return transaction
  } catch (error) {
    console.error("Error confirming delivery:", error)
    throw error
  }
}

export const fetchMarketItems = async (provider) => {
  try {
    const contract = getContract(provider)
    const items = await contract.fetchMarketItems()

    // Format items for frontend
    return items.map((item) => ({
      tokenId: item[0].toString(),
      seller: item[1],
      owner: item[2],
      price: ethers.utils.formatEther(item[3]),
      sold: item[4],
      category: item[5],
      condition: item[6],
      royaltyPercent: item[7].toNumber() / 100,
      creator: item[8],
      createdAt: new Date(item[9].toNumber() * 1000),
      isActive: item[10],
    }))
  } catch (error) {
    console.error("Error fetching market items:", error)
    throw error
  }
}

// Utility functions
export const formatAddress = (address) => {
  return `${address.slice(0, 6)}...${address.slice(-4)}`
}

export const getEthPrice = async () => {
  try {
    const response = await fetch("https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd")
    const data = await response.json()
    return data.ethereum.usd
  } catch (error) {
    console.error("Error fetching ETH price:", error)
    return 1800 // Fallback price
  }
}
