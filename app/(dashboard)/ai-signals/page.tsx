import {
  BrainCircuit,
  ShieldCheck,
  TrendingDown,
  TrendingUp,
} from "lucide-react";
import DashboardShell from "@/components/bnb/layout/DashBoardShell";
import { aiSignals } from "@/libs/bnb/demo-data";

export default function AISignalsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#f0b90b]/10 text-[#f0b90b]">
              <BrainCircuit />
            </div>

            <div>
              <h1 className="text-3xl font-semibold">AI Signals</h1>
              <p className="mt-1 text-sm text-zinc-500">
                Market analysis and demo trading signals.
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-yellow-500/10 bg-yellow-500/5 p-4 text-xs leading-5 text-yellow-100/60">
          These are demo signals for the BNB interface. They are not financial
          advice or predictions from a live trading model.
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {aiSignals.map((signal) => {
            const buy = signal.signal === "BUY";
            const sell = signal.signal === "SELL";

            return (
              <div
                key={signal.symbol}
                className="rounded-2xl border border-white/[0.06] bg-[#0d131a] p-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-lg font-semibold">{signal.symbol}</p>

                    <p className="mt-1 text-xs text-zinc-600">
                      Updated recently
                    </p>
                  </div>

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      buy
                        ? "bg-emerald-500/10 text-emerald-400"
                        : sell
                          ? "bg-red-500/10 text-red-400"
                          : "bg-yellow-500/10 text-yellow-400"
                    }`}
                  >
                    {buy ? (
                      <TrendingUp size={20} />
                    ) : sell ? (
                      <TrendingDown size={20} />
                    ) : (
                      <ShieldCheck size={20} />
                    )}
                  </div>
                </div>

                <div className="mt-6 flex items-end justify-between">
                  <div>
                    <p className="text-xs text-zinc-600">Signal</p>

                    <p
                      className={`mt-1 text-2xl font-bold ${
                        buy
                          ? "text-emerald-400"
                          : sell
                            ? "text-red-400"
                            : "text-yellow-400"
                      }`}
                    >
                      {signal.signal}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-xs text-zinc-600">Confidence</p>
                    <p className="mt-1 text-2xl font-semibold">
                      {signal.confidence}%
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex justify-between text-[11px]">
                    <span className="text-zinc-600">Confidence level</span>

                    <span>{signal.confidence}%</span>
                  </div>

                  <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
                    <div
                      className="h-full rounded-full bg-[#f0b90b]"
                      style={{
                        width: `${signal.confidence}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-5 grid grid-cols-2 gap-3">
                  <div className="rounded-xl bg-white/[0.025] p-3">
                    <p className="text-[10px] text-zinc-600">Trend</p>
                    <p className="mt-1 text-sm">{signal.trend}</p>
                  </div>

                  <div className="rounded-xl bg-white/[0.025] p-3">
                    <p className="text-[10px] text-zinc-600">Momentum</p>
                    <p className="mt-1 text-sm">{signal.momentum}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </DashboardShell>
  );
}
