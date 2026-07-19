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

interface Level {
  id: string
  name: string
  desc: string
  color: string
}

interface SolucionarioConfig {
  title: string
  description: string
  levels: Level[]
  years: number[]
  getStages: (year: number) => string[]
}

const COLOR_MAP: Record<string, {
  textColor: string
  bgColor: string
  lightBg: string
  borderColor: string
  cardBg: string
}> = {
  purple: {
    textColor: "text-purple-500",
    bgColor: "bg-purple-600",
    lightBg: "bg-purple-500/10",
    borderColor: "border-purple-500/20",
    cardBg: "bg-purple-500/5",
  },
  blue: {
    textColor: "text-blue-500",
    bgColor: "bg-blue-600",
    lightBg: "bg-blue-500/10",
    borderColor: "border-blue-500/20",
    cardBg: "bg-blue-500/5",
  },
  amber: {
    textColor: "text-amber-500",
    bgColor: "bg-amber-600",
    lightBg: "bg-amber-500/10",
    borderColor: "border-amber-500/20",
    cardBg: "bg-amber-500/5",
  },
  orange: {
    textColor: "text-orange-500",
    bgColor: "bg-orange-600",
    lightBg: "bg-orange-500/10",
    borderColor: "border-orange-500/20",
    cardBg: "bg-orange-500/5",
  },
  green: {
    textColor: "text-emerald-500",
    bgColor: "bg-emerald-600",
    lightBg: "bg-emerald-500/10",
    borderColor: "border-emerald-500/20",
    cardBg: "bg-emerald-500/5",
  },
  red: {
    textColor: "text-red-500",
    bgColor: "bg-red-600",
    lightBg: "bg-red-500/10",
    borderColor: "border-red-500/20",
    cardBg: "bg-red-500/5",
  },
  teal: {
    textColor: "text-teal-500",
    bgColor: "bg-teal-600",
    lightBg: "bg-teal-500/10",
    borderColor: "border-teal-500/20",
    cardBg: "bg-teal-500/5",
  },
  cyan: {
    textColor: "text-cyan-500",
    bgColor: "bg-cyan-600",
    lightBg: "bg-cyan-500/10",
    borderColor: "border-cyan-500/20",
    cardBg: "bg-cyan-500/5",
  },
  fuchsia: {
    textColor: "text-fuchsia-500",
    bgColor: "bg-fuchsia-600",
    lightBg: "bg-fuchsia-500/10",
    borderColor: "border-fuchsia-500/20",
    cardBg: "bg-fuchsia-500/5",
  }
}

const DEFAULT_COLORS = {
  textColor: "text-primary",
  bgColor: "bg-primary",
  lightBg: "bg-primary/10",
  borderColor: "border-primary/20",
  cardBg: "bg-primary/5",
}

