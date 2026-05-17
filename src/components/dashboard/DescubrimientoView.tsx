"use client"

import Image from "next/image"
import { 
  FileText, 
  PlayCircle, 
  ClipboardCheck, 
  Trophy,
  Users,
  Calendar,
  Target,
  Lightbulb,
  Brain,
  TrendingUp,
  Award,
  Globe,
  GraduationCap,
  BookOpen
} from "lucide-react"

const NIVELES = [
  {
    id: "3ro",
    name: "3.º DE PRIMARIA",
    color: "#16A34A", // green-600
    colorClass: "bg-green-600",
    textColor: "text-green-600",
    lightBg: "bg-green-600/10",
    borderColor: "border-green-600/20",
    hoverBorder: "hover:border-green-600/50",
    years: [2023, 2024, 2025, 2026]
  },
  {
    id: "4to",
    name: "4.º DE PRIMARIA",
    color: "#2563EB", // blue-600
    colorClass: "bg-blue-600",
    textColor: "text-blue-600",
    lightBg: "bg-blue-600/10",
    borderColor: "border-blue-600/20",
    hoverBorder: "hover:border-blue-600/50",
    years: [2023, 2024, 2025, 2026]
  },
  {
    id: "5to",
    name: "5.º DE PRIMARIA",
    color: "#EA580C", // orange-600
    colorClass: "bg-orange-600",
    textColor: "text-orange-600",
    lightBg: "bg-orange-600/10",
    borderColor: "border-orange-600/20",
    hoverBorder: "hover:border-orange-600/50",
    years: [2023, 2024, 2025, 2026]
  },
  {
    id: "6to",
    name: "6.º DE PRIMARIA",
    color: "#9333EA", // purple-600
    colorClass: "bg-purple-600",
    textColor: "text-purple-600",
    lightBg: "bg-purple-600/10",
    borderColor: "border-purple-600/20",
    hoverBorder: "hover:border-purple-600/50",
    years: [2023, 2024, 2025, 2026]
  }
]

