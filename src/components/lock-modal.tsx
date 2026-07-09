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
        className={`absolute inset-0 bg-slate-950/60 backdrop-blur-xl transition-opacity duration-300 ${
          animTrigger ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal Card */}
      <div
        className={`relative w-full max-w-xl overflow-hidden rounded-[2.5rem] bg-white border border-slate-100 shadow-2xl transition-all duration-300 transform ${
          animTrigger ? "scale-100 translate-y-0 opacity-100" : "scale-95 translate-y-4 opacity-0"
        }`}
      >
        {/* Top visual accents */}
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-amber-500 via-primary to-purple-600" />
        
        {/* Glow circles behind lock icon */}
        <div className="absolute top-12 left-1/2 -translate-x-1/2 h-44 w-44 rounded-full bg-primary/10 blur-2xl pointer-events-none" />
        <div className="absolute top-8 left-12 h-32 w-32 rounded-full bg-amber-500/5 blur-xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition-all duration-200"
          aria-label="Cerrar modal"
        >
          <X className="h-5 w-5" />
        </button>

        <div className="p-8 md:p-10 text-center relative z-10 flex flex-col items-center">
          
          {/* Sparkly Premium Icon */}
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-[1.75rem] bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-xl shadow-amber-500/30">
            <Lock className="h-8 w-8" />
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-white text-[9px] font-black border border-white animate-pulse">
              <Sparkles className="h-3 w-3 fill-current" />
            </span>
          </div>

          {/* Headline */}
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 mb-3 leading-tight tracking-tight">
            Desbloquea el acceso <span className="text-primary font-black italic">Premium</span>
          </h2>
          
          {/* Subtitle */}
          <p className="text-sm font-semibold text-slate-500 max-w-sm mb-6 leading-relaxed">
            Has consumido tu visualización gratuita de 3 clases para el curso <span className="text-primary font-black">{courseName}</span>.
          </p>

          {/* ⚡ Progress Tracker ⚡ */}
          <div className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 mb-6 text-left">
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-black text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <AlertCircle className="h-3.5 w-3.5 text-amber-500" />
                Límite gratuito alcanzado
              </span>
              <span className="text-xs font-black text-primary">3 / 3 Clases vistas</span>
            </div>
            
            {/* Glowing progress bar */}
            <div className="h-3.5 w-full rounded-full bg-slate-200 overflow-hidden relative shadow-inner">
              <div className="h-full w-full bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]" />
            </div>
            <p className="text-[10px] font-bold text-slate-400 mt-2 text-center">
              ⚡ Invierte en tu educación y desbloquea el resto del temario olímpico.
            </p>
          </div>

          {/* Course Benefits List */}
          <div className="w-full space-y-3.5 mb-8 text-left bg-primary/5 rounded-2xl p-5 border border-primary/10">
            <p className="text-xs font-black text-primary uppercase tracking-widest mb-1.5">¿Qué incluye el acceso completo?</p>
            
            <div className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-[#22C55E] shrink-0 mt-0.5" />
              <p className="text-xs font-bold text-slate-700">
                Temario estructurado de nivelación y competencia
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-[#22C55E] shrink-0 mt-0.5" />
              <p className="text-xs font-bold text-slate-700">
                Exámenes oficiales y simulacros resueltos en alta definición
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-[#22C55E] shrink-0 mt-0.5" />
              <p className="text-xs font-bold text-slate-700">
                Material de apoyo y resúmenes PDF listos para descargar
              </p>
            </div>
            <div className="flex items-start gap-3">
              <CheckCircle className="h-4 w-4 text-[#22C55E] shrink-0 mt-0.5" />
              <p className="text-xs font-bold text-slate-700">
                Consultas directas con los profesores y comunidad activa
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="w-full space-y-4">
            <Button
              size="lg"
              className="w-full h-14 rounded-2xl bg-[#25D366] hover:bg-[#1ebd59] text-white font-black text-base md:text-lg gap-3 shadow-lg shadow-emerald-500/20 hover:scale-[1.02] active:scale-95 transition-all duration-200 cursor-pointer animate-pulse"
              onClick={() => window.open(whatsappUrl, "_blank")}
            >
              <MessageCircle className="h-5 w-5 fill-current shrink-0" />
              Quiero acceder al curso completo
            </Button>

            <button
              onClick={onClose}
              className="text-xs font-bold text-slate-400 hover:text-slate-800 transition-colors py-1 block mx-auto underline underline-offset-4"
            >
              Seguir explorando otros cursos
            </button>
          </div>

          {/* Footer stats / social proof */}
          <p className="mt-6 text-[10px] font-bold text-slate-400">
            🏅 Únete a más de <span className="text-slate-600 font-extrabold">500 alumnos</span> que ya están logrando medallas.
          </p>

        </div>
      </div>
    </div>
  );
}
