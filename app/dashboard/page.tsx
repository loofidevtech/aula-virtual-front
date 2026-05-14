// app/dashboard/page.tsx  — Vista 1: Inicio del Dashboard
import Link from "next/link"
import { ArrowRight, Play, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { CourseCard } from "@/components/dashboard/CourseCard"
import { programs, nationalOlympiads } from "@/lib/data/courses"

function SectionHeader({ title, href }: { title: string; href?: string }) {
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-foreground font-black text-lg">{title}</h2>
      {href && (
        <Link
          href={href}
          className="flex items-center gap-1 text-primary text-sm font-bold hover:text-primary/80 transition-colors"
        >
          Ver todo <ChevronRight className="h-4 w-4" />
        </Link>
      )}
    </div>
  )
}

export default function DashboardHomePage() {
  return (
    <div className="space-y-10 max-w-6xl mx-auto">
      {/* ── Hero Banner ─────────────────────────────────────────────────── */}
      <div className="relative w-full rounded-3xl overflow-hidden bg-gradient-to-br from-secondary to-blue-950 border border-border/50 min-h-[240px]">
        {/* Dot pattern */}
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:24px_24px]" />
        {/* Glow */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-accent/20 rounded-full blur-3xl -z-0" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-8 md:p-12">
          <div className="space-y-4 max-w-lg">
            <span className="inline-block px-3 py-1 bg-primary/20 border border-primary/30 text-primary text-xs font-black uppercase tracking-widest rounded-full">
              🏆 Plataforma N°1
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight tracking-tight">
              Tu plataforma de{" "}
              <span className="text-primary">Olimpiadas</span>{" "}
              Matemáticas
            </h1>
            <p className="text-white/70 text-base font-medium leading-relaxed">
              Cursos estructurados, retos desafiantes y solucionarios para llevarte al siguiente nivel.
            </p>
            <div className="flex flex-wrap gap-3 pt-2">
              <Link href="/dashboard/cursos">
                <Button className="rounded-full bg-primary text-white font-black px-8 h-12 shadow-xl shadow-primary/30 hover:bg-primary/90 hover:scale-105 transition-all gap-2">
                  <Play className="h-4 w-4" />
                  Explorar cursos
                </Button>
              </Link>
              <Button
                variant="outline"
                className="rounded-full border-white/20 text-white font-black px-8 h-12 hover:bg-white/10 hover:border-white/40 transition-all gap-2"
              >
                Continuar aprendiendo
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Progress card */}
          <div className="shrink-0 w-64 bg-white/10 backdrop-blur-sm border border-white/20 rounded-3xl p-5 space-y-3">
            <span className="text-primary text-xs font-black uppercase tracking-widest">En Curso</span>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-secondary border border-white/20 shrink-0">
                <span className="text-white font-black text-xs">ON EM</span>
              </div>
              <div>
                <p className="text-white font-black text-sm leading-tight">Olimpiada Nacional Escolar de Matemática</p>
              </div>
            </div>
            <p className="text-white/60 text-xs leading-relaxed">
              Curso completo para dominar los temas clave y resolver problemas al estilo ONEM.
            </p>
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="text-white/60 font-medium">Progreso del curso</span>
                <span className="text-primary font-black">65%</span>
              </div>
              <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                <div className="h-full w-[65%] bg-primary rounded-full" />
              </div>
            </div>
            <Link href="/dashboard/cursos/onem">
              <Button className="w-full rounded-2xl bg-primary/20 border border-primary/40 text-primary font-black text-xs hover:bg-primary hover:text-white transition-all gap-1">
                Ir al curso <ArrowRight className="h-3.5 w-3.5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* ── Programas de entrenamiento ───────────────────────────────────── */}
      <section>
        <SectionHeader title="Programas de entrenamiento" href="/dashboard/cursos" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {programs.map((p) => (
            <CourseCard
              key={p.id}
              {...p}
              href={`/dashboard/cursos/${p.id}`}
            />
          ))}
        </div>
      </section>

      {/* ── Olimpiadas Nacionales ─────────────────────────────────────────── */}
      <section>
        <SectionHeader title="Olimpiadas nacionales" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {nationalOlympiads.map((p) => (
            <CourseCard
              key={p.id}
              {...p}
              href={`/dashboard/cursos/${p.id}`}
            />
          ))}
        </div>
      </section>

      {/* ── Olimpiadas Internacionales ───────────────────────────────────── */}
      <section className="pb-8">
        <SectionHeader title="Olimpiadas internacionales" />
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
