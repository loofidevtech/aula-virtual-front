"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { Bell, X, CheckCheck, Trash2, BookOpen, ExternalLink } from "lucide-react"
import { useRouter } from "next/navigation"
import { notificationsService, Notification, NotificationType } from "@/lib/notifications-service"

// ── Colores y estilos por tipo ────────────────────────────────────────────────
const TYPE_STYLES: Record<NotificationType, { dot: string; bg: string; border: string }> = {
  info:        { dot: "bg-blue-500",    bg: "bg-blue-500/8",    border: "border-blue-500/20" },
  success:     { dot: "bg-emerald-500", bg: "bg-emerald-500/8", border: "border-emerald-500/20" },
  warning:     { dot: "bg-amber-500",   bg: "bg-amber-500/8",   border: "border-amber-500/20" },
  promo:       { dot: "bg-purple-500",  bg: "bg-purple-500/8",  border: "border-purple-500/20" },
  new_content: { dot: "bg-primary",     bg: "bg-primary/8",     border: "border-primary/20" },
}

// ── Componente de una Notificación ────────────────────────────────────────────
function NotificationItem({
  notif,
  onRead,
  onDelete,
  onNavigate
}: {
  notif: Notification
  onRead: (id: string) => void
  onDelete: (id: string) => void
  onNavigate: (href: string, id: string) => void
}) {
  const styles = TYPE_STYLES[notif.type]

  return (
    <div
      className={`relative flex items-start gap-3 px-4 py-3.5 border-b border-border/40 last:border-0 transition-colors group cursor-pointer hover:bg-muted/40 ${
        !notif.read ? styles.bg : ""
      }`}
      onClick={() => notif.href ? onNavigate(notif.href, notif.id) : onRead(notif.id)}
    >
      {/* Dot indicador de no leído */}
      {!notif.read && (
        <span className={`absolute left-2.5 top-5 h-2 w-2 rounded-full ${styles.dot} shrink-0 animate-pulse`} />
      )}

      {/* Ícono / Emoji */}
      <div className={`shrink-0 h-9 w-9 rounded-xl flex items-center justify-center text-base border ${styles.border} ${!notif.read ? styles.bg : "bg-muted/40"}`}>
        {notif.icon || "🔔"}
      </div>

      {/* Contenido */}
      <div className="flex-1 min-w-0 pr-6">
        <p className={`text-xs font-black leading-tight ${notif.read ? "text-muted-foreground" : "text-foreground"}`}>
          {notif.title}
        </p>
        <p className="text-[11px] text-muted-foreground font-medium leading-snug mt-0.5 line-clamp-2">
          {notif.message}
        </p>
        <div className="flex items-center gap-2 mt-1.5">
          <span className="text-[10px] text-muted-foreground/70 font-semibold">
            {notificationsService.formatRelativeTime(notif.time)}
          </span>
          {notif.href && (
            <span className="text-[10px] text-primary font-bold flex items-center gap-0.5">
              <ExternalLink className="h-2.5 w-2.5" /> Ver más
            </span>
          )}
        </div>
      </div>

      {/* Acciones: aparecen en hover */}
      <div className="absolute right-3 top-3 hidden group-hover:flex items-center gap-1">
        {!notif.read && (
          <button
            onClick={(e) => { e.stopPropagation(); onRead(notif.id) }}
            className="h-6 w-6 rounded-lg flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            title="Marcar como leída"
          >
            <CheckCheck className="h-3.5 w-3.5" />
          </button>
        )}
        <button
          onClick={(e) => { e.stopPropagation(); onDelete(notif.id) }}
          className="h-6 w-6 rounded-lg flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          title="Eliminar"
        >
          <X className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  )
}

