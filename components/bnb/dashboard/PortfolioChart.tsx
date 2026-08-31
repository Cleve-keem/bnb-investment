"use client";

import { portfolioData } from "@/libs/bnb/demo-data";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export default function PortfolioChart() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0d131a] p-5">
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm font-medium text-white">
            Portfolio Performance
          </p>

          <p className="mt-1 text-xs text-zinc-500">
            Growth of your portfolio over time
          </p>
        </div>

        <div className="flex gap-1 rounded-lg bg-white/[0.03] p-1">
          {["1D", "1W", "1M", "3M", "6M", "1Y"].map((range, index) => (
            <button
              key={range}
              className={`rounded-md px-3 py-1.5 text-[11px] font-medium ${
                index === 2
                  ? "bg-[#f0b90b] text-black"
                  : "text-zinc-500 hover:text-white"
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      <div className="h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={portfolioData}>
            <defs>
              <linearGradient id="portfolioFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f0b90b" stopOpacity={0.2} />

                <stop offset="100%" stopColor="#f0b90b" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis
              dataKey="date"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#52525b", fontSize: 10 }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#52525b", fontSize: 10 }}
              tickFormatter={(value) => `$${value / 1000}k`}
              width={45}
            />

            <Tooltip
              contentStyle={{
                background: "#111820",
                border: "1px solid rgba(255,255,255,.08)",
                borderRadius: "12px",
                color: "#fff",
              }}
              formatter={(value) => [
                `$${Number(value).toLocaleString()}`,
                "Portfolio",
              ]}
            />

            <Area
              type="monotone"
              dataKey="value"
              stroke="#f0b90b"
              strokeWidth={2}
              fill="url(#portfolioFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
