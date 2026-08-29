import { NavigationItem } from "@/types/nav";
import { Briefcase, History, LayoutDashboard } from "lucide-react";

export const navigation: NavigationItem[] = [
  {
    name: "Active Ledger Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Investment Portfolios",
    href: "/dashboard/investments",
    icon: Briefcase,
  },
  { name: "Audit Transactions", href: "/dashboard/ledger", icon: History },
];
