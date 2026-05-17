"use client"

import { useParams, useRouter } from "next/navigation"
import { SolucionarioView } from "@/components/dashboard/SolucionarioView"
import { BinacionalView } from "@/components/dashboard/BinacionalView"
import { ParalelaView } from "@/components/dashboard/ParalelaView"
import { CopernicusView } from "@/components/dashboard/CopernicusView"
import { DescubrimientoView } from "@/components/dashboard/DescubrimientoView"
import { SpiritOfMathView } from "@/components/dashboard/SpiritOfMathView"
import { OnemView } from "@/components/dashboard/OnemView"
import { GeometriaView } from "@/components/dashboard/GeometriaView"
import { AndesView } from "@/components/dashboard/AndesView"
import { MayoView } from "@/components/dashboard/MayoView"
import { ImcView } from "@/components/dashboard/ImcView"
import { IraniView } from "@/components/dashboard/IraniView"
import { IraniGeometriaView } from "@/components/dashboard/IraniGeometriaView"
import { NavidenaView } from "@/components/dashboard/NavidenaView"
import { CiudadesView } from "@/components/dashboard/CiudadesView"
import { JovenesView } from "@/components/dashboard/JovenesView"
import catalog from "@/lib/data/academy_catalog.json"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

export default function SolucionarioDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params.id as string

  // Buscar los datos en el catálogo
  const data = catalog.solucionarios.find((s) => s.id === id)

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
        <h2 className="text-2xl font-black text-foreground">Contenido no encontrado</h2>
        <Button onClick={() => router.back()} variant="outline" className="rounded-2xl gap-2">
          <ArrowLeft className="h-4 w-4" />
          Volver atrás
        </Button>
      </div>
    )
  }

  // Renderizado especial para Binacional
  if (id === "concurso_binacional") {
    return (
      <div className="space-y-6">
        <Button 
          onClick={() => router.push("/dashboard/solucionarios")} 
          variant="ghost" 
          className="rounded-2xl gap-2 font-bold hover:bg-white/10 hover:text-white transition-all mb-4 text-white/70"
        >
          <ArrowLeft className="h-4 w-4 text-primary" />
          Volver a Solucionarios
        </Button>
        <BinacionalView logo={data.logos?.[0] || "/logo_principal.png"} />
      </div>
    )
  }

  // Renderizado especial para Competencia Paralela
  if (id === "competencia_paralela") {
    return (
      <div className="space-y-6">
        <Button 
          onClick={() => router.push("/dashboard/solucionarios")} 
          variant="ghost" 
          className="rounded-2xl gap-2 font-bold hover:bg-white/10 hover:text-white transition-all mb-4 text-white/70"
        >
          <ArrowLeft className="h-4 w-4 text-primary" />
          Volver a Solucionarios
        </Button>
        <ParalelaView logo={data.logos?.[0]} />
      </div>
    )
  }

  // Renderizado para Olimpiada Logical
  if (id === "olimpiada_logical") {
    return (
      <div className="space-y-6">
        <Button 
          onClick={() => router.push("/dashboard/solucionarios")} 
          variant="ghost" 
          className="rounded-2xl gap-2 font-bold hover:bg-white/10 hover:text-white transition-all mb-4 text-white/70"
        >
          <ArrowLeft className="h-4 w-4 text-primary" />
          Volver a Solucionarios
        </Button>
        <SolucionarioView logo={data.logos?.[0] || "/logo_principal.png"} />
      </div>
    )
  }

  // Renderizado para Copernicus Math
  if (id === "copernicus_math") {
    return (
      <div className="space-y-6">
        <Button 
          onClick={() => router.push("/dashboard/solucionarios")} 
          variant="ghost" 
          className="rounded-2xl gap-2 font-bold hover:bg-white/10 hover:text-white transition-all mb-4 text-white/70"
        >
          <ArrowLeft className="h-4 w-4 text-primary" />
          Volver a Solucionarios
        </Button>
        <CopernicusView logo={data.logos?.[0]} />
      </div>
    )
  }

  // Renderizado para Descubrimiento Matemático
  if (id === "descubrimiento_matematico") {
    return (
      <div className="space-y-6">
        <Button 
          onClick={() => router.push("/dashboard/solucionarios")} 
          variant="ghost" 
          className="rounded-2xl gap-2 font-bold hover:bg-white/10 hover:text-white transition-all mb-4 text-white/70"
        >
          <ArrowLeft className="h-4 w-4 text-primary" />
          Volver a Solucionarios
        </Button>
        <DescubrimientoView logo={data.logos?.[0]} />
      </div>
    )
  }

  // Renderizado para Spirit of Math
  if (id === "spirit_of_math") {
    return (
      <div className="space-y-6">
        <Button 
          onClick={() => router.push("/dashboard/solucionarios")} 
          variant="ghost" 
          className="rounded-2xl gap-2 font-bold hover:bg-white/10 hover:text-white transition-all mb-4 text-white/70"
        >
          <ArrowLeft className="h-4 w-4 text-primary" />
          Volver a Solucionarios
        </Button>
        <SpiritOfMathView logo={data.logos?.[0]} />
      </div>
    )
  }

  // Renderizado para Concurso Selectivo ONEM
  if (id === "selectivo_onem") {
    return (
      <div className="space-y-6">
        <Button 
          onClick={() => router.push("/dashboard/solucionarios")} 
          variant="ghost" 
          className="rounded-2xl gap-2 font-bold hover:bg-white/10 hover:text-white transition-all mb-4 text-white/70"
        >
          <ArrowLeft className="h-4 w-4 text-primary" />
          Volver a Solucionarios
        </Button>
        <OnemView logo={data.logos?.[0]} />
      </div>
    )
  }

  // Renderizado para Olimpiada Nacional de Geometría
  if (id === "geometria_origuela") {
    return (
      <div className="space-y-6">
        <Button 
          onClick={() => router.push("/dashboard/solucionarios")} 
          variant="ghost" 
          className="rounded-2xl gap-2 font-bold hover:bg-white/10 hover:text-white transition-all mb-4 text-white/70"
        >
          <ArrowLeft className="h-4 w-4 text-primary" />
          Volver a Solucionarios
        </Button>
        <GeometriaView logo={data.logos?.[0]} />
      </div>
    )
  }

  // Renderizado para Olimpiada Matemática de los Andes
  if (id === "olimpiada_andes") {
    return (
      <div className="space-y-6">
        <Button 
          onClick={() => router.push("/dashboard/solucionarios")} 
          variant="ghost" 
          className="rounded-2xl gap-2 font-bold hover:bg-white/10 hover:text-white transition-all mb-4 text-white/70"
        >
          <ArrowLeft className="h-4 w-4 text-primary" />
          Volver a Solucionarios
        </Button>
        <AndesView logo={data.logos?.[0]} />
      </div>
    )
  }

  // Renderizado para Olimpiada de Mayo
  if (id === "olimpiada_mayo") {
    return (
      <div className="space-y-6">
        <Button 
          onClick={() => router.push("/dashboard/solucionarios")} 
          variant="ghost" 
          className="rounded-2xl gap-2 font-bold hover:bg-white/10 hover:text-white transition-all mb-4 text-white/70"
        >
          <ArrowLeft className="h-4 w-4 text-primary" />
          Volver a Solucionarios
        </Button>
        <MayoView logo={data.logos?.[0]} />
      </div>
    )
  }

  // Renderizado para Olimpiada IMC de Matemáticas
  if (id === "olimpiada_imc_de_matematicas") {
    return (
      <div className="space-y-6">
        <Button 
          onClick={() => router.push("/dashboard/solucionarios")} 
          variant="ghost" 
          className="rounded-2xl gap-2 font-bold hover:bg-white/10 hover:text-white transition-all mb-4 text-white/70"
        >
          <ArrowLeft className="h-4 w-4 text-primary" />
          Volver a Solucionarios
        </Button>
        <ImcView logo={data.logos?.[0]} />
      </div>
    )
  }

  // Renderizado para Olimpiada Iraní de Combinatoria
  if (id === "irani_combinatoria") {
    return (
      <div className="space-y-6">
        <Button 
          onClick={() => router.push("/dashboard/solucionarios")} 
          variant="ghost" 
          className="rounded-2xl gap-2 font-bold hover:bg-white/10 hover:text-white transition-all mb-4 text-white/70"
        >
          <ArrowLeft className="h-4 w-4 text-primary" />
          Volver a Solucionarios
        </Button>
        <IraniView logo={data.logos?.[0]} />
      </div>
    )
  }

  // Renderizado para Iranian Geometry Olympiad
  if (id === "irani_geometria") {
    return (
      <div className="space-y-6">
        <Button 
          onClick={() => router.push("/dashboard/solucionarios")} 
          variant="ghost" 
          className="rounded-2xl gap-2 font-bold hover:bg-white/10 hover:text-white transition-all mb-4 text-white/70"
        >
          <ArrowLeft className="h-4 w-4 text-primary" />
          Volver a Solucionarios
        </Button>
        <IraniGeometriaView logo={data.logos?.[0]} />
      </div>
    )
  }

  // Renderizado para Olimpiada Navideña de Matemáticas
  if (id === "olimpiada_navidena") {
    return (
      <div className="space-y-6">
        <Button 
          onClick={() => router.push("/dashboard/solucionarios")} 
          variant="ghost" 
          className="rounded-2xl gap-2 font-bold hover:bg-white/10 hover:text-white transition-all mb-4 text-white/70"
        >
          <ArrowLeft className="h-4 w-4 text-primary" />
          Volver a Solucionarios
        </Button>
        <NavidenaView logo={data.logos?.[0]} />
      </div>
    )
  }

  // Renderizado para Torneo de las Ciudades
  if (id === "torneo_ciudades") {
    return (
      <div className="space-y-6">
        <Button 
          onClick={() => router.push("/dashboard/solucionarios")} 
          variant="ghost" 
          className="rounded-2xl gap-2 font-bold hover:bg-white/10 hover:text-white transition-all mb-4 text-white/70"
        >
          <ArrowLeft className="h-4 w-4 text-primary" />
          Volver a Solucionarios
        </Button>
        <CiudadesView logo={data.logos?.[0]} />
      </div>
    )
  }

  // Renderizado para Torneo de Jóvenes Matemáticos
  if (id === "torneo_jovenes_matematicos") {
    return (
      <div className="space-y-6">
        <Button 
          onClick={() => router.push("/dashboard/solucionarios")} 
          variant="ghost" 
          className="rounded-2xl gap-2 font-bold hover:bg-white/10 hover:text-white transition-all mb-4 text-white/70"
        >
          <ArrowLeft className="h-4 w-4 text-primary" />
          Volver a Solucionarios
        </Button>
        <JovenesView logo={data.logos?.[0]} />
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-4">
      <h2 className="text-2xl font-black text-foreground">Próximamente</h2>
      <p className="text-muted-foreground font-medium">Estamos trabajando para traerte este solucionario muy pronto.</p>
      <Button onClick={() => router.push("/dashboard/solucionarios")} variant="outline" className="rounded-2xl gap-2">
        <ArrowLeft className="h-4 w-4" />
        Volver a Solucionarios
      </Button>
    </div>
  )
}
