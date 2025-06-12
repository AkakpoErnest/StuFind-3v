import { ethers, Wallet } from "ethers"
import { STUFIND_ABI, STUFIND_CONTRACT_ADDRESS } from "./stufind-web3" // Re-use ABI and address

// Server-side provider (e.g., Infura, Alchemy, or a local RPC)
// Ensure you have a RPC URL environment variable for server-side use
const RPC_URL = process.env.NEXT_PUBLIC_ETHEREUM_RPC_URL || "https://sepolia.infura.io/v3/YOUR_INFURA_KEY" // Replace with your actual RPC URL

// Initialize a provider for server-side interactions
const provider = new ethers.JsonRpcProvider(RPC_URL)

// Function to get a contract instance for server-side operations
// This will typically involve a signer if you need to send transactions
export const getServerContract = (privateKey) => {
  if (!privateKey) {
    throw new Error("Private key is required for server-side contract interactions.")
  }
  const wallet = new Wallet(privateKey, provider)
  return new ethers.Contract(STUFIND_CONTRACT_ADDRESS, STUFIND_ABI, wallet)
}

// Server-side function to create a market item
// This function assumes the server has a private key to sign transactions
export const createMarketItemServer = async (itemData, imageHash, privateKey) => {
  try {
    const contract = getServerContract(privateKey)
    const listingPrice = await contract.listingPrice()

    // Create and upload metadata (assuming this is handled by Pinata API directly or similar)
    // The createNFTMetadata function from stufind-web3.js can be reused if it's purely HTTP requests
    // For simplicity, we'll assume imageHash and metadataHash are already obtained or handled
    const tokenURI = `ipfs://${itemData.metadataHash}` // Assuming metadataHash is part of itemData

    // Estimate gas
    const gasEstimate = await contract.createToken.estimateGas(
      tokenURI,
      ethers.parseEther(itemData.price.toString()),
      itemData.category,
      itemData.condition,
      Math.floor(itemData.royaltyPercent * 100),
      itemData.meetingLocation,
      { value: listingPrice },
    )

    // Create NFT and list on marketplace
    const transaction = await contract.createToken(
      tokenURI,
      ethers.parseEther(itemData.price.toString()),
      itemData.category,
      itemData.condition,
      Math.floor(itemData.royaltyPercent * 100),
      itemData.meetingLocation,
      {
        value: listingPrice,
        gasLimit: (gasEstimate * 120n) / 100n, // Use BigInt for gasLimit calculation
      },
    )

    const receipt = await transaction.wait()
    return { transaction, receipt }
  } catch (error) {
    console.error("Error creating market item on server:", error)
    throw error
  }
}

// You can add other server-side specific functions here, e.g., for fetching data
export const fetchMarketItemsServer = async () => {
  try {
    const contract = new ethers.Contract(STUFIND_CONTRACT_ADDRESS, STUFIND_ABI, provider)
    const items = await contract.fetchMarketItems()

    return items.map((item) => ({
      tokenId: item[0].toString(),
      seller: item[1],
      owner: item[2],
      price: ethers.formatEther(item[3]),
      sold: item[4],
      category: item[5],
      condition: item[6],
      royaltyPercent: Number(item[7]) / 100,
      creator: item[8],
      createdAt: new Date(Number(item[9]) * 1000),
      isActive: item[10],
      university: item[11],
    }))
  } catch (error) {
    console.error("Error fetching market items on server:", error)
    throw error
  }
}
