"use client"

import { useState, useEffect, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { 
  Users, 
  BookOpen, 
  Video, 
  Search, 
  Plus, 
  Settings2,
  CheckCircle2,
  XCircle,
  Gamepad2,
  Eye,
  Trash2,
  AlertCircle,
  FileText,
  GraduationCap,
  PlayCircle,
  Save,
  UploadCloud,
  Check,
  Swords,
  HelpCircle,
  ChevronDown,
  ChevronUp
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  adminService, 
  Student, 
  CourseItem, 
  VideoItem, 
  GameQuestion 
} from "@/lib/admin-service"
import { getCourse } from "@/lib/data/courses"
import { freemiumService, Material } from "@/lib/freemium-service"
import { storageService } from "@/lib/storage-service"
import { videoService } from "@/lib/video-service"
import { solucionarioService } from "@/lib/solucionario-service"
import { quizService, QuizQuestion } from "@/lib/quiz-service"
import { supabase } from "@/lib/supabase"
import { toast } from "sonner"

function AdminDashboardContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const tabFromQuery = searchParams.get("tab")
  
  const [activeTab, setActiveTab] = useState(tabFromQuery || "users")
  const [loading, setLoading] = useState(true)
  
  // Data states
  const [students, setStudents] = useState<Student[]>([])
  const [courses, setCourses] = useState<CourseItem[]>([])
  const [videos, setVideos] = useState<VideoItem[]>([])
  const [games, setGames] = useState<GameQuestion[]>([])
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null)

  // Search queries
  const [searchQuery, setSearchQuery] = useState("")

  // Form states
  const [showCourseForm, setShowCourseForm] = useState(false)
  const [newCourseTitle, setNewCourseTitle] = useState("")
  const [newCourseDesc, setNewCourseDesc] = useState("")
  const [newCourseCat, setNewCourseCat] = useState("Matemáticas")

  const [showVideoForm, setShowVideoForm] = useState(false)
  const [newVideoTitle, setNewVideoTitle] = useState("")
  const [newVideoUrl, setNewVideoUrl] = useState("")
  const [newVideoDuration, setNewVideoDuration] = useState("45 mins")
  const [newVideoCourseId, setNewVideoCourseId] = useState("aritm")
  const [newVideoPremium, setNewVideoPremium] = useState(false)

  const [showGameForm, setShowGameForm] = useState(false)
  const [newGameQuestion, setNewGameQuestion] = useState("")
  const [newGameOpt1, setNewGameOpt1] = useState("")
  const [newGameOpt2, setNewGameOpt2] = useState("")
  const [newGameOpt3, setNewGameOpt3] = useState("")
  const [newGameOpt4, setNewGameOpt4] = useState("")
  const [newGameCorrect, setNewGameCorrect] = useState(0)
  const [newGameCourseId, setNewGameCourseId] = useState("aritm")

  // Materials states
  const [selectedCourseId, setSelectedCourseId] = useState("onem")
  const [selectedModuleId, setSelectedModuleId] = useState("geometria")
  const [materialsList, setMaterialsList] = useState<Material[]>([])
  
  const [newMaterialTitle, setNewMaterialTitle] = useState("")
  const [newMaterialType, setNewMaterialType] = useState("PDF")
  const [newMaterialSize, setNewMaterialSize] = useState("1.5 MB")
  const [newMaterialUrl, setNewMaterialUrl] = useState("/materials/doc.pdf")

  // Solucionarios Admin Editor States
  const [solucionarioId, setSolucionarioId] = useState("concurso_matematica_binaria")
  const [solNivelId, setSolNivelId] = useState("1")
  const [solYear, setSolYear] = useState(2026)
  const [solPdfUrl, setSolPdfUrl] = useState("")
  const [solVideoUrl, setSolVideoUrl] = useState("")

  // Admin Own Password Update States
  const [showPasswordModal, setShowPasswordModal] = useState(false)
  const [newPassword, setNewPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [passwordUpdating, setPasswordUpdating] = useState(false)

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newPassword) {
      toast.error("Por favor ingresa la nueva contraseña.")
      return
    }
    if (newPassword !== confirmPassword) {
      toast.error("Las contraseñas no coinciden.")
      return
    }
    if (newPassword.length < 6) {
      toast.error("La contraseña debe tener al menos 6 caracteres.")
      return
    }

    setPasswordUpdating(true)
    try {
      const { error } = await supabase.auth.updateUser({
        password: newPassword
      })
      if (error) {
        toast.error(`Error: ${error.message}`)
      } else {
        toast.success("Contraseña actualizada exitosamente.")
        setNewPassword("")
        setConfirmPassword("")
        setShowPasswordModal(false)
      }
    } catch (err: any) {
      toast.error(err.message || "Error al actualizar la contraseña.")
    } finally {
      setPasswordUpdating(false)
    }
  }

  // Quiz Questions States
  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([])
  const [quizLoading, setQuizLoading] = useState(false)
  const [quizSaving, setQuizSaving] = useState(false)
  const [qSolucionarioId, setQSolucionarioId] = useState("concurso_matematica_binaria")
  const [qNivelId, setQNivelId] = useState("1")
  const [qQuestion, setQQuestion] = useState("")
  const [qOptions, setQOptions] = useState(["" , "", "", ""])
  const [qCorrectAnswer, setQCorrectAnswer] = useState(0)
  const [qPoints, setQPoints] = useState(10)
  const [qDifficulty, setQDifficulty] = useState<"fácil" | "medio" | "difícil">("medio")
  const [qExplanation, setQExplanation] = useState("")

  const loadQuizQuestions = async () => {
    setQuizLoading(true)
    const data = await quizService.getAllQuestions()
    setQuizQuestions(data)
    setQuizLoading(false)
  }

  const handleCreateQuestion = async () => {
    if (!qQuestion.trim() || qOptions.some(o => !o.trim())) {
      toast.error("Completa la pregunta y todas las opciones.")
      return
    }
    setQuizSaving(true)
    const result = await quizService.createQuestion({
      solucionario_id: qSolucionarioId,
      nivel_id: qNivelId,
      course_id: null,
      question: qQuestion,
      options: qOptions,
      correct_answer: qCorrectAnswer,
      points: qPoints,
      difficulty: qDifficulty,
      explanation: qExplanation || null,
    })
    setQuizSaving(false)
    if (result.success) {
      toast.success("Pregunta creada exitosamente.")
      setQQuestion("")
      setQOptions(["", "", "", ""])
      setQExplanation("")
      setQCorrectAnswer(0)
      loadQuizQuestions()
    } else {
      toast.error(`Error: ${result.error}`)
    }
  }

  const handleDeleteQuestion = async (id: string) => {
    const result = await quizService.deleteQuestion(id)
    if (result.success) {
      toast.success("Pregunta eliminada.")
      setQuizQuestions(prev => prev.filter(q => q.id !== id))
    } else {
      toast.error(`Error: ${result.error}`)
    }
  }

  const [solSimulacroUrl, setSolSimulacroUrl] = useState("")
  const [solIsFree, setSolIsFree] = useState(true)
  const [isSavingSol, setIsSavingSol] = useState(false)
  const [solSaveSuccess, setSolSaveSuccess] = useState(false)
  const [isUploadingPdf, setIsUploadingPdf] = useState(false)
  const [uploadPdfError, setUploadPdfError] = useState<string | null>(null)
  const [isUploadingSimulacro, setIsUploadingSimulacro] = useState(false)
  const [uploadSimulacroError, setUploadSimulacroError] = useState<string | null>(null)

  const handleSaveSolucionario = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSavingSol(true)
    
    // Guardar recursos en Supabase (Single Source of Truth)
    const result = await solucionarioService.saveResource({
      solucionario_id: solucionarioId,
      nivel_id: solNivelId,
      year: solYear,
      pdf_url: solPdfUrl || undefined,
      pdf_title: `Examen Resuelto ${solYear} (Nivel ${solNivelId})`,
      video_url: solVideoUrl || undefined,
      video_title: `Resolución en Video ${solYear} (Nivel ${solNivelId})`,
      simulacro_url: solSimulacroUrl || undefined,
      simulacro_title: `Simulacro Oficial ${solYear} (Nivel ${solNivelId})`,
      is_free: solIsFree
    })

    setIsSavingSol(false)

    if (result.success) {
      setSolSaveSuccess(true)
      toast.success("Recursos guardados correctamente en Supabase")
      setTimeout(() => setSolSaveSuccess(false), 3000)
    } else {
      toast.error(`Error al guardar: ${result.error ?? "Error desconocido"}`)
    }
  }

  // Auto-cargar recursos existentes al cambiar Solucionario, Nivel o Año (desde Supabase)
  useEffect(() => {
    const loadExistingResource = async () => {
      const existing = await solucionarioService.getResource(solucionarioId, solNivelId, solYear)
      if (existing) {
        setSolPdfUrl(existing.pdf_url || "")
        setSolVideoUrl(existing.video_url || "")
        setSolSimulacroUrl(existing.simulacro_url || "")
        setSolIsFree(existing.is_free ?? true)
      } else {
        // No hay recurso guardado aún → campos vacíos (no URLs locales falsas)
        setSolPdfUrl("")
        setSolVideoUrl("")
        setSolSimulacroUrl("")
        setSolIsFree(true)
      }
    }
    loadExistingResource()
  }, [solucionarioId, solNivelId, solYear])

  useEffect(() => {
    // Si no hay sesión, autogeneramos la de administrador para pruebas
    let adminUserStr = sessionStorage.getItem("adminUser")
    if (!adminUserStr) {
      const mockAdmin = { id: "admin_default", name: "Administrador Principal", email: "admin@albert.com", role: "admin" }
      sessionStorage.setItem("adminUser", JSON.stringify(mockAdmin))
      adminUserStr = JSON.stringify(mockAdmin)
    }

    try {
      const parsed = JSON.parse(adminUserStr)
      if (!parsed || parsed.role !== "admin") {
        router.push("/admin/login")
        return
      }
    } catch (e) {
      router.push("/admin/login")
      return
    }

    loadAllData()
  }, [])

  // Sync tab from URL query params
  useEffect(() => {
    if (tabFromQuery) {
      setActiveTab(tabFromQuery)
    }
  }, [tabFromQuery])

  // Load materials when selected course or module changes
  useEffect(() => {
    if (activeTab === "materials") {
      loadMaterials()
    }
  }, [selectedCourseId, selectedModuleId, activeTab])

  const loadMaterials = () => {
    const list = freemiumService.getModuleMaterials(selectedCourseId, selectedModuleId)
    setMaterialsList(list)
  }

  const loadAllData = async () => {
    setLoading(true)
    const [studsData, coursesData, videosData, gamesData] = await Promise.all([
      adminService.getStudents(),
      adminService.getCourses(),
      adminService.getVideos(),
      adminService.getGames()
    ])
    setStudents(studsData)
    setCourses(coursesData)
    setVideos(videosData)
    setGames(gamesData)
    setLoading(false)
  }

  // ── Actions ───────────────────────────────────────────────────────────────

  const toggleSubscription = async (studentId: string, courseId: string, currentStatus: boolean) => {
    const success = await adminService.updateSubscription(studentId, courseId, !currentStatus)
    if (success) {
      setStudents(prev => prev.map(s => {
        if (s.id === studentId) {
          const newSubs = [...s.subscriptions]
          const subIndex = newSubs.findIndex(sub => sub.courseId === courseId)
          if (subIndex > -1) {
            newSubs[subIndex].subscribed = !currentStatus
          } else {
            newSubs.push({ courseId, subscribed: !currentStatus })
          }
          const updated = { ...s, subscriptions: newSubs }
          if (selectedStudent && selectedStudent.id === studentId) {
            setSelectedStudent(updated)
          }
          return updated
        }
        return s
      }))
    }
  }

  const handleAddMaterial = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMaterialTitle) return

    freemiumService.addModuleMaterial(selectedCourseId, selectedModuleId, {
      title: newMaterialTitle,
      type: newMaterialType,
      size: newMaterialSize,
      url: newMaterialUrl
    })

    setNewMaterialTitle("")
    loadMaterials()
  }

  const handleDeleteMaterial = (materialId: string) => {
    freemiumService.deleteModuleMaterial(selectedCourseId, selectedModuleId, materialId)
    loadMaterials()
  }

  const handleAddCourse = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newCourseTitle || !newCourseDesc) return

    const added = await adminService.addCourse({
      title: newCourseTitle,
      description: newCourseDesc,
      category: newCourseCat
    })

    setCourses(prev => [...prev, added])
    setNewCourseTitle("")
    setNewCourseDesc("")
    setShowCourseForm(false)
  }

  const handleAddVideo = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newVideoTitle || !newVideoUrl) return

    const added = await adminService.addVideo({
      courseId: newVideoCourseId,
      title: newVideoTitle,
      duration: newVideoDuration,
      url: newVideoUrl,
      isPremium: newVideoPremium
    })

    setVideos(prev => [...prev, added])
    // Update local lesson count
    setCourses(prev => prev.map(c => c.id === newVideoCourseId ? { ...c, lessonsCount: c.lessonsCount + 1 } : c))
    setNewVideoTitle("")
    setNewVideoUrl("")
    setShowVideoForm(false)
  }

  const handleAddGame = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!newGameQuestion || !newGameOpt1 || !newGameOpt2) return

    const added = await adminService.addGameQuestion({
      courseId: newGameCourseId,
      question: newGameQuestion,
      options: [newGameOpt1, newGameOpt2, newGameOpt3 || "N/A", newGameOpt4 || "N/A"],
      correctAnswer: Number(newGameCorrect),
      points: 20
    })

    setGames(prev => [...prev, added])
    setNewGameQuestion("")
    setNewGameOpt1("")
    setNewGameOpt2("")
    setNewGameOpt3("")
    setNewGameOpt4("")
    setShowGameForm(false)
  }

  const toggleCourseStatus = async (courseId: string) => {
    const success = await adminService.toggleCourseActive(courseId)
    if (success) {
      setCourses(prev => prev.map(c => c.id === courseId ? { ...c, active: !c.active } : c))
    }
  }

  // ── Filters ───────────────────────────────────────────────────────────────

  const filteredStudents = students.filter(s => 
    s.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredCourses = courses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredVideos = videos.filter(v => 
    v.title.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const filteredGames = games.filter(g => 
    g.question.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getCourseModules = (cId: string) => {
    const courseData = getCourse(cId)
    if (!courseData) return []
    const list: { id: string; title: string; levelTitle: string; stageTitle: string }[] = []
    courseData.stages.forEach(stage => {
      stage.levels.forEach(level => {
        level.modules.forEach(mod => {
          list.push({
            id: mod.id,
            title: mod.title,
            levelTitle: level.title,
            stageTitle: stage.title
          })
        })
      })
    })
    return list
  }

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="h-10 w-10 rounded-full border-4 border-primary border-t-transparent animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-8 max-w-7xl mx-auto bg-background min-h-screen text-foreground">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black tracking-tight">Panel de Control General</h1>
          <p className="text-sm font-medium text-muted-foreground mt-1">
            Gestiona usuarios, suscripciones, cursos, videos y los juegos de "Práctica con Albert".
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            onClick={() => { setActiveTab("courses"); setShowCourseForm(true) }}
            className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold rounded-xl gap-2 shadow-lg shadow-primary/20"
          >
            <Plus className="h-4 w-4" /> Crear Curso
          </Button>
          <Button 
            onClick={() => { setActiveTab("videos"); setShowVideoForm(true) }}
            variant="outline" 
            className="rounded-xl gap-2 border-border/50 hover:bg-muted/50"
          >
            <Video className="h-4 w-4 text-[#22c55e]" /> Subir Video
          </Button>
          <Button 
            onClick={() => setShowPasswordModal(true)}
            variant="outline" 
            className="rounded-xl gap-2 border-border/50 hover:bg-muted/50"
          >
            <Settings2 className="h-4 w-4 text-amber-500" /> Cambiar Clave
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
        <Card className="bg-card border-border/50 shadow-lg relative overflow-hidden group p-6">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500">
            <Users className="h-16 w-16" />
          </div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Estudiantes</p>
          <p className="text-4xl font-black">{students.length}</p>
          <p className="text-xs text-primary font-bold mt-2">Activos en plataforma</p>
        </Card>
        
        <Card className="bg-card border-border/50 shadow-lg relative overflow-hidden group p-6">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 text-accent">
            <BookOpen className="h-16 w-16" />
          </div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Cursos Totales</p>
          <p className="text-4xl font-black">{courses.length}</p>
          <p className="text-xs text-accent font-bold mt-2">{courses.filter(c => c.active).length} activos</p>
        </Card>

        <Card className="bg-card border-border/50 shadow-lg relative overflow-hidden group p-6">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 text-[#22c55e]">
            <Video className="h-16 w-16" />
          </div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Videos Subidos</p>
          <p className="text-4xl font-black">{videos.length}</p>
          <p className="text-xs text-[#22c55e] font-bold mt-2">Disponibles para alumnos</p>
        </Card>

        <Card className="bg-card border-border/50 shadow-lg relative overflow-hidden group p-6">
          <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-500 text-amber-500">
            <Gamepad2 className="h-16 w-16" />
          </div>
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-wider mb-2">Preguntas Albert</p>
          <p className="text-4xl font-black">{games.length}</p>
          <p className="text-xs text-amber-500 font-bold mt-2">Juegos interactivos</p>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs 
        value={activeTab} 
        onValueChange={(val) => {
          setActiveTab(val)
          router.push(`/admin/dashboard?tab=${val}`)
        }} 
        className="w-full"
      >
        <TabsList className="mb-8 bg-muted/50 p-1 border border-border/50 rounded-xl inline-flex flex-wrap h-auto gap-1">
          <TabsTrigger value="solucionarios" className="rounded-lg px-6 py-3 font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all flex items-center gap-2">
            <GraduationCap className="h-4 w-4" /> Gestión de Solucionarios
          </TabsTrigger>
          <TabsTrigger value="users" className="rounded-lg px-6 py-3 font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all flex items-center gap-2">
            <Users className="h-4 w-4" /> Usuarios y Suscripciones
          </TabsTrigger>
          <TabsTrigger value="courses" className="rounded-lg px-6 py-3 font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all flex items-center gap-2">
            <BookOpen className="h-4 w-4" /> Gestión de Cursos
          </TabsTrigger>
          <TabsTrigger value="videos" className="rounded-lg px-6 py-3 font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all flex items-center gap-2">
            <Video className="h-4 w-4" /> Gestión de Videos
          </TabsTrigger>
          <TabsTrigger value="games" className="rounded-lg px-6 py-3 font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all flex items-center gap-2">
            <Gamepad2 className="h-4 w-4" /> Práctica con Albert (Juegos)
          </TabsTrigger>
          <TabsTrigger value="preguntas" className="rounded-lg px-6 py-3 font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all flex items-center gap-2" onClick={loadQuizQuestions}>
            <Swords className="h-4 w-4" /> Gestión de Preguntas
          </TabsTrigger>
          <TabsTrigger value="materials" className="rounded-lg px-6 py-3 font-bold data-[state=active]:bg-primary data-[state=active]:text-primary-foreground transition-all flex items-center gap-2">
            <FileText className="h-4 w-4" /> Gestionar Material PDF
          </TabsTrigger>
        </TabsList>

        {/* ── TAB SOLUCIONARIOS Y NIVELES ──────────────────────────────────── */}
        <TabsContent value="solucionarios" className="space-y-6 animate-in fade-in duration-300">
          
          <div className="bg-card p-6 md:p-8 rounded-[2rem] border border-border/50 shadow-xl space-y-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-border/50 pb-6">
              <div>
                <span className="text-xs font-black text-amber-500 uppercase tracking-widest flex items-center gap-1.5 mb-1">
                  <GraduationCap className="h-4 w-4" /> Administrador de Recursos por Nivel
                </span>
                <h3 className="text-2xl font-black text-white">Gestión de Solucionarios, PDFs y Enlaces de Videos</h3>
                <p className="text-xs text-muted-foreground font-medium mt-1">
                  Selecciona la olimpiada o programa, el nivel y el año para administrar sus exámenes resueltos, videos explicativos y simulacros.
                </p>
              </div>

              {solSaveSuccess && (
                <div className="px-4 py-2 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-black uppercase tracking-wider flex items-center gap-2 animate-bounce">
                  <Check className="h-4 w-4" /> Guardado en la Base de Datos
                </div>
              )}
            </div>

            <form onSubmit={handleSaveSolucionario} className="space-y-6">
              {/* Selectores principales */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Selector de Programa / Solucionario */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Olimpiada o Solucionario</label>
                  <select
                    value={solucionarioId}
                    onChange={(e) => setSolucionarioId(e.target.value)}
                    className="w-full h-12 rounded-xl bg-muted/50 border border-border/50 px-4 text-foreground font-black outline-none cursor-pointer text-sm"
                  >
                    <option value="concurso_matematica_binaria">CMB - Concurso Nacional de Matemática Binaria</option>
                    <option value="selectivo_onem">ONEM - Concurso Selectivo</option>
                    <option value="olimpiada_logical">Olimpiada Matemática de Logical</option>
                    <option value="competencia_paralela">Competencia Paralela de Matemática</option>
                    <option value="concurso_binacional">Concurso Binacional de Matemáticas</option>
                    <option value="copernicus_math">Concurso Copernicus Math</option>
                    <option value="descubrimiento_matematico">Concurso Descubrimiento Matemático</option>
                    <option value="spirit_of_math">Olimpiada Spirit of Math</option>
                    <option value="geometria_origuela">Olimpiada de Geometría Julio Orihuela</option>
                    <option value="olimpiada_andes">Olimpiada de los Andes</option>
                    <option value="olimpiada_mayo">Olimpiada de Mayo</option>
                    <option value="olimpiada_imc_de_matematicas">Olimpiada IMC de Matemáticas</option>
                    <option value="irani_combinatoria">Olimpiada Iraní de Combinatoria</option>
                    <option value="irani_geometria">Olimpiada Iraní de Geometría</option>
                    <option value="olimpiada_navidena">Olimpiada Navideña de Matemáticas</option>
                    <option value="torneo_ciudades">Torneo de las Ciudades</option>
                    <option value="torneo_jovenes_matematicos">Torneo de Jóvenes Matemáticos</option>
                  </select>
                </div>

                {/* Selector de Nivel */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Nivel Educativo</label>
                  <select
                    value={solNivelId}
                    onChange={(e) => setSolNivelId(e.target.value)}
                    className="w-full h-12 rounded-xl bg-muted/50 border border-border/50 px-4 text-foreground font-bold outline-none cursor-pointer text-sm"
                  >
                    <option value="1">Nivel I / Nivel 1 (1° y 2° Sec)</option>
                    <option value="2">Nivel II / Nivel 2 (3° y 4° Sec)</option>
                    <option value="3">Nivel III / Nivel 3 (5° Sec)</option>
                    <option value="4">Nivel IV / Nivel 4 (Avanzado)</option>
                  </select>
                </div>

                {/* Selector de Edición / Año */}
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Edición / Año</label>
                  <select
                    value={solYear}
                    onChange={(e) => setSolYear(Number(e.target.value))}
                    className="w-full h-12 rounded-xl bg-muted/50 border border-border/50 px-4 text-foreground font-bold outline-none cursor-pointer text-sm"
                  >
                    <option value={2026}>Edición 2026 (Actual)</option>
                    <option value={2025}>Edición 2025</option>
                    <option value={2024}>Edición 2024</option>
                    <option value={2023}>Edición 2023</option>
                  </select>
                </div>

              </div>

              {/* Formulario de Recursos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/50">
                
                {/* 1. SECCIÓN EXAMEN RESUELTO EN PDF */}
                <div className="space-y-3 bg-muted/30 p-5 rounded-2xl border border-border/50">
                  <h4 className="text-sm font-black text-amber-400 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="h-4 w-4" /> 1. Examen Resuelto (PDF)
                  </h4>
                  <p className="text-xs text-muted-foreground font-medium">
                    Sube el archivo PDF del examen resuelto a Supabase Storage o pega la URL pública.
                  </p>

                  <div className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer relative group transition-colors ${
                    uploadPdfError
                      ? "border-red-500/60 bg-red-500/10 hover:bg-red-500/15"
                      : "border-amber-500/30 bg-amber-500/5 hover:bg-amber-500/10"
                  }`}>
                    <input
                      type="file"
                      accept="application/pdf"
                      disabled={isUploadingPdf}
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        setUploadPdfError(null)
                        setIsUploadingPdf(true)
                        try {
                          const res = await storageService.uploadMaterialPDF(file, solucionarioId)
                          setSolPdfUrl(res.url)
                          toast.success(`✅ PDF subido: ${res.fileName} (${res.sizeFormatted})`)
                        } catch (err: unknown) {
                          const msg = err instanceof Error ? err.message : "Error desconocido al subir PDF."
                          setUploadPdfError(msg)
                          console.error("[PDF Upload Error]", msg)
                        } finally {
                          setIsUploadingPdf(false)
                          e.target.value = ""
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                    />
                    <div className="flex flex-col items-center gap-1">
                      <UploadCloud className={`h-6 w-6 mb-1 ${
                        isUploadingPdf ? "animate-bounce text-amber-300"
                        : uploadPdfError ? "text-red-400"
                        : "text-amber-400"
                      }`} />
                      <span className={`text-xs font-black uppercase tracking-wider ${
                        uploadPdfError ? "text-red-400" : "text-amber-400"
                      }`}>
                        {isUploadingPdf ? "Subiendo..." : uploadPdfError ? "Error al subir — reintentar" : "Subir PDF a Supabase Storage"}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-semibold">
                        Haz clic para seleccionar el archivo .pdf
                      </span>
                    </div>
                  </div>

                  {/* Error inline visible */}
                  {uploadPdfError && (
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/40 text-left">
                      <span className="text-red-400 text-xs font-black shrink-0 mt-0.5">⚠ ERROR:</span>
                      <p className="text-[11px] text-red-300 font-mono leading-snug break-all">{uploadPdfError}</p>
                    </div>
                  )}

                  {/* Previsualización de URL subida */}
                  {solPdfUrl && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <FileText className="h-4 w-4 text-emerald-400 shrink-0" />
                      <a
                        href={solPdfUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] font-mono text-emerald-400 hover:underline truncate"
                      >
                        {solPdfUrl}
                      </a>
                    </div>
                  )}

                  <Input
                    placeholder="O pega la URL pública del PDF (https://...)"
                    value={solPdfUrl}
                    onChange={(e) => { setSolPdfUrl(e.target.value); setUploadPdfError(null) }}
                    className="h-11 rounded-xl bg-background border-border/50 text-xs font-mono"
                  />
                </div>

                {/* 2. SECCIÓN RESOLUCIÓN EN VIDEO */}
                <div className="space-y-3 bg-muted/30 p-5 rounded-2xl border border-border/50">
                  <h4 className="text-sm font-black text-primary uppercase tracking-wider flex items-center gap-2">
                    <PlayCircle className="h-4 w-4" /> 2. Resolución en Video (Link / Embed)
                  </h4>
                  <p className="text-xs text-muted-foreground font-medium">
                    Pega el enlace de la clase o resolución en video (YouTube, Vimeo, BunnyStream o MP4).
                  </p>

                  <Input
                    placeholder="Pega la URL del video (Ej. https://www.youtube.com/watch?v=...)"
                    value={solVideoUrl}
                    onChange={(e) => setSolVideoUrl(e.target.value)}
                    className="h-11 rounded-xl bg-background border-border/50 text-xs font-mono"
                    required
                  />

                  {/* Previsualización directa del reproductor de video */}
                  {solVideoUrl && (
                    <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black border border-white/10 shadow-inner">
                      <iframe
                        src={videoService.parseVideoUrl(solVideoUrl).embedUrl}
                        title="Previsualización de Video"
                        className="w-full h-full border-none"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      />
                    </div>
                  )}
                </div>

              </div>

              {/* 3. SIMULACRO Y CONTROL FREEMIUM */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border/50">
                <div className="space-y-3 bg-muted/30 p-5 rounded-2xl border border-border/50">
                  <h4 className="text-sm font-black text-emerald-400 uppercase tracking-wider flex items-center gap-2">
                    <FileText className="h-4 w-4" /> 3. Simulacro Oficial (PDF)
                  </h4>
                  <p className="text-xs text-muted-foreground font-medium">
                    Sube el archivo PDF del simulacro oficial a Supabase Storage o pega la URL pública.
                  </p>

                  {/* Uploader drag-and-drop */}
                  <div className={`border-2 border-dashed rounded-2xl p-4 text-center cursor-pointer relative group transition-colors ${
                    uploadSimulacroError
                      ? "border-red-500/60 bg-red-500/10 hover:bg-red-500/15"
                      : "border-emerald-500/30 bg-emerald-500/5 hover:bg-emerald-500/10"
                  }`}>
                    <input
                      type="file"
                      accept="application/pdf"
                      disabled={isUploadingSimulacro}
                      onChange={async (e) => {
                        const file = e.target.files?.[0]
                        if (!file) return
                        setUploadSimulacroError(null)
                        setIsUploadingSimulacro(true)
                        try {
                          const res = await storageService.uploadMaterialPDF(file, `${solucionarioId}/simulacros`)
                          setSolSimulacroUrl(res.url)
                          toast.success(`✅ Simulacro subido: ${res.fileName} (${res.sizeFormatted})`)
                        } catch (err: unknown) {
                          const msg = err instanceof Error ? err.message : "Error desconocido al subir simulacro."
                          setUploadSimulacroError(msg)
                          console.error("[Simulacro Upload Error]", msg)
                        } finally {
                          setIsUploadingSimulacro(false)
                          e.target.value = ""
                        }
                      }}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10 disabled:cursor-not-allowed"
                    />
                    <div className="flex flex-col items-center gap-1">
                      <UploadCloud className={`h-6 w-6 mb-1 ${
                        isUploadingSimulacro ? "animate-bounce text-emerald-300"
                        : uploadSimulacroError ? "text-red-400"
                        : "text-emerald-400"
                      }`} />
                      <span className={`text-xs font-black uppercase tracking-wider ${
                        uploadSimulacroError ? "text-red-400" : "text-emerald-400"
                      }`}>
                        {isUploadingSimulacro ? "Subiendo..." : uploadSimulacroError ? "Error al subir — reintentar" : "Subir Simulacro a Supabase Storage"}
                      </span>
                      <span className="text-[10px] text-muted-foreground font-semibold">
                        Haz clic para seleccionar el archivo .pdf del simulacro
                      </span>
                    </div>
                  </div>

                  {/* Error inline visible */}
                  {uploadSimulacroError && (
                    <div className="flex items-start gap-2 p-3 rounded-xl bg-red-500/10 border border-red-500/40 text-left">
                      <span className="text-red-400 text-xs font-black shrink-0 mt-0.5">⚠ ERROR:</span>
                      <p className="text-[11px] text-red-300 font-mono leading-snug break-all">{uploadSimulacroError}</p>
                    </div>
                  )}

                  {/* Previsualización de URL subida */}
                  {solSimulacroUrl && (
                    <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20">
                      <FileText className="h-4 w-4 text-emerald-400 shrink-0" />
                      <a
                        href={solSimulacroUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] font-mono text-emerald-400 hover:underline truncate"
                      >
                        {solSimulacroUrl}
                      </a>
                    </div>
                  )}

                  <Input
                    placeholder="O pega la URL pública del simulacro (https://...)"
                    value={solSimulacroUrl}
                    onChange={(e) => { setSolSimulacroUrl(e.target.value); setUploadSimulacroError(null) }}
                    className="h-11 rounded-xl bg-background border-border/50 text-xs font-mono"
                  />
                </div>

                <div className="space-y-3 bg-muted/30 p-5 rounded-2xl border border-border/50 flex flex-col justify-between">
                  <div>
                    <h4 className="text-sm font-black text-purple-400 uppercase tracking-wider mb-1">
                      4. Configuración de Acceso Freemium
                    </h4>
                    <p className="text-xs text-muted-foreground font-medium">
                      Determina si esta edición está disponible libremente (Free) o requiere membresía Premium.
                    </p>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-background border border-border/50">
                    <span className="text-xs font-bold text-foreground">
                      {solIsFree ? "🟢 Acceso Abierto Gratuito (Plan Free)" : "🔒 Exclusivo para Alumnos Premium"}
                    </span>
                    <button
                      type="button"
                      onClick={() => setSolIsFree(!solIsFree)}
                      className={`px-4 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                        solIsFree 
                          ? "bg-emerald-500/20 border border-emerald-500/40 text-emerald-400"
                          : "bg-amber-500/20 border border-amber-500/40 text-amber-400"
                      }`}
                    >
                      {solIsFree ? "Cambiar a Premium" : "Cambiar a Free"}
                    </button>
                  </div>
                </div>
              </div>

              {/* Botón de Guardado */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-border/50">
                <a
                  href={`/dashboard/solucionarios/${solucionarioId}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
                >
                  <Eye className="h-4 w-4" /> Probar vista de los alumnos en tiempo real
                </a>

                <Button
                  type="submit"
                  disabled={isSavingSol}
                  className="w-full sm:w-auto px-8 h-12 rounded-2xl bg-gradient-to-r from-amber-400 to-amber-600 text-slate-950 font-black text-xs uppercase tracking-wider gap-2 shadow-xl shadow-amber-500/20 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Save className="h-4 w-4" />
                  {isSavingSol ? "Guardando en Supabase DB..." : "Guardar Cambios en la Base de Datos"}
                </Button>
              </div>

            </form>
          </div>

        </TabsContent>

        {/* ── TAB 1: USERS ─────────────────────────────────────────────────── */}
        <TabsContent value="users" className="space-y-6 animate-in fade-in duration-300">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 bg-card p-4 rounded-2xl border border-border/50 shadow-sm">
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Buscar por nombre o correo..."
                className="pl-10 h-10 rounded-xl bg-muted/50 border-none focus-visible:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 text-xs font-bold text-muted-foreground">
              <AlertCircle className="h-4 w-4 text-primary" />
              Haz clic en los cursos para alternar entre Suscrito (Verde) y No Suscrito (Gris).
            </div>
          </div>

          <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left">
                <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-bold tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Estudiante</th>
                    <th className="px-6 py-4">Contacto & Registro</th>
                    <th className="px-6 py-4">Cursos & Permisos de Acceso</th>
                    <th className="px-6 py-4">Historial & Ficha</th>
                    <th className="px-6 py-4 text-right">Estado Gral.</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border/50">
                  {filteredStudents.map(student => {
                    const totalEnrolled = student.subscriptions.length
                    const regDate = new Date(student.registeredAt).toLocaleDateString("es-ES", {
                      day: "numeric",
                      month: "short",
                      year: "numeric"
                    })

                    return (
                      <tr key={student.id} className="hover:bg-muted/30 transition-colors">
                        {/* Name & Avatar */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-primary/20 text-primary flex items-center justify-center font-black shadow-inner">
                              {student.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="font-black text-foreground text-sm">{student.name}</p>
                              <p className="text-[10px] text-muted-foreground font-mono">ID: {student.id}</p>
                            </div>
                          </div>
                        </td>
                        
                        {/* Email & Date */}
                        <td className="px-6 py-4">
                          <p className="text-foreground font-semibold text-xs">{student.email}</p>
                          <p className="text-[11px] text-muted-foreground font-medium mt-0.5">Reg: {regDate}</p>
                        </td>

                        {/* Courses status list */}
                        <td className="px-6 py-4">
                          <div className="space-y-1.5 max-w-[320px]">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                                Inscrito en {totalEnrolled} {totalEnrolled === 1 ? "curso" : "cursos"}
                              </span>
                            </div>
                            <div className="flex flex-wrap gap-1.5">
                              {student.subscriptions.map(sub => {
                                const course = courses.find(c => c.id === sub.courseId)
                                const cTitle = course?.title || sub.courseId.toUpperCase()
                                return (
                                  <span 
                                    key={sub.courseId} 
                                    className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                                      sub.subscribed 
                                        ? "bg-amber-500/10 border border-amber-500/30 text-amber-400" 
                                        : "bg-blue-500/10 border border-blue-500/30 text-blue-400"
                                    }`}
                                  >
                                    {cTitle} • {sub.subscribed ? "Premium" : "Free"}
                                  </span>
                                )
                              })}
                              {totalEnrolled === 0 && (
                                <span className="text-[10px] font-bold text-slate-500 italic">Ningún curso inscrito</span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Ficha triggers */}
                        <td className="px-6 py-4">
                          <Button 
                            onClick={() => setSelectedStudent(student)}
                            size="sm"
                            variant="outline"
                            className="rounded-xl font-bold text-xs gap-1.5 h-8 border-border/50 text-accent hover:bg-accent/10 hover:text-accent cursor-pointer"
                          >
                            <Settings2 className="h-3.5 w-3.5" /> Administrar
                          </Button>
                        </td>

                        {/* Estado general */}
                        <td className="px-6 py-4 text-right">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            Activo
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* ── STUDENT DETAILS MODAL CENTERED (Pop-up) ── */}
          {selectedStudent && (
            <div className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-300">
              <div 
                className="absolute inset-0" 
                onClick={() => setSelectedStudent(null)} 
              />
              
              <div className="relative w-full max-w-3xl bg-card border border-border/40 rounded-[2.5rem] shadow-2xl flex flex-col justify-between animate-in zoom-in-95 duration-300 z-10 text-foreground overflow-hidden max-h-[90vh]">
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-amber-500 to-accent" />
                
                {/* Header */}
                <div className="p-6 border-b border-border/30 flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-black text-white">Administrar Estudiante</h3>
                    <p className="text-xs text-muted-foreground font-mono mt-0.5">ID: {selectedStudent.id}</p>
                  </div>
                  <button 
                    onClick={() => setSelectedStudent(null)}
                    className="p-1.5 rounded-xl hover:bg-muted text-muted-foreground hover:text-white transition-all cursor-pointer"
                  >
                    <XCircle className="h-6 w-6" />
                  </button>
                </div>

                {/* Two-Column Content Body */}
                <div className="flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-5 gap-6">
                  {/* Left Column: Profile & Timeline (2/5 size) */}
                  <div className="md:col-span-2 space-y-6">
                    {/* General Profile card */}
                    <div className="bg-muted/30 border border-border/20 rounded-2xl p-5 space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-primary/20 text-primary flex items-center justify-center font-black text-lg shadow-inner">
                          {selectedStudent.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-black text-white text-base leading-tight truncate">{selectedStudent.name}</p>
                          <p className="text-xs text-muted-foreground mt-0.5 truncate">{selectedStudent.email}</p>
                        </div>
                      </div>
                      <div className="pt-2 text-[11px] font-semibold text-slate-400 border-t border-border/25 space-y-2">
                        <div>
                          <p className="text-slate-500 uppercase tracking-widest text-[9px]">Celular</p>
                          <p className="text-slate-300 mt-0.5">{selectedStudent.phone || "No registrado"}</p>
                        </div>
                        <div>
                          <p className="text-slate-500 uppercase tracking-widest text-[9px]">Fecha de Registro</p>
                          <p className="text-slate-300 mt-0.5">
                            {new Date(selectedStudent.registeredAt).toLocaleDateString("es-ES", {
                              day: "numeric",
                              month: "long",
                              year: "numeric"
                            })}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Timeline logs */}
                    <div className="bg-muted/10 border border-border/20 rounded-2xl p-5 space-y-4">
                      <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                        Historial & Logs
                      </h4>
                      <div className="relative border-l-2 border-border/30 pl-4 ml-2 space-y-4 max-h-[200px] overflow-y-auto custom-scrollbar">
                        {selectedStudent.subscriptions.map(sub => {
                          const course = courses.find(c => c.id === sub.courseId)
                          const regDate = new Date(selectedStudent.registeredAt).toLocaleDateString("es-ES", {
                            day: "numeric",
                            month: "short"
                          })
                          return (
                            <div key={sub.courseId} className="relative text-[11px] font-medium text-slate-400">
                              <span className="absolute -left-[23px] top-1 h-2 w-2 rounded-full bg-accent border-2 border-slate-900" />
                              <p className="font-bold text-white text-xs">{course?.title || sub.courseId}</p>
                              <p className="mt-0.5 text-slate-500">
                                Inscrito el: <span className="font-semibold text-slate-400">{regDate}</span>
                              </p>
                              {sub.subscribed && (
                                <p className="text-amber-500 mt-1 flex items-center gap-1 font-bold">
                                  <span>⚡ Premium Activado</span>
                                </p>
                              )}
                            </div>
                          )
                        })}
                        {selectedStudent.subscriptions.length === 0 && (
                          <p className="text-xs font-bold text-slate-500 italic">No hay logs disponibles.</p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Right Column: Course Subscriptions Permissions (3/5 size) */}
                  <div className="md:col-span-3 space-y-4">
                    <h4 className="text-xs font-black uppercase tracking-wider text-slate-400">
                      Cursos Matriculados y Tipo de Acceso
                    </h4>
                    
                    <div className="space-y-3 max-h-[380px] overflow-y-auto pr-1 custom-scrollbar">
                      {courses.map(course => {
                        const sub = selectedStudent.subscriptions.find(s => s.courseId === course.id)
                        const isEnrolled = !!sub
                        const isPremium = sub?.subscribed || false

                        return (
                          <div 
                            key={course.id} 
                            className="bg-muted/20 border border-border/20 rounded-2xl p-4 flex items-center justify-between gap-4 hover:border-border/40 transition-colors"
                          >
                            <div className="min-w-0">
                              <p className="font-bold text-white text-sm truncate">{course.title}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider ${
                                  !isEnrolled 
                                    ? "bg-slate-800 text-slate-500 border border-slate-700/50" 
                                    : isPremium 
                                      ? "bg-amber-500/10 text-amber-500 border border-amber-500/20 shadow-inner" 
                                      : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
                                }`}>
                                  {!isEnrolled ? "No Inscrito" : isPremium ? "Premium (Acceso Total)" : "Free (3 Videos)"}
                                </span>
                              </div>
                            </div>
                            
                            {/* Toggle switches */}
                            <div className="shrink-0 flex items-center gap-1.5">
                              {!isEnrolled ? (
                                <Button
                                  size="sm"
                                  onClick={() => toggleSubscription(selectedStudent.id, course.id, true)}
                                  className="h-8 rounded-xl bg-primary/20 border border-primary/40 text-primary text-[10px] font-black uppercase tracking-wider hover:bg-primary hover:text-white cursor-pointer px-3"
                                >
                                  Inscribir
                                </Button>
                              ) : (
                                <button
                                  onClick={() => toggleSubscription(selectedStudent.id, course.id, isPremium)}
                                  className={`px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border shadow-sm transition-all duration-200 cursor-pointer ${
                                    isPremium 
                                      ? "bg-amber-500 hover:bg-amber-600 text-slate-950 border-amber-600" 
                                      : "bg-slate-800 hover:bg-amber-500/25 text-slate-300 border-slate-700 hover:text-amber-500 hover:border-amber-500/30"
                                  }`}
                                >
                                  {isPremium ? "Premium 🏆" : "Activar Premium ⚡"}
                                </button>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-border/30 bg-muted/20 flex justify-end gap-3">
                  <Button 
                    onClick={() => setSelectedStudent(null)}
                    className="rounded-xl bg-primary hover:bg-primary/90 text-white font-bold h-11 px-8 cursor-pointer"
                  >
                    Guardar Cambios
                  </Button>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        {/* ── TAB 2: COURSES ───────────────────────────────────────────────── */}
        <TabsContent value="courses" className="space-y-6 animate-in fade-in duration-300">
          <div className="flex justify-between items-center bg-card p-4 rounded-2xl border border-border/50 shadow-sm">
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Buscar curso por título..."
                className="pl-10 h-10 rounded-xl bg-muted/50 border-none focus-visible:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={() => setShowCourseForm(!showCourseForm)} className="bg-primary hover:bg-primary/90 text-white font-bold rounded-xl gap-2">
              <Plus className="h-4 w-4" /> {showCourseForm ? "Cerrar Formulario" : "Añadir Curso"}
            </Button>
          </div>

          {/* Formulario Añadir Curso */}
          {showCourseForm && (
            <Card className="bg-card border-border/50 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Crear Nuevo Curso</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddCourse} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input
                      placeholder="Título del curso (Ej. Geometría Analítica)"
                      value={newCourseTitle}
                      onChange={(e) => setNewCourseTitle(e.target.value)}
                      className="h-12 rounded-xl bg-muted/50 border-none px-4"
                      required
                    />
                    <select
                      value={newCourseCat}
                      onChange={(e) => setNewCourseCat(e.target.value)}
                      className="h-12 rounded-xl bg-muted/50 border-none px-4 text-foreground outline-none cursor-pointer"
                    >
                      <option value="Matemáticas">Matemáticas</option>
                      <option value="Olimpiadas">Olimpiadas</option>
                      <option value="Ciencias">Ciencias</option>
                      <option value="Letras">Letras</option>
                    </select>
                  </div>
                  <Input
                    placeholder="Descripción corta del curso..."
                    value={newCourseDesc}
                    onChange={(e) => setNewCourseDesc(e.target.value)}
                    className="h-12 rounded-xl bg-muted/50 border-none px-4"
                    required
                  />
                  <div className="flex justify-end gap-3 pt-2">
                    <Button type="button" variant="ghost" onClick={() => setShowCourseForm(false)} className="rounded-xl font-bold">Cancelar</Button>
                    <Button type="submit" className="bg-primary hover:bg-primary/90 text-white font-bold rounded-xl px-6">Guardar Curso</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Grid de Cursos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {filteredCourses.map(course => (
              <Card key={course.id} className={`bg-card border-border/50 shadow-lg flex flex-col justify-between transition-all ${!course.active ? "opacity-60 grayscale" : ""}`}>
                <CardHeader>
                  <div className="flex justify-between items-start gap-2 mb-2">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest bg-primary/10 text-primary border border-primary/20">
                      {course.category}
                    </span>
                    <button 
                      onClick={() => toggleCourseStatus(course.id)}
                      className={`text-xs font-bold px-2.5 py-1 rounded-md border transition-all ${course.active ? "bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/20 hover:bg-destructive/10 hover:text-destructive" : "bg-muted text-muted-foreground hover:bg-[#22c55e]/10 hover:text-[#22c55e]"}`}
                    >
                      {course.active ? "Activo" : "Inactivo"}
                    </button>
                  </div>
                  <CardTitle className="text-xl font-black">{course.title}</CardTitle>
                  <p className="text-xs text-muted-foreground mt-2 line-clamp-2">{course.description}</p>
                </CardHeader>
                <CardContent className="pt-0 flex justify-between items-center border-t border-border/50 mt-4 py-4">
                  <span className="text-xs font-bold text-muted-foreground">{course.lessonsCount} Temas / Videos</span>
                  <Button variant="ghost" size="sm" className="text-xs font-bold text-accent hover:bg-accent/10 hover:text-accent gap-1">
                    <Eye className="h-4 w-4" /> Ver Módulos
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* ── TAB 3: VIDEOS ────────────────────────────────────────────────── */}
        <TabsContent value="videos" className="space-y-6 animate-in fade-in duration-300">
          <div className="flex justify-between items-center bg-card p-4 rounded-2xl border border-border/50 shadow-sm">
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Buscar video por título..."
                className="pl-10 h-10 rounded-xl bg-muted/50 border-none focus-visible:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={() => setShowVideoForm(!showVideoForm)} className="bg-[#22c55e] hover:bg-[#22c55e]/90 text-white font-bold rounded-xl gap-2 shadow-lg shadow-[#22c55e]/20">
              <Plus className="h-4 w-4" /> {showVideoForm ? "Cerrar Formulario" : "Subir Nuevo Video"}
            </Button>
          </div>

          {/* Formulario Subir Video */}
          {showVideoForm && (
            <Card className="bg-card border-border/50 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Añadir Video a un Curso</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddVideo} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select
                      value={newVideoCourseId}
                      onChange={(e) => setNewVideoCourseId(e.target.value)}
                      className="h-12 rounded-xl bg-muted/50 border-none px-4 text-foreground outline-none cursor-pointer font-bold"
                    >
                      {courses.map(c => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                      ))}
                    </select>
                    <Input
                      placeholder="Título del Tema (Ej. 5. Teorema de Pitágoras)"
                      value={newVideoTitle}
                      onChange={(e) => setNewVideoTitle(e.target.value)}
                      className="h-12 rounded-xl bg-muted/50 border-none px-4 md:col-span-2"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
                    <Input
                      placeholder="URL del Video (Ej. https://.../video.mp4)"
                      value={newVideoUrl}
                      onChange={(e) => setNewVideoUrl(e.target.value)}
                      className="h-12 rounded-xl bg-muted/50 border-none px-4 md:col-span-2"
                      required
                    />
                    <div className="flex items-center gap-4 bg-muted/50 px-4 h-12 rounded-xl justify-between">
                      <span className="text-xs font-bold text-muted-foreground">¿Es Premium (Suscripción)?</span>
                      <input 
                        type="checkbox" 
                        checked={newVideoPremium} 
                        onChange={(e) => setNewVideoPremium(e.target.checked)}
                        className="h-5 w-5 rounded accent-primary cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <Button type="button" variant="ghost" onClick={() => setShowVideoForm(false)} className="rounded-xl font-bold">Cancelar</Button>
                    <Button type="submit" className="bg-[#22c55e] hover:bg-[#22c55e]/90 text-white font-bold rounded-xl px-6">Guardar Video</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Lista de Videos */}
          <div className="bg-card rounded-2xl border border-border/50 shadow-sm overflow-hidden">
            <table className="w-full text-sm text-left">
              <thead className="bg-muted/50 text-muted-foreground text-xs uppercase font-bold tracking-wider">
                <tr>
                  <th className="px-6 py-4">Título del Video</th>
                  <th className="px-6 py-4">Curso Asociado</th>
                  <th className="px-6 py-4">Duración</th>
                  <th className="px-6 py-4">Tipo de Acceso</th>
                  <th className="px-6 py-4 text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border/50">
                {filteredVideos.map(video => {
                  const course = courses.find(c => c.id === video.courseId)
                  return (
                    <tr key={video.id} className="hover:bg-muted/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-foreground flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                          <Video className="h-4 w-4" />
                        </div>
                        {video.title}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground font-semibold">
                        {course?.title || "Curso Desconocido"}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground font-mono">
                        {video.duration}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider border ${
                          video.isPremium 
                            ? "bg-primary/10 text-primary border-primary/20" 
                            : "bg-[#22c55e]/10 text-[#22c55e] border-[#22c55e]/20"
                        }`}>
                          {video.isPremium ? "Premium (Suscrito)" : "Gratuito (Capa Free)"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10 hover:text-destructive rounded-lg">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </TabsContent>

        {/* ── TAB 4: GAMES (PRÁCTICA CON ALBERT) ───────────────────────────── */}
        <TabsContent value="games" className="space-y-6 animate-in fade-in duration-300">
          <div className="flex justify-between items-center bg-card p-4 rounded-2xl border border-border/50 shadow-sm">
            <div className="relative w-full md:w-96 group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground group-focus-within:text-primary transition-colors" />
              <Input
                placeholder="Buscar pregunta..."
                className="pl-10 h-10 rounded-xl bg-muted/50 border-none focus-visible:ring-primary/20"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button onClick={() => setShowGameForm(!showGameForm)} className="bg-amber-500 hover:bg-amber-500/90 text-white font-bold rounded-xl gap-2 shadow-lg shadow-amber-500/20">
              <Plus className="h-4 w-4" /> {showGameForm ? "Cerrar Formulario" : "Añadir Pregunta Albert"}
            </Button>
          </div>

          {/* Formulario Añadir Pregunta */}
          {showGameForm && (
            <Card className="bg-card border-border/50 shadow-xl animate-in fade-in slide-in-from-top-4 duration-300 border-l-4 border-l-amber-500">
              <CardHeader>
                <CardTitle className="text-lg font-bold flex items-center gap-2">
                  <Gamepad2 className="h-5 w-5 text-amber-500" /> Nueva Pregunta Interactiva
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleAddGame} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <select
                      value={newGameCourseId}
                      onChange={(e) => setNewGameCourseId(e.target.value)}
                      className="h-12 rounded-xl bg-muted/50 border-none px-4 text-foreground outline-none cursor-pointer font-bold"
                    >
                      {courses.map(c => (
                        <option key={c.id} value={c.id}>{c.title}</option>
                      ))}
                    </select>
                    <Input
                      placeholder="Pregunta (Ej. ¿Cuál es el resultado de...?)"
                      value={newGameQuestion}
                      onChange={(e) => setNewGameQuestion(e.target.value)}
                      className="h-12 rounded-xl bg-muted/50 border-none px-4 md:col-span-2"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Input placeholder="Opción A*" value={newGameOpt1} onChange={(e) => setNewGameOpt1(e.target.value)} className="h-12 rounded-xl bg-muted/50 border-none px-4" required />
                    <Input placeholder="Opción B*" value={newGameOpt2} onChange={(e) => setNewGameOpt2(e.target.value)} className="h-12 rounded-xl bg-muted/50 border-none px-4" required />
                    <Input placeholder="Opción C" value={newGameOpt3} onChange={(e) => setNewGameOpt3(e.target.value)} className="h-12 rounded-xl bg-muted/50 border-none px-4" />
                    <Input placeholder="Opción D" value={newGameOpt4} onChange={(e) => setNewGameOpt4(e.target.value)} className="h-12 rounded-xl bg-muted/50 border-none px-4" />
                  </div>
                  <div className="flex items-center gap-4 bg-muted/50 p-4 rounded-xl justify-between">
                    <span className="text-xs font-bold text-muted-foreground">Selecciona la Opción Correcta:</span>
                    <select 
                      value={newGameCorrect} 
                      onChange={(e) => setNewGameCorrect(Number(e.target.value))}
                      className="h-10 rounded-lg bg-card border-none px-4 text-foreground font-bold cursor-pointer outline-none"
                    >
                      <option value={0}>Opción A</option>
                      <option value={1}>Opción B</option>
                      <option value={2}>Opción C</option>
                      <option value={3}>Opción D</option>
                    </select>
                  </div>
                  <div className="flex justify-end gap-3 pt-2">
                    <Button type="button" variant="ghost" onClick={() => setShowGameForm(false)} className="rounded-xl font-bold">Cancelar</Button>
                    <Button type="submit" className="bg-amber-500 hover:bg-amber-500/90 text-white font-bold rounded-xl px-6">Guardar Pregunta</Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Lista de Preguntas */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredGames.map(game => {
              const course = courses.find(c => c.id === game.courseId)
              return (
                <Card key={game.id} className="bg-card border-border/50 shadow-lg flex flex-col justify-between">
                  <CardHeader>
                    <div className="flex justify-between items-center mb-2">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest bg-amber-500/10 text-amber-500 border border-amber-500/20">
                        {course?.title || "General"}
                      </span>
                      <span className="text-xs font-bold text-muted-foreground font-mono">{game.points} Pts</span>
                    </div>
                    <CardTitle className="text-lg font-bold leading-snug">{game.question}</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="grid grid-cols-2 gap-2 mt-2">
                      {game.options.map((opt, idx) => (
                        <div 
                          key={idx} 
                          className={`p-3 rounded-xl text-xs font-semibold border flex items-center justify-between ${
                            idx === game.correctAnswer 
                              ? "bg-[#22c55e]/15 border-[#22c55e]/40 text-[#22c55e]" 
                              : "bg-muted/50 border-border/50 text-muted-foreground"
                          }`}
                        >
                          <span>{opt}</span>
                          {idx === game.correctAnswer && <CheckCircle2 className="h-4 w-4 shrink-0" />}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        {/* ── TAB 5: STUDY MATERIALS ────────────────────────────────────────── */}
        <TabsContent value="materials" className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
            
            {/* Left Panel: Upload/Add resource Form */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="bg-card border-border/50 shadow-xl border-l-4 border-l-primary sticky top-24">
                <CardHeader>
                  <CardTitle className="text-lg font-black flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" /> Agregar Material de Estudio
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleAddMaterial} className="space-y-4">
                    
                    {/* Select Course */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Curso</label>
                      <select
                        value={selectedCourseId}
                        onChange={(e) => {
                          const cId = e.target.value
                          setSelectedCourseId(cId)
                          const mods = getCourseModules(cId)
                          if (mods.length > 0) {
                            setSelectedModuleId(mods[0].id)
                          }
                        }}
                        className="w-full h-12 rounded-xl bg-muted/50 border-none px-4 text-foreground outline-none cursor-pointer font-bold"
                      >
                        {courses.map(c => (
                          <option key={c.id} value={c.id}>{c.title}</option>
                        ))}
                      </select>
                    </div>

                    {/* Select Module */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Módulo Específico</label>
                      <select
                        value={selectedModuleId}
                        onChange={(e) => setSelectedModuleId(e.target.value)}
                        className="w-full h-12 rounded-xl bg-muted/50 border-none px-4 text-foreground outline-none cursor-pointer text-xs font-semibold"
                      >
                        {getCourseModules(selectedCourseId).map(m => (
                          <option key={m.id} value={m.id}>
                            [{m.stageTitle} - {m.levelTitle}] {m.title}
                          </option>
                        ))}
                        {getCourseModules(selectedCourseId).length === 0 && (
                          <option value="">No hay módulos en este curso</option>
                        )}
                      </select>
                    </div>

                    {/* Material Title */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Título del Recurso</label>
                      <Input
                        placeholder="Ej. Ficha de Ejercicios - Congruencias"
                        value={newMaterialTitle}
                        onChange={(e) => setNewMaterialTitle(e.target.value)}
                        className="h-12 rounded-xl bg-muted/50 border-none px-4"
                        required
                      />
                    </div>

                    {/* Type and Size */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Tipo de Archivo</label>
                        <select
                          value={newMaterialType}
                          onChange={(e) => setNewMaterialType(e.target.value)}
                          className="w-full h-12 rounded-xl bg-muted/50 border-none px-4 text-foreground outline-none cursor-pointer font-bold"
                        >
                          <option value="PDF">PDF</option>
                          <option value="DOCX">Word Document</option>
                          <option value="ZIP">ZIP Archive</option>
                          <option value="Excel">Excel Sheet</option>
                          <option value="Enlace">Enlace Web</option>
                        </select>
                      </div>
                      
                      <div className="space-y-1.5">
                        <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Tamaño (Ej. 2.4 MB)</label>
                        <Input
                          placeholder="Ej. 1.2 MB"
                          value={newMaterialSize}
                          onChange={(e) => setNewMaterialSize(e.target.value)}
                          className="h-12 rounded-xl bg-muted/50 border-none px-4"
                          required
                        />
                      </div>
                    </div>

                    {/* File / Link URL with Supabase Storage File Selector */}
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-wider text-muted-foreground flex justify-between items-center">
                        <span>Archivo PDF o URL de Descarga</span>
                        <span className="text-[10px] text-amber-500 font-bold">☁️ Supabase Storage Activado</span>
                      </label>

                      {/* Selector directo de archivos PDF desde la computadora */}
                      <div className="border-2 border-dashed border-primary/30 rounded-2xl p-4 bg-primary/5 hover:bg-primary/10 transition-colors text-center cursor-pointer relative group">
                        <input
                          type="file"
                          accept="application/pdf"
                          onChange={async (e) => {
                            const file = e.target.files?.[0]
                            if (!file) return
                            try {
                              setNewMaterialTitle(file.name.replace(/\.[^/.]+$/, ""))
                              setNewMaterialSize(storageService.formatBytes(file.size))
                              
                              const res = await storageService.uploadMaterialPDF(file, selectedCourseId)
                              setNewMaterialUrl(res.url)
                            } catch (err: any) {
                              alert(err.message || "Error al subir PDF a Supabase Storage.")
                            }
                          }}
                          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                        />
                        <div className="flex flex-col items-center gap-1">
                          <span className="text-xs font-black text-primary uppercase tracking-wider">
                            📂 Clic para Seleccionar o Arrastrar PDF aquí
                          </span>
                          <span className="text-[10px] text-muted-foreground font-semibold">
                            Sube el PDF a Supabase Storage automáticamente
                          </span>
                        </div>
                      </div>

                      <Input
                        placeholder="URL del archivo (Ej. https://.../materials/doc.pdf)"
                        value={newMaterialUrl}
                        onChange={(e) => setNewMaterialUrl(e.target.value)}
                        className="h-11 rounded-xl bg-muted/50 border-none px-4 text-xs font-mono"
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-primary hover:bg-primary/95 text-white font-bold h-12 rounded-xl mt-4 cursor-pointer">
                      Publicar Recurso
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Right Panel: Materials List */}
            <div className="lg:col-span-3 space-y-4">
              <div className="flex justify-between items-center bg-card p-4 rounded-2xl border border-border/50 shadow-sm">
                <div>
                  <h4 className="text-sm font-bold text-white">Archivos Disponibles</h4>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Visualizando material para el módulo seleccionado a la izquierda.
                  </p>
                </div>
                <span className="text-xs font-bold bg-primary/10 text-primary border border-primary/20 px-3 py-1 rounded-full">
                  {materialsList.length} recursos
                </span>
              </div>

              {/* Materials Files */}
              <div className="space-y-3">
                {materialsList.map(mat => (
                  <Card key={mat.id} className="bg-card border-border/50 hover:border-border/80 transition-colors shadow-sm">
                    <CardContent className="p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="h-11 w-11 rounded-xl bg-destructive/10 text-destructive flex items-center justify-center font-black text-xs shrink-0">
                          {mat.type.toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-bold text-white text-sm truncate">{mat.title}</p>
                          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-2">
                            <span>Tamaño: {mat.size}</span>
                            <span>•</span>
                            <span className="font-mono text-[10px] truncate max-w-[200px]" title={mat.url}>{mat.url}</span>
                          </p>
                        </div>
                      </div>

                      {/* Delete action */}
                      <button
                        onClick={() => handleDeleteMaterial(mat.id)}
                        className="h-9 w-9 rounded-xl border border-destructive/20 text-destructive hover:bg-destructive/10 flex items-center justify-center transition-colors cursor-pointer"
                        title="Eliminar material"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </CardContent>
                  </Card>
                ))}

                {materialsList.length === 0 && (
                  <div className="bg-card border border-dashed border-border/50 rounded-3xl p-16 text-center space-y-3">
                    <FileText className="h-10 w-10 text-muted-foreground mx-auto animate-pulse" />
                    <div>
                      <p className="font-black text-white text-base">No hay materiales en este módulo</p>
                      <p className="text-xs text-muted-foreground max-w-xs mx-auto mt-1">
                        Utiliza el formulario de la izquierda para subir PDFs, prácticas u hojas de fórmulas para este módulo de estudio.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </TabsContent>
        {/* ── TAB PREGUNTAS ────────────────────────────────────────────────── */}
        <TabsContent value="preguntas" className="space-y-6 animate-in fade-in duration-300">
          <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">

            {/* Formulario nueva pregunta */}
            <div className="xl:col-span-2 bg-card p-6 md:p-8 rounded-[2rem] border border-border/50 shadow-xl space-y-5">
              <div className="border-b border-border/50 pb-4">
                <span className="text-xs font-black text-primary uppercase tracking-widest flex items-center gap-1.5 mb-1">
                  <Swords className="h-4 w-4" /> Nueva Pregunta
                </span>
                <h3 className="text-xl font-black text-white">Crear Pregunta de Reto</h3>
              </div>

              {/* Olimpiada */}
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Olimpiada</label>
                <select value={qSolucionarioId} onChange={e => setQSolucionarioId(e.target.value)}
                  className="w-full h-12 rounded-xl bg-muted/50 border border-border/50 px-4 text-foreground font-bold outline-none cursor-pointer text-sm">
                  <option value="concurso_matematica_binaria">CMB - Matemática Binaria</option>
                  <option value="selectivo_onem">ONEM - Concurso Selectivo</option>
                  <option value="olimpiada_logical">Olimpiada Matemática Logical</option>
                  <option value="competencia_paralela">Competencia Paralela</option>
                  <option value="olimpiada_mayo">Olimpiada de Mayo</option>
                  <option value="torneo_ciudades">Torneo de las Ciudades</option>
                </select>
              </div>

              {/* Nivel + Dificultad */}
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Nivel</label>
                  <select value={qNivelId} onChange={e => setQNivelId(e.target.value)}
                    className="w-full h-11 rounded-xl bg-muted/50 border border-border/50 px-3 text-foreground font-bold outline-none cursor-pointer text-sm">
                    <option value="1">Nivel 1</option>
                    <option value="2">Nivel 2</option>
                    <option value="3">Nivel 3</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Dificultad</label>
                  <select value={qDifficulty} onChange={e => setQDifficulty(e.target.value as "fácil" | "medio" | "difícil")}
                    className="w-full h-11 rounded-xl bg-muted/50 border border-border/50 px-3 text-foreground font-bold outline-none cursor-pointer text-sm">
                    <option value="fácil">Fácil</option>
                    <option value="medio">Medio</option>
                    <option value="difícil">Difícil</option>
                  </select>
                </div>
              </div>

              {/* Enunciado */}
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Enunciado de la Pregunta</label>
                <textarea value={qQuestion} onChange={e => setQQuestion(e.target.value)} rows={3}
                  placeholder="¿Cuál es el resultado de...?"
                  className="w-full rounded-xl bg-muted/50 border border-border/50 px-4 py-3 text-foreground font-medium outline-none resize-none text-sm placeholder:text-muted-foreground focus:border-primary/50 transition-colors" />
              </div>

              {/* Opciones */}
              <div className="space-y-2">
                <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Opciones de Respuesta</label>
                {qOptions.map((opt, i) => (
                  <div key={i} className="flex gap-2 items-center">
                    <button
                      onClick={() => setQCorrectAnswer(i)}
                      className={`h-8 w-8 rounded-lg shrink-0 text-xs font-black border-2 transition-all cursor-pointer ${
                        qCorrectAnswer === i
                          ? "bg-green-500/20 border-green-500 text-green-400"
                          : "border-border/50 text-muted-foreground hover:border-primary/50"
                      }`}
                      title="Marcar como correcta"
                    >
                      {String.fromCharCode(65 + i)}
                    </button>
                    <input
                      type="text"
                      value={opt}
                      onChange={e => {
                        const next = [...qOptions]
                        next[i] = e.target.value
                        setQOptions(next)
                      }}
                      placeholder={`Opción ${String.fromCharCode(65 + i)}`}
                      className="flex-1 h-10 rounded-xl bg-muted/50 border border-border/50 px-3 text-foreground font-medium outline-none text-sm placeholder:text-muted-foreground focus:border-primary/50 transition-colors"
                    />
                    {qCorrectAnswer === i && <Check className="h-4 w-4 text-green-400 shrink-0" />}
                  </div>
                ))}
                <p className="text-[10px] text-muted-foreground">Haz clic en la letra para marcar la respuesta correcta (verde).</p>
              </div>

              {/* Puntos */}
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Puntos</label>
                <input type="number" min={5} max={100} step={5} value={qPoints} onChange={e => setQPoints(Number(e.target.value))}
                  className="w-full h-11 rounded-xl bg-muted/50 border border-border/50 px-4 text-foreground font-black outline-none text-sm" />
              </div>

              {/* Explicación */}
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Explicación (opcional)</label>
                <textarea value={qExplanation} onChange={e => setQExplanation(e.target.value)} rows={2}
                  placeholder="Explica brevemente por qué esa es la respuesta correcta..."
                  className="w-full rounded-xl bg-muted/50 border border-border/50 px-4 py-3 text-foreground font-medium outline-none resize-none text-sm placeholder:text-muted-foreground focus:border-primary/50 transition-colors" />
              </div>

              <button
                onClick={handleCreateQuestion}
                disabled={quizSaving}
                className="w-full h-14 rounded-2xl bg-primary text-white font-black text-sm hover:bg-primary/90 active:scale-[0.98] transition-all disabled:opacity-60 flex items-center justify-center gap-2 cursor-pointer"
              >
                {quizSaving
                  ? <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  : <><Plus className="h-5 w-5" /> Guardar Pregunta</>}
              </button>
            </div>

            {/* Lista de preguntas */}
            <div className="xl:col-span-3 bg-card p-6 md:p-8 rounded-[2rem] border border-border/50 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-border/50 pb-4">
                <div>
                  <h3 className="text-xl font-black text-white">Banco de Preguntas</h3>
                  <p className="text-xs text-muted-foreground mt-0.5">{quizQuestions.length} preguntas registradas</p>
                </div>
                <button onClick={loadQuizQuestions} disabled={quizLoading}
                  className="px-4 py-2 rounded-xl bg-muted/50 border border-border/50 text-xs font-black text-muted-foreground hover:text-foreground transition-colors cursor-pointer disabled:opacity-60">
                  {quizLoading ? "Cargando..." : "Actualizar"}
                </button>
              </div>

              {quizLoading ? (
                <div className="flex items-center justify-center py-20">
                  <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
                </div>
              ) : quizQuestions.length === 0 ? (
                <div className="text-center py-20 space-y-3">
                  <Swords className="h-12 w-12 text-muted-foreground mx-auto animate-pulse" />
                  <p className="font-black text-white">No hay preguntas aún</p>
                  <p className="text-xs text-muted-foreground">Crea la primera pregunta con el formulario de la izquierda.</p>
                </div>
              ) : (
                <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                  {quizQuestions.map((q) => (
                    <div key={q.id} className="bg-muted/30 border border-border/50 rounded-2xl p-4 flex gap-3 group">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                          <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-full ${
                            q.difficulty === 'fácil' ? 'bg-green-500/15 text-green-400' :
                            q.difficulty === 'medio' ? 'bg-amber-500/15 text-amber-400' :
                            'bg-red-500/15 text-red-400'
                          }`}>{q.difficulty}</span>
                          <span className="text-[10px] font-bold text-muted-foreground bg-muted/50 px-2 py-0.5 rounded-full">
                            {q.solucionario_id?.replace('concurso_matematica_binaria', 'CMB').replace('selectivo_onem', 'ONEM').replace('_', ' ')}
                          </span>
                          <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full">{q.points} pts</span>
                        </div>
                        <p className="text-sm font-bold text-foreground leading-snug line-clamp-2">{q.question}</p>
                        <div className="grid grid-cols-2 gap-1 mt-2">
                          {q.options.map((opt, i) => (
                            <p key={i} className={`text-[11px] font-medium px-2 py-0.5 rounded-lg ${
                              i === q.correct_answer ? 'text-green-400 bg-green-500/10' : 'text-muted-foreground'
                            }`}>
                              {String.fromCharCode(65 + i)}. {opt}
                            </p>
                          ))}
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="h-8 w-8 rounded-xl border border-destructive/20 text-destructive hover:bg-destructive/10 flex items-center justify-center transition-colors shrink-0 opacity-0 group-hover:opacity-100 cursor-pointer"
                        title="Eliminar pregunta"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </TabsContent>

      </Tabs>

      {/* ── MODAL CAMBIAR CONTRASEÑA ── */}
      {showPasswordModal && (
        <div className="fixed inset-0 z-[250] flex items-center justify-center bg-slate-950/80 backdrop-blur-md p-4 animate-in fade-in duration-200">
          <div 
            className="absolute inset-0" 
            onClick={() => setShowPasswordModal(false)} 
          />
          
          <div className="relative w-full max-w-md bg-card border border-border/40 rounded-[2.5rem] shadow-2xl p-6 md:p-8 flex flex-col z-10 text-foreground overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-amber-500 via-primary to-accent" />
            
            <div className="flex items-center justify-between border-b border-border/30 pb-4 mb-6">
              <div>
                <h3 className="text-xl font-black text-white">Cambiar Contraseña</h3>
                <p className="text-xs text-muted-foreground mt-0.5">Actualiza tu clave de acceso de administrador</p>
              </div>
              <button 
                onClick={() => setShowPasswordModal(false)}
                className="p-1.5 rounded-xl hover:bg-muted text-muted-foreground hover:text-white transition-all cursor-pointer"
              >
                <XCircle className="h-6 w-6" />
              </button>
            </div>

            <form onSubmit={handleChangePassword} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Nueva Contraseña</label>
                <Input
                  type="password"
                  placeholder="Mínimo 6 caracteres"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="h-12 rounded-xl bg-muted/50 border-none focus-visible:ring-primary/20"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-black uppercase tracking-wider text-muted-foreground">Confirmar Contraseña</label>
                <Input
                  type="password"
                  placeholder="Repite la nueva contraseña"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="h-12 rounded-xl bg-muted/50 border-none focus-visible:ring-primary/20"
                />
              </div>

              <div className="pt-4 flex gap-3">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => setShowPasswordModal(false)}
                  className="flex-1 h-12 rounded-xl font-bold border-border/50 text-muted-foreground hover:bg-muted"
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  disabled={passwordUpdating}
                  className="flex-1 h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                >
                  {passwordUpdating ? (
                    <div className="h-5 w-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  ) : (
                    "Guardar Clave"
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default function AdminDashboardPage() {
  return (
    <Suspense fallback={<div className="p-8 text-[#94a3b8] font-bold">Cargando panel de administración...</div>}>
      <AdminDashboardContent />
    </Suspense>
  )
}
