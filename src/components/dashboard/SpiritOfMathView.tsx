"use client"

import { useState } from "react"
import Image from "next/image"
import { 
  FileText, 
  PlayCircle, 
  ClipboardCheck, 
  Users,
  Globe,
  Info,
  ChevronRight,
  Download,
  Play,
  Edit3,
  AlertCircle
} from "lucide-react"

const YEARS = [2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2018, 2017, 2016, 2015]

export function SpiritOfMathView({ logo }: { logo?: string }) {
  const [selectedYear, setSelectedYear] = useState<number>(2026)
  const finalLogo = logo || "/assets/logos/solucionarios/concurso_internacional_spirit_of_math.png"

  return (
    <div className="space-y-8 animate-in fade-in duration-700 pb-10">
      
      {/* HEADER SECTION */}
      <div className="bg-card/30 p-6 md:p-8 rounded-[2.5rem] border border-border/50 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#C51162]/10 rounded-full blur-3xl -z-0" />
        
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 relative z-10">
          {/* Logo */}
          <div className="relative w-32 h-24 shrink-0 bg-white rounded-2xl p-2 shadow-xl flex items-center justify-center border border-white/20">
            <Image
              src={finalLogo}
              alt="Spirit of Math"
              fill
              className="object-contain p-2"
            />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-black text-foreground tracking-tight">
              Olimpiada Spirit of Math
            </h1>
            <h2 className="text-xl md:text-2xl font-bold text-[#C51162]">
              Releasing the Genius®
            </h2>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-card p-4 rounded-2xl border border-border/50 flex items-center gap-3 shadow-sm relative z-10 max-w-sm">
          <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground shrink-0">
            <Info className="h-4 w-4" />
          </div>
          <p className="text-xs font-medium text-muted-foreground leading-tight">
            Desarrolla tu pasión por las matemáticas y libera tu genio interior.
          </p>
        </div>
      </div>

      {/* NIVELES Y CATEGORIAS SECTION */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-foreground">Niveles y categorías según el año</h3>
        
        <div className="flex flex-col gap-4">
          {/* AÑO 2026 */}
          <div className="bg-card rounded-2xl border border-border/50 p-4 md:p-6 flex flex-col xl:flex-row gap-6 items-start xl:items-center shadow-sm hover:border-[#C51162]/30 transition-colors">
            <div className="w-32 shrink-0">
              <span className="text-sm font-black text-green-500 uppercase tracking-widest">Año 2026</span>
            </div>
            <div className="flex flex-wrap gap-4 flex-1">
              {/* Cat 1 */}
              <div className="bg-background/50 border border-border/50 rounded-xl w-full sm:w-[200px] shrink-0 flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-green-600 text-white text-[10px] font-black uppercase py-1.5 text-center w-full">Categoría 1</div>
                <div className="flex items-center gap-3 w-full p-3 pt-2">
                  <Users className="h-8 w-8 text-green-600 shrink-0" />
                  <p className="text-xs font-bold leading-tight text-left text-foreground">Grados 3 y 4<br/><span className="font-medium text-muted-foreground">de primaria</span></p>
                </div>
              </div>
              {/* Cat 2 */}
              <div className="bg-background/50 border border-border/50 rounded-xl w-full sm:w-[200px] shrink-0 flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-yellow-500 text-white text-[10px] font-black uppercase py-1.5 text-center w-full">Categoría 2</div>
                <div className="flex items-center gap-3 w-full p-3 pt-2">
                  <Users className="h-8 w-8 text-yellow-500 shrink-0" />
                  <p className="text-xs font-bold leading-tight text-left text-foreground">Grados 5 y 6<br/><span className="font-medium text-muted-foreground">de primaria</span></p>
                </div>
              </div>
              {/* Cat 3 */}
              <div className="bg-background/50 border border-border/50 rounded-xl w-full sm:w-[200px] shrink-0 flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-[#C51162] text-white text-[10px] font-black uppercase py-1.5 text-center w-full">Categoría 3</div>
                <div className="flex items-center gap-3 w-full p-3 pt-2">
                  <Users className="h-8 w-8 text-[#C51162] shrink-0" />
                  <p className="text-xs font-bold leading-tight text-left text-foreground">Grados 7 y 8<br/><span className="font-medium text-muted-foreground">de secundaria</span></p>
                </div>
              </div>
              {/* Cat 4 */}
              <div className="bg-background/50 border border-border/50 rounded-xl w-full sm:w-[200px] shrink-0 flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-blue-600 text-white text-[10px] font-black uppercase py-1.5 text-center w-full">Categoría 4</div>
                <div className="flex items-center gap-3 w-full p-3 pt-2">
                  <Users className="h-8 w-8 text-blue-600 shrink-0" />
                  <p className="text-xs font-bold leading-tight text-left text-foreground">Grados 9 y 10<br/><span className="font-medium text-muted-foreground">de secundaria</span></p>
                </div>
              </div>
              {/* Cat 5 */}
              <div className="bg-background/50 border border-border/50 rounded-xl w-full sm:w-[200px] shrink-0 flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-purple-600 text-white text-[10px] font-black uppercase py-1.5 text-center w-full">Categoría 5</div>
                <div className="flex items-center gap-3 w-full p-3 pt-2">
                  <Users className="h-8 w-8 text-purple-600 shrink-0" />
                  <p className="text-xs font-bold leading-tight text-left text-foreground">Grados 11 y 12<br/><span className="font-medium text-muted-foreground">de secundaria</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* AÑOS 2020 - 2025 */}
          <div className="bg-card rounded-2xl border border-border/50 p-4 md:p-6 flex flex-col xl:flex-row gap-6 items-start xl:items-center shadow-sm hover:border-[#C51162]/30 transition-colors">
            <div className="w-32 shrink-0">
              <span className="text-sm font-black text-blue-500 uppercase tracking-widest">Años 2020 - 2025</span>
            </div>
            <div className="flex flex-wrap gap-4 flex-1">
              <div className="bg-background/50 border border-border/50 rounded-xl w-full sm:w-[200px] shrink-0 flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-green-600 text-white text-[10px] font-black uppercase py-1.5 text-center w-full">Categoría 1</div>
                <div className="flex items-center gap-3 w-full p-3 pt-2">
                  <Users className="h-8 w-8 text-green-600 shrink-0" />
                  <p className="text-xs font-bold leading-tight text-left text-foreground">1.º a 3.º<br/><span className="font-medium text-muted-foreground">de primaria</span></p>
                </div>
              </div>
              <div className="bg-background/50 border border-border/50 rounded-xl w-full sm:w-[200px] shrink-0 flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-yellow-500 text-white text-[10px] font-black uppercase py-1.5 text-center w-full">Categoría 2</div>
                <div className="flex items-center gap-3 w-full p-3 pt-2">
                  <Users className="h-8 w-8 text-yellow-500 shrink-0" />
                  <p className="text-xs font-bold leading-tight text-left text-foreground">2.º a 4.º<br/><span className="font-medium text-muted-foreground">de primaria</span></p>
                </div>
              </div>
              <div className="bg-background/50 border border-border/50 rounded-xl w-full sm:w-[200px] shrink-0 flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-[#C51162] text-white text-[10px] font-black uppercase py-1.5 text-center w-full">Categoría 3</div>
                <div className="flex items-center gap-3 w-full p-3 pt-2">
                  <Users className="h-8 w-8 text-[#C51162] shrink-0" />
                  <p className="text-xs font-bold leading-tight text-left text-foreground">3.º a 5.º<br/><span className="font-medium text-muted-foreground">de primaria</span></p>
                </div>
              </div>
            </div>
          </div>

          {/* AÑOS 2015 - 2019 */}
          <div className="bg-card rounded-2xl border border-border/50 p-4 md:p-6 flex flex-col xl:flex-row gap-6 items-start xl:items-center shadow-sm hover:border-[#C51162]/30 transition-colors">
            <div className="w-32 shrink-0">
              <span className="text-sm font-black text-purple-500 uppercase tracking-widest">Años 2015 - 2019</span>
            </div>
            <div className="flex flex-wrap gap-4 flex-1">
              <div className="bg-background/50 border border-border/50 rounded-xl w-full sm:w-[200px] shrink-0 flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-green-600 text-white text-[10px] font-black uppercase py-1.5 text-center w-full">Categoría 1</div>
                <div className="flex items-center gap-3 w-full p-3 pt-2">
                  <Users className="h-8 w-8 text-green-600 shrink-0" />
                  <p className="text-xs font-bold leading-tight text-left text-foreground">3.º<br/><span className="font-medium text-muted-foreground">de primaria</span></p>
                </div>
              </div>
              <div className="bg-background/50 border border-border/50 rounded-xl w-full sm:w-[200px] shrink-0 flex flex-col overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="bg-yellow-500 text-white text-[10px] font-black uppercase py-1.5 text-center w-full">Categoría 2</div>
                <div className="flex items-center gap-3 w-full p-3 pt-2">
                  <Users className="h-8 w-8 text-yellow-500 shrink-0" />
                  <p className="text-xs font-bold leading-tight text-left text-foreground">4.º y 5.º<br/><span className="font-medium text-muted-foreground">de primaria</span></p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RONDAS DE LA COMPETENCIA */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-foreground">Rondas de la competencia</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-card rounded-2xl border border-border/50 p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
              <Users className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-green-500">Ronda Clasificatoria</h4>
              <p className="text-xs font-medium text-muted-foreground">Participa desde tu institución educativa.</p>
            </div>
          </div>
          <div className="bg-card rounded-2xl border border-border/50 p-4 flex items-center gap-4 shadow-sm hover:shadow-md transition-shadow">
            <div className="h-12 w-12 rounded-full bg-[#C51162]/10 flex items-center justify-center text-[#C51162] shrink-0">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <h4 className="text-sm font-black text-[#C51162]">Ronda Global</h4>
              <p className="text-xs font-medium text-muted-foreground">Clasifican los mejores puntajes de cada categoría.</p>
            </div>
          </div>
        </div>
      </div>

      {/* EXAMENES POR AÑO */}
      <div className="space-y-4">
        <h3 className="text-xl font-black text-foreground">Exámenes por año</h3>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar Years */}
          <div className="w-full md:w-48 shrink-0 flex flex-col gap-1 bg-card rounded-2xl border border-border/50 p-2 overflow-y-auto max-h-[500px]">
            {YEARS.map(year => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all ${
                  selectedYear === year 
                    ? "bg-[#C51162] text-white font-black shadow-md" 
                    : "text-muted-foreground font-bold hover:bg-white/5 hover:text-foreground"
                }`}
              >
                <span>{year}</span>
                <ChevronRight className={`h-4 w-4 ${selectedYear === year ? "opacity-100" : "opacity-0"}`} />
              </button>
            ))}
          </div>

          {/* Content Area */}
          <div className="flex-1 bg-card rounded-2xl border border-border/50 p-6 flex flex-col">
            <h4 className="text-xl font-black text-[#C51162] mb-6">AÑO {selectedYear}</h4>
            
            <div className="space-y-4 flex-1">
              {/* Examen Oficial */}
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 p-4 rounded-2xl border border-border/50 bg-background/50 hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-green-500/10 flex items-center justify-center text-green-500 shrink-0">
                    <FileText className="h-6 w-6" />
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-foreground">Examen oficial</h5>
                    <p className="text-xs font-medium text-muted-foreground">Descarga el examen de la Ronda Clasificatoria {selectedYear}.</p>
                  </div>
                </div>
                <button className="flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors w-full xl:w-auto shadow-sm">
                  <Download className="h-4 w-4" />
                  Descargar PDF
                </button>
              </div>

              {/* Solución en video */}
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 p-4 rounded-2xl border border-border/50 bg-background/50 hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-600 shrink-0">
                    <PlayCircle className="h-6 w-6" />
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-foreground">Solución en video</h5>
                    <p className="text-xs font-medium text-muted-foreground">Mira la solución detallada del examen {selectedYear}.</p>
                  </div>
                </div>
                <button className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors w-full xl:w-auto shadow-sm">
                  <Play className="h-4 w-4" />
                  Ver video
                </button>
              </div>

              {/* Simulacro */}
              <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 p-4 rounded-2xl border border-border/50 bg-background/50 hover:bg-white/5 transition-colors group">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-500 shrink-0">
                    <ClipboardCheck className="h-6 w-6" />
                  </div>
                  <div>
                    <h5 className="text-sm font-black text-foreground">Simulacro tipo examen</h5>
                    <p className="text-xs font-medium text-muted-foreground">Practica con un simulacro similar al examen oficial.</p>
                  </div>
                </div>
                <button className="flex items-center justify-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-colors w-full xl:w-auto shadow-sm">
                  <Edit3 className="h-4 w-4" />
                  Realizar simulacro
                </button>
              </div>
            </div>
            
            {/* Other years collapsed (visual only to match mockup) */}
            <div className="mt-6 pt-4 border-t border-border/50 space-y-2">
              {YEARS.filter(y => y !== selectedYear).slice(0, 2).map(y => (
                <div key={y} className="flex items-center justify-between py-2 px-4 rounded-lg text-muted-foreground hover:bg-white/5 cursor-pointer">
                  <span className="font-bold text-sm">AÑO {y}</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              ))}
              <div className="px-4 py-2 text-muted-foreground">...</div>
            </div>

          </div>
        </div>
      </div>

      {/* FOOTER ALERT */}
      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-2xl p-4 flex items-center gap-3">
        <div className="h-6 w-6 rounded-full bg-yellow-500 flex items-center justify-center text-white shrink-0 shadow-sm">
          <AlertCircle className="h-4 w-4" />
        </div>
        <p className="text-xs font-bold text-yellow-500">
          El acceso a los exámenes, soluciones y simulacros está disponible según el año y categoría correspondiente.
        </p>
      </div>

    </div>
  )
}
