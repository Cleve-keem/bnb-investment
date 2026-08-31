import Link from "next/link";
import { ArrowDownLeft, ArrowUpRight, ChevronRight } from "lucide-react";
import { transactions } from "@/libs/bnb/demo-data";

export default function RecentTransactions() {
  return (
    <div className="rounded-2xl border border-white/6 bg-[#0d131a] p-5">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-sm font-medium">Recent Transactions</p>
          <p className="mt-1 text-xs text-zinc-500">Latest account activity</p>
        </div>

        <Link
          href="/transactions"
          className="flex items-center gap-1 text-xs text-[#f0b90b]"
        >
          View all
          <ChevronRight size={13} />
        </Link>
      </div>

      <div className="space-y-3">
        {transactions.map((transaction) => {
          const positive = transaction.amount > 0;

          return (
            <div
              key={transaction.id}
              className="flex items-center gap-3 rounded-xl border border-white/[0.05] bg-white/[0.015] p-3"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.04]">
                {positive ? (
                  <ArrowDownLeft size={16} className="text-emerald-400" />
                ) : (
                  <ArrowUpRight size={16} className="text-zinc-400" />
                )}
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium">
                  {transaction.description}
                </p>

                <p className="mt-1 text-[10px] text-zinc-600">
                  {transaction.date}
                </p>
              </div>

              <div className="ml-auto text-right">
                <p
                  className={`text-sm font-medium ${
                    positive ? "text-emerald-400" : "text-white"
                  }`}
                >
                  {positive ? "+" : "-"}$
                  {Math.abs(transaction.amount).toLocaleString()}
                </p>

                <span className="text-[10px] text-zinc-600">
                  {transaction.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
