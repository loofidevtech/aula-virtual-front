'use client';

import React, { useState, useEffect } from 'react';
import { quizService } from '@/lib/quiz-service';
import { freemiumService } from '@/lib/freemium-service';
import { Trophy, Medal, Star, RefreshCw, Crown, TrendingUp } from 'lucide-react';

interface RankUser {
  id: string;
  name: string;
  points: number;
  avatarUrl?: string;
}

export default function RankingPage() {
  const [ranking, setRanking] = useState<RankUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [userStats, setUserStats] = useState<any>(null);
  
  const [timeToReset, setTimeToReset] = useState('');

  const currentUser = freemiumService.getCurrentUser();
  const userId = currentUser?.id || 'anonymous';

  useEffect(() => {
    loadData();
    
    const timer = setInterval(() => {
      calculateTimeToReset();
    }, 1000);
    
    return () => clearInterval(timer);
  }, []);

  const calculateTimeToReset = () => {
    const now = new Date();
    const nextSunday = new Date();
    nextSunday.setDate(now.getDate() + (7 - now.getDay()) % 7);
    nextSunday.setHours(23, 59, 59, 999);
    
    const diff = nextSunday.getTime() - now.getTime();
    
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    
    setTimeToReset(`${d}d ${h.toString().padStart(2, '0')}h ${m.toString().padStart(2, '0')}m`);
  };

  const loadData = async () => {
    try {
      setLoading(true);
      const [rankingData, stats] = await Promise.all([
        quizService.getWeeklyRanking(),
        quizService.getUserStats(userId)
      ]);
      
      // Transform data if needed for display
      const displayRanking = rankingData.map((item: any, idx: number) => ({
        id: item.user_id,
        name: `Estudiante ${item.user_id.substring(0,4)}`, // Fallback name
        points: item.score || 0
      }));
      
      // Ensure we have 10 for display purposes even if empty
      const paddedRanking = [...displayRanking];
      while (paddedRanking.length < 10) {
        paddedRanking.push({ id: `ghost-${paddedRanking.length}`, name: '---', points: 0 });
      }
      
      setRanking(paddedRanking.slice(0, 10));
      setUserStats(stats);
    } catch (err) {
      console.error(err);
      setError('No se pudo cargar el ranking.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <RefreshCw className="w-10 h-10 text-purple-500 animate-spin" />
      </div>
    );
  }

  const getRankStyle = (index: number) => {
    switch(index) {
      case 0: return 'bg-gradient-to-r from-yellow-500/20 to-yellow-600/10 border-yellow-500/50 text-yellow-500 scale-[1.02] z-10 shadow-[0_0_30px_rgba(234,179,8,0.15)]';
      case 1: return 'bg-gradient-to-r from-zinc-300/20 to-zinc-400/10 border-zinc-400/50 text-zinc-300 scale-[1.01] z-10 shadow-lg';
      case 2: return 'bg-gradient-to-r from-amber-700/20 to-amber-800/10 border-amber-700/50 text-amber-600 z-10 shadow-lg';
      default: return 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-purple-500/30 hover:bg-zinc-800/50 transition-colors';
    }
  };

  const getRankIcon = (index: number) => {
    switch(index) {
      case 0: return <Crown className="w-8 h-8 text-yellow-500 fill-yellow-500/20 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]" />;
      case 1: return <Medal className="w-7 h-7 text-zinc-300 fill-zinc-300/20" />;
      case 2: return <Medal className="w-6 h-6 text-amber-600 fill-amber-700/20" />;
      default: return <span className="text-xl font-bold font-mono opacity-50">{index + 1}</span>;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in slide-in-from-bottom-8 duration-700">
      
      {/* Header */}
      <div className="bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-purple-900/40 via-zinc-900 to-zinc-900 border border-purple-500/20 rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-12 opacity-10 blur-3xl pointer-events-none">
          <div className="w-64 h-64 bg-purple-500 rounded-full" />
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left">
            <h1 className="text-4xl font-black text-white flex items-center justify-center md:justify-start gap-3 mb-2">
              <Trophy className="w-10 h-10 text-purple-400" />
              Ranking Semanal
            </h1>
            <p className="text-zinc-400 text-lg">Compite resolviendo retos y sube en la tabla.</p>
          </div>
          
          <div className="bg-black/40 backdrop-blur-md p-5 rounded-2xl border border-white/5 flex gap-6 text-center shadow-xl">
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-1">Tu puntaje</p>
              <p className="text-2xl font-bold text-white">{userStats?.weeklyPoints || 0}</p>
            </div>
            <div className="w-px bg-zinc-800" />
            <div>
              <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-1">Cierre en</p>
              <p className="text-xl font-mono text-purple-400">{timeToReset}</p>
            </div>
          </div>
        </div>
      </div>

      {error ? (
        <div className="bg-red-500/10 text-red-400 p-6 rounded-2xl border border-red-500/20 text-center">
          {error}
        </div>
      ) : (
        <div className="space-y-3 relative">
          <div className="flex justify-between px-8 py-2 text-xs font-bold text-zinc-500 uppercase tracking-widest">
            <span>Posición / Estudiante</span>
            <span>Puntos</span>
          </div>

          {ranking.map((user, idx) => (
            <div 
              key={user.id}
              className={`flex items-center justify-between p-4 md:px-8 md:py-5 rounded-2xl border ${getRankStyle(idx)}`}
            >
              <div className="flex items-center gap-6">
                <div className="w-12 h-12 flex items-center justify-center bg-black/20 rounded-xl">
                  {getRankIcon(idx)}
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-400">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className={`font-bold text-lg ${idx < 3 ? 'text-white' : 'text-zinc-200'}`}>
                    {user.name}
                    {user.id === userId && <span className="ml-2 text-xs bg-purple-500/20 text-purple-400 px-2 py-1 rounded-full border border-purple-500/30">Tú</span>}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className={`font-black text-xl font-mono tracking-tight ${idx === 0 ? 'text-yellow-400' : idx === 1 ? 'text-zinc-300' : idx === 2 ? 'text-amber-500' : 'text-white'}`}>
                  {user.points}
                </span>
                <Star className={`w-5 h-5 ${idx < 3 ? 'opacity-100' : 'opacity-40'} ${idx === 0 ? 'text-yellow-400 fill-yellow-400' : idx === 1 ? 'text-zinc-300 fill-zinc-300' : idx === 2 ? 'text-amber-500 fill-amber-500' : 'text-zinc-500'}`} />
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="bg-purple-500/10 border border-purple-500/20 rounded-2xl p-6 flex items-start gap-4 text-purple-200">
        <TrendingUp className="w-6 h-6 text-purple-400 flex-shrink-0 mt-1" />
        <div>
          <h4 className="font-bold text-purple-300 mb-1">¿Cómo ganar puntos?</h4>
          <p className="text-sm opacity-80 leading-relaxed">Resuelve los Retos Diarios (+10 pts c/u) y practica en el Banco de Retos. Las preguntas más difíciles otorgan más puntos. El ranking se reinicia cada domingo a medianoche.</p>
        </div>
      </div>
    </div>
  );
}
