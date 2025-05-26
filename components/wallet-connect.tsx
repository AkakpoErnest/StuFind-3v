"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Wallet, ExternalLink, Copy, CheckCircle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"

declare global {
  interface Window {
    ethereum?: any
  }
}

interface WalletState {
  address: string | null
  balance: string | null
  chainId: number | null
  isConnected: boolean
  isLoading: boolean
}

export function WalletConnect() {
  const [wallet, setWallet] = useState<WalletState>({
    address: null,
    balance: null,
    chainId: null,
    isConnected: false,
    isLoading: false,
  })
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    checkConnection()
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", handleAccountsChanged)
      window.ethereum.on("chainChanged", handleChainChanged)
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener("accountsChanged", handleAccountsChanged)
        window.ethereum.removeListener("chainChanged", handleChainChanged)
      }
    }
  }, [])

  const checkConnection = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: "eth_accounts" })
        if (accounts.length > 0) {
          await updateWalletState(accounts[0])
        }
      } catch (error) {
        console.error("Error checking connection:", error)
      }
    }
  }

  const updateWalletState = async (address: string) => {
    try {
      const balance = await window.ethereum.request({
        method: "eth_getBalance",
        params: [address, "latest"],
      })
      const chainId = await window.ethereum.request({ method: "eth_chainId" })

      // Convert balance from wei to ETH
      const balanceInEth = (Number.parseInt(balance, 16) / Math.pow(10, 18)).toFixed(4)

      setWallet({
        address,
        balance: balanceInEth,
        chainId: Number.parseInt(chainId, 16),
        isConnected: true,
        isLoading: false,
      })
    } catch (error) {
      console.error("Error updating wallet state:", error)
    }
  }

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!")
      return
    }

    setWallet((prev) => ({ ...prev, isLoading: true }))

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      })

      if (accounts.length > 0) {
        await updateWalletState(accounts[0])
      }
    } catch (error) {
      console.error("Error connecting wallet:", error)
      setWallet((prev) => ({ ...prev, isLoading: false }))
    }
  }

  const disconnectWallet = () => {
    setWallet({
      address: null,
      balance: null,
      chainId: null,
      isConnected: false,
      isLoading: false,
    })
  }

  const handleAccountsChanged = (accounts: string[]) => {
    if (accounts.length === 0) {
      disconnectWallet()
    } else {
      updateWalletState(accounts[0])
    }
  }

  const handleChainChanged = () => {
    window.location.reload()
  }

  const copyAddress = () => {
    if (wallet.address) {
      navigator.clipboard.writeText(wallet.address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`
  }

  const getNetworkName = (chainId: number) => {
    switch (chainId) {
      case 1:
        return "Ethereum Mainnet"
      case 11155111:
        return "Sepolia Testnet"
      case 5:
        return "Goerli Testnet"
      default:
        return `Chain ID: ${chainId}`
    }
  }

  const isEthereumNetwork = (chainId: number) => {
    return [1, 11155111, 5].includes(chainId)
  }

  if (!wallet.isConnected) {
    return (
      <div className="space-y-4">
        <Button onClick={connectWallet} disabled={wallet.isLoading} className="flex items-center gap-2" size="lg">
          <Wallet className="h-5 w-5" />
          {wallet.isLoading ? "Connecting..." : "Connect StuFind Wallet"}
        </Button>

        {!window.ethereum && (
          <Alert>
            <AlertDescription>
              Please install{" "}
              <a
                href="https://metamask.io"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                MetaMask
              </a>{" "}
              to use your StuFind Wallet.
            </AlertDescription>
          </Alert>
        )}
      </div>
    )
  }

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wallet className="h-5 w-5" />
          StuFind Wallet Connected
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Address:</span>
            <div className="flex items-center gap-2">
              <span className="font-mono text-sm">{formatAddress(wallet.address!)}</span>
              <Button variant="ghost" size="sm" onClick={copyAddress}>
                {copied ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Balance:</span>
            <span className="font-semibold">{wallet.balance} ETH</span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Network:</span>
            <Badge variant={isEthereumNetwork(wallet.chainId!) ? "default" : "destructive"}>
              {getNetworkName(wallet.chainId!)}
            </Badge>
          </div>
        </div>

        {!isEthereumNetwork(wallet.chainId!) && (
          <Alert>
            <AlertDescription>
              Please switch to Ethereum Mainnet or a supported testnet to use Stufind.
            </AlertDescription>
          </Alert>
        )}

        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="flex-1" onClick={disconnectWallet}>
            Disconnect
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => window.open(`https://etherscan.io/address/${wallet.address}`, "_blank")}
          >
            <ExternalLink className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
