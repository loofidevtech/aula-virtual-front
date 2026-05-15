// components/dashboard/HeaderBanner.tsx
import { ReactNode } from "react"

export interface MetricItem {
  icon: ReactNode
  value: string | number
  label: string
}

interface HeaderBannerProps {
  badgeText?: string
  title: string
  subtitle?: string
  description?: string
  metrics?: MetricItem[]
  gradient?: string
  action?: ReactNode
}

export function HeaderBanner({
  badgeText,
  title,
  subtitle,
  description,
  metrics,
  gradient = "from-secondary to-blue-900",
  action,
}: HeaderBannerProps) {
  return (
    <div
      className={`relative w-full rounded-3xl bg-gradient-to-br ${gradient} p-6 md:p-8 overflow-hidden border border-white/10 mb-8`}
    >
      {/* Background decorative dots */}
      <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:24px_24px]" />
      {/* Glow */}
      <div className="absolute -top-16 -right-16 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />

      <div className="relative z-10 flex flex-col md:flex-row gap-6 md:items-center justify-between">
        <div className="space-y-2 flex-1">
          {badgeText && (
            <span className="inline-block px-3 py-1 bg-primary/20 border border-primary/30 text-primary text-xs font-black uppercase tracking-widest rounded-full">
              {badgeText}
            </span>
          )}
          <h1 className="text-2xl md:text-3xl font-black text-white leading-tight">{title}</h1>
          {subtitle && (
            <p className="text-white/60 text-sm font-medium">{subtitle}</p>
          )}
          {description && (
            <p className="text-white/80 text-sm md:text-base font-medium max-w-xl leading-relaxed">
              {description}
            </p>
          )}
          {action && <div className="pt-2">{action}</div>}
        </div>

        {metrics && metrics.length > 0 && (
          <div className="grid grid-cols-2 gap-3 shrink-0">
            {metrics.map((m, i) => (
              <div
                key={i}
                className="flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/10 rounded-2xl px-4 py-3 min-w-[120px]"
              >
                <span className="text-accent">{m.icon}</span>
                <div>
                  <p className="text-white font-black text-lg leading-none">{m.value}</p>
                  <p className="text-white/60 text-xs font-medium mt-0.5">{m.label}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
