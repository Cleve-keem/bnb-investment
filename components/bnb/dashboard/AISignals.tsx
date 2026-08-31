import Link from "next/link";
import { BrainCircuit, ChevronRight } from "lucide-react";
import { aiSignals } from "@/libs/bnb/demo-data";

export default function AISignals() {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0d131a] p-5">
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#f0b90b]/10 text-[#f0b90b]">
            <BrainCircuit size={18} />
          </div>

          <div>
            <p className="text-sm font-medium">AI Trading Signals</p>
            <p className="text-[11px] text-zinc-500">Market analysis</p>
          </div>
        </div>

        <Link
          href="/ai-signals"
          className="flex items-center gap-1 text-xs text-[#f0b90b]"
        >
          View all
          <ChevronRight size={13} />
        </Link>
      </div>

      <div className="space-y-3">
        {aiSignals.slice(0, 4).map((signal) => {
          const isBuy = signal.signal === "BUY";
          const isSell = signal.signal === "SELL";

          return (
            <div
              key={signal.symbol}
              className="flex items-center rounded-xl border border-white/[0.05] bg-white/[0.02] p-3"
            >
              <div>
                <p className="text-sm font-medium">{signal.symbol}</p>

                <p className="mt-1 text-[10px] text-zinc-600">
                  {signal.trend} · {signal.momentum}
                </p>
              </div>

              <div className="ml-auto flex items-center gap-4">
                <div className="text-right">
                  <p className="text-[10px] text-zinc-600">Confidence</p>
                  <p className="text-xs">{signal.confidence}%</p>
                </div>

                <span
                  className={`rounded-lg px-2.5 py-1 text-[10px] font-bold ${
                    isBuy
                      ? "bg-emerald-500/10 text-emerald-400"
                      : isSell
                        ? "bg-red-500/10 text-red-400"
                        : "bg-yellow-500/10 text-yellow-400"
                  }`}
                >
                  {signal.signal}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
