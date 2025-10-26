import React from "react";
import { ThemeToggle } from "./ThemeToggle";

interface NavbarProps {
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
  onMenuClick?: () => void;
  currentUser?: { email: string; role: string };
  onLogout?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  theme,
  setTheme,
  onMenuClick,
  currentUser,
  onLogout,
}) => {
  return (
    <nav className="flex items-center justify-between px-4 py-2 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
          aria-label="Toggle sidebar"
        >
          ☰
        </button>
        <h1 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
          ERP System
        </h1>
      </div>

      <div className="flex items-center gap-4">
        <ThemeToggle theme={theme} setTheme={setTheme} />

        {currentUser && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-700 dark:text-gray-300">
              {currentUser.email}
            </span>
            <button
              onClick={onLogout}
              className="text-sm px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};
