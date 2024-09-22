'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { ethers } from 'ethers'
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { ExternalLink } from 'lucide-react'

export function EthereumLoginForm() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")
  const [balance, setBalance] = useState("")
  const [isCorrectNetwork, setIsCorrectNetwork] = useState(false)
  const [error, setError] = useState("")

  const SEPOLIA_CHAIN_ID = '0xaa36a7'

  useEffect(() => {
    if (isConnected) {
      checkNetwork()
      getBalance()
    }
  }, [isConnected])

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
  
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
  
        setWalletAddress(address)
        setIsConnected(true)
        setError("")
  
        console.log("Wallet connected:", address)
      } catch (error) {
        console.error("Failed to connect wallet:", error)
        setError("Failed to connect wallet. Please try again.")
      }
    } else {
      setError("Ethereum wallet is not installed. Please install MetaMask or another wallet.")
    }
  }

  const checkNetwork = async () => {
    if (typeof window.ethereum !== 'undefined') {
      const chainId = await window.ethereum.request({ method: 'eth_chainId' })
      if (chainId !== SEPOLIA_CHAIN_ID) {
        setIsCorrectNetwork(false)
      } else {
        setIsCorrectNetwork(true)
      }
    }
  }

  const switchToSepolia = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        await window.ethereum.request({
          method: 'wallet_switchEthereumChain',
          params: [{ chainId: SEPOLIA_CHAIN_ID }],
        })
        setIsCorrectNetwork(true)
        getBalance()
      } catch (error) {
        console.error("Failed to switch network:", error)
        setError("Failed to switch network. Please try again.")
      }
    }
  }

  const getBalance = async () => {
    if (typeof window.ethereum !== 'undefined' && isConnected) {
      const provider = new ethers.BrowserProvider(window.ethereum)
      const balance = await provider.getBalance(walletAddress)
      setBalance(ethers.formatEther(balance))
    }
  }

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Ethereum Login</CardTitle>
        <CardDescription>
          Connect your Ethereum wallet to access your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {!isConnected ? (
            <Button onClick={connectWallet} className="w-full">
              Connect Wallet
            </Button>
          ) : !isCorrectNetwork ? (
            <Button onClick={switchToSepolia} className="w-full">
              Switch to Sepolia Testnet
            </Button>
          ) : (
            <Link href="/dashboard">
              <Button className="w-full">
                Go to Dashboard
              </Button>
            </Link>
          )}
        </div>

        {error && (
          <Alert variant="destructive" className="mt-4">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isConnected && (
          <div className="mt-4 text-center">
            <p>Connected wallet: {walletAddress}</p>
            {isCorrectNetwork && (
              <p className="mt-2">
                Balance: {balance} ETH
                {parseFloat(balance) === 0 && (
                  <Link href="https://faucets.chain.link/" className="ml-2 text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
                    Get testnet ETH <ExternalLink className="inline-block w-4 h-4" />
                  </Link>
                )}
              </p>
            )}
          </div>
        )}

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an Ethereum wallet?{" "}
          <Link href="https://metamask.io/download/" className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">
            Install MetaMask <ExternalLink className="inline-block w-4 h-4" />
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}