"use client"

import { useState, useEffect } from "react"
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Clock,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { DashboardSidebar } from "@/components/dashboard-sidebar"
import type { View } from "@/app/page"

interface ExamModuleProps {
  onFinish: () => void
  onNavigate: (view: View) => void
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
}

interface Question {
  id: string
  text: string
  options: string[]
  correctAnswer: number
}

export function ExamModule({
  onFinish,
  onNavigate,
  sidebarOpen,
  setSidebarOpen,
}: ExamModuleProps) {
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [examFinished, setExamFinished] = useState(false)

  const courses_data: Record<string, { title: string; color: string; questions: Question[]; icon: any; description: string }> = {
    matematica: {
      title: "Matemática",
      color: "from-[#5A9BD4] to-[#4A8BC4]",
      icon: <Clock className="h-12 w-12" />,
      description: "Domina los fundamentos de la aritmética y geometría con Albert.",
      questions: [
        { id: "m1", text: "¿Cuánto es 2 + 2?", options: ["3", "4", "5", "6"], correctAnswer: 1 },
        { id: "m2", text: "Si tengo 3 manzanas y me regalan 2, ¿cuántas tengo?", options: ["4", "5", "6", "7"], correctAnswer: 1 },
        { id: "m3", text: "¿Cuál es el resultado de 10 / 2?", options: ["2", "4", "5", "10"], correctAnswer: 2 },
      ]
    },
    algebra: {
      title: "Álgebra",
      color: "from-[#D95C14] to-[#C94C04]",
      icon: <ArrowRight className="h-12 w-12" />,
      description: "Resuelve ecuaciones y polinomios como un experto pre-universitario.",
      questions: [
        { id: "a1", text: "Si x + 5 = 10, ¿cuánto vale x?", options: ["2", "3", "5", "10"], correctAnswer: 2 },
        { id: "a2", text: "Factoriza: x² - 4", options: ["(x+2)(x-2)", "(x-2)(x-2)", "(x+4)(x-4)", "(x+2)(x+2)"], correctAnswer: 0 },
        { id: "a3", text: "¿Cuál es el valor de 2x si x = 4?", options: ["6", "8", "10", "12"], correctAnswer: 1 },
      ]
    },
    ingles: {
      title: "Inglés",
      color: "from-[#8EBA21] to-[#7EAA11]",
      icon: <CheckCircle2 className="h-12 w-12" />,
      description: "Mejora tu vocabulario y gramática para el mundo global.",
      questions: [
        { id: "i1", text: "How do you say 'Hola' in English?", options: ["Goodbye", "Hello", "Thank you", "Please"], correctAnswer: 1 },
        { id: "i2", text: "What is the opposite of 'Big'?", options: ["Large", "Small", "Tall", "Short"], correctAnswer: 1 },
        { id: "i3", text: "Complete: 'She ___ my friend.'", options: ["am", "are", "is", "be"], correctAnswer: 2 },
      ]
    }
  }

  const handleCourseSelect = (courseId: string) => {
    setSelectedCourse(courseId)
    setCurrentQuestion(0)
    setAnswers({})
    setExamFinished(false)
  }

  const handleAnswerSelect = (optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: optionIndex,
    }))
  }

  const handleNext = () => {
    const questions = courses_data[selectedCourse!].questions
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    } else {
      setExamFinished(true)
    }
  }

  const calculateScore = () => {
    const questions = courses_data[selectedCourse!].questions
    let correct = 0
    Object.entries(answers).forEach(([index, answer]) => {
      if (questions[parseInt(index)].correctAnswer === answer) correct++
    })
    return correct
  }

  if (!selectedCourse) {
    return (
      <div className="min-h-[calc(100vh-5rem)] bg-[var(--practice-bg)] flex flex-col relative overflow-hidden">
        {/* Background Decorative Blobs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10 animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -z-10 animate-pulse delay-1000" />

        <div className="flex-1 p-8 md:p-16 flex items-center justify-center">
          <div className="max-w-7xl w-full space-y-16">
            <div className="text-center space-y-6">
              <div className="inline-block px-6 py-2 bg-primary/10 rounded-full border border-primary/20 text-primary font-black text-sm uppercase tracking-widest animate-in fade-in slide-in-from-bottom duration-700">
                Módulo de Autoevaluación
              </div>
              <h1 className="text-5xl md:text-8xl font-black text-[var(--practice-text-title)] tracking-tighter animate-in fade-in slide-in-from-top duration-700">
                Practica con <span className="text-primary italic">Albert</span>
              </h1>
              <p className="text-[var(--practice-text-body)] text-2xl font-medium max-w-2xl mx-auto">Pon a prueba tus conocimientos con ejercicios reales diseñados para tu éxito académico.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-10">
              {Object.entries(courses_data).map(([id, data], index) => (
                <div 
                  key={id}
                  className="group relative h-[500px] perspective-1000 animate-in fade-in zoom-in duration-700"
                  style={{ animationDelay: `${index * 200}ms` }}
                  onClick={() => handleCourseSelect(id)}
                >
                  <div className="relative h-full w-full rounded-[3rem] bg-[var(--practice-card-bg)] p-2 shadow-xl transition-all duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateX(10deg)_rotateY(-10deg)] group-hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] cursor-pointer overflow-hidden border-2 border-[var(--practice-card-border)] hover:border-primary/50">
                    {/* Gradient Header */}
                    <div className={`h-1/2 w-full rounded-[2.5rem] bg-gradient-to-br ${data.color} flex flex-col items-center justify-center p-8 text-white relative overflow-hidden`}>
                       <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] [background-size:20px_20px]" />
                       <div className="relative z-10 p-6 bg-white/20 backdrop-blur-md rounded-3xl mb-4 group-hover:scale-110 transition-transform duration-500">
                         {data.icon}
                       </div>
                       <h2 className="relative z-10 text-3xl font-black uppercase tracking-tight">{data.title}</h2>
                    </div>

                    <div className="h-1/2 w-full p-10 flex flex-col justify-between items-center text-center">
                       <p className="text-[var(--practice-text-body)] text-lg font-medium leading-relaxed">
                         {data.description}
                       </p>
                       
                       <div className="w-full space-y-4">
                         <div className="flex justify-center gap-2">
                           <span className="px-3 py-1 bg-secondary/10 rounded-full text-[10px] font-black text-secondary uppercase tracking-widest">3 Preguntas</span>
                           <span className="px-3 py-1 bg-primary/10 rounded-full text-[10px] font-black text-primary uppercase tracking-widest">Nivel Básico</span>
                         </div>
                         <Button className="w-full h-16 rounded-2xl bg-secondary hover:bg-primary font-black text-xl text-white shadow-lg shadow-secondary/20 group-hover:shadow-primary/30 transition-all duration-500">
                           Comenzar Ahora
                         </Button>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex justify-center pt-8">
               <Button 
                variant="ghost" 
                onClick={() => onNavigate("landing")}
                className="group flex items-center gap-3 text-xl font-black text-[var(--practice-text-title)] hover:text-primary transition-all"
               >
                 <ArrowLeft className="h-6 w-6 group-hover:-translate-x-2 transition-transform" />
                 Volver al Inicio
               </Button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  const questions = courses_data[selectedCourse].questions
  const question = questions[currentQuestion]
  const isLast = currentQuestion === questions.length - 1

  if (examFinished) {
    const score = calculateScore()
    return (
      <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-[var(--practice-bg)] p-4">
        <Card className="w-full max-w-md rounded-[2.5rem] shadow-2xl bg-[var(--practice-card-bg)] border border-[var(--practice-card-border)] overflow-hidden animate-in zoom-in duration-500">
          <div className="bg-secondary p-8 text-center text-white">
             <CheckCircle2 className="h-16 w-16 mx-auto mb-4" />
             <h2 className="text-3xl font-black">¡Buen trabajo!</h2>
          </div>
          <CardContent className="p-8 text-center space-y-8">
            <div className="bg-primary/10 rounded-3xl p-8">
              <p className="text-5xl font-black text-primary">{score} / {questions.length}</p>
              <p className="font-bold text-[var(--practice-text-title)] mt-2">Respuestas correctas</p>
            </div>
            <Button onClick={() => setSelectedCourse(null)} className="w-full h-14 rounded-2xl text-lg font-bold">
              Escoger otro curso
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-[var(--practice-bg)] flex flex-col items-center">
      <div className="w-full max-w-4xl p-4 md:p-12 flex flex-col items-center">
        <div className="w-full max-w-3xl space-y-8">
          <div className="flex justify-between items-center bg-[var(--practice-card-bg)] p-6 rounded-3xl shadow-sm border border-[var(--practice-card-border)]">
            <div className="space-y-1">
              <p className="text-xs font-bold text-primary uppercase tracking-widest">Curso: {courses_data[selectedCourse].title}</p>
              <h2 className="text-xl font-black text-[var(--practice-text-title)]">Pregunta {currentQuestion + 1} de {questions.length}</h2>
            </div>
            <Button variant="ghost" onClick={() => setSelectedCourse(null)} className="rounded-xl font-bold">Salir</Button>
          </div>

          <Card className="rounded-[2.5rem] bg-[var(--practice-card-bg)] shadow-xl border border-[var(--practice-card-border)] p-8 md:p-12 animate-in slide-in-from-bottom duration-500">
            <h3 className="text-2xl md:text-3xl font-bold text-[var(--practice-text-title)] mb-12 text-center">
              {question.text}
            </h3>
            
            <div className="grid gap-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswerSelect(index)}
                  className={`group flex items-center gap-6 p-6 rounded-2xl border-2 transition-all ${
                    answers[currentQuestion] === index
                      ? "border-primary bg-primary text-white scale-[1.02] shadow-lg shadow-primary/20"
                      : "border-[var(--practice-option-border)] bg-[var(--practice-option-bg)] text-[var(--practice-text-title)] hover:border-primary/50 hover:bg-[var(--practice-option-hover)]"
                  }`}
                >
                  <span className={`flex h-10 w-10 items-center justify-center rounded-full font-bold text-lg ${
                    answers[currentQuestion] === index ? "bg-white text-primary" : "bg-[var(--practice-card-bg)] text-[var(--practice-text-title)] shadow-sm border border-[var(--practice-card-border)]"
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="text-lg font-bold">{option}</span>
                </button>
              ))}
            </div>

            <div className="mt-12 flex justify-end">
               <Button 
                onClick={handleNext} 
                disabled={answers[currentQuestion] === undefined}
                className="h-14 px-12 rounded-2xl font-black text-lg shadow-lg shadow-primary/30 transition-transform active:scale-95"
               >
                 {isLast ? "Finalizar" : "Siguiente"}
               </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}

