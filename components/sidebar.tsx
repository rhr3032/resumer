"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FileText, FilePlus } from "lucide-react"
import { cn } from "@/lib/utils"

export function Sidebar() {
  const pathname = usePathname()

  const items = [
    {
      title: "Create New CV",
      href: "/dashboard/create",
      icon: FilePlus,
    },
    {
      title: "Preview & Download",
      href: "/dashboard/preview",
      icon: FileText,
    },
  ]

  return (
    <div className="w-64 border-r border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-950">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-50">
          CV Generator
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Swiss CV Format
        </p>
      </div>

      <nav className="space-y-2">
        {items.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
                isActive
                  ? "bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900"
                  : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
              )}
            >
              <Icon className="h-5 w-5" />
              <span className="text-sm font-medium">{item.title}</span>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
