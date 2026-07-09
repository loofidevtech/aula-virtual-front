"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
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
  AlertCircle
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

export default function AdminDashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("users")
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

  useEffect(() => {
    const adminUser = sessionStorage.getItem("adminUser")
    if (!adminUser) {
      router.push("/admin/login")
      return
    }

    loadAllData()
  }, [])

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
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-8 bg-muted/50 p-1 border border-border/50 rounded-xl inline-flex flex-wrap h-auto gap-1">
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
        </TabsList>

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
                                const cTitle = course?.title ? course.title.split(" ")[1] || course.title.split(" ")[0] : sub.courseId
                                return (
                                  <span 
                                    key={sub.courseId} 
                                    className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-wider ${
                                      sub.subscribed 
                                        ? "bg-amber-500/10 border border-amber-500/30 text-amber-500" 
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
      </Tabs>
    </div>
  )
}
