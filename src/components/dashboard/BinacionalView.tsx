"use client"

import Image from "next/image"
import { 
  FileText, 
  PlayCircle, 
  ClipboardCheck, 
  Calendar
} from "lucide-react"

interface NivelBinacional {
  id: string
  title: string
  description: string
  note?: string
}

const niveles: NivelBinacional[] = [
  {
    id: "1",
    title: "NIVEL 1",
    description: "Cuarto de primaria y Quinto de primaria"
  },
  {
    id: "2",
    title: "NIVEL 2",
    description: "Sexto de primaria y Primero de secundaria"
  },
  {
    id: "3",
    title: "NIVEL 3",
    description: "Segundo y Tercero de secundaria"
  },
  {
    id: "4",
    title: "NIVEL 4",
    description: "Cuarto, Quinto y Sexto de secundaria",
    note: "(solo Bolivia)"
  }
]

export function BinacionalView({ logo }: { logo: string }) {
  // Paleta de colores extraída del logo: Marrón tierra (#5C2D1B) y Naranja quemado (#D35400)
  return (
    <div className="space-y-12 animate-in fade-in zoom-in-95 duration-700">
      {/* Header Section - Enhanced Logo Size */}
      <div className="flex flex-col items-center text-center space-y-6">
        <div className="relative w-64 h-64 md:w-[22rem] md:h-[22rem] transition-transform duration-500 hover:scale-105">
          <Image
            src={logo}
            alt="Concurso Binacional"
            fill
            className="object-contain drop-shadow-[0_0_50px_rgba(92,45,27,0.4)]"
            priority
          />
        </div>
        <div className="space-y-3">
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase italic leading-none">
            Concurso Binacional <span className="text-[#F07629]">de Matemática</span>
          </h1>
          <p className="text-muted-foreground/60 font-bold uppercase tracking-[0.4em] text-xs md:text-sm">
            Estructura de recursos por nivel
          </p>
        </div>
      </div>

      {/* Levels Grid - Custom Earth Tones */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {niveles.map((nivel) => (
          <div key={nivel.id} className="bg-[#0F172A]/40 rounded-[2.5rem] border border-white/5 overflow-hidden flex flex-col shadow-2xl group hover:border-[#5C2D1B]/50 transition-all duration-500">
            {/* Level Header - Earth Brown */}
            <div className="bg-[#5C2D1B] p-7 text-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-50" />
              <h3 className="relative z-10 font-black text-2xl text-white tracking-widest">{nivel.title}</h3>
              <div className="relative z-10 mt-2 flex flex-col">
                <span className="text-white/80 text-[11px] font-bold leading-tight">{nivel.description}</span>
                {nivel.note && <span className="text-[#F07629] text-[10px] font-black mt-1 uppercase italic bg-black/20 py-0.5 rounded-full">{nivel.note}</span>}
              </div>
            </div>

            {/* Resources Buttons */}
            <div className="p-6 space-y-3 bg-gradient-to-b from-transparent to-[#5C2D1B]/5">
              {[
                { label: "Examen oficial", icon: FileText, color: "text-[#F07629]" },
                { label: "Solución en video", icon: PlayCircle, color: "text-[#F07629]" },
                { label: "Examen simulacro", icon: ClipboardCheck, color: "text-[#4C6B31]" } // Green from the Sigma
              ].map((res, i) => (
                <button
                  key={i}
                  className="w-full flex items-center gap-4 p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-[#5C2D1B]/30 transition-all group/btn"
                >
                  <div className="h-11 w-11 rounded-full bg-white flex items-center justify-center shadow-lg shrink-0 transition-transform group-hover/btn:scale-110">
                    <res.icon className={`h-5 w-5 ${res.color}`} />
                  </div>
                  <span className="text-[10px] font-black text-white/40 group-hover/btn:text-white uppercase tracking-widest">
                    {res.label}
                  </span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Coverage Section - Refined Integration */}
      <div className="bg-[#5C2D1B]/10 rounded-[3rem] border border-[#5C2D1B]/20 p-8 md:p-12 flex flex-col md:flex-row items-center gap-10">
        <div className="flex items-center gap-5 shrink-0 bg-[#5C2D1B]/20 p-7 rounded-[2rem] border border-[#5C2D1B]/30 shadow-inner">
          <Calendar className="h-12 w-12 text-[#F07629]" />
          <div className="leading-tight">
            <p className="text-2xl font-black text-white uppercase tracking-tighter">Cobertura</p>
            <p className="text-xl font-bold text-[#F07629] uppercase italic">Por años</p>
          </div>
        </div>

        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5 w-full">
          {/* Box 1 */}
          <div className="bg-white/5 border border-white/5 rounded-3xl p-7 flex items-center justify-between hover:bg-white/10 transition-colors group">
            <div className="space-y-1">
              <p className="text-[#F07629] font-black text-xs uppercase italic tracking-wider">2023 - 2024:</p>
              <p className="text-white font-bold text-sm">Perú – Bolivia</p>
            </div>
            <div className="flex gap-2.5">
              <div className="relative w-12 h-8 rounded shadow-lg overflow-hidden border border-white/10">
                <Image src="/assets/banderas/peru.png" alt="Peru" fill className="object-cover" />
              </div>
              <div className="relative w-12 h-8 rounded shadow-lg overflow-hidden border border-white/10">
                <Image src="/assets/banderas/bolivia.png" alt="Bolivia" fill className="object-cover" />
              </div>
            </div>
          </div>

          {/* Box 2 */}
          <div className="bg-white/5 border border-white/5 rounded-3xl p-7 flex items-center justify-between hover:bg-white/10 transition-colors group">
            <div className="space-y-1">
              <p className="text-[#F07629] font-black text-xs uppercase italic tracking-wider">Desde 2025:</p>
              <p className="text-white font-bold text-sm">P. – B. – Ecuador</p>
            </div>
            <div className="flex gap-2">
              <div className="relative w-10 h-7 rounded shadow-lg overflow-hidden border border-white/10">
                <Image src="/assets/banderas/peru.png" alt="Peru" fill className="object-cover" />
              </div>
              <div className="relative w-10 h-7 rounded shadow-lg overflow-hidden border border-white/10">
                <Image src="/assets/banderas/bolivia.png" alt="Bolivia" fill className="object-cover" />
              </div>
              <div className="relative w-10 h-7 rounded shadow-lg overflow-hidden border border-white/10">
                <Image src="/assets/banderas/ecuador.png" alt="Ecuador" fill className="object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
