"use client"

import Image from "next/image"
import { 
  FileText, 
  PlayCircle, 
  ClipboardCheck, 
  GraduationCap,
  Folder,
  Target,
  Trophy
} from "lucide-react"

const NIVELES = [
  {
    id: "nivel-1",
    name: "Nivel 1",
    desc: "Estudiantes de 1.º y 2.º de secundaria",
    color: "purple",
    textColor: "text-purple-600",
    bgColor: "bg-purple-600",
    lightBg: "bg-purple-600/10",
    borderColor: "border-purple-600/20",
    hoverBorder: "hover:border-purple-600/50",
    cardBg: "bg-purple-500/5",
  },
  {
    id: "nivel-2",
    name: "Nivel 2",
    desc: "Estudiantes de 3.º y 4.º de secundaria",
    color: "blue",
    textColor: "text-blue-600",
    bgColor: "bg-blue-600",
    lightBg: "bg-blue-600/10",
    borderColor: "border-blue-600/20",
    hoverBorder: "hover:border-blue-600/50",
    cardBg: "bg-blue-500/5",
  },
  {
    id: "nivel-3",
    name: "Nivel 3",
    desc: "Estudiantes de 5.º de secundaria",
    color: "amber",
    textColor: "text-amber-600",
    bgColor: "bg-amber-600",
    lightBg: "bg-amber-600/10",
    borderColor: "border-amber-600/20",
    hoverBorder: "hover:border-amber-600/50",
    cardBg: "bg-amber-500/5",
  }
]

const YEARS = [2023, 2024, 2025, 2026]

