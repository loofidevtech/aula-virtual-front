"use client"

import { useState } from "react"
import Image from "next/image"
import { 
  FileText, 
  PlaySquare, 
  ClipboardCheck, 
  Trophy,
  Globe,
  Info,
  LayoutGrid,
  Calendar
} from "lucide-react"

const CATEGORIES = [
  { id: 1, name: "Categoría 1", grades: "Grados 3 y 4", color: "#2563EB", bgColor: "bg-blue-600", borderColor: "border-blue-600", textColor: "text-blue-500" },
  { id: 2, name: "Categoría 2", grades: "Grados 5 y 6", color: "#DC2626", bgColor: "bg-red-600", borderColor: "border-red-600", textColor: "text-red-500" },
  { id: 3, name: "Categoría 3", grades: "Grados 7 y 8", color: "#0D9488", bgColor: "bg-teal-600", borderColor: "border-teal-600", textColor: "text-teal-500" },
  { id: 4, name: "Categoría 4", grades: "Grados 9 y 10", color: "#F59E0B", bgColor: "bg-orange-500", borderColor: "border-orange-500", textColor: "text-orange-500" },
  { id: 5, name: "Categoría 5", grades: "Grados 11 y 12", color: "#1E40AF", bgColor: "bg-blue-800", borderColor: "border-blue-800", textColor: "text-blue-700" },
]

const YEARS = [2023, 2024, 2025, 2026]