const SOLUCIONARIOS_CONFIG: Record<string, SolucionarioConfig> = {
  selectivo_onem: {
    title: "Concurso Selectivo ONEM",
    description: "Estructura de recursos por nivel, año y etapa",
    levels: [
      { id: "1", name: "Nivel 1", desc: "Estudiantes de 1.º y 2.º de secundaria", color: "purple" },
      { id: "2", name: "Nivel 2", desc: "Estudiantes de 3.º y 4.º de secundaria", color: "blue" },
      { id: "3", name: "Nivel 3", desc: "Estudiantes de 5.º de secundaria", color: "amber" }
    ],
    years: [2023, 2024, 2025, 2026],
    getStages: (year) => year === 2023 ? ["Etapa única"] : ["Etapa institucional", "Etapa regional"]
  },
  olimpiada_logical: {
    title: "Olimpiada Matemática de Logical",
    description: "Estructura de contenidos por niveles, etapas y colecciones anuales.",
    levels: [
      { id: "1", name: "Nivel I", desc: "6° de primaria y 1° de secundaria", color: "purple" },
      { id: "2", name: "Nivel II", desc: "2° y 3° de secundaria", color: "blue" },
      { id: "3", name: "Nivel III", desc: "4° y 5° de secundaria", color: "amber" }
    ],
    years: [2021, 2022, 2023, 2024, 2025, 2026],
    getStages: () => ["Prueba eliminatoria", "Ronda final"]
  },
  competencia_paralela: {
    title: "Competencia Paralela de Matemática",
    description: "Ediciones de recursos por nivel, año y etapa",
    levels: [
      { id: "1", name: "Nivel Primaria", desc: "3.° a 6.° de primaria", color: "blue" },
      { id: "2", name: "Nivel Secundaria", desc: "1.° a 5.° de secundaria", color: "green" }
    ],
    years: [2023, 2024, 2025, 2026],
    getStages: (year) => year === 2023 ? ["Etapa única"] : ["Etapa clasificatoria", "Etapa nacional"]
  },
  concurso_binacional: {
    title: "Concurso Binacional de Matemáticas",
    description: "Estructura de recursos por nivel",
    levels: [
      { id: "1", name: "Nivel 1", desc: "Cuarto y Quinto de primaria", color: "blue" },
      { id: "2", name: "Nivel 2", desc: "Sexto de primaria y Primero de secundaria", color: "green" },
      { id: "3", name: "Nivel 3", desc: "Segundo y Tercero de secundaria", color: "purple" },
      { id: "4", name: "Nivel 4", desc: "Cuarto, Quinto y Sexto de secundaria", color: "amber" }
    ],
    years: [2026],
    getStages: () => ["Etapa única"]
  },
  copernicus_math: {
    title: "Concurso Copernicus Math",
    description: "Estructura de contenidos por categorías, rondas y colecciones anuales",
    levels: [
      { id: "1", name: "Categoría 1", desc: "Grados 3 y 4", color: "blue" },
      { id: "2", name: "Categoría 2", desc: "Grados 5 y 6", color: "red" },
      { id: "3", name: "Categoría 3", desc: "Grados 7 y 8", color: "teal" },
      { id: "4", name: "Categoría 4", desc: "Grados 9 y 10", color: "orange" },
      { id: "5", name: "Categoría 5", desc: "Grados 11 y 12", color: "blue" }
    ],
    years: [2023, 2024, 2025, 2026],
    getStages: () => ["Ronda clasificatoria", "Ronda global"]
  },
  descubrimiento_matematico: {
    title: "Concurso Internacional de Descubrimiento Matemático",
    description: "Para estudiantes de 3.º, 4.º, 5.º y 6.º de Primaria",
    levels: [
      { id: "1", name: "3.º de Primaria", desc: "Tercer grado de primaria", color: "green" },
      { id: "2", name: "4.º de Primaria", desc: "Cuarto grado de primaria", color: "blue" },
      { id: "3", name: "5.º de Primaria", desc: "Quinto grado de primaria", color: "orange" },
      { id: "4", name: "6.º de Primaria", desc: "Sexto grado de primaria", color: "purple" }
    ],
    years: [2023, 2024, 2025, 2026],
    getStages: (year) => year === 2023 ? ["Etapa única"] : ["Etapa clasificatoria", "Etapa nacional"]
  },
  spirit_of_math: {
    title: "Olimpiada Spirit of Math",
    description: "Releasing the Genius® - Grados y categorías por año",
    levels: [
      { id: "1", name: "Categoría 1", desc: "Grados 3 y 4 de primaria", color: "green" },
      { id: "2", name: "Categoría 2", desc: "Grados 5 y 6 de primaria", color: "amber" },
      { id: "3", name: "Categoría 3", desc: "Grados 7 y 8 de secundaria", color: "purple" },
      { id: "4", name: "Categoría 4", desc: "Grados 9, 10 y 11 de secundaria", color: "blue" }
    ],
    years: [2023, 2024, 2025, 2026],
    getStages: () => ["Ronda única"]
  },
  geometria_origuela: {
    title: "Olimpiada Nacional de Geometría",
    description: "Estructura de recursos por nivel y año",
    levels: [
      { id: "1", name: "Nivel A", desc: "Estudiantes de quinto y sexto de primaria", color: "blue" },
      { id: "2", name: "Nivel 1", desc: "Estudiantes de primero y segundo de secundaria", color: "green" },
      { id: "3", name: "Nivel 2", desc: "Estudiantes de tercero y cuarto de secundaria", color: "purple" },
      { id: "4", name: "Nivel 3", desc: "Estudiantes de quinto de secundaria", color: "orange" }
    ],
    years: [2024, 2025, 2026],
    getStages: () => ["Fase eliminatoria", "Fase final"]
  },
  olimpiada_andes: {
    title: "Olimpiada Matemática de los Andes",
    description: "Centro de Resolución Olímpica - Ronda única",
    levels: [
      { id: "1", name: "Nivel 1", desc: "Estudiantes de 5.º de primaria", color: "green" },
      { id: "2", name: "Nivel 2", desc: "Estudiantes de 6.º de primaria", color: "orange" },
      { id: "3", name: "Nivel 3", desc: "Estudiantes de 1.º de secundaria", color: "red" },
      { id: "4", name: "Nivel 4", desc: "Estudiantes de 2.º de secundaria", color: "purple" },
      { id: "5", name: "Nivel 5", desc: "Estudiantes de 3.º de secundaria", color: "blue" }
    ],
    years: [2026],
    getStages: () => ["Etapa única"]
  },
  olimpiada_mayo: {
    title: "Olimpiada de Mayo",
    description: "Competencia internacional que fomenta el desarrollo de habilidades matemáticas",
    levels: [
      { id: "1", name: "Nivel 1", desc: "Primer nivel de competición", color: "green" },
      { id: "2", name: "Nivel 2", desc: "Segundo nivel de competición", color: "blue" }
    ],
    years: [2020, 2021, 2022, 2023, 2024],
    getStages: () => ["Etapa única"]
  },
  olimpiada_imc_de_matematicas: {
    title: "Olimpiada IMC de Matemáticas",
    description: "International Mathematics Competition - Desafiando fronteras",
    levels: [
      { id: "1", name: "Nivel 1", desc: "Categoría Junior / Key Stage 2", color: "blue" },
      { id: "2", name: "Nivel 2", desc: "Categoría Senior / Key Stage 3", color: "amber" }
    ],
    years: [2022, 2023, 2024, 2025, 2026],
    getStages: () => ["Fase individual", "Fase grupal"]
  },
  irani_combinatoria: {
    title: "Olimpiada Iraní de Combinatoria",
    description: "Estructura de contenidos por niveles y colecciones anuales",
    levels: [
      { id: "1", name: "Nivel Elemental", desc: "Equipos de estudiantes de 2° y/o 3° de secundaria", color: "purple" },
      { id: "2", name: "Nivel Avanzado", desc: "Equipos de estudiantes de 4° y/o 5° de secundaria", color: "blue" }
    ],
    years: [2020, 2021, 2022, 2023, 2024, 2025],
    getStages: () => ["Etapa única"]
  },
  irani_geometria: {
    title: "Olimpiada Iraní de Geometría",
    description: "Estructura de contenidos por niveles y colecciones anuales",
    levels: [
      { id: "1", name: "Nivel Elemental", desc: "1° y 2° de secundaria", color: "cyan" },
      { id: "2", name: "Nivel Intermedio", desc: "3° y 4° de secundaria", color: "fuchsia" },
      { id: "3", name: "Nivel Avanzado", desc: "5° de secundaria", color: "amber" }
    ],
    years: [2020, 2021, 2022, 2023, 2024, 2025],
    getStages: () => ["Etapa única"]
  },
  olimpiada_navidena: {
    title: "Olimpiada Navideña de Matemáticas",
    description: "Estructura de contenidos por niveles y colecciones anuales",
    levels: [
      { id: "1", name: "Nivel A", desc: "Estudiantes que cursaron 5° o 6° de primaria", color: "green" },
      { id: "2", name: "Nivel 1", desc: "Estudiantes que cursaron 1° o 2° de secundaria", color: "red" },
      { id: "3", name: "Nivel 2", desc: "Estudiantes que cursaron 3°, 4° o 5° de secundaria", color: "blue" }
    ],
    years: [2021, 2022, 2023, 2024, 2025],
    getStages: () => ["Etapa única"]
  },
  torneo_ciudades: {
    title: "Torneo de las Ciudades",
    description: "Estructura de contenidos por niveles, años y giras",
    levels: [
      { id: "1", name: "Nivel Juvenil", desc: "2° y 3° de secundaria - Grados 8–9", color: "blue" },
      { id: "2", name: "Nivel Mayor", desc: "4° y 5° de secundaria - Grados 10–11", color: "purple" }
    ],
    years: [2021, 2022, 2023, 2024, 2025],
    getStages: () => ["Gira de otoño", "Gira de primavera"]
  },
  torneo_jovenes_matematicos: {
    title: "Torneo de Jóvenes Matemáticos",
    description: "Estructura de contenidos por niveles, pruebas y colecciones anuales",
    levels: [
      { id: "1", name: "Nivel 1", desc: "Grados 8 y 9", color: "cyan" },
      { id: "2", name: "Nivel 2", desc: "Grado 10", color: "amber" },
      { id: "3", name: "Nivel 3", desc: "Grado 11", color: "blue" },
      { id: "4", name: "Nivel 4", desc: "Grado 12 / Egresados", color: "purple" }
    ],
    years: [2021, 2022, 2023, 2024, 2025],
    getStages: () => ["Prueba regional", "Ronda nacional", "Ronda internacional"]
  }
}

