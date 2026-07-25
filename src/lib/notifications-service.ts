// src/lib/notifications-service.ts
"use client"

export type NotificationType = "info" | "success" | "warning" | "promo" | "new_content"

export interface Notification {
  id: string
  type: NotificationType
  title: string
  message: string
  time: string          // ISO string
  read: boolean
  href?: string         // link opcional al hacer clic
  icon?: string         // emoji opcional
}

const STORAGE_KEY = "student_notifications"

// ── Notificaciones Iniciales de Demo ────────────────────────────────────────
const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: "notif_1",
    type: "new_content",
    title: "Nuevo solucionario disponible",
    message: "Ya puedes acceder al Examen Resuelto CMB 2026 – Nivel 2 (Etapa Nacional).",
    time: new Date(Date.now() - 1000 * 60 * 10).toISOString(),  // hace 10 min
    read: false,
    href: "/dashboard/solucionarios/concurso_matematica_binaria",
    icon: "📄"
  },
  {
    id: "notif_2",
    type: "new_content",
    title: "Video explicativo publicado",
    message: "La resolución en video del Selectivo ONEM 2026 ya está disponible en Nivel 3.",
    time: new Date(Date.now() - 1000 * 60 * 45).toISOString(), // hace 45 min
    read: false,
    href: "/dashboard/solucionarios/selectivo_onem",
    icon: "🎬"
  },
  {
    id: "notif_3",
    type: "promo",
    title: "¡Accede a todos los solucionarios!",
    message: "Desbloquea acceso Premium a más de 17 olimpiadas con exámenes, videos y simulacros.",
    time: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // hace 2h
    read: false,
    icon: "⭐"
  },
  {
    id: "notif_4",
    type: "success",
    title: "Simulacro completado",
    message: "¡Bien hecho! Completaste el simulacro de la Olimpiada Matemática Logical 2025.",
    time: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // hace 5h
    read: true,
    icon: "✅"
  },
  {
    id: "notif_5",
    type: "info",
    title: "Nuevo programa añadido",
    message: "El Programa de Entrenamiento para el Canguro Matemático ya está disponible.",
    time: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(), // ayer
    read: true,
    href: "/dashboard",
    icon: "📚"
  },
  {
    id: "notif_6",
    type: "warning",
    title: "Próximo concurso",
    message: "El Concurso Nacional de Matemática Binaria (CMB) 2026 se acerca. ¡Prepárate!",
    time: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(), // hace 2 días
    read: true,
    icon: "⚠️"
  }
]

// ── Servicio ─────────────────────────────────────────────────────────────────
export const notificationsService = {
  /**
   * Obtener todas las notificaciones del usuario.
   * Inicializa con notificaciones de demo si es la primera vez.
   */
  getAll(): Notification[] {
    if (typeof window === "undefined") return []
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored) as Notification[]
      }
      // Primera vez: guardar las notificaciones de demo
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_NOTIFICATIONS))
      return INITIAL_NOTIFICATIONS
    } catch {
      return INITIAL_NOTIFICATIONS
    }
  },

  /**
   * Número de notificaciones no leídas.
   */
  getUnreadCount(): number {
    return this.getAll().filter(n => !n.read).length
  },

  /**
   * Marcar una notificación como leída.
   */
  markAsRead(id: string): Notification[] {
    const all = this.getAll()
    const updated = all.map(n => n.id === id ? { ...n, read: true } : n)
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    }
    return updated
  },

  /**
   * Marcar todas como leídas.
   */
  markAllAsRead(): Notification[] {
    const all = this.getAll().map(n => ({ ...n, read: true }))
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(all))
    }
    return all
  },

  /**
   * Eliminar una notificación.
   */
  delete(id: string): Notification[] {
    const updated = this.getAll().filter(n => n.id !== id)
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    }
    return updated
  },

  /**
   * Eliminar todas las notificaciones leídas.
   */
  clearRead(): Notification[] {
    const updated = this.getAll().filter(n => !n.read)
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    }
    return updated
  },

  /**
   * Agregar una nueva notificación (usado por el admin o sistema).
   */
  push(notif: Omit<Notification, "id" | "read" | "time">): Notification[] {
    const newNotif: Notification = {
      ...notif,
      id: `notif_${Date.now()}`,
      read: false,
      time: new Date().toISOString()
    }
    const updated = [newNotif, ...this.getAll()]
    if (typeof window !== "undefined") {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
    }
    return updated
  },

  /**
   * Formatear tiempo relativo (hace X minutos, etc.)
   */
  formatRelativeTime(isoTime: string): string {
    const diff = Date.now() - new Date(isoTime).getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(minutes / 60)
    const days = Math.floor(hours / 24)

    if (minutes < 1) return "Ahora mismo"
    if (minutes < 60) return `Hace ${minutes} min`
    if (hours < 24) return `Hace ${hours}h`
    if (days === 1) return "Ayer"
    return `Hace ${days} días`
  }
}
