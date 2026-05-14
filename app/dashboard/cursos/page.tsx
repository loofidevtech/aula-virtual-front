// app/dashboard/cursos/page.tsx — Índice de todos los cursos
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { CourseCard } from "@/components/dashboard/CourseCard"
import { Breadcrumbs } from "@/components/dashboard/Breadcrumbs"
import { programs, nationalOlympiads } from "@/lib/data/courses"

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-foreground font-black text-lg mb-4 flex items-center gap-2">
      {children}
      <ArrowRight className="h-4 w-4 text-primary" />
    </h2>
  )
}

export default function CursosPage() {
  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <Breadcrumbs />

      <div>
        <h1 className="text-3xl font-black text-foreground mb-2">Todos los Programas</h1>
        <p className="text-muted-foreground">
          Explora nuestra colección completa de cursos y olimpiadas matemáticas.
        </p>
      </div>

      <section>
        <SectionTitle>Programas de entrenamiento</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {programs.map((p) => (
            <CourseCard key={p.id} {...p} href={`/dashboard/cursos/${p.id}`} />
          ))}
        </div>
      </section>

      <section>
        <SectionTitle>Olimpiadas nacionales</SectionTitle>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {nationalOlympiads.map((p) => (
            <CourseCard key={p.id} {...p} href={`/dashboard/cursos/${p.id}`} />
          ))}
        </div>
      </section>

      <section className="pb-8">
        <SectionTitle>Olimpiadas internacionales</SectionTitle>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <CourseCard
            id="binacional"
            title="Concurso Binacional de Matemática"
            subtitle="Perú · Bolivia · Ecuador"
            gradient="from-emerald-800 to-emerald-600"
            href="/dashboard/cursos/binacional"
          />
          <CourseCard
            id="andes"
            title="Olimpiada Matemática de los Andes"
            subtitle="Competencia Internacional"
            gradient="from-slate-700 to-slate-500"
            href="/dashboard/cursos/andes"
          />
        </div>
      </section>
    </div>
  )
}
