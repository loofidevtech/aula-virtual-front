"use client"

import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { BookOpen, Layers, BarChart2, Route, CheckCircle, Sparkles, Lock, ArrowRight, Play } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { HeaderBanner } from "@/components/dashboard/HeaderBanner"
import { StageColumn } from "@/components/dashboard/StageColumn"
import { Breadcrumbs } from "@/components/dashboard/Breadcrumbs"
import { getCourse } from "@/lib/data/courses"
import { freemiumService, EnrollmentStatus } from "@/lib/freemium-service"
import { Button } from "@/components/ui/button"

export default function CourseDetailPage() {
  const params = useParams()
  const router = useRouter()
  const cursoId = params.cursoId as string

  const [enrollment, setEnrollment] = useState<EnrollmentStatus>("none")
  const [course, setCourse] = useState<any>(null)
  
  // Animation states
  const [showEnrollAnimation, setShowEnrollAnimation] = useState(false)
  const [showPremiumAnimation, setShowPremiumAnimation] = useState(false)
  const [renderDetails, setRenderDetails] = useState(false)

  useEffect(() => {
    const courseData = getCourse(cursoId)
    if (!courseData) return
    setCourse(courseData)

    // Check enrollment status
    const status = freemiumService.getEnrollmentStatus(cursoId)
    setEnrollment(status)

    // Check if we should trigger first-time premium unlock animation
    const needsPremiumAnim = freemiumService.checkAndClearFirstPremiumUnlock(cursoId)
    if (needsPremiumAnim) {
      setShowPremiumAnimation(true)
    }

    setRenderDetails(true)
  }, [cursoId])

  if (!course) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
        <h2 className="text-2xl font-black">Curso no encontrado</h2>
      </div>
    )
  }

  // Handle Free Enrollment Action
  const handleEnroll = () => {
    // Save enrollment
    freemiumService.enrollInCourse(cursoId)
    
    // Trigger enrollment success animation
    setShowEnrollAnimation(true)
    
    // Play sound / delay state update
    setTimeout(() => {
      setEnrollment("free")
      setShowEnrollAnimation(false)
    }, 2800)
  }

  const metrics = [
    { icon: <Layers className="h-5 w-5" />, value: course.totalStages, label: "Etapas" },
    { icon: <BookOpen className="h-5 w-5" />, value: course.totalModules, label: "Módulos principales" },
    { icon: <BarChart2 className="h-5 w-5" />, value: course.levelsPerStage, label: "Niveles por etapa" },
    { icon: <Route className="h-5 w-5" />, value: "Ruta completa", label: course.title },
  ]

  // Construct Header Banner badge and actions based on enrollment status
  let badgeText = "Curso Oficial"
  let bannerAction = null

  if (renderDetails) {
    if (enrollment === "premium") {
      badgeText = "🏆 Acceso Premium Habilitado"
      bannerAction = (
        <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-500 text-xs font-black uppercase tracking-wider animate-pulse">
          Premium Activo
        </span>
      )
    } else if (enrollment === "free") {
      badgeText = "⚡ Alumno Registrado (Capa Libre)"
      bannerAction = (
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold text-white/60">Registrado en la versión Freemium</span>
        </div>
      )
    } else {
      badgeText = "Clase Abierta para Inscripción"
      bannerAction = (
        <Button 
          onClick={handleEnroll}
          className="rounded-full bg-primary hover:bg-primary/90 text-white font-black px-6 h-12 shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all gap-2 cursor-pointer"
        >
          <Play className="h-4 w-4 fill-current" /> Inscribirme gratis en este curso
        </Button>
      )
    }
  }

  return (
    <div className="max-w-7xl mx-auto relative">
      <Breadcrumbs />

      <HeaderBanner
        badgeText={badgeText}
        title={course.title}
        subtitle={course.subtitle}
        description={course.description}
        metrics={metrics}
        gradient={course.gradient || "from-secondary via-blue-900 to-blue-800"}
        action={bannerAction}
      />

      {/* Render stages list only if enrolled */}
      {enrollment !== "none" ? (
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
          <TabsContent value="etapas" className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h2 className="text-foreground font-black text-xl mb-6">
              Estructura del curso {course.title}
            </h2>
            {/* Scrollable horizontally on small screens */}
            <div className="flex gap-4 overflow-x-auto pb-4">
              {course.stages.map((stage: any) => (
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
      ) : (
        <div className="flex flex-col items-center justify-center py-16 bg-card border border-border/50 rounded-3xl p-8 text-center space-y-4">
          <div className="h-16 w-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary mb-2 shadow-inner">
            <Lock className="h-8 w-8" />
          </div>
          <h3 className="text-2xl font-black text-white">Temario bloqueado</h3>
          <p className="text-muted-foreground text-sm font-medium max-w-md">
            Inscríbete gratis para desbloquear la estructura de etapas, niveles de aprendizaje, y acceder al material audiovisual.
          </p>
          <Button 
            onClick={handleEnroll}
            className="rounded-full bg-primary hover:bg-primary/90 text-white font-black px-8 h-12 shadow-xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all gap-2 cursor-pointer"
          >
            Inscribirme ahora
          </Button>
        </div>
      )}

      {/* ── ENROLLMENT SUCCESS ANIMATION OVERLAY ── */}
      {showEnrollAnimation && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300">
          {/* Confetti Emojis falling effect */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(15)].map((_, i) => (
              <span 
                key={i} 
                className="absolute text-3xl animate-bounce"
                style={{
                  left: `${Math.random() * 90 + 5}%`,
                  top: `${Math.random() * 50 + 10}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${1.5 + Math.random() * 2}s`
                }}
              >
                {["🎉", "✨", "🏅", "🌟", "🎓"][i % 5]}
              </span>
            ))}
          </div>

          <div className="bg-slate-900 border border-amber-500/30 rounded-[2.5rem] p-8 max-w-md text-center shadow-2xl animate-in zoom-in-95 duration-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-amber-500 to-primary" />
            
            {/* Pulsing check icon */}
            <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] animate-pulse">
              <CheckCircle className="h-10 w-10" />
            </div>

            <h3 className="text-3xl font-black text-white mb-2 leading-tight">
              ¡Inscripción Exitosa! 🎉
            </h3>
            <p className="text-sm font-semibold text-slate-400 mb-6">
              Te has registrado correctamente en el curso.
            </p>

            <div className="bg-slate-950/50 border border-white/5 p-4 rounded-2xl text-xs font-bold text-primary uppercase tracking-widest flex items-center justify-center gap-2">
              <Sparkles className="h-4 w-4 text-amber-500 animate-spin" />
              Curso agregado a tu Biblioteca
            </div>
            
            <p className="text-[11px] font-bold text-slate-500 mt-4">
              Cargando tu aula virtual...
            </p>
          </div>
        </div>
      )}

      {/* ── PREMIUM UPGRADE CELEBRATION OVERLAY ── */}
      {showPremiumAnimation && (
        <div className="fixed inset-0 z-[300] flex items-center justify-center bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-300">
          
          {/* Sparkly Background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <span 
                key={i} 
                className="absolute text-4xl animate-bounce"
                style={{
                  left: `${Math.random() * 90 + 5}%`,
                  top: `${Math.random() * 60 + 10}%`,
                  animationDelay: `${Math.random() * 1.5}s`,
                  animationDuration: `${1 + Math.random() * 2}s`
                }}
              >
                {["🏆", "✨", "🔑", "👑", "🌟"][i % 5]}
              </span>
            ))}
          </div>

          <div className="bg-slate-900 border-2 border-amber-500 rounded-[3rem] p-10 max-w-lg text-center shadow-2xl animate-in zoom-in-95 duration-500 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
            
            {/* Padlock opening animation wrapper */}
            <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-xl shadow-amber-500/30 transform rotate-12 hover:rotate-0 transition-transform duration-500">
              <Sparkles className="h-12 w-12 text-white animate-pulse" />
            </div>

            <h3 className="text-3xl md:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-amber-500 to-amber-300 mb-3 leading-tight tracking-tight uppercase italic">
              ¡Premium Desbloqueado! 🏆
            </h3>
            
            <p className="text-base font-semibold text-slate-300 mb-6">
              Felicidades. Tu acceso completo para <span className="text-white font-extrabold">{course.title}</span> ha sido activado.
            </p>

            <div className="bg-slate-950/80 p-5 rounded-2xl border border-amber-500/10 text-left space-y-2 mb-8">
              <p className="text-xs font-bold text-amber-500 uppercase tracking-widest text-center mb-2">⭐ Estado Actualizado ⭐</p>
              <p className="text-xs text-slate-400 font-semibold flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-amber-500" /> Todos los módulos y niveles unlocked.
              </p>
              <p className="text-xs text-slate-400 font-semibold flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-amber-500" /> Sin restricciones de 3 videos.
              </p>
              <p className="text-xs text-slate-400 font-semibold flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-amber-500" /> Materiales de estudio e simulacros disponibles.
              </p>
            </div>

            <Button 
              onClick={() => setShowPremiumAnimation(false)}
              className="w-full h-14 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black text-base gap-2 hover:scale-[1.02] active:scale-95 transition-all shadow-lg shadow-amber-500/20 cursor-pointer"
            >
              Comenzar a estudiar <ArrowRight className="h-5 w-5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
