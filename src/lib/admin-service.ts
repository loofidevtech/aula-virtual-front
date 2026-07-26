// src/lib/admin-service.ts

export interface AdminUser {
  id: string
  name: string
  email: string
  role: "admin" | "student"
}

export interface CourseSubscription {
  courseId: string
  subscribed: boolean
}

export interface Student {
  id: string
  name: string
  email: string
  phone: string
  registeredAt: string
  subscriptions: CourseSubscription[]
}

export interface CourseItem {
  id: string
  title: string
  description: string
  category: string
  lessonsCount: number
  active: boolean
}

export interface VideoItem {
  id: string
  courseId: string
  title: string
  duration: string
  url: string
  isPremium: boolean
}

export interface GameQuestion {
  id: string
  courseId: string
  question: string
  options: string[]
  correctAnswer: number
  points: number
}

// ── Datos Mockeados Iniciales ───────────────────────────────────────────────

// ── Datos Mockeados Iniciales ───────────────────────────────────────────────

let mockedStudents: Student[] = [
  {
    id: "student_default",
    name: "Andrés Castro",
    email: "estudiante@albert.com",
    phone: "951753456",
    registeredAt: "2026-06-01T08:00:00Z",
    subscriptions: [
      { courseId: "concurso_matematica_binaria", subscribed: true },
      { courseId: "selectivo_onem", subscribed: false }
    ]
  },
  {
    id: "user_1",
    name: "Adrian M.",
    email: "adrian@ejemplo.com",
    phone: "987654321",
    registeredAt: "2026-05-10T10:00:00Z",
    subscriptions: [
      { courseId: "concurso_matematica_binaria", subscribed: false },
      { courseId: "selectivo_onem", subscribed: false }
    ]
  },
  {
    id: "user_2",
    name: "Juan Perez",
    email: "juan@ejemplo.com",
    phone: "912345678",
    registeredAt: "2026-05-12T15:30:00Z",
    subscriptions: [
      { courseId: "concurso_matematica_binaria", subscribed: true },
      { courseId: "olimpiada_logical", subscribed: false }
    ]
  },
  {
    id: "user_3",
    name: "Maria Gomez",
    email: "maria@ejemplo.com",
    phone: "998877665",
    registeredAt: "2026-05-14T09:15:00Z",
    subscriptions: []
  },
  {
    id: "user_4",
    name: "Carlos Mendoza",
    email: "carlos@ejemplo.com",
    phone: "945612378",
    registeredAt: "2026-05-15T11:20:00Z",
    subscriptions: [
      { courseId: "selectivo_onem", subscribed: true },
      { courseId: "concurso_matematica_binaria", subscribed: true }
    ]
  },
  {
    id: "user_5",
    name: "Ana Victoria",
    email: "ana@ejemplo.com",
    phone: "933445566",
    registeredAt: "2026-05-16T16:45:00Z",
    subscriptions: [{ courseId: "concurso_matematica_binaria", subscribed: true }]
  }
]

let mockedCourses: CourseItem[] = [
  { id: "concurso_matematica_binaria", title: "Solucionarios CMB", description: "Concurso Nacional de Matemática Binaria", category: "Solucionarios", lessonsCount: 16, active: true },
  { id: "selectivo_onem", title: "Solucionarios ONEM", description: "Olimpiada Nacional Escolar de Matemática", category: "Solucionarios", lessonsCount: 20, active: true },
  { id: "olimpiada_logical", title: "Solucionarios Logical", description: "Olimpiada Matemática de Logical", category: "Solucionarios", lessonsCount: 12, active: true },
  { id: "canguro_matematico", title: "Solucionarios Canguro", description: "Canguro Matemático Internacional", category: "Solucionarios", lessonsCount: 15, active: true },
  { id: "conamat", title: "Solucionarios CONAMAT", description: "Concurso Nacional de Matemática CONAMAT", category: "Solucionarios", lessonsCount: 18, active: true },
  { id: "prog_onem", title: "Programa ONEM", description: "Entrenamiento Intensivo para la ONEM", category: "Programas", lessonsCount: 24, active: true },
  { id: "prog_cmb", title: "Programa CMB", description: "Entrenamiento Especializado para el CMB", category: "Programas", lessonsCount: 20, active: true }
]

