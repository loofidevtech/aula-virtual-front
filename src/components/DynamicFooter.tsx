// src/components/DynamicFooter.tsx
"use client"

import { usePathname } from "next/navigation"
import { Footer } from "./footer"

export function DynamicFooter() {
  const pathname = usePathname()

  // Hide the public footer on student dashboard and admin panel routes
  const shouldHide = pathname.startsWith("/dashboard") || pathname.startsWith("/admin")

  if (shouldHide) return null

  return <Footer />
}
