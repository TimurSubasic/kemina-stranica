import Navbar from "@/components/navbar";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto my-5">{children}</div>
    </div>
  );
}
