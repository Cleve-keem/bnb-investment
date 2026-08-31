import { ArrowDownLeft, ArrowUpRight, Repeat2 } from "lucide-react";

type Props = {
  onDeposit: () => void;
  onWithdraw: () => void;
};

export default function QuickActions({ onDeposit, onWithdraw }: Props) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        onClick={onDeposit}
        className="flex items-center gap-2 rounded-xl bg-[#f0b90b] px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-[#ffc928]"
      >
        <ArrowDownLeft size={17} />
        Deposit
      </button>

      <button
        onClick={onWithdraw}
        className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/3 px-4 py-2.5 text-sm font-medium transition hover:bg-white/6"
      >
        <ArrowUpRight size={17} />
        Withdraw
      </button>

      {/* <a
        href="/trade"
        className="flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2.5 text-sm font-medium transition hover:bg-white/[0.06]"
      >
        <Repeat2 size={17} />
        Trade
      </a> */}
    </div>
  );
}
