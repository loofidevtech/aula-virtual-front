// app/dashboard/cursos/[cursoId]/etapas/[etapaId]/niveles/[nivelId]/page.tsx
// Vista 3: Módulos del Nivel
import { notFound } from "next/navigation"
import { BookOpen, GraduationCap, Calculator, Route } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HeaderBanner } from "@/components/dashboard/HeaderBanner"
import { ModuleCard } from "@/components/dashboard/ModuleCard"
import { RecommendedRoute } from "@/components/dashboard/RecommendedRoute"
import { Breadcrumbs } from "@/components/dashboard/Breadcrumbs"
import { getCourse, getLevel } from "@/lib/data/courses"

interface PageProps {
  params: Promise<{
    cursoId: string
    etapaId: string
    nivelId: string
  }>
}

export default async function LevelPage({ params }: PageProps) {
  const { cursoId, etapaId, nivelId } = await params
  const course = getCourse(cursoId)
  const level = getLevel(cursoId, etapaId, nivelId)

  if (!course || !level) notFound()

  const stage = course.stages.find((s) => s.id === etapaId)
  const stageName = stage?.title ?? "Etapa"

  const metrics = [
    { icon: <BookOpen className="h-5 w-5" />, value: level.modules.length, label: "Módulos" },
    { icon: <GraduationCap className="h-5 w-5" />, value: level.subtitle, label: "" },
    { icon: <Calculator className="h-5 w-5" />, value: "Teoría + Problemas", label: "" },
    { icon: <Route className="h-5 w-5" />, value: "Ruta completa", label: "" },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <Breadcrumbs />

      <HeaderBanner
        badgeText={stageName}
        title={`${level.title} – ${stageName}`}
        subtitle={level.subtitle}
        description={`Ruta de aprendizaje para ${level.subtitle}.`}
        metrics={metrics.slice(0, 4)}
        gradient="from-secondary via-blue-900 to-blue-800"
      />

      <Tabs defaultValue="modulos" className="w-full">
        <TabsList className="bg-card border border-border/50 rounded-2xl p-1.5 mb-8 h-auto flex-wrap gap-1">
          {[
            { value: "resumen", label: "Resumen" },
            { value: "modulos", label: "Módulos" },
            { value: "materiales", label: "Materiales" },
            { value: "simulacros", label: "Simulacros" },
            { value: "progreso", label: "Progreso" },
          ].map((tab) => (
            <TabsTrigger
              key={tab.value}
              value={tab.value}
              className="rounded-xl px-5 py-2.5 text-sm font-bold data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-md transition-all"
            >
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Módulos Tab */}
        <TabsContent value="modulos">
          <h2 className="text-foreground font-black text-xl mb-6">
            Módulos del {level.title}
          </h2>

          {level.modules.length > 0 ? (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {level.modules.map((mod) => (
                  <ModuleCard
                    key={mod.id}
                    module={mod}
                    href={`/dashboard/cursos/${cursoId}/etapas/${etapaId}/niveles/${nivelId}/modulos/${mod.id}`}
                  />
                ))}
              </div>
              <RecommendedRoute modules={level.modules} progress={0} />
            </>
          ) : (
            <div className="flex flex-col items-center justify-center h-48 bg-card border border-border/50 rounded-3xl gap-3">
              <BookOpen className="h-10 w-10 text-muted-foreground/40" />
              <p className="text-muted-foreground font-medium text-sm">
                Los módulos de este nivel estarán disponibles pronto.
              </p>
            </div>
          )}
        </TabsContent>

        <TabsContent value="resumen">
          <div className="flex items-center justify-center h-48 bg-card border border-border/50 rounded-3xl">
            <p className="text-muted-foreground font-medium">Resumen — próximamente</p>
          </div>
        </TabsContent>

        <TabsContent value="materiales">
          <div className="flex items-center justify-center h-48 bg-card border border-border/50 rounded-3xl">
            <p className="text-muted-foreground font-medium">Materiales — próximamente</p>
          </div>
        </TabsContent>

        <TabsContent value="simulacros">
          <div className="flex items-center justify-center h-48 bg-card border border-border/50 rounded-3xl">
            <p className="text-muted-foreground font-medium">Simulacros — próximamente</p>
          </div>
        </TabsContent>

        <TabsContent value="progreso">
          <div className="flex items-center justify-center h-48 bg-card border border-border/50 rounded-3xl">
            <p className="text-muted-foreground font-medium">Progreso — próximamente</p>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
