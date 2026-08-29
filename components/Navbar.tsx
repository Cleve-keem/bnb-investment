import { useLogoutMutation } from "@/hooks/auth";
import type { DesktopNavbar, MobileNavbar } from "@/types/nav";
import { LogOutIcon, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function DesktopNavbar({
  sidebarOpen,
  navigation,
  pathname,
}: DesktopNavbar) {
  const { logout, isPending } = useLogoutMutation();

  function handleLogout() {
    logout();
  }

  return (
    <aside
      suppressHydrationWarning={true}
      className={`${
        sidebarOpen ? "w-64" : "w-20"
      } bg-[#09090B] border-r border-[#1E1E24] transition-all duration-300 ease-in-out p-5 flex flex-col justify-between hidden md:flex z-20`}
    >
      <div className="space-y-7">
        {/* Brand Logo Alignment */}
        <div className="flex items-center gap-3 h-10 px-2">
          <div className="relative w-6 h-6 shrink-0 transition-transform duration-300 hover:rotate-12">
            <Image
              src="/logo2.png"
              alt="BNB Logo"
              fill
              sizes="24px"
              className="object-contain"
              priority
            />
          </div>
          {sidebarOpen && (
            <span className="font-semibold tracking-tight text-base bg-linear-to-r from-white via-[#F4F4F5] to-gray-400 bg-clip-text text-transparent">
              <span className="text-[#dabc17] font-bold">BNB</span> Ledger
            </span>
          )}
        </div>

        {/* Navigation Options Router Matrix */}
        <nav className="space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group relative ${
                  isActive
                    ? "bg-[#18181B] text-white font-semibold shadow-sm border border-[#27272A]"
                    : "text-zinc-400 hover:text-zinc-100 hover:bg-[#09090B]"
                }`}
              >
                <Icon
                  className={`shrink-0 ${isActive ? "text-[#dabc17]" : "text-zinc-400 group-hover:text-zinc-200"}`}
                  size={18}
                />
                {sidebarOpen && <span className="truncate">{item.name}</span>}

                {/* Premium Micro-border Anchor Marker */}
                {isActive && (
                  <span className="absolute left-0 top-1/4 bottom-1/4 w-1 bg-[#dabc17] rounded-r-md" />
                )}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Global System Health Token */}
      {sidebarOpen && (
        <div>
          <button
            disabled={isPending}
            onClick={handleLogout}
            className="flex items-center gap-2 font-medium mb-4 text-[12px] text-red-500 cursor-pointer"
          >
            <LogOutIcon size={20} />
            <span> {isPending ? "Logging out..." : "Logout"}</span>
          </button>
          <div className="p-3.5 rounded-xl border border-[#1E1E24] bg-[#09090B]/50 backdrop-blur-sm">
            <p className="text-[10px] text-zinc-500 font-medium tracking-widest uppercase mb-1.5">
              Security Node
            </p>
            <div className="flex items-center gap-2">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span className="text-xs text-zinc-300 font-mono font-medium tracking-tight">
                Active Edge Tunneling
              </span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}

export function MobileNavbar({
  setMobileMenuOpen,
  navigation,
  pathname,
}: MobileNavbar) {
  const { logout, isPending } = useLogoutMutation();

  function handleLogout() {
    logout();
  }
  return (
    <div
      className="fixed inset-0 z-50 md:hidden bg-black/60 backdrop-blur-sm transition-opacity"
      onClick={() => setMobileMenuOpen(false)}
    >
      <aside
        className="w-72 bg-[#09090B] border-r border-[#1E1E24] h-full p-6 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between h-10">
            <div className="flex items-center gap-3">
              <Image src="/logo2.png" alt="Logo" width={24} height={24} />
              <span className="font-semibold text-lg text-white">
                <span className="text-[#dabc17]">BNB</span> Ledger
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="text-zinc-400 hover:text-white p-1"
            >
              <X size={20} />
            </button>
          </div>
          <nav className="space-y-1">
            {navigation.map((item) => {
              const isActive = pathname === item.href;
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? "bg-[#18181B] text-white border border-[#27272A]"
                      : "text-zinc-400 hover:bg-zinc-900"
                  }`}
                >
                  <Icon
                    className={isActive ? "text-[#dabc17]" : "text-zinc-400"}
                    size={18}
                  />
                  <span>item.name</span>
                </Link>
              );
            })}
            <button
              disabled={isPending}
              onClick={handleLogout}
              className="flex items-center gap-2 font-medium mb-4 text-[12px] text-red-500 cursor-pointer"
            >
              <LogOutIcon size={20} />
              <span> {isPending ? "Logging out..." : "Logout"}</span>
            </button>
          </nav>
        </div>
      </aside>
    </div>
  );
}
