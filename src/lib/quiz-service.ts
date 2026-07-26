// src/lib/quiz-service.ts
// Servicio para gestión de preguntas, retos diarios y estadísticas de gamificación.

import { supabase } from "@/lib/supabase"

// Validar que un ID de usuario sea un UUID válido antes de consultarlo en Postgres
function isValidUUID(uuid: string | null | undefined): boolean {
  if (!uuid) return false
  const regex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i
  return regex.test(uuid)
}

// ─── Tipos ────────────────────────────────────────────────────────────────────

export interface QuizQuestion {
  id: string
  solucionario_id: string | null
  nivel_id: string | null
  course_id: string | null
  question: string
  options: string[]
  correct_answer: number
  points: number
  difficulty: "fácil" | "medio" | "difícil"
  explanation: string | null
  created_at: string
}

export interface QuizAttempt {
  id: string
  user_id: string
  question_id: string
  selected_answer: number
  is_correct: boolean
  points_earned: number
  attempted_at: string
}

export interface DailyAttempt {
  id: string
  user_id: string
  attempt_date: string
  score: number
  answers: { question_id: string; selected: number; correct: boolean }[]
  completed_at: string
}

export interface UserStats {
  totalPoints: number
  totalCorrect: number
  totalAttempted: number
  currentStreak: number
  weeklyPoints: number
}

// ─── Servicio ─────────────────────────────────────────────────────────────────

