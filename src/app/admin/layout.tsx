// app/admin/layout.tsx
"use client"

import { usePathname } from "next/navigation"
import { AdminSidebar } from "@/components/admin/AdminSidebar"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === "/admin/login"

  // Do not render the admin panel layout (sidebar) on the login screen
  if (isLoginPage) {
    return <>{children}</>
  }

  return (
    <div className="flex h-screen bg-background overflow-hidden text-foreground animate-in fade-in duration-300">
      {/* Fixed Sidebar */}
      <AdminSidebar />
      
      {/* Header and Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden ml-[260px]">
        {/* Fixed Admin Topbar */}
        <header className="sticky top-0 z-30 flex h-20 w-full items-center justify-between border-b border-border/40 bg-card/85 px-8 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-2 text-sm font-bold text-muted-foreground">
            <span>Panel de Control</span>
            <span>/</span>
            <span className="text-primary uppercase tracking-widest text-xs">Administración</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black bg-primary/10 border border-primary/20 text-primary px-3.5 py-1.5 rounded-full uppercase tracking-wider animate-pulse">
              Modo Admin
            </span>
          </div>
        </header>
        
        {/* Scrollable Content Area */}
        <main className="flex-1 overflow-y-auto p-8 bg-background">
          {children}
        </main>
      </div>
    </div>
  )
}
