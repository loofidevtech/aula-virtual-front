// components/dashboard/CourseCard.tsx
"use client"

import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { freemiumService } from "@/lib/freemium-service"
import { useEffect, useState } from "react"

interface CourseCardProps {
  id: string
  title: string
  subtitle: string
  gradient: string
  href?: string
}

export function CourseCard({ id, title, subtitle, gradient, href }: CourseCardProps) {
  const [isPremium, setIsPremium] = useState(false)

  useEffect(() => {
    setIsPremium(freemiumService.getEnrollmentStatus(id) === "premium")
  }, [id])

  const cardContent = (
    <div
      className={`group relative flex flex-col justify-end h-36 rounded-2xl bg-gradient-to-br ${gradient} p-4 overflow-hidden border border-white/10 cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:shadow-xl hover:shadow-black/30 hover:border-primary/40`}
    >
      {/* Subtle grid pattern overlay */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:18px_18px]" />

      {/* Premium Badge if upgraded */}
      {isPremium && (
        <span className="absolute top-3 left-3 bg-amber-500 text-slate-950 font-black text-[9px] uppercase px-2.5 py-0.5 rounded-lg border border-amber-400 shadow-md z-20 animate-pulse">
          Premium 🏆
        </span>
      )}

      {/* Hover arrow */}
      <span className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <ArrowRight className="h-4 w-4 text-white/80" />
      </span>

      <div className="relative z-10">
        <p className="text-white font-black text-lg leading-tight">{title}</p>
        <p className="text-white/70 text-xs font-medium leading-tight mt-0.5 line-clamp-2">
          {subtitle}
        </p>
      </div>
    </div>
  )

  if (href) {
    return <Link href={href}>{cardContent}</Link>
  }
  return cardContent
}