export const quizService = {

  /**
   * Obtiene preguntas por solucionario y nivel con un límite opcional.
   */
  async getQuestions(
    solucionarioId: string,
    nivelId?: string,
    limit = 50
  ): Promise<QuizQuestion[]> {
    try {
      let query = supabase
        .from("quiz_questions")
        .select("*")
        .eq("solucionario_id", solucionarioId)
        .limit(limit)
        .order("created_at", { ascending: false })

      if (nivelId) {
        query = query.eq("nivel_id", nivelId)
      }

      const { data, error } = await query
      if (error) {
        console.error("[quiz-service] Error al obtener preguntas:", error.message)
        return []
      }
      return (data ?? []).map((q) => ({
        ...q,
        options: Array.isArray(q.options) ? q.options : JSON.parse(q.options),
      }))
    } catch (err) {
      console.error("[quiz-service] Error inesperado:", err)
      return []
    }
  },

  /**
   * Obtiene 3 preguntas aleatorias para el reto diario de hoy.
   * Usa la fecha como semilla para que todos los alumnos vean las mismas 3 preguntas.
   */
  async getDailyQuestions(solucionarioId: string): Promise<QuizQuestion[]> {
    try {
      const { data, error } = await supabase
        .from("quiz_questions")
        .select("*")
        .eq("solucionario_id", solucionarioId)
        .limit(50)

      if (error || !data || data.length === 0) return []

      // Usar fecha como semilla para selección determinística
      const today = new Date().toISOString().split("T")[0]
      const seed = today.split("-").reduce((acc, n) => acc + parseInt(n), 0)

      const shuffled = [...data].sort((a, b) => {
        const hashA = (a.id.charCodeAt(0) + seed) % 97
        const hashB = (b.id.charCodeAt(0) + seed) % 97
        return hashA - hashB
      })

      return shuffled.slice(0, 3).map((q) => ({
        ...q,
        options: Array.isArray(q.options) ? q.options : JSON.parse(q.options),
      }))
    } catch (err) {
      console.error("[quiz-service] Error al obtener preguntas diarias:", err)
      return []
    }
  },

  /**
   * Todas las preguntas (para el admin).
   */
  async getAllQuestions(): Promise<QuizQuestion[]> {
    try {
      const { data, error } = await supabase
        .from("quiz_questions")
        .select("*")
        .order("created_at", { ascending: false })

      if (error) {
        console.error("[quiz-service] Error al obtener todas las preguntas:", error.message)
        return []
      }
      return (data ?? []).map((q) => ({
        ...q,
        options: Array.isArray(q.options) ? q.options : JSON.parse(q.options),
      }))
    } catch (err) {
      console.error("[quiz-service] Error inesperado:", err)
      return []
    }
  },

  /**
   * Crear nueva pregunta.
   */
  async createQuestion(
    question: Omit<QuizQuestion, "id" | "created_at">
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase.from("quiz_questions").insert({
        solucionario_id: question.solucionario_id,
        nivel_id: question.nivel_id,
        course_id: question.course_id,
        question: question.question,
        options: JSON.stringify(question.options),
        correct_answer: question.correct_answer,
        points: question.points,
        difficulty: question.difficulty,
        explanation: question.explanation,
      })

      if (error) {
        return { success: false, error: error.message }
      }
      return { success: true }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error desconocido"
      return { success: false, error: msg }
    }
  },

  /**
   * Eliminar pregunta.
   */
  async deleteQuestion(id: string): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from("quiz_questions")
        .delete()
        .eq("id", id)

      if (error) return { success: false, error: error.message }
      return { success: true }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error desconocido"
      return { success: false, error: msg }
    }
  },

  /**
   * Registrar intento de respuesta de un alumno.
   */
  async recordAttempt(
    userIdOrObj: any,
    questionId?: string,
    selectedAnswer?: number,
    correctAnswer?: number,
    points?: number
  ): Promise<{ success: boolean; isCorrect: boolean; pointsEarned: number }> {
    let uId = ""
    let qId = ""
    let isCorrect = false
    let pointsEarned = 0
    let selectedOptionNum = 0

    if (typeof userIdOrObj === "object" && userIdOrObj !== null) {
      uId = userIdOrObj.userId
      qId = userIdOrObj.questionId
      isCorrect = userIdOrObj.isCorrect
      pointsEarned = isCorrect ? (userIdOrObj.points || 0) : 0
      
      const optLetter = userIdOrObj.selectedOption?.toLowerCase()
      selectedOptionNum = optLetter === 'a' ? 0 : optLetter === 'b' ? 1 : optLetter === 'c' ? 2 : 3
    } else {
      uId = userIdOrObj
      qId = questionId || ""
      const isOk = selectedAnswer === correctAnswer
      isCorrect = isOk
      pointsEarned = isOk ? (points || 0) : 0
      selectedOptionNum = selectedAnswer || 0
    }

    if (!isValidUUID(uId)) {
      return { success: true, isCorrect, pointsEarned }
    }

    try {
      const { error } = await supabase.from("quiz_attempts").insert({
        user_id: uId,
        question_id: qId,
        selected_answer: selectedOptionNum,
        is_correct: isCorrect,
        points_earned: pointsEarned,
      })

      if (error) {
        console.error("[quiz-service] Error al registrar intento:", error.message)
      }
    } catch (err) {
      console.error("[quiz-service] Error inesperado al registrar intento:", err)
    }

    return { success: true, isCorrect, pointsEarned }
  },

  /**
   * Verificar si el alumno ya completó el reto diario de hoy.
   */
  async getTodayDailyAttempt(userId: string): Promise<DailyAttempt | null> {
    if (!isValidUUID(userId)) {
      return null
    }
    try {
      const today = new Date().toISOString().split("T")[0]
      const { data, error } = await supabase
        .from("daily_attempts")
        .select("*")
        .eq("user_id", userId)
        .eq("attempt_date", today)
        .maybeSingle()

      if (error) {
        console.error("[quiz-service] Error al verificar reto diario:", error.message)
        return null
      }

      let parsedAnswers = []
      if (data && data.answers) {
        try {
          parsedAnswers = typeof data.answers === 'string' ? JSON.parse(data.answers) : data.answers
        } catch (e) {
          parsedAnswers = data.answers
        }
      }

      return data ? { ...data, answers: parsedAnswers } : null
    } catch (err) {
      console.error("[quiz-service] Error inesperado:", err)
      return null
    }
  },

  /**
   * Guardar resultado del reto diario.
   */
  async saveDailyAttempt(
    userId: string,
    scoreOrData: any,
    answersInput?: any
  ): Promise<{ success: boolean; error?: string }> {
    if (!isValidUUID(userId)) {
      return { success: true }
    }
    
    let score = 0
    let answers: any = null
    
    if (typeof scoreOrData === "object" && scoreOrData !== null) {
      score = scoreOrData.score
      answers = scoreOrData.answers
    } else {
      score = scoreOrData
      answers = answersInput
    }

    try {
      const today = new Date().toISOString().split("T")[0]
      const { error } = await supabase.from("daily_attempts").upsert(
        {
          user_id: userId,
          attempt_date: today,
          score,
          answers: typeof answers === 'string' ? answers : JSON.stringify(answers),
        },
        { onConflict: "user_id,attempt_date" }
      )

      if (error) return { success: false, error: error.message }
      return { success: true }
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Error desconocido"
      return { success: false, error: msg }
    }
  },

  /**
   * Estadísticas globales del alumno.
   */
  async getUserStats(userId: string): Promise<UserStats> {
    if (!isValidUUID(userId)) {
      return { totalPoints: 0, totalCorrect: 0, totalAttempted: 0, currentStreak: 0, weeklyPoints: 0 }
    }
    try {
      const { data: attempts } = await supabase
        .from("quiz_attempts")
        .select("is_correct, points_earned, attempted_at")
        .eq("user_id", userId)

      const { data: daily } = await supabase
        .from("daily_attempts")
        .select("attempt_date, score")
        .eq("user_id", userId)
        .order("attempt_date", { ascending: false })

      const totalPoints = (attempts ?? []).reduce((s, a) => s + (a.points_earned || 0), 0)
      const totalCorrect = (attempts ?? []).filter((a) => a.is_correct).length
      const totalAttempted = (attempts ?? []).length

      // Calcular racha de días consecutivos
      const dates = (daily ?? []).map((d) => d.attempt_date).sort().reverse()
      let streak = 0
      const today = new Date()
      for (let i = 0; i < dates.length; i++) {
        const expected = new Date(today)
        expected.setDate(expected.getDate() - i)
        const expectedStr = expected.toISOString().split("T")[0]
        if (dates[i] === expectedStr) {
          streak++
        } else {
          break
        }
      }

      // Puntos de la semana actual
      const weekStart = new Date()
      weekStart.setDate(weekStart.getDate() - weekStart.getDay())
      const weeklyPoints = (attempts ?? [])
        .filter((a) => new Date(a.attempted_at) >= weekStart)
        .reduce((s, a) => s + (a.points_earned || 0), 0)

      return { totalPoints, totalCorrect, totalAttempted, currentStreak: streak, weeklyPoints }
    } catch (err) {
      console.error("[quiz-service] Error al obtener estadísticas:", err)
      return { totalPoints: 0, totalCorrect: 0, totalAttempted: 0, currentStreak: 0, weeklyPoints: 0 }
    }
  },

  /**
   * Ranking semanal top 10.
   */
  async getWeeklyRanking(): Promise<{ userId: string; name: string; email: string; weeklyPoints: number; rank: number }[]> {
    try {
      const weekStart = new Date()
      weekStart.setDate(weekStart.getDate() - weekStart.getDay())
      const weekStartStr = weekStart.toISOString()

      const { data, error } = await supabase
        .from("quiz_attempts")
        .select("user_id, points_earned, profiles(full_name, email)")
        .gte("attempted_at", weekStartStr)
        .eq("is_correct", true)

      if (error || !data) return []

      // Agrupar por user_id
      const grouped: Record<string, { name: string; email: string; points: number }> = {}
      for (const row of data) {
        const uid = row.user_id
        const profile = Array.isArray(row.profiles) ? row.profiles[0] : row.profiles
        if (!grouped[uid]) {
          grouped[uid] = {
            name: (profile as { full_name: string })?.full_name || "Alumno",
            email: (profile as { email: string })?.email || "",
            points: 0,
          }
        }
        grouped[uid].points += row.points_earned || 0
      }

      return Object.entries(grouped)
        .map(([userId, v], i) => ({ userId, name: v.name, email: v.email, weeklyPoints: v.points, rank: i + 1 }))
        .sort((a, b) => b.weeklyPoints - a.weeklyPoints)
        .map((item, i) => ({ ...item, rank: i + 1 }))
        .slice(0, 10)
    } catch (err) {
      console.error("[quiz-service] Error al obtener ranking:", err)
      return []
    }
  },
}
