"use client"

import { ProgressBar } from "@/components/progress-bar"
import { CVProvider } from "@/lib/cv-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CVProvider>
      <div className="flex h-screen flex-col bg-slate-50 dark:bg-slate-900">
        <ProgressBar />
        <div className="flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl px-8 py-8">{children}</div>
        </div>
      </div>
    </CVProvider>
  )
}
