'use client'

import { useState } from 'react'
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

export function EthereumLoginForm() {
  const [isConnected, setIsConnected] = useState(false)
  const [walletAddress, setWalletAddress] = useState("")

  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum)
        await provider.send("eth_requestAccounts", [])
  
        const signer = await provider.getSigner()
        const address = await signer.getAddress()
  
        setWalletAddress(address)
        setIsConnected(true)
  
        console.log("Wallet connected:", address)
      } catch (error) {
        console.error("Failed to connect wallet:", error)
      }
    } else {
      console.error("Ethereum wallet is not installed. Please install MetaMask or another wallet.")
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
          ) : (
            <Link href="/dashboard">
              <Button className="w-full">
                Go to Dashboard
              </Button>
            </Link>
          )}
        </div>

        {isConnected && (
          <div className="mt-4 text-center">
            <p>Connected wallet: {walletAddress}</p>
          </div>
        )}

        <div className="mt-4 text-center text-sm">
          Don&apos;t have an Ethereum wallet?{" "}
          <Link href="https://ethereum.org/en/wallets/" className="underline">
            Learn more
          </Link>
        </div>
      </CardContent>
    </Card>
  )
}