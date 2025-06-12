import { ethers } from "ethers"

// Stufind Contract Configuration
export const STUFIND_CONTRACT_ADDRESS = "0x..." // Will be set after deployment
export const STUFIND_ABI = [
  // Core marketplace functions
  "function createToken(string memory tokenURI, uint256 price, string memory category, string memory condition, uint256 royaltyPercent, string memory meetingLocation) external payable returns (uint256)",
  "function createEscrow(uint256 tokenId, string memory meetingLocation) external payable",
  "function confirmReceipt(uint256 tokenId) external",
  "function confirmDelivery(uint256 tokenId) external",
  "function disputeTransaction(uint256 tokenId, string memory reason) external",
  "function emergencyRefund(uint256 tokenId) external",
  "function rateStudent(address student, uint256 rating) external",

  // View functions
  "function fetchMarketItems() external view returns (tuple(uint256,address,address,uint256,bool,string,string,uint256,address,uint256,bool,string)[])",
  "function fetchMyNFTs() external view returns (tuple(uint256,address,address,uint256,bool,string,string,uint256,address,uint256,bool,string)[])",
  "function fetchItemsListed() external view returns (tuple(uint256,address,address,uint256,bool,string,string,uint256,address,uint256,bool,string)[])",
  "function getEscrowDetails(uint256 tokenId) external view returns (tuple(uint256,address,address,uint256,bool,bool,bool,bool,uint256,uint256,string))",
  "function getMarketItem(uint256 tokenId) external view returns (tuple(uint256,address,address,uint256,bool,string,string,uint256,address,uint256,bool,string))",
  "function getStudentProfile(address student) external view returns (tuple(bool,string,uint256,uint256,uint256,uint256,bool))",
  "function getMarketStats() external view returns (uint256,uint256,uint256,uint256)",

  // Admin functions
  "function verifyStudent(address student, string memory university) external",
  "function addUniversity(string memory university) external",
  "function updateListingPrice(uint256 _listingPrice) external",

  // Public variables
  "function listingPrice() external view returns (uint256)",
  "function platformFeePercent() external view returns (uint256)",
  "function studentProfiles(address) external view returns (bool,string,uint256,uint256,uint256,uint256,bool)",
  "function supportedUniversities(string) external view returns (bool)",

  // Events
  "event MarketItemCreated(uint256 indexed tokenId, address indexed seller, address indexed owner, uint256 price, string category, string condition, string university)",
  "event MarketItemSold(uint256 indexed tokenId, address indexed seller, address indexed buyer, uint256 price)",
  "event EscrowCreated(uint256 indexed tokenId, address indexed buyer, address indexed seller, uint256 amount, string meetingLocation)",
  "event EscrowCompleted(uint256 indexed tokenId, address indexed buyer, address indexed seller, uint256 amount)",
  "event StudentVerified(address indexed student, string university)",
  "event StudentRated(address indexed ratedStudent, address indexed rater, uint256 rating)",
]

// Network configurations
export const NETWORKS = {
  ethereum: {
    chainId: 1,
    name: "Ethereum Mainnet",
    rpcUrl: "https://mainnet.infura.io/v3/YOUR_INFURA_KEY",
    blockExplorer: "https://etherscan.io",
  },
  sepolia: {
    chainId: 11155111,
    name: "Sepolia Testnet",
    rpcUrl: "https://sepolia.infura.io/v3/YOUR_INFURA_KEY",
    blockExplorer: "https://sepolia.etherscan.io",
  },
  goerli: {
    chainId: 5,
    name: "Goerli Testnet",
    rpcUrl: "https://goerli.infura.io/v3/YOUR_INFURA_KEY",
    blockExplorer: "https://goerli.etherscan.io",
  },
}

// Utility functions
export const connectWallet = async () => {
  if (typeof window === "undefined" || !window.ethereum) {
    throw new Error("MetaMask not found or not in browser environment. Please install MetaMask to use Stufind.")
  }
  try {
    await window.ethereum.request({ method: "eth_request_accounts" })
    const provider = new ethers.BrowserProvider(window.ethereum) // Use BrowserProvider for client-side
    const signer = await provider.getSigner() // getSigner is async in ethers v6
    const address = await signer.getAddress()
    const network = await provider.getNetwork()

    return { provider, signer, address, network }
  } catch (error) {
    console.error("Error connecting wallet:", error)
    throw new Error("Failed to connect wallet")
  }
}

export const getContract = (provider, withSigner = false) => {
  const signerOrProvider = withSigner ? provider.getSigner() : provider
  return new ethers.Contract(STUFIND_CONTRACT_ADDRESS, STUFIND_ABI, signerOrProvider)
}

