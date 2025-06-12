import { NextResponse } from "next/server"
import { createNFTMetadata, uploadToIPFS } from "@/lib/stufind-web3" // Re-use IPFS functions
import { createMarketItemServer } from "@/lib/server-web3" // Import server-side web3 functions

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const imageFile = formData.get("image") as File
    const itemData = JSON.parse(formData.get("itemData") as string)

    if (!imageFile || !itemData) {
      return NextResponse.json({ error: "Missing image file or item data" }, { status: 400 })
    }

    // Upload image to IPFS (can be done on server or client, here we assume server)
    const imageHash = await uploadToIPFS(imageFile)

    // Create and upload metadata to IPFS
    const metadataHash = await createNFTMetadata(
      {
        ...itemData,
        seller: itemData.sellerAddress, // Ensure seller address is passed
      },
      imageHash,
    )

    // Get the server's private key from environment variables
    const privateKey = process.env.ETHEREUM_PRIVATE_KEY // You MUST set this env variable
    if (!privateKey) {
      throw new Error("ETHEREUM_PRIVATE_KEY environment variable is not set for server-side minting.")
    }

    // Use the server-side function to create the market item
    const { transaction, receipt } = await createMarketItemServer(
      { ...itemData, metadataHash }, // Pass metadataHash to server function
      imageHash,
      privateKey,
    )

    return NextResponse.json({
      message: "NFT minted and listed successfully!",
      transactionHash: transaction.hash,
      receipt,
    })
  } catch (error) {
    console.error("NFT Minting API Error:", error)
    return NextResponse.json({ error: "Failed to mint NFT", details: error.message }, { status: 500 })
  }
}
