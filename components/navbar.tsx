import React from "react";
import Link from "next/link";
import { AuthButton } from "./auth-button";
import { ThemeSwitcher } from "./theme-switcher";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-6xl flex justify-between items-center py-3 text-sm">
        <div className="flex gap-5 items-center font-semibold">
          <Link href={"/"}>Train with Kema</Link>
          <div className="flex items-center gap-2"></div>
        </div>
        <div className="flex gap-5 items-center font-semibold">
          <AuthButton />
          <ThemeSwitcher />
        </div>
      </div>
    </nav>
  );
}
