// components/dashboard/DashboardSidebar.tsx
"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import Image from "next/image"
import {
  Home,
  BookOpen,
  TrendingUp,
  FileText,
  Swords,
  Users,
  Flame,
  Star,
  Gift,
  HelpCircle,
  Crown,
} from "lucide-react"

interface NavItem {
  label: string
  href: string
  icon: React.ReactNode
  badge?: number
}

const mainNav: NavItem[] = [
  { label: "Inicio", href: "/dashboard", icon: <Home className="h-5 w-5" /> },
  { label: "Programas", href: "/dashboard/cursos", icon: <BookOpen className="h-5 w-5" /> },
  { label: "Solucionarios", href: "/dashboard/solucionarios", icon: <FileText className="h-5 w-5" /> },
  { label: "Mi progreso", href: "/dashboard/progreso", icon: <TrendingUp className="h-5 w-5" /> },
  { label: "Retos", href: "/dashboard/retos", icon: <Swords className="h-5 w-5" /> },
  { label: "Comunidad", href: "/dashboard/comunidad", icon: <Users className="h-5 w-5" /> },
]

const gameNav: NavItem[] = [
  { label: "Retos diarios", href: "/dashboard/retos-diarios", icon: <Flame className="h-5 w-5" />, badge: 3 },
  { label: "Ranking semanal", href: "/dashboard/ranking", icon: <Star className="h-5 w-5" /> },
  { label: "Recompensas", href: "/dashboard/recompensas", icon: <Gift className="h-5 w-5" /> },
]

function NavLink({ item }: { item: NavItem }) {
  const pathname = usePathname()
  const isActive =
    item.href === "/dashboard"
      ? pathname === "/dashboard"
      : pathname.startsWith(item.href)

  return (
    <Link
      href={item.href}
      className={`group flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-bold transition-all duration-200 ${
        isActive
          ? "bg-primary text-white shadow-lg shadow-primary/25"
          : "text-muted-foreground hover:text-foreground hover:bg-muted"
      }`}
    >
      <span className={isActive ? "text-white" : "text-muted-foreground group-hover:text-foreground"}>
        {item.icon}
      </span>
      <span className="flex-1">{item.label}</span>
      {item.badge && (
        <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-black ${
          isActive ? "bg-white text-primary" : "bg-primary text-white"
        }`}>
          {item.badge}
        </span>
      )}
    </Link>
  )
}

export function DashboardSidebar() {
  return (
    <aside className="flex flex-col h-full bg-card border-r border-border/50 w-64 shrink-0 overflow-y-auto">
      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-border/50">
        <Link href="/">
          <Image
            src="/logo_principal.png"
            alt="Albert Math Academy"
            width={160}
            height={50}
            className="h-10 w-auto object-contain"
            priority
          />
        </Link>
      </div>

      {/* Main Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {mainNav.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}

        {/* Divider */}
        <div className="pt-4 pb-2">
          <div className="h-px bg-border/50" />
        </div>

        {/* Game Nav */}
        {gameNav.map((item) => (
          <NavLink key={item.href} item={item} />
        ))}
      </nav>

      {/* Premium Banner */}
      <div className="p-3 mt-auto">
        <div className="rounded-2xl bg-gradient-to-br from-amber-600/30 to-primary/20 border border-primary/30 p-4 space-y-3">
          <div className="flex items-center gap-2">
            <Crown className="h-5 w-5 text-amber-400" />
            <span className="text-foreground font-black text-sm">Plan Premium</span>
          </div>
          <p className="text-muted-foreground text-xs leading-relaxed">
            Accede a todas las áreas de cursos y beneficios exclusivos.
          </p>
          <button className="w-full rounded-xl bg-primary py-2.5 text-white font-black text-xs hover:bg-primary/90 transition-all hover:shadow-lg hover:shadow-primary/30 active:scale-95">
            Ver beneficios
          </button>
        </div>

        {/* Help */}
        <Link
          href="/dashboard/ayuda"
          className="flex items-center gap-3 mt-2 px-4 py-3 rounded-2xl text-sm font-bold text-muted-foreground hover:text-foreground hover:bg-muted transition-all"
        >
          <HelpCircle className="h-5 w-5" />
          Centro de ayuda
        </Link>
      </div>
    </aside>
  )
}
