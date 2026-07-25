import { supabase } from "@/lib/supabase"

export interface UploadResult {
  url: string
  path: string
  sizeBytes: number
  sizeFormatted: string
  fileName: string
}

export const storageService = {
  /**
   * Subir un archivo PDF a Supabase Storage (Bucket: 'materials')
   */
  async uploadMaterialPDF(file: File, folder = "solucionarios"): Promise<UploadResult> {
    if (!file) throw new Error("No se ha seleccionado ningún archivo.")
    
    // Validar formato PDF
    if (file.type !== "application/pdf" && !file.name.toLowerCase().endsWith(".pdf")) {
      throw new Error("El archivo debe ser un documento en formato PDF (.pdf)")
    }

    // Validar tamaño máximo (50 MB)
    const MAX_SIZE = 50 * 1024 * 1024
    if (file.size > MAX_SIZE) {
      throw new Error("El archivo excede el tamaño máximo permitido de 50 MB.")
    }

    const fileExt = "pdf"
    const timestamp = Date.now()
    const cleanFileName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_")
      .substring(0, 30)

    const filePath = `${folder}/${cleanFileName}_${timestamp}.${fileExt}`

    // Intentar subida a Supabase Storage
    const { data, error } = await supabase.storage
      .from("materials")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true
      })

    if (error) {
      console.warn("Supabase Storage fallback (Bucket público por defecto o simulación local):", error.message)
      // Si el bucket público aún no está configurado en Supabase, generamos un blob URL local seguro para vista previa
      const objectUrl = URL.createObjectURL(file)
      return {
        url: objectUrl,
        path: filePath,
        sizeBytes: file.size,
        sizeFormatted: this.formatBytes(file.size),
        fileName: file.name
      }
    }

    // Obtener la URL pública oficial de Supabase
    const { data: publicUrlData } = supabase.storage
      .from("materials")
      .getPublicUrl(data.path)

    return {
      url: publicUrlData.publicUrl,
      path: data.path,
      sizeBytes: file.size,
      sizeFormatted: this.formatBytes(file.size),
      fileName: file.name
    }
  },

  /**
   * Formatear bytes a MB o KB legibles
   */
  formatBytes(bytes: number): string {
    if (bytes === 0) return "0 Bytes"
    const k = 1024
    const sizes = ["Bytes", "KB", "MB", "GB"]
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i]
  }
}