export function UnifiedSolucionarioView({ id, logo }: { id: string; logo?: string }) {
  // Obtener configuración para este ID
  const config = SOLUCIONARIOS_CONFIG[id] || SOLUCIONARIOS_CONFIG.selectivo_onem
  const finalLogo = logo || "/logo_principal.png"

  // Separar título para aplicar gradiente al final
  const titleWords = config.title.split(" ")
  const lastWord = titleWords.pop() || ""
  const prefixTitle = titleWords.join(" ")

  // Determinar cuántas columnas usar en el grid de niveles
  const gridColsClass = 
    config.levels.length === 2 
      ? "grid-cols-1 lg:grid-cols-2" 
      : config.levels.length === 3 
        ? "grid-cols-1 xl:grid-cols-3" 
        : config.levels.length === 4 
          ? "grid-cols-1 md:grid-cols-2 xl:grid-cols-4" 
          : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      
      {/* HEADER SECTION (Estructura ONEM) */}
      <div className="bg-card/30 p-6 md:p-8 rounded-[2.5rem] border border-border/50 relative overflow-hidden flex flex-col md:flex-row items-center gap-8 shadow-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-0" />
        
        {/* Logo en caja blanca */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 z-10 bg-white rounded-3xl p-4 shadow-xl border border-white/20 flex items-center justify-center">
          <Image
            src={finalLogo}
            alt={config.title}
            fill
            className="object-contain p-4"
          />
        </div>

        {/* Título y descripción */}
        <div className="relative z-10 space-y-2 flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tight uppercase leading-none">
            {prefixTitle}{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
              {lastWord}
            </span>
          </h1>
          <p className="text-base md:text-lg font-semibold text-muted-foreground">
            {config.description}
          </p>
        </div>
      </div>

      {/* GRID DE NIVELES (Estructura ONEM) */}
      <div className={`grid ${gridColsClass} gap-6`}>
        {config.levels.map((nivel) => {
          const colors = COLOR_MAP[nivel.color] || DEFAULT_COLORS
          return (
            <div 
              key={nivel.id} 
              className={`rounded-[2rem] border ${colors.borderColor} ${colors.cardBg} overflow-hidden shadow-sm flex flex-col relative transition-colors`}
            >
              
              {/* Cabecera del Nivel */}
              <div className="p-6 flex items-center gap-4 border-b border-border/50 bg-background/40">
                <div className={`h-14 w-14 rounded-full ${colors.bgColor} flex items-center justify-center shrink-0 shadow-lg`}>
                  <GraduationCap className="h-7 w-7 text-white" />
                </div>
                <div>
                  <h3 className={`font-black text-2xl tracking-tight ${colors.textColor}`}>
                    {nivel.name}
                  </h3>
                  <p className="text-xs font-semibold text-muted-foreground leading-tight mt-0.5">
                    {nivel.desc}
                  </p>
                </div>
              </div>

              {/* Lista de Años dentro del Nivel */}
              <div className="flex-1 flex flex-col divide-y divide-border/50 p-4 gap-4">
                {config.years.map((year) => {
                  const stages = config.getStages(year)
                  return (
                    <div key={year} className="pt-4 first:pt-0">
                      {stages.length === 1 ? (
                        
                        // Diseño de Etapa Única (Año 2023 en ONEM)
                        <div className="flex items-center gap-4 bg-background/50 rounded-2xl p-4 border border-border/50 shadow-sm hover:shadow-md transition-all">
                          <div className="w-24 text-center shrink-0 flex flex-col items-center justify-center gap-1.5">
                            <span className={`text-2xl font-black ${colors.textColor}`}>
                              {year}
                            </span>
                            <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${colors.lightBg} ${colors.textColor} whitespace-nowrap`}>
                              {stages[0]}
                            </span>
                          </div>
                          
                          <div className="flex-1 flex justify-around items-center gap-2">
                            <button className="flex flex-col items-center gap-1 group w-1/3">
                              <div className={`h-9 w-9 rounded-xl ${colors.lightBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <FileText className={`h-4 w-4 ${colors.textColor}`} />
                              </div>
                              <span className="text-[8px] font-black uppercase text-muted-foreground text-center leading-none mt-0.5 group-hover:text-foreground">
                                Examen
                              </span>
                            </button>
                            <button className="flex flex-col items-center gap-1 group w-1/3">
                              <div className={`h-9 w-9 rounded-xl ${colors.lightBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <PlayCircle className={`h-4 w-4 ${colors.textColor}`} />
                              </div>
                              <span className="text-[8px] font-black uppercase text-muted-foreground text-center leading-none mt-0.5 group-hover:text-foreground">
                                Video
                              </span>
                            </button>
                            <button className="flex flex-col items-center gap-1 group w-1/3">
                              <div className={`h-9 w-9 rounded-xl ${colors.lightBg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                                <ClipboardCheck className={`h-4 w-4 ${colors.textColor}`} />
                              </div>
                              <span className="text-[8px] font-black uppercase text-muted-foreground text-center leading-none mt-0.5 group-hover:text-foreground">
                                Simulacro
                              </span>
                            </button>
                          </div>
                        </div>
                      ) : (
                        
                        // Diseño de Varias Etapas (Año 2024+ en ONEM)
                        <div className="flex flex-col md:flex-row items-center gap-3 bg-background/50 rounded-2xl p-4 border border-border/50 shadow-sm hover:shadow-md transition-all">
                          <div className="w-16 md:w-20 text-center shrink-0 md:border-r border-border/50 py-1">
                            <span className={`text-2xl font-black ${colors.textColor}`}>
                              {year}
                            </span>
                          </div>
                          
                          <div className="flex-1 flex gap-2 md:gap-4 divide-x divide-border/50 w-full">
                            {stages.map((stageName, sIndex) => (
                              <div 
                                key={stageName} 
                                className={`flex-1 flex flex-col items-center gap-2 ${sIndex > 0 ? "pl-2 md:pl-4" : ""}`}
                              >
                                <span className={`text-[8px] font-black uppercase tracking-wider px-2 py-0.5 rounded-full ${colors.lightBg} ${colors.textColor} whitespace-nowrap text-center`}>
                                  {stageName}
                                </span>
                                <div className="flex justify-around items-center w-full max-w-[120px] mt-1">
                                  <button className="group p-1" title="Examen oficial">
                                    <FileText className={`h-4.5 w-4.5 text-muted-foreground group-hover:${colors.textColor} transition-colors`} />
                                  </button>
                                  <button className="group p-1" title="Solución en video">
                                    <PlayCircle className={`h-4.5 w-4.5 text-muted-foreground group-hover:${colors.textColor} transition-colors`} />
                                  </button>
                                  <button className="group p-1" title="Examen simulacro">
                                    <ClipboardCheck className={`h-4.5 w-4.5 text-muted-foreground group-hover:${colors.textColor} transition-colors`} />
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )
        })}
      </div>

      {/* FOOTER INFO BLOCKS (Estructura ONEM) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <div className="bg-card/50 p-6 rounded-3xl border border-border/50 flex items-center gap-4 hover:bg-card transition-colors">
          <div className="h-14 w-14 rounded-2xl bg-purple-600/10 flex items-center justify-center shrink-0">
            <Folder className="h-7 w-7 text-purple-500" />
          </div>
          <div>
            <h4 className="text-sm font-black text-foreground">Recursos organizados</h4>
            <p className="text-xs text-muted-foreground font-medium mt-1 leading-snug">
              Accede fácilmente a exámenes, solucionarios y simulacros.
            </p>
          </div>
        </div>
        
        <div className="bg-card/50 p-6 rounded-3xl border border-border/50 flex items-center gap-4 hover:bg-card transition-colors">
          <div className="h-14 w-14 rounded-2xl bg-blue-600/10 flex items-center justify-center shrink-0">
            <Target className="h-7 w-7 text-blue-500" />
          </div>
          <div>
            <h4 className="text-sm font-black text-foreground">Prepárate con enfoque</h4>
            <p className="text-xs text-muted-foreground font-medium mt-1 leading-snug">
              Practica por etapas y refuerza tus conocimientos.
            </p>
          </div>
        </div>

        <div className="bg-card/50 p-6 rounded-3xl border border-border/50 flex items-center gap-4 hover:bg-card transition-colors">
          <div className="h-14 w-14 rounded-2xl bg-amber-600/10 flex items-center justify-center shrink-0">
            <Trophy className="h-7 w-7 text-amber-500" />
          </div>
          <div>
            <h4 className="text-sm font-black text-foreground">Alcanza tu mejor versión</h4>
            <p className="text-xs text-muted-foreground font-medium mt-1 leading-snug">
              Cada recurso te acerca más a tu objetivo.
            </p>
          </div>
        </div>
      </div>

    </div>
  )
}
