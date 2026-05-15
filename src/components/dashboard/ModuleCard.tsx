// components/dashboard/ModuleCard.tsx
import Link from "next/link"
import {
  Triangle,
  Hash,
  Share2,
  Brain,
  Superscript,
  Circle,
  Calculator,
  Trophy,
  type LucideIcon,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import type { CourseModule, Badge } from "@/lib/data/courses"

const iconMap: Record<string, LucideIcon> = {
  Triangle,
  Hash,
  Share2,
  Brain,
  Superscript,
  Circle,
  Calculator,
  Trophy,
}

const badgeColors: Record<Badge, string> = {
  Teoría: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  Problemas: "bg-primary/20 text-primary border-primary/30",
  Simulacros: "bg-violet-500/20 text-violet-300 border-violet-500/30",
  "Mini simulacro": "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
}

interface ModuleCardProps {
  module: CourseModule
  href: string
}

export function ModuleCard({ module, href }: ModuleCardProps) {
  const Icon = iconMap[module.icon] ?? Calculator

  return (
    <div className="group flex flex-col bg-card border border-border/50 rounded-3xl p-6 hover:border-primary/50 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 h-full">
      {/* Number badge */}
      <div className="flex items-start justify-between mb-4">
        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-white font-black text-sm shrink-0">
          {module.number}
        </span>
      </div>

      {/* Icon */}
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-accent/10 border border-accent/20 mb-4 mx-auto group-hover:bg-accent/20 transition-colors">
        <Icon className="h-8 w-8 text-accent" />
      </div>

      {/* Content */}
      <div className="flex-1 text-center space-y-2 mb-4">
        <h3 className="text-foreground font-black text-base leading-tight">{module.title}</h3>
        <p className="text-muted-foreground text-sm leading-relaxed">{module.description}</p>
      </div>

      {/* Badges */}
      <div className="flex flex-wrap justify-center gap-1.5 mb-3">
        {module.badges.map((badge) => (
          <span
            key={badge}
            className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${badgeColors[badge]}`}
          >
            {badge}
          </span>
        ))}
      </div>

      {/* Estimated time */}
      <p className="text-center text-muted-foreground text-xs mb-4">⏱ {module.estimatedHours}</p>

      {/* CTA */}
      <Link href={href}>
        <Button className="w-full rounded-2xl bg-primary text-white font-black hover:bg-primary/90 hover:shadow-lg hover:shadow-primary/25 active:scale-95 transition-all">
          Ingresar →
        </Button>
      </Link>
    </div>
  )
}
