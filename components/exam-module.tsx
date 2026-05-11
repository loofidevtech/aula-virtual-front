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
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [timeRemaining, setTimeRemaining] = useState(90 * 60) // 90 minutes in seconds
  const [showFinishDialog, setShowFinishDialog] = useState(false)
  const [examFinished, setExamFinished] = useState(false)

  const questions: Question[] = [
    {
      id: "1",
      text: "Si un tren viaja a 80 km/h y recorre una distancia de 240 km, ¿cuánto tiempo tardará en completar el recorrido?",
      options: ["2 horas", "3 horas", "4 horas", "2.5 horas"],
      correctAnswer: 1,
    },
    {
      id: "2",
      text: "¿Cuál es el resultado de la operación: (3² + 4²)^½?",
      options: ["5", "7", "12", "25"],
      correctAnswer: 0,
    },
    {
      id: "3",
      text: "En una progresión aritmética, si el primer término es 5 y la diferencia común es 3, ¿cuál es el décimo término?",
      options: ["32", "35", "30", "27"],
      correctAnswer: 0,
    },
    {
      id: "4",
      text: "¿Cuál de las siguientes opciones representa la factorización de x² - 9?",
      options: [
        "(x + 3)(x + 3)",
        "(x - 3)(x - 3)",
        "(x + 3)(x - 3)",
        "(x + 9)(x - 1)",
      ],
      correctAnswer: 2,
    },
    {
      id: "5",
      text: "Si el área de un círculo es 64π cm², ¿cuál es su radio?",
      options: ["4 cm", "8 cm", "16 cm", "32 cm"],
      correctAnswer: 1,
    },
    {
      id: "6",
      text: "¿Cuál es el valor de sen(30°)?",
      options: ["1/2", "√2/2", "√3/2", "1"],
      correctAnswer: 0,
    },
    {
      id: "7",
      text: "Si log₁₀(x) = 2, ¿cuál es el valor de x?",
      options: ["20", "100", "1000", "10"],
      correctAnswer: 1,
    },
    {
      id: "8",
      text: "¿Cuántas diagonales tiene un hexágono?",
      options: ["6", "9", "12", "15"],
      correctAnswer: 1,
    },
    {
      id: "9",
      text: "Si f(x) = 2x + 3, ¿cuál es el valor de f(5)?",
      options: ["10", "13", "15", "8"],
      correctAnswer: 1,
    },
    {
      id: "10",
      text: "¿Cuál es la derivada de f(x) = x³?",
      options: ["x²", "3x", "3x²", "x³"],
      correctAnswer: 2,
    },
    {
      id: "11",
      text: "En un triángulo rectángulo, si los catetos miden 6 y 8 cm, ¿cuánto mide la hipotenusa?",
      options: ["10 cm", "14 cm", "12 cm", "7 cm"],
      correctAnswer: 0,
    },
    {
      id: "12",
      text: "¿Cuál es el MCD de 48 y 60?",
      options: ["6", "12", "24", "4"],
      correctAnswer: 1,
    },
    {
      id: "13",
      text: "Si 3x - 7 = 14, ¿cuál es el valor de x?",
      options: ["7", "3", "21", "5"],
      correctAnswer: 0,
    },
    {
      id: "14",
      text: "¿Cuál es el perímetro de un cuadrado de área 49 cm²?",
      options: ["14 cm", "28 cm", "49 cm", "7 cm"],
      correctAnswer: 1,
    },
    {
      id: "15",
      text: "Si el 25% de un número es 40, ¿cuál es el número?",
      options: ["100", "160", "10", "200"],
      correctAnswer: 1,
    },
    {
      id: "16",
      text: "¿Cuál es el volumen de un cubo de arista 5 cm?",
      options: ["25 cm³", "75 cm³", "125 cm³", "150 cm³"],
      correctAnswer: 2,
    },
    {
      id: "17",
      text: "¿Cuál es el valor de (-2)⁴?",
      options: ["-16", "16", "-8", "8"],
      correctAnswer: 1,
    },
    {
      id: "18",
      text: "Si la media de 5 números es 20, ¿cuál es su suma?",
      options: ["4", "25", "100", "15"],
      correctAnswer: 2,
    },
    {
      id: "19",
      text: "¿Cuántos grados tiene la suma de los ángulos internos de un pentágono?",
      options: ["360°", "540°", "720°", "180°"],
      correctAnswer: 1,
    },
    {
      id: "20",
      text: "Si 2^x = 32, ¿cuál es el valor de x?",
      options: ["4", "5", "6", "3"],
      correctAnswer: 1,
    },
  ]

  // Timer effect
  useEffect(() => {
    if (examFinished) return

    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          setExamFinished(true)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [examFinished])

  const formatTime = (seconds: number) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
  }

  const handleAnswerSelect = (optionIndex: number) => {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestion]: optionIndex,
    }))
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleFinish = () => {
    setShowFinishDialog(true)
  }

  const confirmFinish = () => {
    setExamFinished(true)
    setShowFinishDialog(false)
  }

  const calculateScore = () => {
    let correct = 0
    Object.entries(answers).forEach(([questionIndex, answer]) => {
      if (questions[parseInt(questionIndex)]?.correctAnswer === answer) {
        correct++
      }
    })
    return correct
  }

  if (examFinished) {
    const score = calculateScore()
    const percentage = Math.round((score / questions.length) * 100)

    return (
      <div className="flex min-h-[calc(100vh-4rem)]">
        <DashboardSidebar
          currentView="exam"
          onNavigate={onNavigate}
          isOpen={sidebarOpen}
          onClose={() => setSidebarOpen(false)}
        />

        <div className="flex flex-1 items-center justify-center p-4">
          <Card className="w-full max-w-md border-border bg-card">
            <CardHeader className="text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <CardTitle className="text-2xl">¡Simulacro Completado!</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 text-center">
              <div className="rounded-lg bg-secondary p-6">
                <p className="text-4xl font-bold text-primary">{percentage}%</p>
                <p className="text-muted-foreground">
                  {score} de {questions.length} respuestas correctas
                </p>
              </div>

              <div className="space-y-2 text-sm text-muted-foreground">
                <p>
                  Preguntas contestadas:{" "}
                  <span className="font-medium text-foreground">
                    {Object.keys(answers).length}
                  </span>
                </p>
                <p>
                  Preguntas sin contestar:{" "}
                  <span className="font-medium text-foreground">
                    {questions.length - Object.keys(answers).length}
                  </span>
                </p>
              </div>

              <Button onClick={onFinish} className="w-full">
                Volver al Dashboard
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  const question = questions[currentQuestion]
  const selectedAnswer = answers[currentQuestion]

  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      <DashboardSidebar
        currentView="exam"
        onNavigate={onNavigate}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-auto">
        {/* Mobile Header */}
        <div className="flex items-center gap-4 border-b border-border p-4 lg:hidden">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>
          <h1 className="font-semibold">Simulacro</h1>
        </div>

        {/* Exam Header Bar */}
        <div className="sticky top-0 z-10 flex flex-wrap items-center justify-between gap-4 border-b border-border bg-card px-4 py-3 lg:px-8">
          <div className="flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-primary" />
            <span className="font-medium">Simulacro de Matemáticas</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-muted-foreground">Pregunta</span>
              <span className="font-bold">
                {currentQuestion + 1} de {questions.length}
              </span>
            </div>

            <div
              className={`flex items-center gap-2 rounded-lg px-3 py-1.5 ${
                timeRemaining < 300
                  ? "bg-destructive/10 text-destructive"
                  : "bg-primary/10 text-primary"
              }`}
            >
              <Clock className="h-4 w-4" />
              <span className="font-mono font-bold">
                {formatTime(timeRemaining)}
              </span>
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="flex flex-1 flex-col p-4 lg:p-8">
          <Card className="mb-6 flex-1 border-border bg-card">
            <CardHeader>
              <CardTitle className="text-lg font-medium leading-relaxed">
                {question.text}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-3 sm:grid-cols-2">
                {question.options.map((option, index) => {
                  const letter = String.fromCharCode(65 + index) // A, B, C, D
                  const isSelected = selectedAnswer === index

                  return (
                    <button
                      key={index}
                      onClick={() => handleAnswerSelect(index)}
                      className={`flex items-center gap-4 rounded-xl border-2 p-4 text-left transition-all ${
                        isSelected
                          ? "border-primary bg-primary/10"
                          : "border-border bg-secondary/30 hover:border-primary/50 hover:bg-secondary"
                      }`}
                    >
                      <div
                        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold ${
                          isSelected
                            ? "bg-primary text-primary-foreground"
                            : "bg-secondary text-muted-foreground"
                        }`}
                      >
                        {letter}
                      </div>
                      <span
                        className={`font-medium ${
                          isSelected ? "text-foreground" : "text-muted-foreground"
                        }`}
                      >
                        {option}
                      </span>
                    </button>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="gap-2"
            >
              <ArrowLeft className="h-4 w-4" />
              Anterior
            </Button>

            <div className="flex gap-3">
              {currentQuestion < questions.length - 1 ? (
                <Button onClick={handleNext} className="gap-2">
                  Siguiente
                  <ArrowRight className="h-4 w-4" />
                </Button>
              ) : (
                <Button onClick={handleFinish} variant="default">
                  Finalizar Prueba
                </Button>
              )}
            </div>
          </div>

          {/* Question Navigator */}
          <div className="mt-6 hidden flex-wrap gap-2 lg:flex">
            {questions.map((_, index) => {
              const isAnswered = answers[index] !== undefined
              const isCurrent = currentQuestion === index

              return (
                <button
                  key={index}
                  onClick={() => setCurrentQuestion(index)}
                  className={`flex h-9 w-9 items-center justify-center rounded-lg text-sm font-medium transition-colors ${
                    isCurrent
                      ? "bg-primary text-primary-foreground"
                      : isAnswered
                        ? "bg-chart-2/20 text-chart-2"
                        : "bg-secondary text-muted-foreground hover:bg-secondary/80"
                  }`}
                >
                  {index + 1}
                </button>
              )
            })}
          </div>
        </div>
      </div>

      {/* Finish Confirmation Dialog */}
      <AlertDialog open={showFinishDialog} onOpenChange={setShowFinishDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Finalizar simulacro?</AlertDialogTitle>
            <AlertDialogDescription>
              Has respondido {Object.keys(answers).length} de {questions.length}{" "}
              preguntas. Una vez finalizado, no podrás cambiar tus respuestas.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Continuar</AlertDialogCancel>
            <AlertDialogAction onClick={confirmFinish}>
              Finalizar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
