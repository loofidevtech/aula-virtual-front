import { supabase } from "@/lib/supabase"

export interface UploadResult {
  url: string
  path: string
  sizeBytes: number
  sizeFormatted: string
  fileName: string
}

const BUCKET_NAME = "materials"

export const storageService = {
  /**
   * Asegurar que el bucket 'materials' existe y es público.
   * Intenta crearlo si no existe (requiere permisos de service role en producción).
   */
  async ensureBucket(): Promise<void> {
    const { data: buckets, error: listError } = await supabase.storage.listBuckets()
    if (listError) {
      // No se pueden listar buckets con anon key — continuar de todas formas
      return
    }
    const exists = buckets?.some((b) => b.name === BUCKET_NAME)
    if (!exists) {
      await supabase.storage.createBucket(BUCKET_NAME, { public: true })
    }
  },

  /**
   * Subir un archivo PDF a Supabase Storage (Bucket: 'materials').
   * NUNCA genera blob URLs — solo URLs públicas de Supabase.
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

    const timestamp = Date.now()
    const cleanFileName = file.name
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "_")
      .substring(0, 40)

    const filePath = `${folder}/${cleanFileName}_${timestamp}.pdf`

    // Subir a Supabase Storage
    const { data, error } = await supabase.storage
      .from(BUCKET_NAME)
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: true,
        contentType: "application/pdf",
      })

    if (error) {
      // Error real — informar al admin claramente, NUNCA usar blob URLs
      throw new Error(
        `No se pudo subir el archivo a Supabase Storage: ${error.message}. ` +
        `Verifica que el bucket "${BUCKET_NAME}" exista y sea público en tu proyecto de Supabase ` +
        `(Storage → New bucket → Nombre: "materials" → Public).`
      )
    }

    // Obtener la URL pública permanente de Supabase
    const { data: publicUrlData } = supabase.storage
      .from(BUCKET_NAME)
      .getPublicUrl(data.path)

    if (!publicUrlData.publicUrl) {
      throw new Error(
        `El archivo se subió pero no se pudo obtener la URL pública. ` +
        `Asegúrate de que el bucket "${BUCKET_NAME}" esté configurado como público en Supabase.`
      )
    }

    return {
      url: publicUrlData.publicUrl,
      path: data.path,
      sizeBytes: file.size,
      sizeFormatted: this.formatBytes(file.size),
      fileName: file.name,
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
  },
}