let mockedVideos: VideoItem[] = [
  { id: "v_1", courseId: "aritm", title: "1. Cuatro Operaciones y Divisibilidad", duration: "45 mins", url: "https://ejemplo.com/video1.mp4", isPremium: false },
  { id: "v_2", courseId: "aritm", title: "2. Números Primos y MCM / MCD", duration: "52 mins", url: "https://ejemplo.com/video2.mp4", isPremium: false },
  { id: "v_3", courseId: "aritm", title: "3. Razones, Proporciones y Promedios", duration: "38 mins", url: "https://ejemplo.com/video3.mp4", isPremium: false },
  { id: "v_4", courseId: "aritm", title: "4. Regla de Tres y Porcentajes Avanzados", duration: "60 mins", url: "https://ejemplo.com/video4.mp4", isPremium: true },
  { id: "v_5", courseId: "aritm", title: "5. Interés Simple y Compuesto", duration: "49 mins", url: "https://ejemplo.com/video5.mp4", isPremium: true },
  { id: "v_6", courseId: "algeb", title: "1. Leyes de Exponentes y Ecuaciones", duration: "40 mins", url: "https://ejemplo.com/video6.mp4", isPremium: false },
  { id: "v_7", courseId: "algeb", title: "2. Polinomios y Productos Notables", duration: "55 mins", url: "https://ejemplo.com/video7.mp4", isPremium: false },
  { id: "v_8", courseId: "algeb", title: "3. Factorización y Fracciones Algebraicas", duration: "48 mins", url: "https://ejemplo.com/video8.mp4", isPremium: false },
  { id: "v_9", courseId: "algeb", title: "4. Análisis Combinatorio y Binomio de Newton", duration: "65 mins", url: "https://ejemplo.com/video9.mp4", isPremium: true }
]

let mockedGames: GameQuestion[] = [
  { id: "g_1", courseId: "aritm", question: "¿Cuál es el MCD de 48 y 60?", options: ["6", "12", "24", "4"], correctAnswer: 1, points: 20 },
  { id: "g_2", courseId: "aritm", question: "Si el 20% de N es 40, ¿cuánto es N?", options: ["100", "150", "200", "250"], correctAnswer: 2, points: 15 },
  { id: "g_3", courseId: "algeb", question: "¿Cuál es el resultado de (x+3)² - (x-3)²?", options: ["12x", "6x", "18", "0"], correctAnswer: 0, points: 25 },
  { id: "g_4", courseId: "onem", question: "En un torneo de ajedrez participan 5 personas. Si todos juegan contra todos una vez, ¿cuántas partidas se juegan?", options: ["10", "15", "20", "25"], correctAnswer: 0, points: 30 }
]

import { supabase } from "./supabase"

// ── Funciones CRUD Simuladas ────────────────────────────────────────────────

