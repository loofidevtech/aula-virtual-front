export interface ParsedVideo {
  embedUrl: string
  originalUrl: string
  provider: "youtube" | "vimeo" | "mp4" | "other"
  thumbnailUrl?: string
  isValid: boolean
}

export const videoService = {
  /**
   * Convertir cualquier enlace de video (YouTube, Vimeo, MP4 direct) a una URL de reproductor embebido limpia
   */
  parseVideoUrl(url: string): ParsedVideo {
    if (!url || typeof url !== "string") {
      return { embedUrl: "", originalUrl: "", provider: "other", isValid: false }
    }

    const trimmedUrl = url.trim()

    // 1. YouTube
    const ytMatch = trimmedUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([\w-]{11})/)
    if (ytMatch && ytMatch[1]) {
      const videoId = ytMatch[1]
      return {
        embedUrl: `https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`,
        originalUrl: trimmedUrl,
        provider: "youtube",
        thumbnailUrl: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
        isValid: true
      }
    }

    // 2. Vimeo
    const vimeoMatch = trimmedUrl.match(/(?:vimeo\.com\/)(\d+)/)
    if (vimeoMatch && vimeoMatch[1]) {
      const vimeoId = vimeoMatch[1]
      return {
        embedUrl: `https://player.vimeo.com/video/${vimeoId}?autoplay=1`,
        originalUrl: trimmedUrl,
        provider: "vimeo",
        isValid: true
      }
    }

    // 3. Direct MP4 / WebM
    if (trimmedUrl.endsWith(".mp4") || trimmedUrl.endsWith(".webm") || trimmedUrl.includes("supabase.co/storage")) {
      return {
        embedUrl: trimmedUrl,
        originalUrl: trimmedUrl,
        provider: "mp4",
        isValid: true
      }
    }

    // Fallback: usar URL tal cual
    return {
      embedUrl: trimmedUrl,
      originalUrl: trimmedUrl,
      provider: "other",
      isValid: trimmedUrl.length > 5
    }
  }
}
