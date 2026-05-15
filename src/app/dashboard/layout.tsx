// app/dashboard/layout.tsx
import { DashboardSidebar } from "@/components/dashboard/DashboardSidebar"
import { DashboardTopbar } from "@/components/dashboard/DashboardTopbar"
import type { ReactNode } from "react"

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      {/* Sidebar - hidden on mobile, shown on lg+ */}
      <div className="hidden lg:flex">
        <DashboardSidebar />
      </div>

      {/* Main content area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <DashboardTopbar userName="Andrés" />

        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
