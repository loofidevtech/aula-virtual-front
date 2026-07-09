// components/dashboard/Breadcrumbs.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronRight } from "lucide-react"

const labelMap: Record<string, string> = {
  dashboard: "Inicio",
  cursos: "Programas",
  etapas: "Etapas",
  niveles: "Niveles",
  onem: "ONEM",
  canguro: "Canguro",
  conamat: "CONAMAT",
  institucional: "Etapa Institucional",
  ugel: "Etapa UGEL",
  dre: "Etapa DRE",
  nacional: "Etapa Nacional",
  "nivel-1": "Nivel 1",
  "nivel-2": "Nivel 2",
  "nivel-3": "Nivel 3",
}

function getLabel(segment: string): string {
  return labelMap[segment] ?? segment.charAt(0).toUpperCase() + segment.slice(1)
}

export function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  const excludedSegments = new Set(["etapas", "niveles", "modulos"])
  const stageSegments = new Set(["institucional", "ugel", "dre", "nacional"])

  const allCrumbs = segments.map((seg, i) => {
    let href = "/" + segments.slice(0, i + 1).join("/")
    
    // Redirect stage segments to the course detail page (segments[2])
    if (stageSegments.has(seg)) {
      const courseId = segments[2]
      href = `/dashboard/cursos/${courseId}`
    }
    
    return {
      label: getLabel(seg),
      href,
      segment: seg
    }
  })

  // Filter out intermediate layout-only segments (etapas, niveles, modulos)
  const crumbs = allCrumbs.filter(crumb => !excludedSegments.has(crumb.segment))

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm mb-6">
      {crumbs.map((crumb, i) => (
        <span key={crumb.href + "-" + i} className="flex items-center gap-1.5">
          {i < crumbs.length - 1 ? (
            <>
              <Link
                href={crumb.href}
                className="text-muted-foreground hover:text-primary transition-colors font-medium"
              >
                {crumb.label}
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/50" />
            </>
          ) : (
            <span className="text-foreground font-semibold">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
