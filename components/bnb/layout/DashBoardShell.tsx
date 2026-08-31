"use client";

import { ReactNode, useState } from "react";
import Sidebar from "./Sidebar";
import DashboardHeader from "./DashboardHeader";

type Props = {
  children: ReactNode;
};

export default function DashboardShell({ children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[#080c11] text-white">
      <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      <div className="lg:pl-65">
        <DashboardHeader onMenu={() => setMobileOpen(true)} />

        <main className="px-4 pb-10 pt-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-400">{children}</div>
        </main>
      </div>
    </div>
  );
}
