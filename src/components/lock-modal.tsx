"use client";

import { Lock, MessageCircle, X, CheckCircle, Sparkles, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { freemiumService } from "@/lib/freemium-service";
import { useEffect, useState } from "react";

interface LockModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
  userName?: string;
  userEmail?: string;
  moduleName?: string;
  videoTitle?: string;
}

export function LockModal({
  isOpen,
  onClose,
  courseName,
  userName,
  userEmail,
  moduleName = "Módulo General",
  videoTitle = "Clase Premium"
}: LockModalProps) {
  const [animTrigger, setAnimTrigger] = useState(false);

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => setAnimTrigger(true), 50);
      return () => clearTimeout(timer);
    } else {
      setAnimTrigger(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Resolve user info dynamically if not provided as props
  const resolvedUser = freemiumService.getCurrentUser();
  const activeName = userName || resolvedUser.name;
  const activeEmail = userEmail || resolvedUser.email;

  // Build the sales WhatsApp link
  const whatsappUrl = freemiumService.generateWhatsAppUrl(
    activeName,
    activeEmail,
    courseName,
    moduleName,
    videoTitle
  );

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-6 overflow-y-auto">
      {/* Backdrop with strong blur and dark shade */}
      <div
        className={`absolute inset-0 bg-slate-950/80 backdrop-blur-2xl transition-opacity duration-300 ${
          animTrigger ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal Card - DARK MODE AESTHETIC */}
      <div
        className={`relative w-full max-w-xl overflow-hidden rounded-[2.5rem] bg-[#0b132b] border border-white/10 shadow-[0_25px_60px_rgba(0,0,0,0.8)] transition-all duration-300 transform ${
          animTrigger ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"
        }`}
      >
        {/* Top glowing accent bar */}
        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-400 via-orange-500 to-purple-600 shadow-[0_0_15px_rgba(245,158,11,0.5)]" />
        
        {/* Background glow effects */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 h-56 w-56 rounded-full bg-primary/20 blur-3xl pointer-events-none" />
        <div className="absolute top-8 left-12 h-36 w-36 rounded-full bg-amber-500/10 blur-2xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer z-20"
          aria-label="Cerrar modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8 md:p-10 text-center relative z-10 flex flex-col items-center">
          
          {/* Sparkly Premium Icon */}
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 text-slate-950 shadow-xl shadow-amber-500/25 transform hover:scale-105 transition-transform duration-300">
            <Lock className="h-9 w-9 text-slate-950" />
            <span className="absolute -top-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-white text-[10px] font-black border-2 border-[#0b132b] animate-pulse">
              <Sparkles className="h-3.5 w-3.5 fill-current" />
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-2xl md:text-3xl font-black text-white mb-3 leading-tight tracking-tight">
            Desbloquea el acceso <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-amber-500 to-orange-400 font-black italic">Premium</span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-sm font-semibold text-slate-300 max-w-md mb-6 leading-relaxed">
            Has intentado acceder a contenido exclusivo del plan Premium para <span className="text-amber-400 font-black">{courseName}</span>.
          </p>

          {/* ⚡ Progress / Status Tracker ⚡ */}
          <div className="w-full bg-slate-950/70 border border-amber-500/20 rounded-2xl p-4 mb-6 text-left shadow-inner">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-black text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                Acceso restringido en plan Gratuito
              </span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 py-0.5 rounded-md bg-amber-500/10 border border-amber-500/20">
                Solo 1° Elemento Abierto
              </span>
            </div>
            
            {/* Glowing progress bar */}
            <div className="h-3 w-full rounded-full bg-slate-800 overflow-hidden relative shadow-inner">
              <div className="h-full w-full bg-gradient-to-r from-amber-400 via-amber-500 to-orange-500 rounded-full shadow-[0_0_12px_rgba(245,158,11,0.6)]" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 mt-2 text-center">
              ⚡ Invierte en tu educación y desbloquea el 100% de simulacros, exámenes y solucionarios.
            </p>
          </div>

          {/* Course Benefits List */}
          <div className="w-full space-y-3.5 mb-8 text-left bg-slate-950/50 rounded-2xl p-5 border border-white/10">
            <p className="text-xs font-black text-amber-400 uppercase tracking-widest mb-1.5 flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" /> ¿Qué incluye tu acceso completo?
            </p>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-[#22C55E] shrink-0 mt-0.5" />
              <p className="text-xs font-bold text-slate-200">
                Solucionarios y exámenes en PDF de todas las fases y niveles
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-[#22C55E] shrink-0 mt-0.5" />
              <p className="text-xs font-bold text-slate-200">
                Videos explicativos paso a paso grabados por campeones olímpicos
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-[#22C55E] shrink-0 mt-0.5" />
              <p className="text-xs font-bold text-slate-200">
                Simulacros interactivos cronometrados y resolución ilimitada
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-[#22C55E] shrink-0 mt-0.5" />
              <p className="text-xs font-bold text-slate-200">
                Soporte personalizado directo en la comunidad privada
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full space-y-4">
            <Button
              size="lg"
              className="w-full h-14 rounded-2xl bg-[#25D366] hover:bg-[#1ebd59] text-white font-black text-base md:text-lg gap-3 shadow-xl shadow-emerald-500/25 hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer animate-pulse"
              onClick={() => window.open(whatsappUrl, "_blank")}
            >
              <MessageCircle className="h-5 w-5 fill-current shrink-0" />
              Solicitar Acceso Premium en WhatsApp
            </Button>

            <button
              onClick={onClose}
              className="text-xs font-bold text-slate-400 hover:text-white transition-colors py-1 block mx-auto underline underline-offset-4 cursor-pointer"
            >
              Continuar navegando en el plan libre
            </button>
          </div>

          {/* Footer stats / social proof */}
          <p className="mt-6 text-[11px] font-bold text-slate-400">
            🏅 Únete a más de <span className="text-amber-400 font-extrabold">500 alumnos</span> compitiendo al máximo nivel.
          </p>

        </div>
      </div>
    </div>
  );
}
