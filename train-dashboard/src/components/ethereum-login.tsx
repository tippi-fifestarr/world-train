'use client'

import { useState } from 'react'
import Link from "next/link"
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

  const connectWallet = async () => {
    // This is a placeholder for the actual wallet connection logic
    // You would typically use a library like ethers.js or web3.js here
    console.log("Connecting wallet...")
    // Simulating a connection after 1 second
    setTimeout(() => {
      setIsConnected(true)
    }, 1000)
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