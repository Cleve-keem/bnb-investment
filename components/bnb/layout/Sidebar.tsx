"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  BarChart3,
  Bell,
  BriefcaseBusiness,
  ChevronRight,
  CircleHelp,
  LayoutDashboard,
  LogOut,
  Settings,
  TrendingUp,
  User,
  Wallet,
  X,
} from "lucide-react";

type Props = {
  mobileOpen: boolean;
  onClose: () => void;
};

const mainNavigation = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Markets",
    href: "/markets",
    icon: BarChart3,
  },
//   {
//     label: "Trade",
//     href: "/trade",
//     icon: Activity,
//   },
  {
    label: "Portfolio",
    href: "/portfolio",
    icon: BriefcaseBusiness,
  },
];

const investNavigation = [
  {
    label: "Investments",
    href: "/investments",
    icon: Wallet,
  },
  // {
  //   label: "AI Signals",
  //   href: "/ai-signals",
  //   icon: TrendingUp,
  // },
];

const activityNavigation = [
  {
    label: "Transactions",
    href: "/transactions",
    icon: Activity,
  },
];

export default function Sidebar({ mobileOpen, onClose }: Props) {
  const pathname = usePathname();

  const navigation = (
    <>
      <div className="mb-8">
        <Link
          href="/dashboard"
          onClick={onClose}
          className="flex items-center gap-3"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#f0b90b] font-black text-black">
            B
          </div>

          <div>
            <p className="text-xl font-bold tracking-tight">BNB</p>
            <p className="text-[10px] uppercase tracking-[0.25em] text-zinc-500">
              Trading
            </p>
          </div>
        </Link>
      </div>

      <NavSection title="Overview" items={mainNavigation} onClose={onClose} />

      <NavSection title="Invest" items={investNavigation} onClose={onClose} />

      <NavSection
        title="Activity"
        items={activityNavigation}
        onClose={onClose}
      />

      <div className="mt-8">
        <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
          Account
        </p>

        <Link
          href="/profile"
          onClick={onClose}
          className={`mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
            pathname === "/profile"
              ? "bg-[#f0b90b]/10 text-[#f0b90b]"
              : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
          }`}
        >
          <User size={18} />
          Profile
        </Link>

        <Link
          href="/settings"
          onClick={onClose}
          className={`mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
            pathname === "/settings"
              ? "bg-[#f0b90b]/10 text-[#f0b90b]"
              : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
          }`}
        >
          <Settings size={18} />
          Settings
        </Link>

        <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-400 transition hover:bg-white/[0.04] hover:text-white">
          <CircleHelp size={18} />
          Help & Support
        </button>
      </div>
    </>
  );

  return (
    <>
      {mobileOpen && (
        <button
          aria-label="Close menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[260px] flex-col border-r border-white/[0.06] bg-[#0b1016] px-4 py-5 transition-transform duration-300 lg:translate-x-0 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <button
          onClick={onClose}
          className="absolute right-4 top-5 rounded-lg p-2 text-zinc-500 hover:bg-white/5 hover:text-white lg:hidden"
        >
          <X size={20} />
        </button>

        {navigation}

        <div className="mt-auto">
          <div className="mb-4 rounded-2xl border border-white/[0.06] bg-white/[0.025] p-3">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-zinc-800 text-sm font-semibold">
                E
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-medium">Elisa Eve</p>
                <p className="truncate text-xs text-zinc-500">Tier 3 account</p>
              </div>
            </div>
          </div>

          <button className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-zinc-500 hover:bg-red-500/10 hover:text-red-400">
            <LogOut size={18} />
            Sign out
          </button>
        </div>
      </aside>
    </>
  );
}

function NavSection({
  title,
  items,
  onClose,
}: {
  title: string;
  items: {
    label: string;
    href: string;
    icon: React.ElementType;
  }[];
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <div className="mb-7">
      <p className="mb-3 px-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-600">
        {title}
      </p>

      {items.map((item) => {
        const Icon = item.icon;
        const active = pathname === item.href;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onClose}
            className={`group mb-1 flex items-center gap-3 rounded-xl px-3 py-3 text-sm transition ${
              active
                ? "bg-[#f0b90b]/10 font-medium text-[#f0b90b]"
                : "text-zinc-400 hover:bg-white/[0.04] hover:text-white"
            }`}
          >
            <Icon size={18} />

            <span>{item.label}</span>

            {active && (
              <ChevronRight size={14} className="ml-auto opacity-70" />
            )}
          </Link>
        );
      })}
    </div>
  );
}
