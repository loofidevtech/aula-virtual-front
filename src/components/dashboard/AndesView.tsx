"use client"

import { 
  Mountain, 
  Trophy, 
  Calendar, 
  FileText, 
  PlayCircle, 
  Edit3,
  Info
} from "lucide-react"

const NIVELES = [
  { 
    id: "n1", 
    name: "Nivel 1", 
    desc: "Estudiantes de 5.º de primaria", 
    yearTag: "en el 2025.",
    color: "text-green-600", 
    bg: "bg-green-600", 
    light: "bg-green-600/10", 
    border: "border-green-600/30",
    hoverBorder: "hover:border-green-600/50"
  },
  { 
    id: "n2", 
    name: "Nivel 2", 
    desc: "Estudiantes de 6.º de primaria", 
    yearTag: "en el 2025.",
    color: "text-orange-500", 
    bg: "bg-orange-500", 
    light: "bg-orange-500/10", 
    border: "border-orange-500/30",
    hoverBorder: "hover:border-orange-500/50"
  },
  { 
    id: "n3", 
    name: "Nivel 3", 
    desc: "Estudiantes de 1.º de secundaria", 
    yearTag: "en el 2025.",
    color: "text-red-500", 
    bg: "bg-red-500", 
    light: "bg-red-500/10", 
    border: "border-red-500/30",
    hoverBorder: "hover:border-red-500/50"
  },
  { 
    id: "n4", 
    name: "Nivel 4", 
    desc: "Estudiantes de 2.º de secundaria", 
    yearTag: "en el 2025.",
    color: "text-purple-600", 
    bg: "bg-purple-600", 
    light: "bg-purple-600/10", 
    border: "border-purple-600/30",
    hoverBorder: "hover:border-purple-600/50"
  },
  { 
    id: "n5", 
    name: "Nivel 5", 
    desc: "Estudiantes de 3.º de secundaria", 
    yearTag: "en el 2025.",
    color: "text-blue-600", 
    bg: "bg-blue-600", 
    light: "bg-blue-600/10", 
    border: "border-blue-600/30",
    hoverBorder: "hover:border-blue-600/50"
  },
]

