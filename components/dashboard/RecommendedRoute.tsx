// components/dashboard/RecommendedRoute.tsx
import { Button } from "@/components/ui/button"
import { Target, BarChart2, ArrowRight } from "lucide-react"
import Link from "next/link"
import type { CourseModule } from "@/lib/data/courses"

interface RecommendedRouteProps {
  modules: CourseModule[]
  progress?: number
}

const nodeColors = [
  "bg-primary",
  "bg-teal-500",
  "bg-violet-500",
  "bg-rose-500",
  "bg-amber-500",
]

export function RecommendedRoute({ modules, progress = 0 }: RecommendedRouteProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-card border border-border/50 rounded-3xl p-6 mt-4">
      {/* Left: description */}
      <div className="flex items-start gap-4 flex-1">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/10 border border-accent/20 shrink-0">
          <Target className="h-6 w-6 text-accent" />
        </div>
        <div className="space-y-1">
          <p className="text-foreground font-black text-sm">Ruta recomendada</p>
          <p className="text-muted-foreground text-xs leading-relaxed max-w-xs">
            Sigue el orden sugerido para fortalecer tu aprendizaje paso a paso y estar listo para la siguiente etapa.
          </p>
        </div>
      </div>

      {/* Center: node path */}
      <div className="flex items-center gap-1 shrink-0">
        {modules.map((mod, i) => (
          <div key={mod.id} className="flex items-center gap-1">
            <span
              className={`flex h-8 w-8 items-center justify-center rounded-full ${nodeColors[i % nodeColors.length]} text-white font-black text-xs`}
            >
              {mod.number}
            </span>
            {i < modules.length - 1 && (
              <ArrowRight className="h-3 w-3 text-muted-foreground/50" />
            )}
          </div>
        ))}
      </div>

      {/* Right: progress */}
      <div className="flex items-center gap-4 shrink-0">
        <div className="space-y-1">
          <p className="text-muted-foreground text-xs font-medium text-right">
            Tu progreso en este nivel
          </p>
          <div className="flex items-center gap-3">
            <div className="w-32 h-2 bg-muted rounded-full overflow-hidden">
              <div
                className="h-full bg-primary rounded-full transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="text-foreground text-xs font-bold">{progress}% completado</span>
          </div>
        </div>
        <Button
          variant="outline"
          className="rounded-2xl border-border/50 text-foreground hover:border-primary hover:text-primary font-bold text-xs gap-2"
        >
          <BarChart2 className="h-4 w-4" />
          Ver progreso
        </Button>
      </div>
    </div>
  )
}
