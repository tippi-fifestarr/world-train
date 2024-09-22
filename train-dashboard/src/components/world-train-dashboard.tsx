"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// Simulated data - replace with actual data from your smart contract in a real application
const passengerData = [
  { date: '2023-01', total: 120, vip: 20, regular: 100 },
  { date: '2023-02', total: 150, vip: 30, regular: 120 },
  { date: '2023-03', total: 200, vip: 40, regular: 160 },
  { date: '2023-04', total: 180, vip: 35, regular: 145 },
  { date: '2023-05', total: 220, vip: 50, regular: 170 },
]

const cabinCheckIns = [
  { name: 'VIP Cabin', value: 15 },
  { name: 'Regular Cabin', value: 45 },
]

const COLORS = ['#0088FE', '#00C49F']

export function WorldTrainDashboardComponent() {
  const [lastHourCheckIns, setLastHourCheckIns] = useState(0)

  useEffect(() => {
    // Simulating real-time updates
    const interval = setInterval(() => {
      setLastHourCheckIns(Math.floor(Math.random() * 20))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="p-8 space-y-8">
      <h1 className="text-3xl font-bold">World Train Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <Card>
          <CardHeader>
            <CardTitle>Passenger Trends</CardTitle>
            <CardDescription>Total, VIP, and Regular passengers over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={passengerData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#8884d8" />
                <Line type="monotone" dataKey="vip" stroke="#82ca9d" />
                <Line type="monotone" dataKey="regular" stroke="#ffc658" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Passenger Distribution</CardTitle>
            <CardDescription>VIP vs Regular passengers</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={cabinCheckIns}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {cabinCheckIns.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Cabin check-ins in the last hour</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold">{lastHourCheckIns}</div>
          <p className="text-sm text-muted-foreground">Passengers checked in</p>
        </CardContent>
      </Card>
    </div>
  )
}