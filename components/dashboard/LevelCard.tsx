// components/dashboard/LevelCard.tsx
import Link from "next/link"
import { GraduationCap, ChevronRight } from "lucide-react"
import type { Level } from "@/lib/data/courses"

interface LevelCardProps {
  level: Level
  href: string
}

export function LevelCard({ level, href }: LevelCardProps) {
  return (
    <Link href={href}>
      <div className="group flex items-center justify-between gap-3 bg-muted border border-border/50 rounded-2xl px-4 py-3 hover:border-primary/50 hover:bg-secondary/30 transition-all duration-300 cursor-pointer">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 shrink-0">
            <GraduationCap className="h-4 w-4 text-accent" />
          </div>
          <div>
            <p className="text-foreground font-bold text-sm leading-tight">{level.title}</p>
            <p className="text-muted-foreground text-xs mt-0.5">{level.subtitle}</p>
            <div className="flex gap-1.5 mt-1.5">
              {["Teoría", "Problemas", "Simulacros"].map((tag) => (
                <span
                  key={tag}
                  className="text-[10px] text-accent/80 font-semibold"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        <button className="flex items-center gap-1 shrink-0 px-3 py-1.5 rounded-xl border border-border/50 text-xs font-bold text-foreground/70 hover:border-primary hover:text-primary group-hover:border-primary group-hover:text-primary transition-all">
          Ingresar
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </Link>
  )
}
