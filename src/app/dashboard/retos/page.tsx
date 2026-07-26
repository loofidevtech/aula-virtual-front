'use client';

import React, { useState, useEffect } from 'react';
import { quizService } from '@/lib/quiz-service';
import { freemiumService } from '@/lib/freemium-service';
import { Target, ChevronDown, CheckCircle2, XCircle, Zap, RefreshCw, X } from 'lucide-react';

interface Question {
  id: string;
  question_text: string;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
  correct_option: string;
  explanation: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  points?: number;
}

export default function RetosBankPage() {
  const [solucionario, setSolucionario] = useState('concurso_matematica_binaria');
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [totalPoints, setTotalPoints] = useState(0);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [answer, setAnswer] = useState<string | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const user = freemiumService.getCurrentUser();
  const userId = user?.id || 'anonymous';

  useEffect(() => {
    loadQuestions();
  }, [solucionario]);

  const loadQuestions = async () => {
    try {
      setLoading(true);
      setError(null);
      // In a real app, this might have difficulty/points per question
      const q = await quizService.getQuestions(solucionario);
      const enhancedQ = q.map((qObj: any) => ({
        id: qObj.id,
        question_text: qObj.question,
        option_a: qObj.options[0] || '',
        option_b: qObj.options[1] || '',
        option_c: qObj.options[2] || '',
        option_d: qObj.options[3] || '',
        correct_option: qObj.correct_answer === 0 ? 'a' : qObj.correct_answer === 1 ? 'b' : qObj.correct_answer === 2 ? 'c' : 'd',
        explanation: qObj.explanation || '',
        difficulty: (qObj.difficulty === 'fácil' ? 'easy' : qObj.difficulty === 'medio' ? 'medium' : 'hard') as 'easy' | 'medium' | 'hard',
        points: qObj.points || 10
      }));
      setQuestions(enhancedQ);
    } catch (err) {
      console.error(err);
      setError('Error al cargar el banco de preguntas.');
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (diff?: string) => {
    switch(diff) {
      case 'easy': return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'medium': return 'bg-amber-500/20 text-amber-400 border-amber-500/30';
      case 'hard': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-zinc-800 text-zinc-400 border-zinc-700';
    }
  };

  const getDifficultyLabel = (diff?: string) => {
    switch(diff) {
      case 'easy': return 'Fácil';
      case 'medium': return 'Medio';
      case 'hard': return 'Difícil';
      default: return 'Normal';
    }
  };

  const openQuestion = (q: Question) => {
    setSelectedQuestion(q);
    setAnswer(null);
    setShowFeedback(false);
  };

  const closeQuestion = () => {
    setSelectedQuestion(null);
    setAnswer(null);
    setShowFeedback(false);
  };

  const handleAnswer = async (opt: string) => {
    if (showFeedback || !selectedQuestion) return;
    setAnswer(opt);
    setShowFeedback(true);
    
    const isCorrect = opt === selectedQuestion.correct_option;
    const pointsEarned = isCorrect ? (selectedQuestion.points || 10) : 0;
    
    if (isCorrect) {
      setTotalPoints(prev => prev + pointsEarned);
    }

    try {
      setSubmitting(true);
      await quizService.recordAttempt({
        userId,
        questionId: selectedQuestion.id,
        selectedOption: opt,
        isCorrect,
        points: pointsEarned
      });
    } catch (err) {
      console.error('Failed to record attempt', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 bg-zinc-900 border border-zinc-800 p-6 rounded-3xl shadow-lg">
        <div>
          <h1 className="text-3xl font-black text-white flex items-center gap-3">
            <Target className="w-8 h-8 text-indigo-400" />
            Banco de Retos
          </h1>
          <p className="text-zinc-400 mt-2">Practica a tu propio ritmo con nuestra colección de problemas.</p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
          <div className="relative w-full sm:w-auto">
            <select 
              value={solucionario}
              onChange={(e) => setSolucionario(e.target.value)}
              className="w-full appearance-none bg-zinc-800 border border-zinc-700 text-white py-3 pl-6 pr-12 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
            >
              <option value="concurso_matematica_binaria">CMB - Matemática Binaria</option>
              <option value="onem" disabled>ONEM (Próximamente)</option>
              <option value="conamat" disabled>CONAMAT (Próximamente)</option>
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400 pointer-events-none" />
          </div>
          
          <div className="bg-indigo-500/10 border border-indigo-500/20 px-6 py-3 rounded-xl flex items-center gap-3 whitespace-nowrap w-full sm:w-auto justify-center">
            <Zap className="w-5 h-5 text-indigo-400 fill-indigo-400" />
            <span className="font-medium text-indigo-100">
              <span className="text-indigo-400 font-bold">{totalPoints}</span> pts ganados
            </span>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <RefreshCw className="w-10 h-10 text-indigo-500 animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-red-500/10 text-red-400 p-6 rounded-2xl text-center border border-red-500/20">
          <p>{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questions.map((q, idx) => (
            <div 
              key={q.id || idx} 
              onClick={() => openQuestion(q)}
              className="group bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-indigo-500/50 hover:bg-zinc-800/80 transition-all duration-300 cursor-pointer shadow-lg hover:shadow-indigo-500/10 flex flex-col h-full"
            >
              <div className="flex justify-between items-start mb-4">
                <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getDifficultyColor(q.difficulty)}`}>
                  {getDifficultyLabel(q.difficulty)}
                </span>
                <span className="text-zinc-500 text-sm font-medium">{q.points} pts</span>
              </div>
              <p className="text-white font-medium line-clamp-3 mb-6 flex-grow">{q.question_text}</p>
              <div className="mt-auto pt-4 border-t border-zinc-800 flex justify-between items-center">
                <span className="text-indigo-400 text-sm font-medium group-hover:text-indigo-300 transition-colors">Resolver reto</span>
                <ChevronDown className="w-5 h-5 text-zinc-600 -rotate-90 group-hover:text-indigo-400 transition-colors" />
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal for answering question */}
      {selectedQuestion && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-zinc-900 border border-zinc-700 rounded-3xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-2xl relative">
            
            <button 
              onClick={closeQuestion}
              className="absolute top-6 right-6 text-zinc-400 hover:text-white transition-colors bg-zinc-800 p-2 rounded-full hover:bg-zinc-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="p-8">
              <div className="flex gap-3 mb-6">
                <span className={`px-3 py-1 text-xs font-bold rounded-full border ${getDifficultyColor(selectedQuestion.difficulty)}`}>
                  {getDifficultyLabel(selectedQuestion.difficulty)}
                </span>
                <span className="px-3 py-1 text-xs font-bold rounded-full border border-zinc-700 bg-zinc-800 text-zinc-300">
                  {selectedQuestion.points} pts
                </span>
              </div>

              <h3 className="text-2xl font-bold text-white mb-8">{selectedQuestion.question_text}</h3>

              <div className="space-y-3 mb-8">
                {['a', 'b', 'c', 'd'].map((opt) => {
                  const isSelected = answer === opt;
                  const isCorrectOption = selectedQuestion.correct_option === opt;
                  
                  let btnStyle = "w-full text-left p-5 rounded-2xl border-2 transition-all duration-300 flex items-center gap-4 font-medium ";
                  
                  if (!showFeedback) {
                    btnStyle += "bg-zinc-800/50 border-zinc-700 hover:border-indigo-500/50 hover:bg-zinc-800 text-zinc-200";
                  } else {
                    if (isCorrectOption) {
                      btnStyle += "bg-emerald-500/20 border-emerald-500 text-emerald-400";
                    } else if (isSelected) {
                      btnStyle += "bg-red-500/20 border-red-500 text-red-400";
                    } else {
                      btnStyle += "bg-zinc-800/50 border-zinc-800 text-zinc-500 opacity-50";
                    }
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleAnswer(opt)}
                      disabled={showFeedback || submitting}
                      className={btnStyle}
                    >
                      <span className={`w-8 h-8 rounded-full flex flex-shrink-0 items-center justify-center text-sm ${showFeedback && isCorrectOption ? 'bg-emerald-500 text-white' : showFeedback && isSelected ? 'bg-red-500 text-white' : 'bg-zinc-700 text-zinc-300'}`}>
                        {opt.toUpperCase()}
                      </span>
                      <span>{selectedQuestion[`option_${opt}` as keyof Question]}</span>
                      {showFeedback && isCorrectOption && <CheckCircle2 className="w-6 h-6 ml-auto text-emerald-500 flex-shrink-0" />}
                      {showFeedback && isSelected && !isCorrectOption && <XCircle className="w-6 h-6 ml-auto text-red-500 flex-shrink-0" />}
                    </button>
                  );
                })}
              </div>

              {showFeedback && (
                <div className={`p-6 rounded-2xl mb-8 animate-in slide-in-from-bottom-4 duration-300 ${answer === selectedQuestion.correct_option ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-200' : 'bg-zinc-800 border border-zinc-700 text-zinc-300'}`}>
                  <h4 className={`font-bold text-lg mb-2 flex items-center gap-2 ${answer === selectedQuestion.correct_option ? 'text-emerald-400' : 'text-white'}`}>
                    {answer === selectedQuestion.correct_option ? <CheckCircle2 className="w-5 h-5" /> : <XCircle className="w-5 h-5 text-red-400" />}
                    {answer === selectedQuestion.correct_option ? '¡Excelente respuesta!' : 'Respuesta incorrecta'}
                  </h4>
                  <p className="leading-relaxed">{selectedQuestion.explanation || 'Sigue practicando para dominar este tipo de problemas.'}</p>
                </div>
              )}

              {showFeedback && (
                <div className="flex justify-end border-t border-zinc-800 pt-6">
                  <button 
                    onClick={closeQuestion}
                    className="px-8 py-3 bg-zinc-100 hover:bg-white text-zinc-900 rounded-full font-bold transition-colors"
                  >
                    Cerrar y continuar
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
