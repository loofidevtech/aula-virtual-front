"use client"

import { useParams, useRouter } from "next/navigation"
import catalog from "@/lib/data/academy_catalog.json"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { UnifiedSolucionarioView } from "@/components/dashboard/UnifiedSolucionarioView"

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
      <UnifiedSolucionarioView id={id} logo={data.logos?.[0]} />
    </div>
  )
}
