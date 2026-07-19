"use client"

import { useState } from "react"
import { ArrowRight, BookOpen, FileText, PlayCircle, GraduationCap, Compass, ShieldAlert, Sparkles, Check, CheckCircle2, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from "next/link"

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const [activeStep, setActiveStep] = useState<number>(0)

  const steps = [
    {
      num: "01",
      title: "Comprender el problema",
      desc: "El estudiante aprende a interpretar correctamente el enunciado, identificar los datos importantes y reconocer qué se está preguntando.",
    },
    {
      num: "02",
      title: "Descubrir la idea principal",
      desc: "Antes de realizar cálculos, analizamos cuál es el concepto, patrón, estrategia o principio matemático que permite avanzar.",
    },
    {
      num: "03",
      title: "Explorar diferentes métodos",
      desc: "Cuando el problema lo permite, presentamos dos o más caminos de solución para comparar su claridad, rapidez y profundidad.",
    },
    {
      num: "04",
      title: "Analizar los errores comunes",
      desc: "Mostramos las equivocaciones que suelen cometer los estudiantes y explicamos cómo reconocerlas y evitarlas.",
    },
    {
      num: "05",
      title: "Transferencia cercana",
      desc: "El alumno resuelve un problema parecido para comprobar que comprendió la idea principal.",
    },
    {
      num: "06",
      title: "Transferencia lejana",
      desc: "El estudiante enfrenta un problema diferente en apariencia, pero que puede resolverse aplicando la misma idea matemática.",
    },
    {
      num: "07",
      title: "Practicar y reflexionar",
      desc: "Cada sesión finaliza con retos, tareas y ejercicios que permiten consolidar el aprendizaje.",
    }
  ]

  const valuePropositions = [
    { text: "Por qué funciona una estrategia en particular.", color: "text-amber-400" },
    { text: "Cómo reconocer la idea principal detrás de problemas complejos.", color: "text-primary" },
    { text: "Qué otros métodos y atajos de solución pueden utilizarse.", color: "text-emerald-400" },
    { text: "Cuáles son los errores y trampas más frecuentes en los exámenes.", color: "text-rose-400" },
    { text: "Cómo aplicar lo aprendido en escenarios y problemas totalmente nuevos.", color: "text-sky-400" },
    { text: "Cómo resolver problemas matemáticos con mayor claridad, rapidez y seguridad.", color: "text-purple-400" }
  ]

  const testimonials = [
    { name: "Juan Pérez", role: "Ingresante UNMSM", text: "Gracias a LoofiDev Academy logré mi meta. Los simulacros son idénticos a los reales." },
    { name: "María García", role: "Estudiante de Secundaria", text: "Mis notas en el colegio mejoraron muchísimo desde que estudio aquí. ¡Albert es el mejor!" },
    { name: "Carlos Ruiz", role: "Ingresante UNI", text: "La metodología es super dinámica. Las clases de física y química me ayudaron a entender todo." },
    { name: "Ana Torres", role: "Prep. San Marcos", text: "El material en PDF es muy completo. Lo recomiendo al 100% para prepararse en serio." },
    { name: "Luis Mendoza", role: "Estudiante 5to Año", text: "Ideal para quienes buscamos ingresar a la primera. La plataforma es muy fácil de usar." },
    { name: "Sofía Castro", role: "Ingresante PUCP", text: "Los bancos de preguntas me salvaron. Practicar con Albert es clave para no fallar." }
  ]

  return (
    <div className="relative overflow-hidden bg-background">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-[150px] animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[150px] animate-pulse delay-1000" />
      </div>

      {/* Hero Section */}
      <section className="relative px-4 pb-20 pt-24 md:pb-36 md:pt-32 lg:pt-40">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="space-y-8 lg:space-y-10">
              <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 px-6 py-2 text-sm font-black text-primary border border-primary/20 animate-in fade-in slide-in-from-bottom duration-700">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                Ciclo Escolar y Pre-Universitario 2026
              </div>
              
              <div className="space-y-6">
                <h1 className="text-balance text-5xl font-black tracking-tighter text-white md:text-7xl lg:text-8xl leading-[0.95] animate-in fade-in slide-in-from-left duration-1000">
                  Formamos estudiantes con <span className="text-primary italic underline decoration-primary/20 underline-offset-8">pensamiento olímpico.</span>
                </h1>
                
                <p className="max-w-xl text-pretty text-lg md:text-xl text-muted-foreground leading-relaxed font-medium animate-in fade-in slide-in-from-left duration-1000 delay-200">
                  Desarrolla tu talento matemático mediante programas especializados de entrenamiento, clases estratégicas y solucionarios paso a paso de los principales concursos matemáticos del Perú.
                </p>
                
                <p className="max-w-xl text-pretty text-sm md:text-base text-muted-foreground/80 leading-relaxed font-normal italic border-l-2 border-primary/50 pl-4 animate-in fade-in slide-in-from-left duration-1000 delay-300">
                  "En Albert Math Academy no enseñamos solamente a encontrar una respuesta. Enseñamos a comprender las ideas, descubrir diferentes caminos de solución y aplicar lo aprendido en nuevos desafíos."
                </p>
              </div>
              
              {/* Sugerencia del PDF: 3 Botones sugeridos */}
              <div className="flex flex-wrap items-center gap-4 pt-2 animate-in fade-in slide-in-from-bottom duration-1000 delay-400">
                <Link href="/dashboard/cursos">
                  <Button 
                    size="lg" 
                    className="h-16 px-8 gap-3 rounded-2xl bg-primary text-white font-black text-lg hover:bg-primary/90 hover:scale-105 transition-all shadow-xl shadow-primary/25 active:scale-95 group"
                  >
                    Conoce nuestros programas
                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/dashboard/solucionarios">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="h-16 px-8 rounded-2xl border-2 border-border/80 font-black text-base text-foreground hover:bg-muted/50 hover:text-white transition-all active:scale-95 gap-2"
                  >
                    <FileText className="h-5 w-5 text-primary" />
                    Explora los solucionarios
                  </Button>
                </Link>
                <Link href="/login">
                  <Button 
                    size="lg" 
                    variant="ghost" 
                    className="h-16 px-6 rounded-2xl font-black text-base text-muted-foreground hover:text-white hover:bg-white/5 transition-all active:scale-95 gap-2"
                  >
                    <GraduationCap className="h-5 w-5" />
                    Ingresa al aula virtual
                  </Button>
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-6 border-t border-border/30 animate-in fade-in duration-1000 delay-500">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-11 w-11 rounded-full border-2 border-background bg-card flex items-center justify-center font-black text-xs text-primary shadow-lg">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm font-bold text-muted-foreground">
                  <span className="text-foreground font-black">+500 alumnos</span> ya compiten con éxito
                </p>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative animate-in fade-in zoom-in duration-1000 delay-300">
              <div className="relative aspect-video w-full max-w-2xl mx-auto">
                {/* Decorative Frames */}
                <div className="absolute -top-6 -right-6 h-48 w-48 rounded-[3rem] bg-primary/10 -z-10 animate-pulse rotate-12" />
                <div className="absolute -bottom-6 -left-6 h-64 w-64 rounded-full bg-secondary/5 -z-10 animate-bounce duration-[6000ms]" />
                
                <div className="group relative h-full w-full overflow-hidden rounded-3xl border border-border/50 bg-card shadow-[0_30px_60px_-15px_rgba(0,0,0,0.6)] transition-transform duration-700 hover:scale-[1.02]">
                  <Image 
                    src="/BANNER_IMC" 
                    alt="Academia Online Albert Math" 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-105 opacity-80"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/95 via-background/40 to-transparent" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="group/play relative flex h-20 w-20 items-center justify-center rounded-full bg-primary text-white shadow-2xl transition-all hover:scale-110 hover:bg-primary/95 active:scale-95">
                      <PlayCircle className="h-12 w-12 fill-current" />
                      <span className="absolute -inset-3 animate-ping rounded-full bg-primary/20" />
                    </button>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div className="space-y-0.5">
                      <p className="text-white font-black text-lg">Clases en Vivo</p>
                      <p className="text-white/60 text-xs font-bold">Entrenamientos semanales y grabaciones HD</p>
                    </div>
                    <div className="flex gap-1.5 pb-1">
                       <div className="h-2 w-8 rounded-full bg-primary" />
                       <div className="h-2 w-2 rounded-full bg-white/20" />
                       <div className="h-2 w-2 rounded-full bg-white/20" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ¿Quiénes Somos? Section */}
      <section className="py-24 relative border-t border-border/30 bg-card/10">
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/10 rounded-[2.5rem] blur-2xl group-hover:bg-primary/15 transition-all duration-500"></div>
              <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-border/50 shadow-2xl bg-card">
                 <Image 
                  src="/about_us_hero_1778800959389.png" 
                  alt="Quiénes Somos Albert Math Academy" 
                  fill 
                  className="object-cover opacity-75 transition-transform duration-700 group-hover:scale-105"
                 />
                 <div className="absolute inset-0 bg-gradient-to-tr from-background/90 via-transparent to-transparent" />
              </div>
            </div>
            
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-black text-primary uppercase tracking-[0.2em] bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full">
                  Identidad Institucional
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                  ¿Quiénes Somos?
                </h2>
              </div>
              <div className="space-y-6 text-base md:text-lg text-muted-foreground font-medium leading-relaxed">
                <p>
                  <strong className="text-white">Albert Math Academy</strong> es una academia y plataforma virtual especializada en la preparación de estudiantes para concursos y olimpiadas de matemática.
                </p>
                <p>
                  Fue creada por <strong className="text-white">Albert Sardón Cárdenas</strong>, estudiante y competidor de matemáticas, con el propósito de compartir su experiencia, sus estrategias de resolución y su pasión por el aprendizaje matemático con otros niños y jóvenes.
                </p>
                <p className="italic text-primary/95 border-l-2 border-primary pl-4 py-1">
                  "Más que una academia, somos una comunidad de estudiantes, docentes y familias que creen que el talento puede desarrollarse con disciplina, orientación y una metodología adecuada."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Methodology Section (Los 7 pasos del PDF) */}
      <section className="bg-background px-4 py-24 md:py-32">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16 text-center space-y-4">
            <span className="text-xs font-black text-primary uppercase tracking-[0.2em] bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full">
              Enfoque Pedagógico
            </span>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white">
              Nuestra Metodología
            </h2>
            <p className="mx-auto max-w-2xl text-lg md:text-xl text-muted-foreground font-medium">
              Aprender ideas para resolver nuevos problemas.
            </p>
            <div className="inline-block mt-4 px-6 py-3 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm md:text-base font-black uppercase tracking-wider">
              🏆 Principio Metodológico: Menos problemas mecánicos, más comprensión y transferencia.
            </div>
          </div>

          <div className="grid lg:grid-cols-12 gap-8 items-start">
            {/* Timeline selector (UX/UI Interactive) */}
            <div className="lg:col-span-5 space-y-3">
              {steps.map((step, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveStep(idx)}
                  className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 flex items-start gap-4 group ${
                    activeStep === idx
                      ? "bg-card border-primary/50 shadow-lg shadow-primary/5"
                      : "bg-card/30 border-border/30 hover:bg-card/50 hover:border-border/60"
                  }`}
                >
                  <span className={`text-xl font-black shrink-0 transition-colors duration-300 ${
                    activeStep === idx ? "text-primary scale-110" : "text-muted-foreground group-hover:text-foreground"
                  }`}>
                    {step.num}
                  </span>
                  <div className="space-y-1">
                    <p className={`font-black text-base transition-colors duration-300 ${
                      activeStep === idx ? "text-white" : "text-muted-foreground group-hover:text-white"
                    }`}>
                      {step.title}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Step Detail Card */}
            <div className="lg:col-span-7 h-full">
              <div className="bg-card border border-border/50 rounded-3xl p-8 md:p-12 space-y-6 shadow-2xl relative overflow-hidden h-full min-h-[350px] flex flex-col justify-center transition-all duration-500">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-[100px] pointer-events-none" />
                <div className="space-y-4">
                  <span className="text-sm font-black text-primary uppercase tracking-[0.2em]">Paso {steps[activeStep].num}</span>
                  <h3 className="text-3xl md:text-4xl font-black text-white tracking-tight leading-tight">
                    {steps[activeStep].title}
                  </h3>
                  <div className="h-px bg-border/50 my-4" />
                  <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
                    {steps[activeStep].desc}
                  </p>
                </div>
                
                <div className="pt-6 mt-auto">
                  <Button 
                    size="lg"
                    onClick={onGetStarted}
                    className="rounded-xl bg-primary/10 border border-primary/30 text-primary font-black hover:bg-primary hover:text-white transition-all text-sm gap-2"
                  >
                    Aprende con este método
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Propuesta de Valor Section (Aprender a Pensar) */}
      <section className="py-24 bg-card/10 border-y border-border/30 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 blur-[120px] rounded-full" />
        <div className="container mx-auto max-w-7xl px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <div className="space-y-3">
                <span className="text-xs font-black text-primary uppercase tracking-[0.2em] bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full">
                  Propuesta de Valor
                </span>
                <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
                  Cada problema es una oportunidad para aprender a pensar
                </h2>
              </div>
              <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                En Albert Math Academy no nos limitamos a proporcionar respuestas de forma mecánica. Enseñamos la lógica profunda detrás de cada concepto matemático para que el estudiante deje de depender de la repetición.
              </p>
              
              <div className="grid sm:grid-cols-2 gap-4">
                {valuePropositions.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start p-4 rounded-xl bg-card/40 border border-border/30 hover:border-border/55 transition-all">
                    <CheckCircle2 className={`h-5 w-5 shrink-0 ${item.color}`} />
                    <p className="text-sm font-bold text-white/95 leading-tight">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border/50 rounded-3xl p-8 md:p-10 space-y-6 shadow-2xl relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/20 mb-4">
                <Sparkles className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-2xl font-black text-white">¿Por qué elegir Albert Math Academy?</h3>
              
              <div className="space-y-4">
                <div className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-xs">✓</div>
                  <p className="text-muted-foreground font-medium text-sm">
                    Nuestra preparación está basada en la **experiencia real** de participar, entrenar y competir en olimpiadas nacionales e internacionales.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-xs">✓</div>
                  <p className="text-muted-foreground font-medium text-sm">
                    Ofrecemos una plataforma completamente especializada en concursos, con materiales organizados y explicaciones adaptadas a estudiantes de primaria y secundaria.
                  </p>
                </div>
                <div className="flex gap-4">
                  <div className="h-6 w-6 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 font-bold text-xs">✓</div>
                  <p className="text-muted-foreground font-medium text-sm">
                    Acompañamos al alumno desde sus primeras competencias básicas hasta desafíos de alto nivel internacional.
                  </p>
                </div>
              </div>
              
              <div className="pt-4 border-t border-border/50">
                <Button 
                  onClick={onGetStarted}
                  className="w-full h-12 rounded-xl bg-primary text-white font-black text-sm hover:bg-primary/95 transition-all shadow-md active:scale-95"
                >
                  Regístrate ahora y compruébalo
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section className="bg-card/5 py-24 overflow-hidden relative">
        <div className="container mx-auto px-4 mb-16 text-center space-y-4">
          <span className="text-xs font-black text-primary uppercase tracking-[0.2em] bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full">
            Casos de Éxito
          </span>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight">
            Testimonios que <span className="text-primary italic">Inspiran</span>
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl font-medium max-w-2xl mx-auto">
            Únete a la comunidad de estudiantes que están transformando su futuro académico.
          </p>
        </div>
        
        <div className="flex w-[200%] animate-infinite-scroll">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="w-[300px] md:w-[450px] px-4 flex-shrink-0">
              <Card className="bg-card border border-border/50 text-card-foreground rounded-3xl h-full hover:shadow-[0_20px_40px_-10px_rgba(0,0,0,0.5)] transition-all duration-500 p-2">
                <CardContent className="p-8 space-y-6">
                  <div className="flex gap-1 text-primary">
                    {[1,2,3,4,5].map(s => (
                      <svg key={s} className="h-5 w-5 fill-current" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="italic text-base md:text-lg text-muted-foreground leading-relaxed font-medium">"{t.text}"</p>
                  <div className="flex items-center gap-4 border-t border-border/50 pt-6">
                    <div className="h-12 w-12 rounded-xl bg-primary/20 flex items-center justify-center font-black text-primary text-lg">
                       {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-white text-base tracking-tight">{t.name}</p>
                      <p className="text-xs font-black text-primary/80 uppercase tracking-widest">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-32 relative bg-background overflow-hidden border-t border-border/50">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,var(--primary)_0%,transparent_70%)] opacity-[0.03]" />
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(var(--accent)_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.05]" />
        </div>

        <div className="container mx-auto max-w-5xl text-center space-y-12 relative z-10">
          <span className="text-xs font-black text-amber-400 uppercase tracking-[0.2em] bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full">
            Únete a Nosotros
          </span>
          <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-white leading-[1.0] max-w-3xl mx-auto">
            ¿Listo para el siguiente <span className="text-primary italic">nivel?</span>
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground font-medium max-w-xl mx-auto leading-relaxed">
            No pierdas más tiempo. Regístrate hoy y obtén acceso inmediato a nuestros programas especializados y solucionarios detallados.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4 max-w-md mx-auto">
            <Button 
              size="lg" 
              onClick={onGetStarted} 
              className="h-16 px-8 gap-3 rounded-2xl bg-primary text-white font-black text-lg hover:bg-primary/95 hover:scale-105 transition-all shadow-xl shadow-primary/25 active:scale-95 flex-1"
            >
              Unirme Gratis
              <ArrowRight className="h-5 w-5" />
            </Button>
            <a 
              href="https://wa.me/51992350023" 
              target="_blank" 
              rel="noopener noreferrer"
              className="h-16 px-8 inline-flex items-center justify-center gap-3 rounded-2xl bg-[#25D366] text-white font-black text-lg hover:bg-[#128C7E] hover:scale-105 transition-all shadow-xl shadow-green-500/20 active:scale-95 flex-1"
            >
              <MessageCircle className="h-5 w-5 fill-current" />
              WhatsApp
            </a>
          </div>
        </div>
      </section>

    </div>
  )
}
