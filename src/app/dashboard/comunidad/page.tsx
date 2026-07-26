'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { MessageCircle, Pin, Users, Bell, Lightbulb, ExternalLink } from 'lucide-react';

export default function ComunidadPage() {
  const [announcements, setAnnouncements] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnnouncements();
  }, []);

  const loadAnnouncements = async () => {
    try {
      // Ignore error if table doesn't exist yet
      const { data } = await supabase
        .from('announcements')
        .select('*')
        .order('is_pinned', { ascending: false })
        .order('created_at', { ascending: false })
        .limit(10);
      
      setAnnouncements(data || []);
    } catch (e) {
      console.log('Using placeholder announcements');
    } finally {
      setLoading(false);
    }
  };

  const whatsappGroups = [
    { title: 'Comunidad Principal (CMB)', desc: 'Discusión general, dudas y material de estudio para CMB.', members: '1.2k' },
    { title: 'Preparación ONEM', desc: 'Grupo enfocado en nivel 1 y 2 de ONEM.', members: '850' },
    { title: 'Retos Avanzados', desc: 'Problemas de alto nivel y discusión de teoremas.', members: '430' }
  ];

  const tips = [
    { title: 'Constancia sobre intensidad', desc: 'Resolver 3 problemas bien pensados cada día es mejor que 20 problemas apurados el fin de semana.' },
    { title: 'Entiende tus errores', desc: 'Cuando te equivoques, anota por qué fallaste. ¿Fue un error de cálculo o un concepto mal entendido?' },
    { title: 'Explica a otros', desc: 'La mejor forma de saber si dominas un tema es intentar explicárselo a un compañero en el grupo de WhatsApp.' }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500">
      
      <div className="bg-gradient-to-r from-emerald-900/60 via-zinc-900 to-zinc-900 border border-emerald-500/20 rounded-3xl p-8 md:p-12 shadow-lg flex flex-col md:flex-row items-center justify-between gap-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-4">Comunidad Virtual</h1>
          <p className="text-emerald-100/70 text-lg max-w-xl">Únete a cientos de estudiantes, comparte soluciones, debate problemas y nunca estudies solo.</p>
        </div>
        <a 
          href="https://wa.me/51999999999" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex-shrink-0 bg-emerald-500 hover:bg-emerald-400 text-zinc-900 font-bold px-8 py-4 rounded-full flex items-center gap-3 transition-transform hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
        >
          <MessageCircle className="w-6 h-6" />
          WhatsApp General
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Bell className="w-6 h-6 text-indigo-400" />
              Anuncios
            </h2>
            <div className="space-y-4">
              {loading ? (
                <div className="h-32 bg-zinc-900 animate-pulse rounded-2xl"></div>
              ) : announcements.length > 0 ? (
                announcements.map((ann, i) => (
                  <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 relative">
                    {ann.is_pinned && <Pin className="absolute top-6 right-6 w-5 h-5 text-indigo-400" />}
                    <h3 className="font-bold text-lg text-white mb-2 pr-8">{ann.title}</h3>
                    <p className="text-zinc-400 text-sm whitespace-pre-wrap">{ann.content}</p>
                    <span className="text-zinc-600 text-xs mt-4 block">{new Date(ann.created_at).toLocaleDateString()}</span>
                  </div>
                ))
              ) : (
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-2">
                    <Pin className="w-5 h-5 text-indigo-400" />
                    <h3 className="font-bold text-lg text-white">¡Bienvenido a la comunidad!</h3>
                  </div>
                  <p className="text-zinc-400">Mantente atento a esta sección para futuras actualizaciones de la plataforma, nuevos solucionarios y torneos especiales.</p>
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
              <Users className="w-6 h-6 text-emerald-400" />
              Grupos por Olimpiada
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {whatsappGroups.map((g, i) => (
                <div key={i} className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-emerald-500/30 transition-colors flex flex-col h-full">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-white leading-tight">{g.title}</h3>
                    <span className="bg-zinc-800 text-zinc-400 text-xs px-2 py-1 rounded-full flex items-center gap-1">
                      <Users className="w-3 h-3" /> {g.members}
                    </span>
                  </div>
                  <p className="text-zinc-500 text-sm mb-6 flex-grow">{g.desc}</p>
                  <a href="#" className="text-emerald-400 text-sm font-semibold flex items-center gap-1 hover:text-emerald-300">
                    Unirse al grupo <ExternalLink className="w-4 h-4 ml-1" />
                  </a>
                </div>
              ))}
            </div>
          </section>
        </div>

        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-yellow-400" />
            Consejos del Día
          </h2>
          <div className="space-y-4">
            {tips.map((tip, i) => (
              <div key={i} className="bg-gradient-to-b from-zinc-800 to-zinc-900 border border-zinc-700 rounded-2xl p-6 relative overflow-hidden group hover:border-yellow-500/30 transition-colors">
                <div className="absolute top-0 right-0 w-16 h-16 bg-yellow-500/10 rounded-bl-full -mr-8 -mt-8" />
                <h3 className="font-bold text-white mb-2 relative z-10">{tip.title}</h3>
                <p className="text-zinc-400 text-sm relative z-10 leading-relaxed">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