export function AndesView({ logo }: { logo?: string }) {
  const finalLogo = logo || "/assets/logos/solucionarios/olimpiada_de_los_andes.png"

  return (
    <div className="space-y-10 animate-in fade-in duration-700 pb-10">
      
      {/* HEADER SECTION */}
      <div className="flex flex-col xl:flex-row gap-8 items-start xl:items-center justify-between">
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
          {/* Logo */}
          <div className="relative w-36 h-36 md:w-48 md:h-48 shrink-0 bg-white/5 rounded-[2rem] p-4 border border-border/50 shadow-sm flex items-center justify-center">
            <img
              src={finalLogo}
              alt="Olimpiada Matemática de los Andes"
              className="object-contain w-full h-full drop-shadow-2xl"
            />
          </div>

          <div className="space-y-4 max-w-xl">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-foreground leading-tight">
              Olimpiada <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-red-500">Matemática</span><br/>
              de los Andes
            </h1>
            <div>
              <h2 className="text-xl font-bold text-muted-foreground mb-1">Centro de Resolución Olímpica</h2>
              <p className="text-sm font-medium text-muted-foreground/80 leading-relaxed">
                Competencia con ronda única en 2026 y<br/>
                recursos independientes para cada nivel.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Blocks */}
        <div className="flex flex-wrap md:flex-nowrap gap-4 w-full xl:w-auto">
          <div className="bg-purple-600/5 border border-purple-600/20 rounded-3xl p-6 flex items-center gap-4 flex-1 xl:flex-none xl:w-40 justify-center hover:border-purple-600/40 transition-colors">
            <Mountain className="h-10 w-10 text-purple-600 shrink-0" />
            <div className="text-center">
              <span className="block text-3xl font-black text-purple-600 leading-none">5</span>
              <span className="text-xs font-bold text-purple-600/70 uppercase">niveles</span>
            </div>
          </div>
          
          <div className="bg-orange-500/5 border border-orange-500/20 rounded-3xl p-6 flex items-center gap-4 flex-1 xl:flex-none xl:w-40 justify-center hover:border-orange-500/40 transition-colors">
            <Trophy className="h-10 w-10 text-orange-500 shrink-0" />
            <div className="text-center">
              <span className="block text-3xl font-black text-orange-500 leading-none">1</span>
              <span className="text-xs font-bold text-orange-500/70 uppercase">ronda</span>
            </div>
          </div>

          <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-3xl p-6 flex items-center gap-4 flex-1 xl:flex-none xl:w-40 justify-center hover:border-yellow-500/40 transition-colors">
            <Calendar className="h-10 w-10 text-yellow-500 shrink-0" />
            <div className="text-center">
              <span className="block text-3xl font-black text-yellow-500 leading-none">2026</span>
              <span className="text-xs font-bold text-yellow-500/70 uppercase">año</span>
            </div>
          </div>
        </div>
      </div>

      <hr className="border-border/50" />

      {/* NIVELES 2026 OVERVIEW */}
      <div className="space-y-6">
        <h3 className="text-xl font-black text-foreground">Niveles 2026</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {NIVELES.map(nivel => (
            <div key={nivel.id} className={`bg-card rounded-2xl border ${nivel.border} ${nivel.hoverBorder} p-6 flex flex-col items-center justify-center text-center transition-all hover:shadow-md ${nivel.light}`}>
              <h4 className={`text-xl font-black mb-2 ${nivel.color}`}>{nivel.name}</h4>
              <p className="text-xs font-bold text-muted-foreground leading-tight">
                {nivel.desc}<br/>
                <span className={nivel.color}>{nivel.yearTag}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      <hr className="border-border/50" />

      {/* RECURSOS POR NIVEL LIST */}
      <div className="space-y-6">
        <h3 className="text-xl font-black text-foreground">Recursos por nivel</h3>
        
        <div className="bg-card border border-border/50 rounded-3xl overflow-hidden shadow-sm">
          <div className="flex flex-col divide-y divide-border/50">
            {NIVELES.map(nivel => (
              <div key={`row-${nivel.id}`} className="flex flex-col md:flex-row items-start md:items-center p-4 md:p-6 gap-6 hover:bg-white/5 transition-colors">
                
                {/* Level Info */}
                <div className="flex items-center gap-4 md:w-1/3 shrink-0">
                  <span className={`text-lg font-black ${nivel.color} w-20`}>{nivel.name}</span>
                  <p className="text-xs font-medium text-muted-foreground">
                    {nivel.desc} <span className={nivel.color}>{nivel.yearTag}</span>
                  </p>
                </div>

                {/* Actions */}
                <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-purple-600/30 bg-purple-600/5 hover:bg-purple-600/10 hover:border-purple-600/50 transition-colors group">
                    <FileText className="h-4 w-4 text-purple-600" />
                    <span className="text-xs font-bold text-purple-600 group-hover:text-purple-500">Examen oficial</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-orange-500/30 bg-orange-500/5 hover:bg-orange-500/10 hover:border-orange-500/50 transition-colors group">
                    <PlayCircle className="h-4 w-4 text-orange-500" />
                    <span className="text-xs font-bold text-orange-500 group-hover:text-orange-400">Solución en video</span>
                  </button>
                  <button className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-blue-600/30 bg-blue-600/5 hover:bg-blue-600/10 hover:border-blue-600/50 transition-colors group">
                    <Edit3 className="h-4 w-4 text-blue-600" />
                    <span className="text-xs font-bold text-blue-600 group-hover:text-blue-500">Simulacro</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>

      {/* FOOTER ALERT */}
      <div className="relative overflow-hidden rounded-3xl border border-purple-600/30 bg-gradient-to-r from-purple-900/40 to-[#0f172a] p-6 md:p-8 flex items-center gap-6 shadow-lg">
        {/* Decorative elements to simulate the mountain background */}
        <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute top-0 right-20 w-40 h-40 bg-purple-600/10 rounded-full blur-2xl" />
        
        <div className="h-14 w-14 rounded-full bg-purple-600 flex items-center justify-center shrink-0 shadow-xl relative z-10">
          <Info className="h-6 w-6 text-white" />
        </div>
        
        <div className="relative z-10">
          <p className="text-sm font-medium text-foreground leading-relaxed">
            La Olimpiada Matemática de los Andes cuenta con una sola ronda en 2026.<br className="hidden md:block"/>
            Cada nivel dispone de su propio examen oficial, solución en video y simulacro.
          </p>
        </div>
      </div>

    </div>
  )
}
