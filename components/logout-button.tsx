"use client";

import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useSidebar } from "./ui/sidebar";

export function LogoutButton() {
  const router = useRouter();
  const toggleSidebar = useSidebar().toggleSidebar;

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    toggleSidebar();
    router.push("/auth/login");
  };

  return (
    <Button onClick={logout} className="flex-1" variant={"destructive"}>
      Logout
    </Button>
  );
}