export function OnemView({ logo }: { logo?: string }) {
  const finalLogo = logo || "/assets/logos/solucionarios/concurso_selectivo_onem.png"

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      
      {/* HEADER SECTION */}
      <div className="bg-card/30 p-6 md:p-8 rounded-[2.5rem] border border-border/50 relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -z-0" />
        
        {/* Logo */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 z-10 bg-white rounded-3xl p-4 shadow-xl border border-white/20">
          <Image
            src={finalLogo}
            alt="Concurso Selectivo ONEM"
            fill
            className="object-contain p-4"
          />
        </div>

        <div className="relative z-10 space-y-2 flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tight uppercase">
            Concurso Selectivo <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">ONEM</span>
          </h1>
          <p className="text-lg font-medium text-muted-foreground">
            Estructura de recursos por nivel, año y etapa
          </p>
        </div>
      </div>

      {/* 3 COLUMNS GRID */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {NIVELES.map((nivel) => (
          <div key={nivel.id} className={`rounded-[2rem] border ${nivel.borderColor} ${nivel.cardBg} overflow-hidden shadow-sm flex flex-col relative transition-colors`}>
            
            {/* Header Level */}
            <div className="p-6 flex items-center gap-4 border-b border-border/50 bg-background/40">
              <div className={`h-14 w-14 rounded-full ${nivel.bgColor} flex items-center justify-center shrink-0 shadow-lg`}>
                <GraduationCap className="h-7 w-7 text-white" />
              </div>
              <div>
                <h3 className={`font-black text-2xl tracking-tight ${nivel.textColor}`}>{nivel.name}</h3>
                <p className="text-xs font-medium text-muted-foreground">{nivel.desc}</p>
              </div>
            </div>

            {/* Years List */}
            <div className="flex-1 flex flex-col divide-y divide-border/50 p-4 gap-4">
              {YEARS.map((year) => (
                <div key={year} className="pt-4 first:pt-0">
                  {year === 2023 ? (
                    // 2023 Layout
                    <div className="flex items-center gap-4 bg-background/50 rounded-2xl p-4 border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-24 text-center shrink-0 flex flex-col items-center justify-center gap-1">
                        <span className={`text-2xl font-black ${nivel.textColor}`}>{year}</span>
                        <span className={`text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${nivel.lightBg} ${nivel.textColor} whitespace-nowrap`}>
                          Etapa única
                        </span>
                      </div>
                      
                      <div className="flex-1 flex justify-around items-center gap-2">
                        <button className="flex flex-col items-center gap-1.5 group w-1/3">
                          <div className={`h-10 w-10 rounded-xl ${nivel.lightBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <FileText className={`h-5 w-5 ${nivel.textColor}`} />
                          </div>
                          <span className="text-[9px] font-bold uppercase text-muted-foreground text-center leading-tight group-hover:text-foreground">Examen</span>
                        </button>
                        <button className="flex flex-col items-center gap-1.5 group w-1/3">
                          <div className={`h-10 w-10 rounded-xl ${nivel.lightBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <PlayCircle className={`h-5 w-5 ${nivel.textColor}`} />
                          </div>
                          <span className="text-[9px] font-bold uppercase text-muted-foreground text-center leading-tight group-hover:text-foreground">Solucionario<br/>en video</span>
                        </button>
                        <button className="flex flex-col items-center gap-1.5 group w-1/3">
                          <div className={`h-10 w-10 rounded-xl ${nivel.lightBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <ClipboardCheck className={`h-5 w-5 ${nivel.textColor}`} />
                          </div>
                          <span className="text-[9px] font-bold uppercase text-muted-foreground text-center leading-tight group-hover:text-foreground">Simulacro</span>
                        </button>
                      </div>
                    </div>
                  ) : (
                    // 2024+ Layout
                    <div className="flex items-center gap-4 bg-background/50 rounded-2xl p-4 border border-border/50 shadow-sm hover:shadow-md transition-shadow">
                      <div className="w-16 md:w-20 text-center shrink-0">
                        <span className={`text-2xl font-black ${nivel.textColor}`}>{year}</span>
                      </div>
                      
                      <div className="flex-1 flex gap-2 md:gap-4 divide-x divide-border/50">
                        {/* Institucional */}
                        <div className="flex-1 flex flex-col items-center gap-3">
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${nivel.lightBg} ${nivel.textColor} whitespace-nowrap`}>
                            Etapa institucional
                          </span>
                          <div className="flex justify-around items-center w-full">
                            <button className="group relative">
                              <FileText className={`h-5 w-5 text-muted-foreground group-hover:${nivel.textColor} transition-colors`} />
                            </button>
                            <button className="group relative">
                              <PlayCircle className={`h-5 w-5 text-muted-foreground group-hover:${nivel.textColor} transition-colors`} />
                            </button>
                            <button className="group relative">
                              <ClipboardCheck className={`h-5 w-5 text-muted-foreground group-hover:${nivel.textColor} transition-colors`} />
                            </button>
                          </div>
                        </div>

                        {/* Regional */}
                        <div className="flex-1 flex flex-col items-center gap-3 pl-2 md:pl-4">
                          <span className={`text-[9px] font-bold uppercase tracking-wider px-3 py-1 rounded-full ${nivel.lightBg} ${nivel.textColor} whitespace-nowrap`}>
                            Etapa regional
                          </span>
                          <div className="flex justify-around items-center w-full">
                            <button className="group relative">
                              <FileText className={`h-5 w-5 text-muted-foreground group-hover:${nivel.textColor} transition-colors`} />
                            </button>
                            <button className="group relative">
                              <PlayCircle className={`h-5 w-5 text-muted-foreground group-hover:${nivel.textColor} transition-colors`} />
                            </button>
                            <button className="group relative">
                              <ClipboardCheck className={`h-5 w-5 text-muted-foreground group-hover:${nivel.textColor} transition-colors`} />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FOOTER INFO BLOCKS (3 items) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="bg-card/50 p-6 rounded-3xl border border-border/50 flex items-center gap-4 hover:bg-card transition-colors">
          <div className="h-14 w-14 rounded-2xl bg-purple-600/10 flex items-center justify-center shrink-0">
            <Folder className="h-7 w-7 text-purple-600" />
          </div>
          <div>
            <h4 className="text-sm font-black text-foreground">Recursos organizados</h4>
            <p className="text-xs text-muted-foreground font-medium mt-1 leading-snug">Accede fácilmente a exámenes, solucionarios y simulacros.</p>
          </div>
        </div>
        
        <div className="bg-card/50 p-6 rounded-3xl border border-border/50 flex items-center gap-4 hover:bg-card transition-colors">
          <div className="h-14 w-14 rounded-2xl bg-blue-600/10 flex items-center justify-center shrink-0">
            <Target className="h-7 w-7 text-blue-600" />
          </div>
          <div>
            <h4 className="text-sm font-black text-foreground">Prepárate con enfoque</h4>
            <p className="text-xs text-muted-foreground font-medium mt-1 leading-snug">Practica por etapas y refuerza tus conocimientos.</p>
          </div>
        </div>

        <div className="bg-card/50 p-6 rounded-3xl border border-border/50 flex items-center gap-4 hover:bg-card transition-colors">
          <div className="h-14 w-14 rounded-2xl bg-amber-600/10 flex items-center justify-center shrink-0">
            <Trophy className="h-7 w-7 text-amber-600" />
          </div>
          <div>
            <h4 className="text-sm font-black text-foreground">Alcanza tu mejor versión</h4>
            <p className="text-xs text-muted-foreground font-medium mt-1 leading-snug">Cada recurso te acerca más a tu objetivo.</p>
          </div>
        </div>
      </div>

    </div>
  )
}
