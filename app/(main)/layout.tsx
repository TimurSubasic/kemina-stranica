import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "sonner";
import Navbar from "@/components/navbar";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const { data: claims, error: claimsError } = await supabase.auth.getClaims();

  if (!claims || claimsError) {
    redirect("/");
  }

  return (
    <SidebarProvider defaultOpen={false}>
      <SidebarInset>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Toaster />
      </SidebarInset>
      <AppSidebar side="right" />
    </SidebarProvider>
  );
}
