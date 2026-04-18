"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export default function CreateNewPage() {
  const router = useRouter()

  useEffect(() => {
    router.push("/dashboard/edit")
  }, [router])

  return null
}

