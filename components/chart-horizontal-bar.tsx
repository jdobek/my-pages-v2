"use client"

import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from "@/components/ui/chart"
import { Bar, BarChart, LabelList, XAxis, YAxis } from "recharts"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const chartData = [
  { category: "Risk Score 1-3", value: 8 },
  { category: "Risk Score 4-7", value: 12 },
  { category: "Risk Score 7-10", value: 4 },
]

const chartConfig = {
  value: {
    label: "Value",
    color: "#005055",
  },
} satisfies ChartConfig

export function ChartHorizontalBar() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vehicles by Risk Category</CardTitle>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig} className="min-h-[200px] max-h-[400px] w-full">
          <BarChart
            data={chartData}
            layout="vertical"
            margin={{ left: 0, right: 40 }}
          >
            <XAxis type="number" hide />
            <YAxis type="category" dataKey="category" hide />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="value" fill="#005055" radius={4}>
              <LabelList
                dataKey="category"
                position="insideLeft"
                className="fill-white"
                fontSize={12}
              />
              <LabelList
                dataKey="value"
                position="right"
                className="fill-foreground"
                fontSize={12}
              />
            </Bar>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
