'use client';

import React, { useState, useEffect } from 'react';
import { quizService } from '@/lib/quiz-service';
import { freemiumService } from '@/lib/freemium-service';
import { Flame, Target, CheckSquare, Zap, ChevronRight, BookOpen, Clock, Activity } from 'lucide-react';

export default function ProgresoPage() {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const user = freemiumService.getCurrentUser();
  const userId = user?.id || 'anonymous';

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      setLoading(true);
      const data = await quizService.getUserStats(userId);
      setStats(data || {
        total_points: 0,
        total_correct: 0,
        current_streak: 0,
        accuracy_rate: 0
      });
    } catch (err) {
      console.error(err);
      // Fallback to empty stats
      setStats({
        total_points: 0,
        total_correct: 0,
        current_streak: 0,
        accuracy_rate: 0
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[50vh]">
        <Activity className="w-10 h-10 text-blue-500 animate-spin" />
      </div>
    );
  }

  const statCards = [
    {
      title: 'Puntos Totales',
      value: stats.total_points || 0,
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/20',
      color: 'text-yellow-400'
    },
    {
      title: 'Respuestas Correctas',
      value: stats.total_correct || 0,
      icon: <CheckSquare className="w-6 h-6 text-emerald-400" />,
      bg: 'bg-emerald-500/10',
      border: 'border-emerald-500/20',
      color: 'text-emerald-400'
    },
    {
      title: 'Racha Actual',
      value: `${stats.current_streak || 0} días`,
      icon: <Flame className="w-6 h-6 text-orange-400 fill-orange-400/20" />,
      bg: 'bg-orange-500/10',
      border: 'border-orange-500/20',
      color: 'text-orange-400'
    },
    {
      title: 'Precisión',
      value: `${Math.round(stats.accuracy_rate || 0)}%`,
      icon: <Target className="w-6 h-6 text-blue-400" />,
      bg: 'bg-blue-500/10',
      border: 'border-blue-500/20',
      color: 'text-blue-400'
    }
  ];

  // Mock next milestone logic
  const points = stats.total_points || 0;
  const nextMilestone = points < 100 ? 100 : points < 500 ? 500 : 1000;
  const progressPercent = Math.min(100, Math.max(0, (points / nextMilestone) * 100));

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-500">
      
      <div>
        <h1 className="text-3xl font-black text-white mb-2">Tu Progreso</h1>
        <p className="text-zinc-400">Sigue tu evolución y mantén el ritmo de aprendizaje.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat, i) => (
          <div key={i} className={`bg-zinc-900 border ${stat.border} rounded-3xl p-6 shadow-lg relative overflow-hidden group`}>
            <div className={`absolute top-0 right-0 w-32 h-32 ${stat.bg} rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 duration-500`} />
            <div className="relative z-10">
              <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.border} border flex items-center justify-center mb-6`}>
                {stat.icon}
              </div>
              <p className="text-zinc-400 text-sm font-semibold uppercase tracking-wider mb-1">{stat.title}</p>
              <p className={`text-4xl font-black ${stat.color}`}>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 shadow-xl">
        <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
          <Target className="w-6 h-6 text-blue-500" />
          Próxima Meta
        </h3>
        <div className="mb-4 flex justify-between items-end">
          <div>
            <p className="text-zinc-400 text-sm mb-1">Progreso a {nextMilestone} pts</p>
            <p className="text-2xl font-bold text-white">{points} <span className="text-zinc-500 text-base font-normal">/ {nextMilestone}</span></p>
          </div>
          <span className="text-blue-400 font-bold">{Math.round(progressPercent)}%</span>
        </div>
        <div className="h-4 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-blue-400 rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-xl font-bold text-white flex items-center gap-2">
          <BookOpen className="w-6 h-6 text-zinc-400" />
          Actividad por Solucionario
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-zinc-800 to-zinc-900 border border-zinc-700 rounded-2xl p-6 hover:border-zinc-500 transition-colors cursor-pointer group">
            <div className="flex justify-between items-start mb-12">
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center border border-blue-500/30">
                <Activity className="w-5 h-5" />
              </div>
              <span className="bg-zinc-800 text-zinc-300 text-xs px-3 py-1 rounded-full border border-zinc-700">Activo</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-1">Matemática Binaria</h4>
            <p className="text-zinc-400 text-sm mb-4">Concurso Nacional (CMB)</p>
            <div className="flex items-center text-blue-400 text-sm font-semibold group-hover:text-blue-300 transition-colors">
              Ver detalles <ChevronRight className="w-4 h-4 ml-1" />
            </div>
          </div>
          
          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 opacity-60">
            <div className="flex justify-between items-start mb-12">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 text-zinc-500 flex items-center justify-center border border-zinc-700">
                <Clock className="w-5 h-5" />
              </div>
              <span className="bg-zinc-800/50 text-zinc-500 text-xs px-3 py-1 rounded-full border border-zinc-700/50">Próximamente</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-1">ONEM</h4>
            <p className="text-zinc-500 text-sm">Olimpiada Nacional Escolar</p>
          </div>

          <div className="bg-zinc-900/50 border border-zinc-800/50 rounded-2xl p-6 opacity-60">
            <div className="flex justify-between items-start mb-12">
              <div className="w-10 h-10 rounded-xl bg-zinc-800 text-zinc-500 flex items-center justify-center border border-zinc-700">
                <Clock className="w-5 h-5" />
              </div>
              <span className="bg-zinc-800/50 text-zinc-500 text-xs px-3 py-1 rounded-full border border-zinc-700/50">Próximamente</span>
            </div>
            <h4 className="text-lg font-bold text-white mb-1">CONAMAT</h4>
            <p className="text-zinc-500 text-sm">Concurso Nacional de Matemática</p>
          </div>
        </div>
      </div>
    </div>
  );
}