export const adminService = {
  async login(email: string, password: string): Promise<AdminUser | null> {
    try {
      const cleanEmail = email.trim().toLowerCase()

      // Autenticación REAL con Supabase Auth — genera JWT válido para Storage uploads
      const { data, error } = await supabase.auth.signInWithPassword({
        email: cleanEmail,
        password,
      })

      if (!error && data?.user) {
        return {
          id: data.user.id,
          name: data.user.user_metadata?.full_name || "Administrador",
          email: data.user.email || cleanEmail,
          role: "admin"
        }
      }

      // Fallback solo para desarrollo local sin cuenta Supabase
      if (process.env.NODE_ENV === "development" &&
          cleanEmail === "admin@albert.com" && password === "admin123") {
        console.warn("[AdminService] Usando login de desarrollo — Storage no funcionará sin sesión real.")
        return {
          id: "admin_default",
          name: "Administrador (Dev)",
          email: cleanEmail,
          role: "admin"
        }
      }

      return null
    } catch (err) {
      console.error("Error en admin login:", err)
      return null
    }
  },

  // Estudiantes
  async getStudents(): Promise<Student[]> {
    await new Promise(resolve => setTimeout(resolve, 400))
    // Synchronize localStorage student_enrollments to active student subscriptions
    if (typeof window !== "undefined") {
      const currentUserStr = localStorage.getItem("currentUser")
      if (currentUserStr) {
        try {
          const currentUser = JSON.parse(currentUserStr)
          const studentIndex = mockedStudents.findIndex(s => s.email === currentUser.email)
          if (studentIndex > -1) {
            const enrollmentsStr = localStorage.getItem("student_enrollments")
            if (enrollmentsStr) {
              const enrollments = JSON.parse(enrollmentsStr)
              mockedStudents[studentIndex].subscriptions = Object.keys(enrollments).map(courseId => ({
                courseId,
                subscribed: enrollments[courseId].subscribed
              }))
            }
          }
        } catch (e) {
          // ignore
        }
      }
    }
    return [...mockedStudents]
  },

  async updateSubscription(studentId: string, courseId: string, subscribed: boolean): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 300))
    const studentIndex = mockedStudents.findIndex(s => s.id === studentId)
    if (studentIndex === -1) return false

    const student = mockedStudents[studentIndex]
    const subIndex = student.subscriptions.findIndex(sub => sub.courseId === courseId)

    if (subIndex > -1) {
      mockedStudents[studentIndex].subscriptions[subIndex].subscribed = subscribed
    } else {
      mockedStudents[studentIndex].subscriptions.push({ courseId, subscribed })
    }

    // Sync with localStorage enrollments for active student (checking email)
    if (typeof window !== "undefined") {
      const currentUserStr = localStorage.getItem("currentUser")
      if (currentUserStr) {
        try {
          const currentUser = JSON.parse(currentUserStr)
          if (currentUser.email === student.email) {
            const enrollmentsStr = localStorage.getItem("student_enrollments") || "{}"
            const enrollments = JSON.parse(enrollmentsStr)
            enrollments[courseId] = { subscribed }
            localStorage.setItem("student_enrollments", JSON.stringify(enrollments))
            
            // Reset visual unlock animation flag to trigger premium upgrade celebration on course entry
            if (subscribed) {
              localStorage.removeItem(`first_premium_animated_${courseId}`)
            }
          }
        } catch (e) {
          // ignore
        }
      }
    }
    return true
  },

  async isUserSubscribed(studentEmail: string, courseId: string): Promise<boolean> {
    const student = mockedStudents.find(s => s.email === studentEmail)
    if (!student) return false
    const sub = student.subscriptions.find(sub => sub.courseId === courseId)
    return sub ? sub.subscribed : false
  },

  // Cursos
  async getCourses(): Promise<CourseItem[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...mockedCourses]
  },

  async addCourse(course: Omit<CourseItem, "id" | "lessonsCount" | "active">): Promise<CourseItem> {
    await new Promise(resolve => setTimeout(resolve, 400))
    const newCourse: CourseItem = {
      ...course,
      id: `c_${Date.now()}`,
      lessonsCount: 0,
      active: true
    }
    mockedCourses.push(newCourse)
    return newCourse
  },

  async toggleCourseActive(courseId: string): Promise<boolean> {
    await new Promise(resolve => setTimeout(resolve, 200))
    const course = mockedCourses.find(c => c.id === courseId)
    if (course) {
      course.active = !course.active
      return true
    }
    return false
  },

  // Videos
  async getVideos(): Promise<VideoItem[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...mockedVideos]
  },

  async addVideo(video: Omit<VideoItem, "id">): Promise<VideoItem> {
    await new Promise(resolve => setTimeout(resolve, 400))
    const newVideo: VideoItem = {
      ...video,
      id: `v_${Date.now()}`
    }
    mockedVideos.push(newVideo)

    // Incrementar conteo en el curso
    const course = mockedCourses.find(c => c.id === video.courseId)
    if (course) course.lessonsCount += 1

    return newVideo
  },

  // Juegos Interactivos (Práctica con Albert)
  async getGames(): Promise<GameQuestion[]> {
    await new Promise(resolve => setTimeout(resolve, 300))
    return [...mockedGames]
  },

  async addGameQuestion(game: Omit<GameQuestion, "id">): Promise<GameQuestion> {
    await new Promise(resolve => setTimeout(resolve, 400))
    const newGame: GameQuestion = {
      ...game,
      id: `g_${Date.now()}`
    }
    mockedGames.push(newGame)
    return newGame
  }
}
