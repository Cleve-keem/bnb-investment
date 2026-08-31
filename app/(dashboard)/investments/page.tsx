import DashboardShell from "@/components/bnb/layout/DashBoardShell";
import { investments } from "@/libs/bnb/demo-data";

export default function InvestmentsPage() {
  return (
    <DashboardShell>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Investments</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Monitor your active and completed investments.
          </p>
        </div>

        {/* <div className="grid gap-4 sm:grid-cols-3">
          <Metric title="Invested" value="$240,000" />
          <Metric title="Current Value" value="$261,840" />
          <Metric title="Total Return" value="+$21,840" />
        </div> */}

        <div className="grid gap-5 lg:grid-cols-2">
          {investments.map((investment) => (
            <div
              key={investment.name}
              className="rounded-2xl border border-white/6 bg-[#0d131a] p-5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium">{investment.name}</p>
                  <p className="mt-1 text-xs text-zinc-600">
                    Maturity in {investment.maturity}
                  </p>
                </div>

                <span className="rounded-lg bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold text-emerald-400">
                  {investment.status}
                </span>
              </div>

              <div className="mt-7 grid grid-cols-3 gap-3">
                <MetricSmall
                  title="Invested"
                  value={`$${investment.invested.toLocaleString()}`}
                />

                <MetricSmall
                  title="Value"
                  value={`$${investment.currentValue.toLocaleString()}`}
                />

                <MetricSmall
                  title="Return"
                  value={`+$${investment.return.toLocaleString()}`}
                />
              </div>

              <div className="mt-6">
                <div className="mb-2 flex justify-between text-xs">
                  <span className="text-zinc-600">Progress</span>
                  <span>{investment.progress}%</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-white/[0.05]">
                  <div
                    className="h-full rounded-full bg-[#f0b90b]"
                    style={{ width: `${investment.progress}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardShell>
  );
}

function Metric({ title, value }: { title: string; value: string }) {
  return (
    <div className="rounded-2xl border border-white/[0.06] bg-[#0d131a] p-5">
      <p className="text-xs text-zinc-500">{title}</p>
      <p className="mt-3 text-2xl font-semibold">{value}</p>
    </div>
  );
}

function MetricSmall({ title, value }: { title: string; value: string }) {
  return (
    <div>
      <p className="text-[10px] text-zinc-600">{title}</p>
      <p className="mt-1 text-sm font-medium">{value}</p>
    </div>
  );
}