export function CopernicusView({ logo }: { logo?: string }) {
  const [selectedCatId, setSelectedCatId] = useState<number>(1)
  const [selectedYear, setSelectedYear] = useState<number>(2026)

  const finalLogo = logo || "/assets/logos/solucionarios/concurso_copernicus_math.png"
  const activeCategory = CATEGORIES.find(c => c.id === selectedCatId) || CATEGORIES[0]

  return (
    <div className="space-y-6 animate-in fade-in duration-700 pb-10">
      
      {/* HEADER ROW */}
      <div className="flex flex-col xl:flex-row gap-6 justify-between items-start xl:items-center bg-card/30 p-6 md:p-8 rounded-[2.5rem] border border-border/50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -z-0" />
        
        <div className="flex items-center gap-6 relative z-10">
          <div className="w-24 h-24 md:w-32 md:h-20 shrink-0 bg-white rounded-2xl p-2 shadow-xl flex items-center justify-center border border-white/20">
            <Image
              src={finalLogo}
              alt="Copernicus Math"
              width={120}
              height={60}
              className="object-contain drop-shadow-sm"
            />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-blue-500 tracking-tight">
              Copernicus Math
            </h1>
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              Centro de Resolución Olímpica
            </h2>
            <p className="text-sm font-medium text-muted-foreground mt-1">
              Estructura de contenidos por categorías, rondas y colecciones anuales
            </p>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 relative z-10 w-full xl:w-auto">
          <div className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/50 shadow-sm flex-1 xl:flex-none">
            <div className="h-10 w-10 rounded-full bg-blue-900 flex items-center justify-center text-white">
              <LayoutGrid className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black leading-none text-foreground">5</p>
              <p className="text-[10px] uppercase font-bold text-muted-foreground">Categorías</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/50 shadow-sm flex-1 xl:flex-none">
            <div className="h-10 w-10 rounded-full bg-orange-500 flex items-center justify-center text-white">
              <Trophy className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black leading-none text-foreground">2</p>
              <p className="text-[10px] uppercase font-bold text-muted-foreground">Rondas</p>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-card p-4 rounded-2xl border border-border/50 shadow-sm flex-1 xl:flex-none">
            <div className="h-10 w-10 rounded-full bg-teal-600 flex items-center justify-center text-white">
              <Calendar className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xl font-black leading-none text-foreground">2023-2026</p>
              <p className="text-[10px] uppercase font-bold text-muted-foreground">Colecciones anuales</p>
            </div>
          </div>
        </div>
      </div>

      {/* CATEGORIES SELECTION (TABS) */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {CATEGORIES.map((cat) => {
          const isSelected = selectedCatId === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => setSelectedCatId(cat.id)}
              className={`relative flex flex-col items-center justify-center p-6 rounded-[2rem] border-2 transition-all duration-300 shadow-sm bg-card hover:-translate-y-1 ${
                isSelected ? cat.borderColor : "border-border/50 hover:border-white/20"
              }`}
            >
              {isSelected && (
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-current opacity-[0.03] rounded-[2rem]" style={{ color: cat.color }} />
              )}
              <div 
                className={`h-12 w-12 rounded-full flex items-center justify-center text-xl font-black text-white mb-3 shadow-md transition-transform ${isSelected ? 'scale-110' : ''}`}
                style={{ backgroundColor: cat.color }}
              >
                {cat.id}
              </div>
              <h3 className={`text-lg font-black tracking-tight ${isSelected ? cat.textColor : 'text-foreground'}`}>
                {cat.name}
              </h3>
              <p className="text-xs font-bold text-muted-foreground">{cat.grades}</p>
            </button>
          )
        })}
      </div>

      {/* CONTENT AREA FOR SELECTED CATEGORY */}
      <div className="bg-card rounded-[2.5rem] border border-border/50 overflow-hidden shadow-2xl relative">
        {/* Subtle background glow based on selected category */}
        <div 
          className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[100px] opacity-10 pointer-events-none"
          style={{ backgroundColor: activeCategory.color }}
        />

        {/* Content Header (Category Info + Years Tabs) */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row items-center justify-between border-b border-border/50 gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div 
              className="h-12 w-12 rounded-full flex items-center justify-center text-2xl font-black text-white shadow-md"
              style={{ backgroundColor: activeCategory.color }}
            >
              {activeCategory.id}
            </div>
            <div>
              <h3 className="text-2xl font-black text-foreground">{activeCategory.name}</h3>
              <p className="text-sm font-bold text-muted-foreground">{activeCategory.grades}</p>
            </div>
          </div>

          <div className="flex gap-2 bg-background/50 p-1.5 rounded-2xl border border-border/50">
            {YEARS.map(year => {
              const isYearSelected = selectedYear === year
              return (
                <button
                  key={year}
                  onClick={() => setSelectedYear(year)}
                  className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 ${
                    isYearSelected 
                      ? "text-white shadow-md" 
                      : "text-muted-foreground hover:text-foreground hover:bg-white/5"
                  }`}
                  style={{ backgroundColor: isYearSelected ? activeCategory.color : "transparent" }}
                >
                  {year}
                </button>
              )
            })}
          </div>
        </div>

        {/* Rounds Area */}
        <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          
          {/* Ronda Clasificatoria */}
          <div className="bg-background/50 rounded-[2rem] border border-border/50 p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-6 text-blue-500">
              <Trophy className="h-6 w-6" />
              <h4 className="text-xl font-black">Ronda clasificatoria</h4>
            </div>
            <div className="grid grid-cols-3 gap-4 flex-1">
              <div className="bg-card rounded-2xl border border-border/50 p-4 flex flex-col items-center justify-center gap-3 hover:border-blue-500/50 hover:bg-white/5 cursor-pointer transition-all group shadow-sm">
                <FileText className="h-10 w-10 text-blue-500 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-center leading-tight">Examen<br/>original</span>
              </div>
              <div className="bg-card rounded-2xl border border-border/50 p-4 flex flex-col items-center justify-center gap-3 hover:border-red-500/50 hover:bg-white/5 cursor-pointer transition-all group shadow-sm">
                <PlaySquare className="h-10 w-10 text-red-500 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-center leading-tight">Solución<br/>en video</span>
              </div>
              <div className="bg-card rounded-2xl border border-border/50 p-4 flex flex-col items-center justify-center gap-3 hover:border-teal-500/50 hover:bg-white/5 cursor-pointer transition-all group shadow-sm">
                <ClipboardCheck className="h-10 w-10 text-teal-500 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-center leading-tight">Simulacro</span>
              </div>
            </div>
          </div>

          {/* Ronda Global */}
          <div className="bg-background/50 rounded-[2rem] border border-border/50 p-6 flex flex-col">
            <div className="flex items-center gap-3 mb-6 text-orange-500">
              <Globe className="h-6 w-6" />
              <h4 className="text-xl font-black">Ronda global</h4>
            </div>
            <div className="grid grid-cols-3 gap-4 flex-1">
              <div className="bg-card rounded-2xl border border-border/50 p-4 flex flex-col items-center justify-center gap-3 hover:border-blue-500/50 hover:bg-white/5 cursor-pointer transition-all group shadow-sm">
                <FileText className="h-10 w-10 text-blue-500 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-center leading-tight">Examen<br/>original</span>
              </div>
              <div className="bg-card rounded-2xl border border-border/50 p-4 flex flex-col items-center justify-center gap-3 hover:border-red-500/50 hover:bg-white/5 cursor-pointer transition-all group shadow-sm">
                <PlaySquare className="h-10 w-10 text-red-500 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-center leading-tight">Solución<br/>en video</span>
              </div>
              <div className="bg-card rounded-2xl border border-border/50 p-4 flex flex-col items-center justify-center gap-3 hover:border-teal-500/50 hover:bg-white/5 cursor-pointer transition-all group shadow-sm">
                <ClipboardCheck className="h-10 w-10 text-teal-500 group-hover:scale-110 transition-transform" />
                <span className="text-xs font-bold text-center leading-tight">Simulacro</span>
              </div>
            </div>
          </div>

        </div>

        {/* Footer Alert inside the card */}
        <div className="p-4 mx-6 md:mx-8 mb-6 md:mb-8 rounded-2xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center gap-3 relative z-10">
          <div className="h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white shrink-0">
            <Info className="h-4 w-4" />
          </div>
          <p className="text-xs font-bold text-blue-400 text-center">
            Cada año incluye su examen original, solución en video y simulacro en la ronda clasificatoria y en la ronda global.
          </p>
        </div>
      </div>

    </div>
  )
}
