"use client"

import { CVProvider } from "@/lib/cv-context"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CVProvider>
      <div className="flex h-screen flex-col bg-white dark:bg-white">
        <div className="flex-1 overflow-auto">
          <div className="mx-auto max-w-7xl px-8 py-8">{children}</div>
        </div>
      </div>
    </CVProvider>
  )
}