export function DescubrimientoView({ logo }: { logo?: string }) {
  const finalLogo = logo || "/assets/logos/solucionarios/concurso_descubrimiento_matematico.png"

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      
      {/* HEADER SECTION */}
      <div className="bg-card/30 p-8 rounded-[2.5rem] border border-border/50 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -z-0" />
        
        {/* Logo */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 z-10">
          <Image
            src={finalLogo}
            alt="Concurso Internacional de Descubrimiento Matemático"
            fill
            className="object-contain drop-shadow-2xl"
          />
        </div>

        <div className="relative z-10 space-y-4 flex-1">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-foreground tracking-tight leading-none uppercase">
            Concurso Internacional <br/>
            <span className="text-blue-500">de Descubrimiento Matemático</span>
          </h1>
          <div className="inline-block bg-blue-900 text-white px-6 py-2 rounded-full text-sm md:text-base font-bold tracking-widest uppercase shadow-md border border-blue-700">
            Para estudiantes de 3.º, 4.º, 5.º y 6.º de Primaria
          </div>
        </div>
      </div>

      {/* INFO BLOCKS (4 items) */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        <div className="bg-card p-4 rounded-2xl border border-border/50 flex items-center gap-4 shadow-sm">
          <div className="h-12 w-12 rounded-xl bg-blue-500/10 text-blue-500 flex items-center justify-center shrink-0">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-[11px] font-black uppercase text-foreground">Años Disponibles</h4>
            <p className="text-sm font-bold text-muted-foreground leading-tight">2023 - 2024 - 2025 - 2026<br/><span className="text-[10px] font-normal">(2023: Etapa Única)</span></p>
          </div>
        </div>
        <div className="bg-card p-4 rounded-2xl border border-border/50 flex items-center gap-4 shadow-sm">
          <div className="h-12 w-12 rounded-xl bg-yellow-500/10 text-yellow-500 flex items-center justify-center shrink-0">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-[11px] font-black uppercase text-foreground">Modalidad</h4>
            <p className="text-xs font-medium text-muted-foreground leading-tight">Desde 2024:<br/><strong className="text-foreground">2 Etapas</strong> (Clasificatoria y Nacional)</p>
          </div>
        </div>
        <div className="bg-card p-4 rounded-2xl border border-border/50 flex items-center gap-4 shadow-sm">
          <div className="h-12 w-12 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center shrink-0">
            <Target className="h-6 w-6" />
          </div>
          <div>
            <h4 className="text-[11px] font-black uppercase text-foreground">Objetivo</h4>
            <p className="text-[11px] font-medium text-muted-foreground leading-tight">Fomentar el talento, la creatividad y el razonamiento lógico-matemático.</p>
          </div>
        </div>
        <div className="bg-blue-600 p-4 rounded-2xl border border-blue-500 flex items-center gap-4 shadow-md text-white">
          <div className="h-12 w-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
            <Lightbulb className="h-6 w-6 text-yellow-300" />
          </div>
          <div>
            <h4 className="text-sm font-black uppercase leading-tight">¡Descubre tu talento, resuelve, aprende y gana!</h4>
          </div>
        </div>
      </div>

      {/* 4 COLUMNS GRID FOR GRADES */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {NIVELES.map((nivel) => (
          <div key={nivel.id} className={`bg-card rounded-3xl border border-border/50 overflow-hidden shadow-xl flex flex-col relative ${nivel.hoverBorder} transition-colors`}>
            
            {/* Header Level */}
            <div className={`p-4 flex items-center gap-3 ${nivel.colorClass} text-white`}>
              <div className="h-10 w-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center shadow-inner border border-white/20">
                <BookOpen className="h-5 w-5" />
              </div>
              <h3 className="font-black text-xl tracking-tight uppercase">{nivel.name}</h3>
            </div>

            {/* Stages Subheader */}
            <div className="grid grid-cols-2 divide-x divide-border/50 border-b border-border/50 bg-background/50">
              <div className="p-3 flex flex-col items-center justify-center gap-1 text-center">
                <span className={`text-[9px] font-black uppercase tracking-widest ${nivel.textColor}`}>Etapa</span>
                <span className="text-[10px] font-bold text-foreground uppercase leading-none">Clasificatoria</span>
                <Users className={`h-4 w-4 mt-1 ${nivel.textColor}`} />
              </div>
              <div className="p-3 flex flex-col items-center justify-center gap-1 text-center">
                <span className={`text-[9px] font-black uppercase tracking-widest ${nivel.textColor}`}>Etapa</span>
                <span className="text-[10px] font-bold text-foreground uppercase leading-none">Nacional</span>
                <Trophy className={`h-4 w-4 mt-1 ${nivel.textColor}`} />
              </div>
            </div>

            {/* Years List */}
            <div className="flex-1 flex flex-col divide-y divide-border/50">
              {nivel.years.map((year) => (
                <div key={year} className={`p-3 flex items-center gap-2 hover:bg-white/5 transition-colors ${nivel.lightBg}`}>
                  {/* Year Tag */}
                  <div className="w-14 shrink-0 flex flex-col justify-center">
                    <span className={`text-sm font-black ${nivel.textColor}`}>{year}</span>
                    {year === 2023 && <span className="text-[8px] font-bold text-muted-foreground leading-none">(Etapa Única)</span>}
                  </div>
                  
                  {/* Resources */}
                  <div className="flex-1 flex items-center justify-between gap-1">
                    <div className="flex flex-col items-center group cursor-pointer w-1/3">
                      <FileText className="h-4 w-4 text-muted-foreground group-hover:text-foreground transition-colors mb-1" />
                      <span className="text-[7px] font-bold uppercase text-muted-foreground text-center leading-none">Examen</span>
                    </div>
                    <div className="flex flex-col items-center group cursor-pointer w-1/3">
                      <PlayCircle className="h-4 w-4 text-red-500 group-hover:scale-110 transition-transform mb-1" />
                      <span className="text-[7px] font-bold uppercase text-red-400 text-center leading-none">Solucionario</span>
                    </div>
                    <div className="flex flex-col items-center group cursor-pointer w-1/3">
                      <ClipboardCheck className="h-4 w-4 text-blue-500 group-hover:scale-110 transition-transform mb-1" />
                      <span className="text-[7px] font-bold uppercase text-blue-400 text-center leading-none">Simulacro</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER INFO BLOCKS (5 items) */}
      <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 pt-4">
        <div className="bg-card/50 p-4 rounded-2xl border border-border/50 flex flex-col gap-2 items-start hover:bg-card transition-colors">
          <Brain className="h-8 w-8 text-blue-500" />
          <div>
            <h4 className="text-[11px] font-black uppercase text-blue-500">Desarrolla tu mente</h4>
            <p className="text-[10px] text-muted-foreground font-medium leading-tight mt-1">Mejora tu capacidad de razonamiento y resolución de problemas.</p>
          </div>
        </div>
        <div className="bg-card/50 p-4 rounded-2xl border border-border/50 flex flex-col gap-2 items-start hover:bg-card transition-colors">
          <TrendingUp className="h-8 w-8 text-green-500" />
          <div>
            <h4 className="text-[11px] font-black uppercase text-green-500">Compite y supérate</h4>
            <p className="text-[10px] text-muted-foreground font-medium leading-tight mt-1">Participa a nivel internacional y demuestra tu talento matemático.</p>
          </div>
        </div>
        <div className="bg-card/50 p-4 rounded-2xl border border-border/50 flex flex-col gap-2 items-start hover:bg-card transition-colors">
          <Award className="h-8 w-8 text-yellow-500" />
          <div>
            <h4 className="text-[11px] font-black uppercase text-yellow-500">Aprende y crece</h4>
            <p className="text-[10px] text-muted-foreground font-medium leading-tight mt-1">Accede a soluciones explicadas en video y practica con simulacros.</p>
          </div>
        </div>
        <div className="bg-card/50 p-4 rounded-2xl border border-border/50 flex flex-col gap-2 items-start hover:bg-card transition-colors">
          <Globe className="h-8 w-8 text-purple-500" />
          <div>
            <h4 className="text-[11px] font-black uppercase text-purple-500">Nivel internacional</h4>
            <p className="text-[10px] text-muted-foreground font-medium leading-tight mt-1">Únete a miles de estudiantes de diferentes países y sé parte del cambio.</p>
          </div>
        </div>
        <div className="bg-card/50 p-4 rounded-2xl border border-border/50 flex flex-col gap-2 items-start hover:bg-card transition-colors">
          <GraduationCap className="h-8 w-8 text-blue-400" />
          <div>
            <h4 className="text-[11px] font-black uppercase text-blue-400">Tu esfuerzo, tu futuro</h4>
            <p className="text-[10px] text-muted-foreground font-medium leading-tight mt-1">Cada problema resuelto te acerca a tus metas.</p>
          </div>
        </div>
      </div>

    </div>
  )
}
