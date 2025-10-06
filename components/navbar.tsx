import React from "react";
import Link from "next/link";
import { AuthButton } from "./auth-button";

export default function Navbar() {
  return (
    <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
      <div className="w-full max-w-6xl flex justify-between items-center py-3 px-5 text-sm">
        <Link className="font-semibold" href={"/"}>
          Train with Kema
        </Link>
        <AuthButton />
      </div>
    </nav>
  );
}
