'use client';

import React, { useState, useEffect } from 'react';
import { quizService } from '@/lib/quiz-service';
import { freemiumService } from '@/lib/freemium-service';
import { Award, Lock, Sparkles, CheckCircle, Star } from 'lucide-react';

const ACHIEVEMENTS_DATA = [
  { id: 'first_step', title: 'Primer Paso', desc: 'Responde tu primera pregunta', req: { type: 'attempts', val: 1 }, icon: <Sparkles className="w-8 h-8" /> },
  { id: 'streak_3', title: 'En Racha', desc: '3 días consecutivos activo', req: { type: 'streak', val: 3 }, icon: <Award className="w-8 h-8" /> },
  { id: 'correct_10', title: 'Matemático Ágil', desc: '10 respuestas correctas', req: { type: 'correct', val: 10 }, icon: <Star className="w-8 h-8" /> },
  { id: 'points_100', title: 'Centenario', desc: '100 puntos acumulados', req: { type: 'points', val: 100 }, icon: <Award className="w-8 h-8" /> },
  { id: 'streak_7', title: 'Perseverante', desc: '7 días de racha', req: { type: 'streak', val: 7 }, icon: <Sparkles className="w-8 h-8" /> },
  { id: 'correct_50', title: 'Maestro CMB', desc: '50 preguntas correctas', req: { type: 'correct', val: 50 }, icon: <Award className="w-8 h-8" /> },
  { id: 'top_3', title: 'Campeón Semanal', desc: 'Top 3 del ranking semanal', req: { type: 'special', val: 1 }, icon: <Star className="w-8 h-8" /> },
  { id: 'points_500', title: 'Leyenda', desc: '500 puntos acumulados', req: { type: 'points', val: 500 }, icon: <Award className="w-8 h-8" /> }
];

export default function RecompensasPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const user = freemiumService.getCurrentUser();
  const userId = user?.id || 'anonymous';

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const data = await quizService.getUserStats(userId);
      setStats(data || { total_points: 0, total_correct: 0, current_streak: 0, attempts: 0 });
    } catch (err) {
      console.error(err);
      setStats({ total_points: 0, total_correct: 0, current_streak: 0, attempts: 0 });
    } finally {
      setLoading(false);
    }
  };

  const getProgress = (ach: any) => {
    if (!stats) return { current: 0, required: ach.req.val, unlocked: false };
    
    let current = 0;
    switch(ach.req.type) {
      case 'attempts': current = stats.total_points > 0 ? 1 : 0; break; // mock logic
      case 'streak': current = stats.current_streak || 0; break;
      case 'correct': current = stats.total_correct || 0; break;
      case 'points': current = stats.total_points || 0; break;
      case 'special': current = 0; break; // mock logic
    }
    
    const unlocked = current >= ach.req.val;
    return { current: Math.min(current, ach.req.val), required: ach.req.val, unlocked };
  };

  if (loading) {
    return <div className="h-64 flex items-center justify-center"><div className="w-8 h-8 border-4 border-amber-500 border-t-transparent rounded-full animate-spin"></div></div>;
  }

  const unlockedCount = ACHIEVEMENTS_DATA.filter(a => getProgress(a).unlocked).length;

  return (
    <div className="max-w-6xl mx-auto space-y-10 animate-in fade-in duration-500">
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900/30 via-zinc-900 to-zinc-900 border border-amber-500/20 rounded-3xl p-8 shadow-lg text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-20 pointer-events-none">
          <Award className="w-64 h-64 text-amber-500" />
        </div>
        <div className="relative z-10">
          <h1 className="text-4xl font-black text-white mb-4 drop-shadow-md">Tus Logros</h1>
          <p className="text-zinc-400 text-lg mb-8 max-w-2xl mx-auto">Desbloquea insignias a medida que progresas en tus estudios y completas retos.</p>
          
          <div className="inline-flex items-center gap-4 bg-black/40 backdrop-blur-md px-8 py-4 rounded-full border border-white/10">
            <span className="text-amber-500 font-bold text-2xl">{unlockedCount}</span>
            <span className="text-zinc-400 text-xl">/ {ACHIEVEMENTS_DATA.length}</span>
            <span className="text-zinc-300 ml-2 font-medium">desbloqueados</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {ACHIEVEMENTS_DATA.map((ach) => {
          const progress = getProgress(ach);
          const isUnlocked = progress.unlocked;
          const percent = Math.min(100, Math.max(0, (progress.current / progress.required) * 100));

          return (
            <div 
              key={ach.id} 
              className={`relative rounded-3xl p-6 border transition-all duration-500 ${isUnlocked ? 'bg-zinc-900 border-amber-500/50 shadow-[0_0_20px_rgba(245,158,11,0.1)]' : 'bg-zinc-900/50 border-zinc-800 grayscale opacity-70'}`}
            >
              {isUnlocked && (
                <div className="absolute -top-3 -right-3 bg-amber-500 text-black p-1.5 rounded-full z-10 shadow-lg">
                  <CheckCircle className="w-5 h-5" />
                </div>
              )}
              
              <div className="flex flex-col items-center text-center h-full">
                <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 shadow-inner ${isUnlocked ? 'bg-gradient-to-br from-amber-400 to-amber-600 text-white shadow-amber-500/30' : 'bg-zinc-800 text-zinc-500'}`}>
                  {isUnlocked ? ach.icon : <Lock className="w-8 h-8" />}
                </div>
                
                <h3 className={`font-bold text-lg mb-2 ${isUnlocked ? 'text-white' : 'text-zinc-400'}`}>{ach.title}</h3>
                <p className={`text-sm mb-6 flex-grow ${isUnlocked ? 'text-amber-200/70' : 'text-zinc-500'}`}>{ach.desc}</p>
                
                <div className="w-full mt-auto">
                  <div className="flex justify-between text-xs mb-2 font-semibold">
                    <span className={isUnlocked ? 'text-amber-400' : 'text-zinc-500'}>{progress.current}</span>
                    <span className="text-zinc-600">{progress.required}</span>
                  </div>
                  <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${isUnlocked ? 'bg-amber-500' : 'bg-zinc-600'}`} 
                      style={{ width: `${percent}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
