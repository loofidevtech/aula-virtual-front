"use client"

import { Navbar } from "@/components/navbar"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Target, Eye, Users, Award, Rocket, BookOpen, Heart, Flame, Shield, HelpCircle, Trophy, Globe, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NosotrosPage() {
  const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem("currentUser")
    sessionStorage.removeItem("adminUser")
    router.push("/")
  }

  const valores = [
    {
      icon: Heart,
      title: "Pasión por aprender",
      desc: "Promovemos la curiosidad y el deseo constante de descubrir nuevas ideas."
    },
    {
      icon: Flame,
      title: "Perseverancia",
      desc: "Enseñamos que un problema difícil no es una barrera, sino una oportunidad para crecer."
    },
    {
      icon: Award,
      title: "Disciplina",
      desc: "Valoramos la práctica constante, el orden y la responsabilidad como bases del progreso."
    },
    {
      icon: Sparkles,
      title: "Creatividad",
      desc: "Motivamos a nuestros estudiantes a buscar diferentes caminos y construir sus propias estrategias."
    },
    {
      icon: Rocket,
      title: "Excelencia",
      desc: "Trabajamos para mejorar continuamente nuestros programas, materiales y métodos de enseñanza."
    },
    {
      icon: HelpCircle,
      title: "Humildad",
      desc: "Reconocemos que siempre podemos aprender de nuestros profesores, compañeros, errores y experiencias."
    },
    {
      icon: Users,
      title: "Comunidad",
      desc: "Creemos que el conocimiento crece cuando se comparte y que los grandes resultados se construyen con el apoyo de estudiantes, familias y educadores."
    },
    {
      icon: Shield,
      title: "Integridad",
      desc: "Promovemos una competencia honesta, responsable y respetuosa."
    }
  ]

  const suenos = [
    {
      title: "Materiales de Calidad para Todos",
      desc: "Soñamos con una plataforma en la que cualquier estudiante del Perú pueda acceder a materiales de calidad para prepararse en matemáticas."
    },
    {
      title: "La Biblioteca Virtual Más Completa",
      desc: "Soñamos con reunir y organizar los exámenes de los concursos matemáticos nacionales, acompañados de soluciones claras, diferentes métodos y ejercicios de aplicación."
    },
    {
      title: "Descubrimiento de Talentos Ocultos",
      desc: "Soñamos con descubrir talentos que quizá todavía no han tenido la oportunidad de recibir una preparación especializada."
    },
    {
      title: "Representación Orgullosa e Internacional",
      desc: "Y soñamos con ver a nuestros estudiantes representar con orgullo a sus colegios, sus regiones y al Perú en escenarios nacionales e internacionales."
    }
  ]

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar
        isLoggedIn={false}
        user={null}
        onLogout={handleLogout}
      />

      <main className="relative overflow-hidden">
        {/* Background Decorative Blur */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
          <div className="absolute top-12 right-12 w-96 h-96 bg-primary/5 blur-[120px] rounded-full"></div>
          <div className="absolute bottom-40 left-12 w-[500px] h-[500px] bg-secondary/5 blur-[150px] rounded-full"></div>
        </div>

        {/* Hero Section */}
        <section className="relative pt-20 pb-24 md:pb-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/about_us_hero_1778800959389.png"
              alt="Hero Background"
              fill
              className="object-cover opacity-10"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background"></div>
          </div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-black uppercase tracking-[0.2em] animate-fade-in">
                <Users className="w-4 h-4" />
                Nuestra Historia
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.1] text-white">
                Forjando el <span className="text-primary italic">Futuro</span> de la Educación Matemática
              </h1>
              <p className="text-lg md:text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto">
                En Albert Math Academy formamos estudiantes con pensamiento olímpico, guiándolos en cada paso para comprender, crear e inspirar.
              </p>
            </div>
          </div>
        </section>

        {/* Quienes Somos y Nuestro Fundador Section */}
        <section className="py-16 md:py-24 relative">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/10 rounded-[2.5rem] blur-2xl group-hover:bg-primary/15 transition-all duration-500"></div>
                <div className="relative aspect-video rounded-[2.5rem] overflow-hidden border border-border/50 shadow-2xl bg-card">
                   <Image 
                    src="/about_us_hero_1778800959389.png" 
                    alt="Fundador Albert Math Academy" 
                    fill 
                    className="object-cover opacity-80 transition-transform duration-700 group-hover:scale-105"
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-85" />
                </div>
              </div>
              
              <div className="space-y-8">
                <div className="space-y-3">
                  <span className="text-xs font-black text-primary uppercase tracking-[0.2em] bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full">
                    Fundador e Impulsor
                  </span>
                  <h2 className="text-4xl font-black text-white leading-tight">
                    Albert Sardón Cárdenas
                  </h2>
                </div>
                <div className="space-y-6 text-base md:text-lg text-muted-foreground font-medium leading-relaxed">
                  <p>
                    Albert Sardón Cárdenas es el creador y principal impulsor de <strong className="text-white">Albert Math Academy</strong>. Su experiencia como estudiante y participante en concursos matemáticos le permitió conocer directamente los desafíos que enfrenta un competidor: comprender problemas difíciles, administrar el tiempo, superar errores, encontrar diferentes métodos y mantener la motivación durante el proceso de preparación.
                  </p>
                  <p>
                    Albert creó la academia con el deseo de compartir lo que ha aprendido y ayudar a otros estudiantes a descubrir que las matemáticas pueden ser desafiantes, emocionantes y profundamente creativas.
                  </p>
                  <p className="italic text-primary/90 border-l-2 border-primary pl-4 font-normal">
                    "Su propósito no es únicamente enseñar procedimientos, sino transmitir una manera de pensar basada en la curiosidad, la perseverancia y la búsqueda constante de nuevas soluciones."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Misión y Visión Section */}
        <section className="py-24 bg-card/10 border-y border-border/30 relative overflow-hidden">
          <div className="container mx-auto px-4 relative z-10 max-w-7xl">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Misión */}
              <div className="group p-8 md:p-10 rounded-3xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(240,118,41,0.08)] flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Target className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-wider">Nuestra Misión</h3>
                  <p className="text-base md:text-lg text-muted-foreground font-medium leading-relaxed">
                    Brindar una formación matemática especializada, accesible y de alta calidad que permita a niños y jóvenes desarrollar el pensamiento lógico, creativo y estratégico necesario para enfrentar con confianza los concursos y olimpiadas matemáticas.
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground/80 leading-relaxed font-normal pt-2">
                    A través de programas de entrenamiento, clases virtuales, solucionarios detallados, materiales progresivos y una metodología basada en la comprensión de ideas, acompañamos a cada estudiante para que fortalezca sus capacidades, aprenda de sus errores y alcance su máximo potencial.
                  </p>
                </div>
              </div>

              {/* Visión */}
              <div className="group p-8 md:p-10 rounded-3xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(240,118,41,0.08)] flex flex-col justify-between">
                <div className="space-y-6">
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                    <Eye className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-2xl font-black text-white uppercase tracking-wider">Nuestra Visión</h3>
                  <p className="text-base md:text-lg text-muted-foreground font-medium leading-relaxed">
                    Convertirnos en una de las plataformas de entrenamiento matemático y preparación olímpica más reconocidas del Perú y Latinoamérica, destacada por la calidad de sus programas, la profundidad de sus solucionarios y los resultados de sus estudiantes.
                  </p>
                  <p className="text-sm md:text-base text-muted-foreground/80 leading-relaxed font-normal pt-2">
                    Aspiramos a construir la biblioteca virtual más completa de concursos matemáticos nacionales, reuniendo exámenes, soluciones, métodos, estrategias y recursos de aprendizaje para estudiantes de primaria y secundaria. Queremos formar una nueva generación de jóvenes con pensamiento olímpico, capaces de representar con excelencia en competencias nacionales e internacionales.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Valores Section (Los 8 valores del PDF) */}
        <section className="py-24">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <span className="text-xs font-black text-primary uppercase tracking-[0.2em] bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full">
                Pilares Institucionales
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Nuestros Valores</h2>
              <p className="text-base md:text-lg text-muted-foreground font-medium">Los principios fundamentales que guían nuestro comportamiento y enseñanza.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {valores.map((valor, idx) => (
                <div 
                  key={idx} 
                  className="p-6 md:p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/50 transition-all duration-350 group hover:-translate-y-2 hover:shadow-[0_15px_30px_rgba(0,0,0,0.5)] flex flex-col justify-between"
                >
                  <div>
                    <div className="w-12 h-12 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center mb-6 group-hover:scale-115 transition-transform duration-300">
                      <valor.icon className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="text-lg font-black text-white mb-3 tracking-wide">{valor.title}</h4>
                    <p className="text-muted-foreground font-medium leading-relaxed text-sm">{valor.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Nuestro Sueño Section (Las 4 metas del PDF) */}
        <section className="py-24 bg-card/5 border-t border-border/30">
          <div className="container mx-auto px-4 max-w-7xl">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <span className="text-xs font-black text-primary uppercase tracking-[0.2em] bg-primary/10 border border-primary/20 px-3.5 py-1.5 rounded-full">
                Metas a Largo Plazo
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight">Nuestro Sueño</h2>
              <p className="text-base md:text-lg text-muted-foreground font-medium">Lo que aspiramos a construir para la educación y el talento de nuestro país.</p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {suenos.map((sueno, idx) => (
                <div 
                  key={idx} 
                  className="p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/40 transition-all duration-300 flex gap-5 items-start"
                >
                  <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div className="space-y-2">
                    <h4 className="text-lg font-black text-white leading-tight">{sueno.title}</h4>
                    <p className="text-sm md:text-base text-muted-foreground font-medium leading-relaxed">{sueno.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA / Mensaje Final Section */}
        <section className="py-32 relative bg-background border-t border-border/30">
          <div className="container mx-auto px-4 text-center space-y-12 relative z-10 max-w-4xl">
            <span className="text-xs font-black text-amber-400 uppercase tracking-[0.2em] bg-amber-500/10 border border-amber-500/20 px-3.5 py-1.5 rounded-full">
              Tu Próximo Desafío
            </span>
            <h2 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight">
              Tu próximo desafío <span className="text-primary italic">comienza aquí</span>
            </h2>
            <div className="space-y-6 max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground font-medium leading-relaxed">
              <p>
                Cada gran competidor empezó resolviendo un primer problema. En Albert Math Academy encontrarás programas de entrenamiento, solucionarios, estrategias y una comunidad que te acompañará durante tu preparación.
              </p>
              <p className="text-base md:text-lg font-black text-white/95 border-y border-border/40 py-4 uppercase tracking-wider">
                🏆 "No importa solamente cuántos problemas puedes resolver hoy. Lo importante es cuánto puedes aprender, mejorar y llegar a construir con una preparación adecuada."
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 justify-center pt-6 max-w-sm mx-auto">
              <Button 
                size="lg" 
                className="h-16 px-10 rounded-2xl bg-primary text-white font-black text-lg hover:bg-primary/95 hover:scale-105 transition-all shadow-xl shadow-primary/20 active:scale-95 flex-1"
                onClick={() => router.push("/registro")}
              >
                Registrarte Gratis
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="h-16 px-10 rounded-2xl border-2 border-border/80 text-foreground hover:bg-muted/50 hover:text-white transition-all active:scale-95 flex-1"
                onClick={() => router.push("/login")}
              >
                Ingresar al Aula
              </Button>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
