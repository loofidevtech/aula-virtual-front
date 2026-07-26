'use client';

import React, { useState } from 'react';
import { Search, ChevronDown, MessageSquare, Mail, ExternalLink, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function AyudaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: '¿Cómo accedo a los solucionarios?',
      a: 'Puedes acceder a los solucionarios desde la barra lateral izquierda seleccionando la opción "Solucionarios" si tienes una cuenta Premium. Si estás en el plan Free, puedes practicar en la sección "Retos" o "Retos Diarios".'
    },
    {
      q: '¿Qué significa Plan Free vs Premium?',
      a: 'El Plan Free te permite acceder a los Retos Diarios, Banco de Retos y participar en el Ranking. El Plan Premium incluye acceso total a todos los solucionarios en video, teoría descargable, simulacros y soporte prioritario.'
    },
    {
      q: '¿Cómo funciona el sistema de retos diarios?',
      a: 'Cada día a medianoche se publican 3 nuevos problemas. Tienes 24 horas para resolverlos. Al responder, ganas puntos para el ranking semanal y acumulas estadísticas para tus logros.'
    },
    {
      q: '¿Cómo se calcula el ranking semanal?',
      a: 'El ranking suma todos los puntos que ganas resolviendo retos (diarios y de banco) desde el lunes a las 00:00 hasta el domingo a las 23:59. Cada semana el ranking se reinicia, dando oportunidad a todos de liderar.'
    },
    {
      q: '¿Cómo desbloqueo el acceso Premium?',
      a: 'Puedes actualizar tu plan contactando a soporte vía WhatsApp o desde la opción "Actualizar a Premium" en tu perfil (si está disponible en tu región).'
    },
    {
      q: '¿Puedo ver los videos sin internet?',
      a: 'Actualmente, los videos requieren conexión a internet para reproducirse. Sin embargo, los materiales PDF de teoría sí pueden ser descargados para su lectura offline.'
    }
  ];

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-in fade-in duration-500">
      
      <div className="text-center space-y-6 pt-8 pb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-500/10 mb-2">
          <HelpCircle className="w-8 h-8 text-blue-500" />
        </div>
        <h1 className="text-4xl font-black text-white">¿En qué podemos ayudarte?</h1>
        <p className="text-zinc-400 text-lg max-w-xl mx-auto">Encuentra respuestas rápidas o contáctanos directamente. Estamos aquí para asegurar que tu aprendizaje no se detenga.</p>
        
        {/* Decorative search bar */}
        <div className="max-w-lg mx-auto relative mt-8">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-zinc-500" />
          </div>
          <input 
            type="text" 
            placeholder="Buscar ayuda, artículos, problemas..." 
            className="w-full bg-zinc-900 border border-zinc-700 text-white py-4 pl-12 pr-4 rounded-full focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all shadow-lg"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Preguntas Frecuentes</h2>
          
          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div 
                key={idx} 
                className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden transition-all duration-300"
              >
                <button 
                  onClick={() => toggleFaq(idx)}
                  className="w-full flex items-center justify-between p-6 text-left focus:outline-none"
                >
                  <span className={`font-semibold pr-8 ${openFaq === idx ? 'text-white' : 'text-zinc-300'}`}>
                    {faq.q}
                  </span>
                  <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform duration-300 ${openFaq === idx ? 'rotate-180 text-blue-500' : 'text-zinc-500'}`} />
                </button>
                
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openFaq === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <p className="p-6 pt-0 text-zinc-400 leading-relaxed border-t border-zinc-800/50 mt-2">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white mb-6">Contacto Directo</h2>
          
          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 space-y-4">
            <a 
              href="https://wa.me/51999999999" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full bg-emerald-500/10 hover:bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 p-4 rounded-xl flex items-center justify-center gap-3 transition-colors font-medium"
            >
              <MessageSquare className="w-5 h-5" />
              Soporte por WhatsApp
            </a>
            
            <a 
              href="mailto:soporte@academy.com" 
              className="w-full bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-zinc-300 p-4 rounded-xl flex items-center justify-center gap-3 transition-colors font-medium"
            >
              <Mail className="w-5 h-5" />
              Enviar Correo
            </a>
          </div>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
            <h3 className="font-bold text-white mb-4">Atajos Rápidos</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/dashboard/retos" className="flex items-center justify-between text-zinc-400 hover:text-blue-400 transition-colors">
                  Banco de Retos <ExternalLink className="w-4 h-4" />
                </Link>
              </li>
              <li>
                <Link href="/dashboard/comunidad" className="flex items-center justify-between text-zinc-400 hover:text-blue-400 transition-colors">
                  Comunidad <ExternalLink className="w-4 h-4" />
                </Link>
              </li>
              <li>
                <Link href="/dashboard/progreso" className="flex items-center justify-between text-zinc-400 hover:text-blue-400 transition-colors">
                  Mi Progreso <ExternalLink className="w-4 h-4" />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
