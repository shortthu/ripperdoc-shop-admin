import { useState } from "react";

import { Outlet } from "react-router";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@radix-ui/react-separator";
import { ModeToggle } from "@/components/mode-toggle";

export default function DashboardLayout() {
  const [title, setTitle] = useState("Ripperdoc Clinic");

  const handleTitleChange = (newTitle: string) => {
    setTitle(newTitle);
  };

  return (
    <SidebarProvider>
      <AppSidebar sendTitle={handleTitleChange} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4 justify-between">
          <div className="flex items-center h-full">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <h1 className="font-bold">{title}</h1>
          </div>

          <div>
            <ModeToggle />
          </div>
        </header>
        <main className="p-4">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
