// app/dashboard/cursos/[cursoId]/page.tsx — Vista 2: Estructura del Curso
import { notFound } from "next/navigation"
import { BookOpen, Layers, BarChart2, Route } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HeaderBanner } from "@/components/dashboard/HeaderBanner"
import { StageColumn } from "@/components/dashboard/StageColumn"
import { Breadcrumbs } from "@/components/dashboard/Breadcrumbs"
import { getCourse } from "@/lib/data/courses"

interface PageProps {
  params: Promise<{ cursoId: string }>
}

export default async function CoursePage({ params }: PageProps) {
  const { cursoId } = await params
  const course = getCourse(cursoId)
  if (!course) notFound()

  const metrics = [
    { icon: <Layers className="h-5 w-5" />, value: course.totalStages, label: "Etapas" },
    { icon: <BookOpen className="h-5 w-5" />, value: course.totalModules, label: "Módulos principales" },
    { icon: <BarChart2 className="h-5 w-5" />, value: course.levelsPerStage, label: "Niveles por etapa" },
    { icon: <Route className="h-5 w-5" />, value: "Ruta completa", label: course.title },
  ]

  return (
    <div className="max-w-7xl mx-auto">
      <Breadcrumbs />

      <HeaderBanner
        badgeText="Curso Oficial"
        title={course.title}
        subtitle={course.subtitle}
        description={course.description}
        metrics={metrics}
        gradient="from-secondary via-blue-900 to-blue-800"
      />

      <Tabs defaultValue="etapas" className="w-full">
        <TabsList className="bg-card border border-border/50 rounded-2xl p-1.5 mb-8 h-auto flex-wrap gap-1">
          {[
            { value: "resumen", label: "Resumen" },
            { value: "etapas", label: "Etapas" },
            { value: "materiales", label: "Materiales" },
            { value: "simulacros", label: "Simulacros" },
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

        {/* Etapas Tab */}
        <TabsContent value="etapas">
          <h2 className="text-foreground font-black text-xl mb-6">
            Estructura del curso {course.title}
          </h2>
          {/* Scrollable horizontally on small screens */}
          <div className="flex gap-4 overflow-x-auto pb-4">
            {course.stages.map((stage) => (
              <StageColumn key={stage.id} stage={stage} courseId={cursoId} />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="resumen">
          <div className="flex items-center justify-center h-48 bg-card border border-border/50 rounded-3xl">
            <p className="text-muted-foreground font-medium">Resumen del curso — próximamente</p>
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
      </Tabs>
    </div>
  )
}
