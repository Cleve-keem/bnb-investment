import { Dispatch, SetStateAction } from "react";

export type DashboardHeaderType = {
  setSidebarOpen: Dispatch<SetStateAction<boolean>>;
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
  sidebarOpen: boolean;
};