export const switchToEthereum = async () => {
  if (window.ethereum) {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x1" }], // Ethereum mainnet
      })
    } catch (error) {
      console.error("Error switching to Ethereum:", error)
      throw error
    }
  }
}

// IPFS functions for decentralized storage
export const uploadToIPFS = async (file) => {
  try {
    // Using Pinata for IPFS uploads
    const formData = new FormData()
    formData.append("file", file)

    const response = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
      body: formData,
    })

    if (!response.ok) {
      throw new Error("Failed to upload to IPFS")
    }

    const data = await response.json()
    return data.IpfsHash
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
    external_url: "https://stufind.app",
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
        trait_type: "University",
        value: itemData.university,
      },
      {
        trait_type: "Seller",
        value: itemData.seller,
      },
      {
        trait_type: "Created",
        value: new Date().toISOString(),
      },
      {
        trait_type: "Platform",
        value: "Stufind",
      },
    ],
    properties: {
      category: itemData.category,
      condition: itemData.condition,
      university: itemData.university,
      meetingLocation: itemData.meetingLocation,
    },
  }

  try {
    const response = await fetch("https://api.pinata.cloud/pinning/pinJSONToIPFS", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_PINATA_JWT}`,
      },
      body: JSON.stringify({
        pinataContent: metadata,
        pinataMetadata: {
          name: `${itemData.title} - Stufind NFT Metadata`,
        },
      }),
    })

    if (!response.ok) {
      throw new Error("Failed to upload metadata to IPFS")
    }

    const data = await response.json()
    return data.IpfsHash
  } catch (error) {
    console.error("Error uploading metadata to IPFS:", error)
    throw error
  }
}

// Contract interaction functions (client-side)
export const createMarketItem = async (provider, itemData, imageFile) => {
  try {
    const contract = getContract(provider, true)
    const listingPrice = await contract.listingPrice()

    // Upload image to IPFS
    const imageHash = await uploadToIPFS(imageFile)

    // Create and upload metadata
    const metadataHash = await createNFTMetadata(
      {
        ...itemData,
        seller: await (await provider.getSigner()).getAddress(), // Await getSigner
      },
      imageHash,
    )

    const tokenURI = `ipfs://${metadataHash}`

    // Estimate gas
    const gasEstimate = await contract.estimateGas.createToken(
      tokenURI,
      ethers.parseEther(itemData.price.toString()), // Use ethers.parseEther
      itemData.category,
      itemData.condition,
      Math.floor(itemData.royaltyPercent * 100), // Convert to basis points
      itemData.meetingLocation,
      { value: listingPrice },
    )

    // Create NFT and list on marketplace
    const transaction = await contract.createToken(
      tokenURI,
      ethers.parseEther(itemData.price.toString()), // Use ethers.parseEther
      itemData.category,
      itemData.condition,
      Math.floor(itemData.royaltyPercent * 100),
      itemData.meetingLocation,
      {
        value: listingPrice,
        gasLimit: gasEstimate.mul(120).div(100), // Add 20% buffer
      },
    )

    const receipt = await transaction.wait()

    // Extract token ID from events
    const event = receipt.events?.find((e) => e.event === "MarketItemCreated")
    const tokenId = event?.args?.tokenId

    return { transaction, receipt, tokenId }
  } catch (error) {
    console.error("Error creating market item:", error)
    throw error
  }
}

export const buyItem = async (provider, tokenId, price, meetingLocation) => {
  try {
    const contract = getContract(provider, true)

    const gasEstimate = await contract.estimateGas.createEscrow(tokenId, meetingLocation, {
      value: ethers.parseEther(price.toString()), // Use ethers.parseEther
    })

    const transaction = await contract.createEscrow(tokenId, meetingLocation, {
      value: ethers.parseEther(price.toString()), // Use ethers.parseEther
      gasLimit: gasEstimate.mul(120).div(100),
    })

    const receipt = await transaction.wait()
    return { transaction, receipt }
  } catch (error) {
    console.error("Error buying item:", error)
    throw error
  }
}

export const confirmReceipt = async (provider, tokenId) => {
  try {
    const contract = getContract(provider, true)
    const transaction = await contract.confirmReceipt(tokenId)
    const receipt = await transaction.wait()
    return { transaction, receipt }
  } catch (error) {
    console.error("Error confirming receipt:", error)
    throw error
  }
}

