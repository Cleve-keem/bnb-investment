"use client";

import DashboardShell from "@/components/bnb/layout/DashBoardShell";
import { useState } from "react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [tradingAlerts, setTradingAlerts] = useState(true);
  const [marketAlerts, setMarketAlerts] = useState(false);

  return (
    <DashboardShell>
      <div className="mx-auto max-w-4xl space-y-6">
        <div>
          <h1 className="text-3xl font-semibold">Settings</h1>
          <p className="mt-2 text-sm text-zinc-500">
            Customize your BNB experience.
          </p>
        </div>

        <section className="rounded-2xl border border-white/[0.06] bg-[#0d131a]">
          <div className="border-b border-white/[0.06] p-5">
            <h2 className="font-medium">Preferences</h2>
          </div>

          <SettingRow
            title="Currency"
            description="Default currency displayed across BNB."
          >
            <select className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm outline-none">
              <option className="bg-[#10161e]">USD</option>
              <option className="bg-[#10161e]">EUR</option>
              <option className="bg-[#10161e]">NGN</option>
            </select>
          </SettingRow>

          <SettingRow title="Appearance" description="Choose how BNB looks.">
            <select className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-sm outline-none">
              <option className="bg-[#10161e]">Dark</option>
              <option className="bg-[#10161e]">System</option>
            </select>
          </SettingRow>
        </section>

        <section className="rounded-2xl border border-white/[0.06] bg-[#0d131a]">
          <div className="border-b border-white/[0.06] p-5">
            <h2 className="font-medium">Notifications</h2>
          </div>

          <SettingRow
            title="Account notifications"
            description="Deposits, withdrawals and account updates."
          >
            <Toggle
              enabled={notifications}
              onClick={() => setNotifications(!notifications)}
            />
          </SettingRow>

          <SettingRow
            title="Trading alerts"
            description="Receive updates about trade activity."
          >
            <Toggle
              enabled={tradingAlerts}
              onClick={() => setTradingAlerts(!tradingAlerts)}
            />
          </SettingRow>

          <SettingRow
            title="Market alerts"
            description="Receive selected market movement alerts."
          >
            <Toggle
              enabled={marketAlerts}
              onClick={() => setMarketAlerts(!marketAlerts)}
            />
          </SettingRow>
        </section>
      </div>
    </DashboardShell>
  );
}

function SettingRow({
  title,
  description,
  children,
}: {
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between gap-6 border-b border-white/[0.04] p-5 last:border-0">
      <div>
        <p className="text-sm font-medium">{title}</p>
        <p className="mt-1 text-xs text-zinc-600">{description}</p>
      </div>

      {children}
    </div>
  );
}

function Toggle({
  enabled,
  onClick,
}: {
  enabled: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`relative h-6 w-11 rounded-full transition ${
        enabled ? "bg-[#f0b90b]" : "bg-zinc-700"
      }`}
    >
      <span
        className={`absolute top-1 h-4 w-4 rounded-full bg-white transition ${
          enabled ? "left-6" : "left-1"
        }`}
      />
    </button>
  );
}
