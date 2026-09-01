"use client";

import { Bell, Menu, Search, ChevronDown } from "lucide-react";
import { useState } from "react";
import NotificationPanel from "../dashboard/NotificationPanel";

type Props = {
  onMenu: () => void;
};

export default function DashboardHeader({ onMenu }: Props) {
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  return (
    <header className="sticky top-0 z-30 border-b border-white/[0.06] bg-[#080c11]/90 backdrop-blur-xl">
      <div className="flex h-[72px] items-center gap-4 px-4 sm:px-6 lg:px-8">
        <button
          onClick={onMenu}
          className="rounded-xl border border-white/[0.07] p-2 text-zinc-400 hover:text-white lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="relative hidden w-full max-w-md sm:block">
          <Search
            size={17}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
          />

          <input
            placeholder="Search assets, markets..."
            className="h-10 w-full rounded-xl border border-white/[0.06] bg-white/[0.025] pl-11 pr-4 text-sm text-white outline-none placeholder:text-zinc-600 focus:border-[#f0b90b]/40"
          />
        </div>

        <div className="ml-auto flex items-center gap-2">
          <button
            onClick={() => setNotificationsOpen((current) => !current)}
            className="relative rounded-xl border border-white/[0.06] p-2.5 text-zinc-400 hover:text-white"
          >
            <Bell size={19} />

            <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#f0b90b]" />
          </button>

          <NotificationPanel
            open={notificationsOpen}
            onClose={() => setNotificationsOpen(false)}
          />

          <button className="flex items-center gap-2 rounded-xl border border-white/[0.06] bg-white/[0.02] p-1.5 pr-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f0b90b] text-sm font-bold text-black">
              E
            </div>

            <div className="hidden text-left sm:block">
              <p className="text-xs font-medium">Elisa Eve</p>
              <p className="text-[10px] text-zinc-500">Personal</p>
            </div>

            <ChevronDown size={14} className="hidden text-zinc-500 sm:block" />
          </button>
        </div>
      </div>
    </header>
  );
}