export const confirmDelivery = async (provider, tokenId) => {
  try {
    const contract = getContract(provider, true)
    const transaction = await contract.confirmDelivery(tokenId)
    const receipt = await transaction.wait()
    return { transaction, receipt }
  } catch (error) {
    console.error("Error confirming delivery:", error)
    throw error
  }
}

export const rateStudent = async (provider, studentAddress, rating) => {
  try {
    const contract = getContract(provider, true)
    const transaction = await contract.rateStudent(studentAddress, rating)
    const receipt = await transaction.wait()
    return { transaction, receipt }
  } catch (error) {
    console.error("Error rating student:", error)
    throw error
  }
}

// Data fetching functions
export const fetchMarketItems = async (provider) => {
  try {
    const contract = getContract(provider)
    const items = await contract.fetchMarketItems()

    return items.map((item) => ({
      tokenId: item[0].toString(),
      seller: item[1],
      owner: item[2],
      price: ethers.formatEther(item[3]), // Use ethers.formatEther
      sold: item[4],
      category: item[5],
      condition: item[6],
      royaltyPercent: item[7].toNumber() / 100,
      creator: item[8],
      createdAt: new Date(Number(item[9]) * 1000), // Convert BigInt to Number
      isActive: item[10],
      university: item[11],
    }))
  } catch (error) {
    console.error("Error fetching market items:", error)
    throw error
  }
}

export const fetchMyNFTs = async (provider) => {
  try {
    const contract = getContract(provider, true)
    const items = await contract.fetchMyNFTs()

    return items.map((item) => ({
      tokenId: item[0].toString(),
      seller: item[1],
      owner: item[2],
      price: ethers.formatEther(item[3]), // Use ethers.formatEther
      sold: item[4],
      category: item[5],
      condition: item[6],
      royaltyPercent: item[7].toNumber() / 100,
      creator: item[8],
      createdAt: new Date(Number(item[9]) * 1000), // Convert BigInt to Number
      isActive: item[10],
      university: item[11],
    }))
  } catch (error) {
    console.error("Error fetching my NFTs:", error)
    throw error
  }
}

export const getStudentProfile = async (provider, address) => {
  try {
    const contract = getContract(provider)
    const profile = await contract.getStudentProfile(address)

    return {
      isVerified: profile[0],
      university: profile[1],
      totalSales: Number(profile[2]), // Convert BigInt to Number
      totalPurchases: Number(profile[3]), // Convert BigInt to Number
      rating: Number(profile[4]) / 100, // Convert BigInt to Number
      ratingCount: Number(profile[5]), // Convert BigInt to Number
      isActive: profile[6],
    }
  } catch (error) {
    console.error("Error fetching student profile:", error)
    throw error
  }
}

export const getMarketStats = async (provider) => {
  try {
    const contract = getContract(provider)
    const stats = await contract.getMarketStats()

    return {
      totalItems: Number(stats[0]), // Convert BigInt to Number
      totalSold: Number(stats[1]), // Convert BigInt to Number
      totalVolume: ethers.formatEther(stats[2]), // Use ethers.formatEther
      averagePrice: ethers.formatEther(stats[3]), // Use ethers.formatEther
    }
  } catch (error) {
    console.error("Error fetching market stats:", error)
    throw error
  }
}

// Utility functions
export const formatAddress = (address) => {
  if (!address) return ""
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

export const calculateGasCost = async (provider, gasUsed) => {
  try {
    const gasPrice = await provider.getGasPrice()
    const gasCostWei = gasPrice * gasUsed // BigInt multiplication
    return ethers.formatEther(gasCostWei) // Use ethers.formatEther
  } catch (error) {
    console.error("Error calculating gas cost:", error)
    return "0"
  }
}

export const isValidEthereumAddress = (address) => {
  return ethers.isAddress(address) // Use ethers.isAddress
}

// Event listeners
export const subscribeToMarketEvents = (provider, callback) => {
  const contract = getContract(provider)

  contract.on("MarketItemCreated", (tokenId, seller, owner, price, category, condition, university) => {
    callback({
      type: "MarketItemCreated",
      data: { tokenId, seller, owner, price, category, condition, university },
    })
  })

  contract.on("MarketItemSold", (tokenId, seller, buyer, price) => {
    callback({
      type: "MarketItemSold",
      data: { tokenId, seller, buyer, price },
    })
  })

  contract.on("EscrowCreated", (tokenId, buyer, seller, amount, meetingLocation) => {
    callback({
      type: "EscrowCreated",
      data: { tokenId, buyer, seller, amount, meetingLocation },
    })
  })

  return () => {
    contract.removeAllListeners()
  }
}
