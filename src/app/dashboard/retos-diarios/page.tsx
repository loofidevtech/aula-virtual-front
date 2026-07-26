'use client';

import React, { useState, useEffect } from 'react';
import { quizService } from '@/lib/quiz-service';
import { freemiumService } from '@/lib/freemium-service';
import { 
  CheckCircle2, 
  XCircle, 
  Timer, 
  Trophy, 
  ChevronRight, 
  Star,
  RefreshCw
} from 'lucide-react';

interface Question {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  explanation: string;
}

interface AttemptResult {
  score: number;
  answers: Record<string, string>;
}

export default function RetosDiariosPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showFeedback, setShowFeedback] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState(0);
  
  const [timeToNextReset, setTimeToNextReset] = useState('');

  const user = freemiumService.getCurrentUser();
  const userId = user?.id || 'anonymous';

  useEffect(() => {
    loadDailyChallenge();
    
    const timerInterval = setInterval(() => {
      calculateTimeToNextReset();
    }, 1000);
    
    return () => clearInterval(timerInterval);
  }, []);

  const calculateTimeToNextReset = () => {
    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setHours(24, 0, 0, 0);
    const diff = tomorrow.getTime() - now.getTime();
    
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / 1000 / 60) % 60);
    const s = Math.floor((diff / 1000) % 60);
    
    setTimeToNextReset(`${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`);
  };

  const loadDailyChallenge = async () => {
    try {
      setLoading(true);
      const todayAttempt = await quizService.getTodayDailyAttempt(userId);
      
      if (todayAttempt) {
        setCompleted(true);
        setScore(todayAttempt.score || 0);
        
        // Map the array of answers to Record<string, string>
        const mappedAnswers: Record<string, string> = {};
        if (Array.isArray(todayAttempt.answers)) {
          todayAttempt.answers.forEach((ans: any) => {
            mappedAnswers[ans.question_id] = ans.selected === 0 ? 'a' : ans.selected === 1 ? 'b' : ans.selected === 2 ? 'c' : 'd';
          });
        } else if (todayAttempt.answers) {
          Object.assign(mappedAnswers, todayAttempt.answers);
        }
        setAnswers(mappedAnswers);
      }
      
      const dailyQuestions = await quizService.getDailyQuestions('concurso_matematica_binaria');
      const mappedQ = dailyQuestions.map((qObj: any) => ({
        id: qObj.id,
        question_text: qObj.question,
        option_a: qObj.options[0] || '',
        option_b: qObj.options[1] || '',
        option_c: qObj.options[2] || '',
        option_d: qObj.options[3] || '',
        correct_option: qObj.correct_answer === 0 ? 'a' : qObj.correct_answer === 1 ? 'b' : qObj.correct_answer === 2 ? 'c' : 'd',
        explanation: qObj.explanation || ''
      }));
      setQuestions(mappedQ);
    } catch (err) {
      console.error(err);
      setError('Error al cargar los retos diarios. Intenta nuevamente.');
    } finally {
      setLoading(false);
    }
  };

  const handleAnswer = (option: string) => {
    if (showFeedback) return;
    
    const currentQ = questions[currentIndex];
    setAnswers({ ...answers, [currentQ.id]: option });
    setShowFeedback(true);
    
    if (option === currentQ.correct_option) {
      setScore((prev) => prev + 10); // Assuming 10 points per question
    }
  };

  const handleNext = async () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setShowFeedback(false);
    } else {
      setCompleted(true);
      try {
        const answersToSave = Object.entries(answers).map(([qId, val]) => {
          const num = val === 'a' ? 0 : val === 'b' ? 1 : val === 'c' ? 2 : 3;
          return {
            question_id: qId,
            selected: num,
            correct: val === questions.find(q => q.id === qId)?.correct_option ? true : false,
          };
        });
        
        await quizService.saveDailyAttempt(userId, {
          score,
          answers: answersToSave
        });
      } catch (err) {
        console.error('Failed to save attempt', err);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <RefreshCw className="w-10 h-10 text-emerald-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-6 rounded-xl flex flex-col items-center justify-center min-h-[40vh] text-center">
        <XCircle className="w-12 h-12 mb-4 text-red-500" />
        <h2 className="text-xl font-bold mb-2">¡Ups! Algo salió mal</h2>
        <p>{error}</p>
        <button onClick={loadDailyChallenge} className="mt-6 px-6 py-2 bg-red-500/20 hover:bg-red-500/30 rounded-full transition-colors">
          Reintentar
        </button>
      </div>
    );
  }

  const today = new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const currentQ = questions[currentIndex];
  const isCorrect = currentQ && answers[currentQ.id] === currentQ.correct_option;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="bg-gradient-to-r from-emerald-600 to-teal-900 rounded-3xl p-8 text-white shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-black mb-2 flex items-center gap-3">
              <Star className="w-8 h-8 text-yellow-400 fill-yellow-400" /> 
              Reto Diario
            </h1>
            <p className="text-emerald-100 capitalize">{today}</p>
          </div>
          <div className="bg-black/30 backdrop-blur-md rounded-2xl p-4 border border-white/10 flex items-center gap-4">
            <Timer className="w-6 h-6 text-emerald-300" />
            <div>
              <p className="text-xs text-emerald-200">Próximo reto en</p>
              <p className="font-mono font-bold text-xl">{timeToNextReset}</p>
            </div>
          </div>
        </div>
      </div>

      {completed ? (
        <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 md:p-12 text-center shadow-xl">
          <Trophy className="w-24 h-24 text-yellow-400 mx-auto mb-6 drop-shadow-[0_0_15px_rgba(250,204,21,0.5)]" />
          <h2 className="text-3xl font-bold text-white mb-4">¡Reto Completado!</h2>
          <p className="text-zinc-400 text-lg mb-8">Has terminado el reto de hoy. Vuelve mañana para seguir acumulando puntos y mantener tu racha.</p>
          
          <div className="inline-block bg-zinc-800 rounded-2xl p-6 border border-zinc-700">
            <p className="text-sm text-zinc-400 uppercase tracking-wider mb-2">Puntuación de hoy</p>
            <p className="text-5xl font-black text-emerald-400">{score} <span className="text-2xl text-zinc-500">pts</span></p>
          </div>
        </div>
      ) : (
        currentQ && (
          <div className="bg-zinc-900 border border-zinc-800 rounded-3xl p-6 md:p-10 shadow-xl relative transition-all duration-300">
            <div className="flex justify-between items-center mb-8">
              <span className="text-emerald-500 font-medium bg-emerald-500/10 px-4 py-1.5 rounded-full text-sm border border-emerald-500/20">
                Pregunta {currentIndex + 1} de {questions.length}
              </span>
              <span className="text-zinc-400 text-sm font-medium">Puntos acumulados: {score}</span>
            </div>

            <h3 className="text-2xl text-white font-semibold mb-8 leading-relaxed">
              {currentQ.question_text}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {['a', 'b', 'c', 'd'].map((opt) => {
                const isSelected = answers[currentQ.id] === opt;
                const isCorrectOption = currentQ.correct_option === opt;
                
                let buttonClasses = "p-6 rounded-2xl border-2 text-left transition-all duration-300 font-medium text-lg ";
                
                if (!showFeedback) {
                  buttonClasses += "bg-zinc-800 border-zinc-700 hover:border-emerald-500/50 hover:bg-zinc-800/80 text-zinc-200";
                } else {
                  if (isCorrectOption) {
                    buttonClasses += "bg-emerald-500/20 border-emerald-500 text-emerald-400";
                  } else if (isSelected) {
                    buttonClasses += "bg-red-500/20 border-red-500 text-red-400";
                  } else {
                    buttonClasses += "bg-zinc-800 border-zinc-800 text-zinc-500 opacity-50";
                  }
                }

                return (
                  <button
                    key={opt}
                    onClick={() => handleAnswer(opt)}
                    disabled={showFeedback}
                    className={buttonClasses}
                  >
                    <div className="flex items-center gap-4">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${showFeedback && isCorrectOption ? 'bg-emerald-500 text-white' : showFeedback && isSelected ? 'bg-red-500 text-white' : 'bg-zinc-700 text-zinc-300'}`}>
                        {opt.toUpperCase()}
                      </span>
                      <span>{currentQ[`option_${opt}` as keyof Question]}</span>
                      
                      {showFeedback && isCorrectOption && <CheckCircle2 className="w-6 h-6 ml-auto text-emerald-500" />}
                      {showFeedback && isSelected && !isCorrectOption && <XCircle className="w-6 h-6 ml-auto text-red-500" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {showFeedback && (
              <div className={`p-6 rounded-2xl mb-8 animate-in slide-in-from-bottom-4 duration-300 ${isCorrect ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-200' : 'bg-amber-500/10 border border-amber-500/20 text-amber-200'}`}>
                <h4 className={`font-bold text-lg mb-2 flex items-center gap-2 ${isCorrect ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {isCorrect ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5" />}
                  {isCorrect ? '¡Correcto!' : 'Incorrecto'}
                </h4>
                <p className="leading-relaxed">{currentQ.explanation || 'No hay explicación adicional para esta pregunta.'}</p>
              </div>
            )}

            <div className="flex justify-end">
              <button
                onClick={handleNext}
                disabled={!showFeedback}
                className={`flex items-center gap-2 px-8 py-3 rounded-full font-bold transition-all ${showFeedback ? 'bg-emerald-500 hover:bg-emerald-600 text-white cursor-pointer shadow-lg shadow-emerald-500/20' : 'bg-zinc-800 text-zinc-600 cursor-not-allowed'}`}
              >
                {currentIndex < questions.length - 1 ? 'Siguiente Pregunta' : 'Finalizar Reto'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )
      )}
    </div>
  );
}
