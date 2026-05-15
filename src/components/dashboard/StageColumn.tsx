// components/dashboard/StageColumn.tsx
import {
  School,
  Users,
  MapPin,
  Trophy,
  type LucideIcon,
} from "lucide-react"
import { LevelCard } from "./LevelCard"
import type { Stage } from "@/lib/data/courses"

const iconMap: Record<string, LucideIcon> = {
  School,
  Users,
  MapPin,
  Trophy,
}

interface StageColumnProps {
  stage: Stage
  courseId: string
}

export function StageColumn({ stage, courseId }: StageColumnProps) {
  const Icon = iconMap[stage.icon] ?? Trophy

  return (
    <div className="flex flex-col gap-3 min-w-[260px] flex-1">
      {/* Stage Header */}
      <div
        className={`flex items-center gap-3 rounded-2xl bg-gradient-to-br ${stage.color} p-4 border border-white/10`}
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/20 shrink-0">
          <Icon className="h-5 w-5 text-white" />
        </div>
        <div>
          <p className="text-white font-black text-sm leading-tight">{stage.title}</p>
          <p className="text-white/70 text-xs font-medium mt-0.5">{stage.description}</p>
        </div>
      </div>

      {/* Level Cards */}
      <div className="flex flex-col gap-2">
        {stage.levels.map((level) => (
          <LevelCard
            key={level.id}
            level={level}
            href={`/dashboard/cursos/${courseId}/etapas/${stage.id}/niveles/${level.id}`}
          />
        ))}
      </div>
    </div>
  )
}