// ── Panel Principal de Notificaciones ────────────────────────────────────────
export function NotificationCenter() {
  const router = useRouter()
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  const [open, setOpen] = useState(false)
  const [notifications, setNotifications] = useState<Notification[]>([])
  const [filter, setFilter] = useState<"all" | "unread">("all")

  // Cargar notificaciones al montar y cuando se abre el panel
  const loadNotifications = useCallback(() => {
    setNotifications(notificationsService.getAll())
  }, [])

  useEffect(() => {
    loadNotifications()
  }, [loadNotifications])

  // Cerrar al click fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        panelRef.current && !panelRef.current.contains(e.target as Node) &&
        buttonRef.current && !buttonRef.current.contains(e.target as Node)
      ) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [open])

  const unreadCount = notifications.filter(n => !n.read).length

  const displayed = filter === "unread"
    ? notifications.filter(n => !n.read)
    : notifications

  const handleRead = (id: string) => {
    setNotifications(notificationsService.markAsRead(id))
  }

  const handleDelete = (id: string) => {
    setNotifications(notificationsService.delete(id))
  }

  const handleMarkAllRead = () => {
    setNotifications(notificationsService.markAllAsRead())
  }

  const handleClearRead = () => {
    setNotifications(notificationsService.clearRead())
  }

  const handleNavigate = (href: string, id: string) => {
    notificationsService.markAsRead(id)
    setOpen(false)
    router.push(href)
  }

  return (
    <div className="relative">
      {/* Botón de campana */}
      <button
        ref={buttonRef}
        onClick={() => { setOpen(prev => !prev); loadNotifications() }}
        className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-border/50 text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
        aria-label="Centro de notificaciones"
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-[10px] font-black animate-in zoom-in duration-200">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Panel desplegable */}
      {open && (
        <div
          ref={panelRef}
          className="absolute right-0 top-[calc(100%+12px)] w-[380px] max-w-[calc(100vw-2rem)] bg-[#0b132b] border border-white/10 rounded-3xl shadow-[0_24px_80px_rgba(0,0,0,0.8)] z-[200] flex flex-col overflow-hidden animate-in slide-in-from-top-2 fade-in duration-200"
        >
          {/* Cabecera */}
          <div className="flex items-center justify-between px-5 py-4 border-b border-white/10 bg-slate-900/60">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Bell className="h-4 w-4 text-primary" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white">Notificaciones</h3>
                <p className="text-[10px] text-muted-foreground font-semibold">
                  {unreadCount > 0 ? `${unreadCount} sin leer` : "Todo al día ✓"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1.5">
              {unreadCount > 0 && (
                <button
                  onClick={handleMarkAllRead}
                  className="text-[10px] font-black text-primary hover:text-primary/80 transition-colors px-2 py-1 rounded-lg hover:bg-primary/10 flex items-center gap-1"
                >
                  <CheckCheck className="h-3.5 w-3.5" /> Leer todo
                </button>
              )}
              <button
                onClick={handleClearRead}
                className="text-[10px] font-black text-muted-foreground hover:text-destructive transition-colors px-2 py-1 rounded-lg hover:bg-destructive/10 flex items-center gap-1"
              >
                <Trash2 className="h-3.5 w-3.5" /> Limpiar
              </button>
            </div>
          </div>

          {/* Filtros */}
          <div className="flex items-center gap-1 px-4 py-2.5 border-b border-white/8 bg-slate-900/40">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-black transition-all ${
                filter === "all"
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              Todas ({notifications.length})
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-3 py-1.5 rounded-xl text-[11px] font-black transition-all ${
                filter === "unread"
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
              }`}
            >
              Sin leer {unreadCount > 0 && `(${unreadCount})`}
            </button>
          </div>

          {/* Lista de notificaciones */}
          <div className="overflow-y-auto max-h-[420px] custom-scrollbar">
            {displayed.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 px-4 text-center space-y-3">
                <div className="h-14 w-14 rounded-2xl bg-muted/30 border border-border/30 flex items-center justify-center text-2xl">
                  🔔
                </div>
                <div>
                  <p className="text-sm font-black text-foreground">
                    {filter === "unread" ? "Todo leído" : "Sin notificaciones"}
                  </p>
                  <p className="text-xs text-muted-foreground font-medium mt-0.5">
                    {filter === "unread"
                      ? "No tienes notificaciones pendientes"
                      : "Cuando haya novedades aparecerán aquí"}
                  </p>
                </div>
              </div>
            ) : (
              displayed.map(notif => (
                <NotificationItem
                  key={notif.id}
                  notif={notif}
                  onRead={handleRead}
                  onDelete={handleDelete}
                  onNavigate={handleNavigate}
                />
              ))
            )}
          </div>

          {/* Footer */}
          <div className="px-5 py-3 border-t border-white/8 bg-slate-900/60 flex items-center justify-between">
            <span className="text-[10px] text-muted-foreground font-semibold flex items-center gap-1.5">
              <BookOpen className="h-3 w-3" />
              Centro de Notificaciones
            </span>
            <button
              onClick={() => setOpen(false)}
              className="text-[10px] text-muted-foreground hover:text-foreground font-bold transition-colors"
            >
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
