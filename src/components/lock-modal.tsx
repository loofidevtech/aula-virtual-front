"use client";

import { Lock, MessageCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

interface LockModalProps {
  isOpen: boolean;
  onClose: () => void;
  courseName: string;
}

export function LockModal({ isOpen, onClose, courseName }: LockModalProps) {
  if (!isOpen) return null;

  const whatsappNumber = "51992350023"; // Example number from previous context
  const message = encodeURIComponent(
    `Hola Albert Math Academy! 👋 Deseo obtener acceso completo al curso de ${courseName}. Me gustaría recibir más información sobre los costos y el proceso de inscripción.`,
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${message}`;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-secondary/80 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      <div className="relative w-full max-w-lg overflow-hidden rounded-[3rem] bg-white shadow-2xl animate-in zoom-in-95 duration-300">
        {/* Decorative background */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 h-64 w-64 rounded-full bg-primary/5" />
        <div className="absolute bottom-0 left-0 -ml-16 -mb-16 h-48 w-48 rounded-full bg-accent/5" />

        <div className="relative p-8 md:p-12 text-center">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 rounded-full hover:bg-secondary/5 transition-colors"
          >
            <X className="h-6 w-6 text-secondary/40" />
          </button>

          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-[2rem] bg-primary/10 text-primary">
            <Lock className="h-10 w-10" />
          </div>

          <h2 className="text-3xl font-black text-secondary mb-4 leading-tight">
            ¡Has descubierto contenido{" "}
            <span className="text-primary italic">Premium!</span>
          </h2>

          <p className="text-lg text-muted-foreground font-medium mb-8 leading-relaxed">
            Has alcanzado el límite gratuito de 3 videos para{" "}
            <span className="font-bold text-secondary">{courseName}</span>. Para
            acceder a todo nuestro repertorio de clases, simulacros y material
            especializado, contáctanos ahora.
          </p>

          <div className="space-y-4">
            <Button
              size="lg"
              className="w-full h-16 rounded-2xl bg-[#25D366] hover:bg-[#128C7E] text-white font-black text-xl gap-4 shadow-xl shadow-green-500/20 hover:scale-105 transition-all"
              onClick={() => window.open(whatsappUrl, "_blank")}
            >
              <MessageCircle className="h-6 w-6 fill-current" />
              Solicitar Acceso Full
            </Button>

            <button
              onClick={onClose}
              className="text-sm font-bold text-secondary/40 hover:text-secondary transition-colors"
            >
              Seguir explorando otros cursos
            </button>
          </div>

          <div className="mt-8 pt-8 border-t border-secondary/5 flex items-center justify-center gap-6">
            <div className="flex -space-x-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-white bg-secondary/10 flex items-center justify-center font-bold text-xs text-secondary"
                >
                  {String.fromCharCode(64 + i)}
                </div>
              ))}
            </div>
            <p className="text-xs font-bold text-secondary/60">
              Más de{" "}
              <span className="text-secondary font-black">500 alumnos</span> ya
              son premium
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
