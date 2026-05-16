"use client"

import Image from "next/image"
import { 
  FileText, 
  PlayCircle, 
  ClipboardCheck, 
  TrendingUp,
  GraduationCap,
  BookOpen
} from "lucide-react"

// Datos estáticos movidos al frontend para Competencia Paralela
const PARALELA_DATA = {
  title: "Competencia Paralela de Matemática",
  subtitle: "Programa de Recursos",
  description: "Ediciones 2023 - 2026",
  niveles: [
    {
      id: "primaria",
      name: "Nivel Primaria",
      description: "3.° a 6.° de primaria",
      color: "blue",
      years: [
        {
          year: 2023,
          stages: [{ name: "Etapa única", color: "bg-blue-200 text-blue-800" }]
        },
        {
          year: 2024,
          stages: [
            { name: "Etapa clasificatoria", color: "bg-green-100 text-green-800" },
            { name: "Etapa nacional", color: "bg-green-600 text-white" }
          ]
        },
        {
          year: 2025,
          stages: [
            { name: "Etapa clasificatoria", color: "bg-green-100 text-green-800" },
            { name: "Etapa nacional", color: "bg-green-600 text-white" }
          ]
        },
        {
          year: 2026,
          stages: [
            { name: "Etapa clasificatoria", color: "bg-green-100 text-green-800" },
            { name: "Etapa nacional", color: "bg-green-600 text-white" }
          ]
        }
      ]
    },
    {
      id: "secundaria",
      name: "Nivel Secundaria",
      description: "1.° a 5.° de secundaria",
      color: "green",
      years: [
        {
          year: 2023,
          stages: [{ name: "Etapa única", color: "bg-blue-200 text-blue-800" }]
        },
        {
          year: 2024,
          stages: [
            { name: "Etapa clasificatoria", color: "bg-green-100 text-green-800" },
            { name: "Etapa nacional", color: "bg-green-600 text-white" }
          ]
        },
        {
          year: 2025,
          stages: [
            { name: "Etapa clasificatoria", color: "bg-green-100 text-green-800" },
            { name: "Etapa nacional", color: "bg-green-600 text-white" }
          ]
        },
        {
          year: 2026,
          stages: [
            { name: "Etapa clasificatoria", color: "bg-green-100 text-green-800" },
            { name: "Etapa nacional", color: "bg-green-600 text-white" }
          ]
        }
      ]
    }
  ]
}

export function ParalelaView({ logo }: { logo?: string }) {
  const data = PARALELA_DATA
  const finalLogo = logo || "/assets/logos/solucionarios/competencia_paralela.png"

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Header Section */}
      <div className="bg-card/30 p-8 rounded-[2.5rem] border border-border/50 relative overflow-hidden flex flex-col md:flex-row items-center gap-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-0" />
        
        {/* Logo */}
        <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0 z-10">
          <Image
            src={finalLogo}
            alt={data.title}
            fill
            className="object-contain drop-shadow-xl"
          />
        </div>

        <div className="relative z-10 space-y-2 text-center md:text-left flex-1">
          <h1 className="text-3xl md:text-5xl font-black text-foreground tracking-tight">
            {data.subtitle} – <span className="text-primary">{data.title}</span>
          </h1>
          <p className="text-xl font-bold text-muted-foreground italic">
            {data.description}
          </p>
        </div>
      </div>

      {/* Levels Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {data.niveles.map((nivel) => (
          <div key={nivel.id} className="bg-card rounded-[2.5rem] border border-border/50 overflow-hidden flex flex-col shadow-2xl">
            {/* Nivel Header */}
            <div className={`p-6 flex items-center gap-4 border-b border-border/50 ${nivel.color === "blue" ? "bg-blue-500" : "bg-green-600"}`}>
              <div className="h-14 w-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30">
                {nivel.id === "primaria" ? <BookOpen className="h-8 w-8" /> : <GraduationCap className="h-8 w-8" />}
              </div>
              <div>
                <h3 className="font-black text-2xl text-white uppercase tracking-tight">{nivel.name}</h3>
                <p className="text-sm font-bold text-white/80 italic">{nivel.description}</p>
              </div>
            </div>

            {/* Years Horizontal Grid */}
            <div className="p-4 grid grid-cols-4 gap-2 bg-muted/20 border-b border-border/50">
              {nivel.years.map((y) => (
                <div key={y.year} className="text-center">
                  <span className="text-xl font-black text-foreground">{y.year}</span>
                </div>
              ))}
            </div>

            {/* Content per Year */}
            <div className="p-4 grid grid-cols-4 gap-4 flex-1">
              {nivel.years.map((y) => (
                <div key={y.year} className="space-y-4">
                  {/* Stages */}
                  <div className="space-y-1">
                    {y.stages.map((stage, idx) => (
                      <div 
                        key={idx} 
                        className={`text-[9px] font-black p-1.5 rounded-md text-center uppercase tracking-tighter leading-none ${stage.color}`}
                      >
                        {stage.name}
                      </div>
                    ))}
                    {y.stages.length === 1 && <div className="h-[22px]" />} 
                  </div>

                  {/* Resources Icons */}
                  <div className="space-y-3 pt-2">
                    <div className="flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="h-10 w-10 rounded-xl bg-white border border-border/50 shadow-md flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                        <FileText className="h-5 w-5 text-blue-500 group-hover:text-white" />
                      </div>
                      <span className="text-[9px] font-bold text-muted-foreground text-center leading-none">Examen</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="h-10 w-10 rounded-xl bg-white border border-border/50 shadow-md flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                        <PlayCircle className="h-5 w-5 text-primary group-hover:text-white" />
                      </div>
                      <span className="text-[9px] font-bold text-muted-foreground text-center leading-none">Solucionario</span>
                    </div>
                    <div className="flex flex-col items-center gap-2 group cursor-pointer">
                      <div className="h-10 w-10 rounded-xl bg-white border border-border/50 shadow-md flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                        <ClipboardCheck className="h-5 w-5 text-gray-800 group-hover:text-white" />
                      </div>
                      <span className="text-[9px] font-bold text-muted-foreground text-center leading-none">Simulacro</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer Info Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 bg-card/30 p-8 rounded-[2.5rem] border border-border/50">
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white shadow-lg">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-black text-foreground">Exámenes oficiales</p>
            <p className="text-[10px] font-medium text-muted-foreground">Accede a las pruebas de cada etapa.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white shadow-lg">
            <PlayCircle className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-black text-foreground">Soluciones en video</p>
            <p className="text-[10px] font-medium text-muted-foreground">Aprende paso a paso con nuestros videos.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-gray-800 flex items-center justify-center text-white shadow-lg">
            <ClipboardCheck className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-black text-foreground">Simulacros</p>
            <p className="text-[10px] font-medium text-muted-foreground">Practica con exámenes tipo competencia.</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="h-12 w-12 rounded-full bg-green-600 flex items-center justify-center text-white shadow-lg">
            <TrendingUp className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-black text-foreground">Práctica por niveles</p>
            <p className="text-[10px] font-medium text-muted-foreground">Recursos organizados por nivel educativo.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
