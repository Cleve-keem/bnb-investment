import { DashboardHeaderType } from "@/types/dashboard";
import { Menu, User } from "lucide-react";

export default function Header({
  setSidebarOpen,
  setMobileMenuOpen,
  sidebarOpen,
}: DashboardHeaderType) {
  return (
    <header className="h-16 border-b border-[#1E1E24] px-4 sm:px-8 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md bg-black/80">
      <div className="flex items-center gap-4">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-zinc-900 hidden md:block transition-all"
          aria-label="Toggle Navigation Panel"
        >
          <Menu size={18} />
        </button>
        <button
          onClick={() => setMobileMenuOpen(true)}
          className="text-zinc-400 hover:text-white p-2 rounded-lg hover:bg-zinc-900 md:hidden transition-all"
          aria-label="Open Navigation Mobile Menu"
        >
          <Menu size={20} />
        </button>
        <div className="h-4 w-px bg-zinc-800 hidden md:block" />
        <h1 className="text-sm font-semibold text-zinc-200 tracking-tight hidden sm:block">
          Control Center Workspace
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-xs font-semibold text-zinc-100 font-sans tracking-tight">
            Institutional Account
          </p>
          <p className="text-[10px] text-[#dabc17] font-mono tracking-wider uppercase font-medium">
            Node Verified
          </p>
        </div>
        <div className="w-9 h-9 rounded-full bg-linear-to-b from-[#1E1E24] to-[#09090B] border border-[#27272A] flex items-center justify-center text-zinc-300 hover:text-white hover:border-zinc-600 transition-all cursor-pointer shadow-inner">
          <User size={16} />
        </div>
      </div>
    </header>
  );
}
