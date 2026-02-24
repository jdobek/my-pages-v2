"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const chartData = [
  { month: "January", riskScore: 8.5 },
  { month: "February", riskScore: 8.2 },
  { month: "March", riskScore: 7.9 },
  { month: "April", riskScore: 7.5 },
  { month: "May", riskScore: 7.8 },
  { month: "June", riskScore: 7.4 },
  { month: "July", riskScore: 7.2 },
  { month: "August", riskScore: 7.0 },
  { month: "September", riskScore: 6.8 },
  { month: "October", riskScore: 6.9 },
  { month: "November", riskScore: 7.1 },
  { month: "December", riskScore: 7.0 },
]

const chartConfig = {
  riskScore: {
    label: "Risk Score",
    color: "#005055",
  },
} satisfies ChartConfig

export function ChartRiskScoreTrend() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Risk Score Trend</CardTitle>
        <CardDescription>January - December 2026</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[150px] max-h-[400px] w-full">
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="riskScore" fill="#005055" radius={8}>
              <LabelList position="top" offset={12} className="fill-muted-foreground" fontSize={12} />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
