"use client"

import { ArrowRight, BookOpen, FileText, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const methodologyCards = [
    {
      icon: PlayCircle,
      title: "Video Clases",
      description:
        "Accede a cientos de horas de contenido en video con explicaciones claras y ejemplos prácticos de los mejores docentes.",
    },
    {
      icon: FileText,
      title: "Simulacros",
      description:
        "Practica con exámenes tipo admisión en condiciones reales. Cronometrados y con retroalimentación instantánea.",
    },
    {
      icon: BookOpen,
      title: "Material en PDF",
      description:
        "Descarga guías de estudio, resúmenes y ejercicios resueltos para complementar tu aprendizaje offline.",
    },
  ]

  return (
    <div className="relative overflow-hidden">
      {/* Gradient Orb */}
      <div className="pointer-events-none absolute right-0 top-0 h-[600px] w-[600px] translate-x-1/3 -translate-y-1/4">
        <div className="h-full w-full rounded-full bg-primary/30 blur-[120px]" />
      </div>

      {/* Hero Section */}
      <section className="relative px-4 pb-24 pt-20 md:pb-32 md:pt-28">
        <div className="container mx-auto max-w-5xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            <div className="space-y-8">
              <h1 className="text-balance text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                Tu futuro universitario{" "}
                <span className="text-primary">comienza aquí.</span>
              </h1>
              <p className="max-w-lg text-pretty text-lg text-muted-foreground">
                LoofiDev Academy es la plataforma preuniversitaria más completa.
                Prepara tu examen de admisión con videoclases, simulacros y
                material de estudio de la más alta calidad.
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <Button size="lg" onClick={onGetStarted} className="gap-2">
                  Comenzar ahora
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button size="lg" variant="outline">
                  Ver demo
                </Button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap items-center gap-8 pt-4">
                <div>
                  <p className="text-2xl font-bold">+10,000</p>
                  <p className="text-sm text-muted-foreground">Estudiantes activos</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <p className="text-2xl font-bold">95%</p>
                  <p className="text-sm text-muted-foreground">Tasa de aprobación</p>
                </div>
                <div className="h-8 w-px bg-border" />
                <div>
                  <p className="text-2xl font-bold">+500</p>
                  <p className="text-sm text-muted-foreground">Horas de contenido</p>
                </div>
              </div>
            </div>

            {/* Hero Image/Mockup Placeholder */}
            <div className="relative hidden lg:block">
              <div className="relative aspect-square w-full overflow-hidden rounded-2xl border border-border bg-card p-8">
                <div className="grid h-full grid-cols-2 gap-4">
                  <div className="space-y-4">
                    <div className="h-24 rounded-lg bg-secondary/50" />
                    <div className="h-32 rounded-lg bg-primary/20" />
                    <div className="h-20 rounded-lg bg-secondary/50" />
                  </div>
                  <div className="space-y-4">
                    <div className="h-32 rounded-lg bg-secondary/50" />
                    <div className="h-24 rounded-lg bg-secondary/50" />
                    <div className="h-20 rounded-lg bg-primary/20" />
                  </div>
                </div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="rounded-full bg-primary/90 p-6">
                    <PlayCircle className="h-12 w-12 text-primary-foreground" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="border-t border-border bg-card/50 px-4 py-24">
        <div className="container mx-auto max-w-5xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
              Nuestra Metodología
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground">
              Combinamos tecnología y pedagogía para ofrecerte la mejor
              experiencia de aprendizaje preuniversitario.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {methodologyCards.map((card, index) => (
              <Card
                key={index}
                className="group border-border bg-card transition-colors hover:border-primary/50"
              >
                <CardHeader>
                  <div className="mb-2 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                    <card.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="text-xl">{card.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {card.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-24">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="mb-4 text-3xl font-bold tracking-tight md:text-4xl">
            ¿Listo para alcanzar tus metas?
          </h2>
          <p className="mb-8 text-muted-foreground">
            Únete a miles de estudiantes que ya están preparándose con nosotros.
          </p>
          <Button size="lg" onClick={onGetStarted} className="gap-2">
            Crear cuenta gratis
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border px-4 py-8">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>&copy; 2026 LoofiDev Academy. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
