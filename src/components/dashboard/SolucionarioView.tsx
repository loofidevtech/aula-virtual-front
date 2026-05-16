"use client"

import { useState } from "react"
import Image from "next/image"
import { 
  GraduationCap, 
  Trophy, 
  Calendar, 
  FileText, 
  PlayCircle, 
  ClipboardCheck, 
  Info
} from "lucide-react"

// Datos estáticos movidos al frontend para Olimpiada Logical
const LOGICAL_DATA = {
  title: "Olimpiada Matemática de Logical",
  subtitle: "Centro de Resolución Olímpica",
  description: "Estructura de contenidos por niveles, etapas y colecciones anuales.",
  stats: {
    niveles: 3,
    etapas: 2,
    periodo: "2021-2026"
  },
  niveles: [
    {
      id: "1",
      name: "Nivel I",
      description: "6° de primaria y 1° de secundaria",
      years: [2021, 2022, 2023, 2024, 2025, 2026],
      rounds: [
        {
          name: "Prueba eliminatoria",
          items: [
            { type: "examen", label: "Examen original" },
            { type: "video", label: "Solución en video" },
            { type: "simulacro", label: "Simulacro" }
          ]
        },
        {
          name: "Ronda final",
          items: [
            { type: "examen", label: "Examen original" },
            { type: "video", label: "Solución en video" },
            { type: "simulacro", label: "Simulacro" }
          ]
        }
      ]
    },
    {
      id: "2",
      name: "Nivel II",
      description: "2° y 3° de secundaria",
      years: [2021, 2022, 2023, 2024, 2025, 2026],
      rounds: [
        {
          name: "Prueba eliminatoria",
          items: [
            { type: "examen", label: "Examen original" },
            { type: "video", label: "Solución en video" },
            { type: "simulacro", label: "Simulacro" }
          ]
        },
        {
          name: "Ronda final",
          items: [
            { type: "examen", label: "Examen original" },
            { type: "video", label: "Solución en video" },
            { type: "simulacro", label: "Simulacro" }
          ]
        }
      ]
    },
    {
      id: "3",
      name: "Nivel III",
      description: "4° y 5° de secundaria",
      years: [2021, 2022, 2023, 2024, 2025, 2026],
      rounds: [
        {
          name: "Prueba eliminatoria",
          items: [
            { type: "examen", label: "Examen original" },
            { type: "video", label: "Solución en video" },
            { type: "simulacro", label: "Simulacro" }
          ]
        },
        {
          name: "Ronda final",
          items: [
            { type: "examen", label: "Examen original" },
            { type: "video", label: "Solución en video" },
            { type: "simulacro", label: "Simulacro" }
          ]
        }
      ]
    }
  ]
}

export function SolucionarioView({ logo }: { logo: string }) {
  const [selectedYear, setSelectedYear] = useState(2026)
  const data = LOGICAL_DATA

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-center gap-8 bg-card/30 p-8 rounded-[2.5rem] border border-border/50">
        <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0">
          <Image
            src={logo}
            alt={data.title}
            fill
            className="object-contain drop-shadow-2xl"
          />
        </div>
        <div className="flex-1 text-center md:text-left space-y-2">
          <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
            {data.title}
          </h1>
          <h2 className="text-xl font-bold text-primary italic">
            {data.subtitle}
          </h2>
          <p className="text-muted-foreground text-sm font-medium max-w-2xl">
            {data.description}
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-card rounded-3xl p-6 border border-border/50 flex items-center gap-4 shadow-xl">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <GraduationCap className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-foreground">{data.stats.niveles} niveles</p>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">de competencia</p>
          </div>
        </div>
        <div className="bg-card rounded-3xl p-6 border border-border/50 flex items-center gap-4 shadow-xl">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Trophy className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-foreground">{data.stats.etapas} etapas</p>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">de evaluación</p>
          </div>
        </div>
        <div className="bg-card rounded-3xl p-6 border border-border/50 flex items-center gap-4 shadow-xl">
          <div className="h-12 w-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary">
            <Calendar className="h-6 w-6" />
          </div>
          <div>
            <p className="text-2xl font-black text-foreground">{data.stats.periodo}</p>
            <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest">colecciones anuales</p>
          </div>
        </div>
      </div>

      {/* Niveles Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {data.niveles.map((nivel) => (
          <div key={nivel.id} className="bg-card rounded-[2.5rem] border border-border/50 overflow-hidden flex flex-col shadow-2xl">
            {/* Nivel Header */}
            <div className="p-6 pb-4 flex items-center gap-4 border-b border-border/50">
              <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-black text-xl">
                {nivel.id === "1" ? "I" : nivel.id === "2" ? "II" : "III"}
              </div>
              <div>
                <h3 className="font-black text-lg text-foreground">{nivel.name}</h3>
                <p className="text-xs font-bold text-muted-foreground">{nivel.description}</p>
              </div>
            </div>

            {/* Year Selector */}
            <div className="p-4 flex gap-2 overflow-x-auto no-scrollbar border-b border-border/50 bg-muted/20">
              {nivel.years.map((year) => (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all ${
                    selectedYear === year 
                      ? "bg-primary text-white shadow-lg shadow-primary/30" 
                      : "text-muted-foreground hover:bg-muted"
                  }`}
                >
                  {year}
                </button>
              ))}
            </div>

            {/* Rounds Content */}
            <div className="p-6 space-y-8 flex-1">
              {nivel.rounds.map((round, idx) => (
                <div key={idx} className="space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <Trophy className="h-4 w-4" />
                    <span className="text-sm font-black uppercase tracking-wider">{round.name}</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2">
                    {round.items.map((item, i) => (
                      <button
                        key={i}
                        className="flex flex-col items-center justify-center gap-2 p-3 rounded-2xl border border-border/50 bg-muted/30 hover:bg-muted transition-all group"
                      >
                        {item.type === "examen" && <FileText className="h-5 w-5 text-blue-400" />}
                        {item.type === "video" && <PlayCircle className="h-5 w-5 text-primary" />}
                        {item.type === "simulacro" && <ClipboardCheck className="h-5 w-5 text-green-400" />}
                        <span className="text-[10px] font-bold text-muted-foreground group-hover:text-foreground text-center leading-tight">
                          {item.label}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Info Footer */}
      <div className="bg-primary/5 border border-primary/20 rounded-2xl p-4 flex items-center gap-4">
        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white shrink-0">
          <Info className="h-5 w-5" />
        </div>
        <p className="text-sm font-bold text-muted-foreground">
          Cada año incluye su examen original, solución en video y simulacro en la prueba eliminatoria y en la ronda final.
        </p>
      </div>
    </div>
  )
}
