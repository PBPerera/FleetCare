import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import AppSidebar from "@/components/AppSidebar";

function DashboardLayout({ children }) {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />

        <main className="flex-1 bg-background">
          {/* Top header */}
          <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white/60 backdrop-blur px-6">
            <SidebarTrigger className="text-foreground" />
            <div className="flex-1" />
            {/* right-side actions can go here */}
          </header>

          <div className="p-6">{children}</div>
        </main>
      </div>
    </SidebarProvider>
  );
}

export default DashboardLayout;
export { DashboardLayout };
