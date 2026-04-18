"use client"

import { Sidebar } from "@/components/sidebar"
import { CVProvider } from "@/lib/cv-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CVProvider>
      <div className="flex h-screen bg-slate-50 dark:bg-slate-900">
        <Sidebar />
        <div className="flex-1 overflow-auto">
          <div className="p-8">{children}</div>
        </div>
      </div>
    </CVProvider>
  )
}
