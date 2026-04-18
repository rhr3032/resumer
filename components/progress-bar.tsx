"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, FilePlus } from "lucide-react"
import { cn } from "@/lib/utils"

export function ProgressBar() {
  const pathname = usePathname()

  const steps = [
    {
      id: 1,
      title: "Create New CV",
      href: "/dashboard/create",
      icon: FilePlus,
    },
    {
      id: 2,
      title: "Preview & Download",
      href: "/dashboard/preview",
      icon: FileText,
    },
  ]

  return (
    <div className="border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-full px-8">
        <div className="flex items-center justify-between py-4">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
            CV Generator
          </h1>
          <nav className="flex gap-8">
            {steps.map((step) => {
              const Icon = step.icon
              const isActive = pathname === step.href

              return (
                <Link
                  key={step.href}
                  href={step.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors border-b-2",
                    isActive
                      ? "border-blue-600 text-blue-600 dark:text-blue-400"
                      : "border-transparent text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-50"
                  )}
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-sm font-medium">{step.title}</span>
                </Link>
              )
            })}
          </nav>
        </div>
      </div>
    </div>
  )
}
