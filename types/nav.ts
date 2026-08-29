import { Dispatch, SetStateAction } from "react";

export interface NavigationItem {
  name: string;
  href: string;
  icon: React.ComponentType<{ className?: string; size?: number }>;
}

export interface DesktopNavbar {
  sidebarOpen: boolean;
  navigation: NavigationItem[];
  pathname: string;
}

export type MobileNavbar = {
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
  navigation: NavigationItem[];
  pathname: string;
};
