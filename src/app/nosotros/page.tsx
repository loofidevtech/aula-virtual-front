"use client"

import { Navbar } from "@/components/navbar"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Target, Eye, Users, Award, Rocket, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NosotrosPage() {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Navbar
        isLoggedIn={false}
        user={null}
        onLogout={handleLogout}
      />

      <main>
        {/* Hero Section */}
        <section className="relative pt-20 pb-32 overflow-hidden">
          <div className="absolute inset-0 z-0">
            <Image
              src="/about_us_hero_1778800959389.png"
              alt="Hero Background"
              fill
              className="object-cover opacity-20"
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
              <p className="text-xl text-muted-foreground font-medium leading-relaxed max-w-2xl mx-auto">
                En Albert Math Academy, no solo enseñamos matemáticas; construimos el puente hacia las mejores universidades del mundo con tecnología de vanguardia y pasión inigualable.
              </p>
            </div>
          </div>
        </section>

        {/* Quienes Somos Section */}
        <section className="py-24 relative">
          <div className="container mx-auto px-4">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div className="relative group">
                <div className="absolute -inset-4 bg-primary/20 rounded-[2rem] blur-2xl group-hover:bg-primary/30 transition-all duration-500"></div>
                <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10 shadow-2xl">
                   <Image 
                    src="/about_us_hero_1778800959389.png" 
                    alt="Acerca de nosotros" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                   />
                </div>
              </div>
              
              <div className="space-y-8">
                <h2 className="text-4xl font-black text-white leading-tight">
                  Más que una Academia, una <br/><span className="text-primary">Comunidad de Éxito</span>
                </h2>
                <div className="space-y-6 text-lg text-muted-foreground font-medium leading-relaxed">
                  <p>
                    Albert Math Academy nació con la convicción de que cada estudiante tiene el potencial de alcanzar la excelencia. Nuestra metodología combina el rigor académico con las herramientas digitales más avanzadas para transformar el aprendizaje de las matemáticas.
                  </p>
                  <p>
                    Desde nuestros inicios, hemos acompañado a miles de estudiantes en su camino hacia el éxito, ayudándoles a superar desafíos y a descubrir la belleza y utilidad de las ciencias exactas.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-8 pt-4">
                  <div className="space-y-2">
                    <span className="text-4xl font-black text-white">10K+</span>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Estudiantes</p>
                  </div>
                  <div className="space-y-2">
                    <span className="text-4xl font-black text-white">95%</span>
                    <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">Ingresos Exitosos</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Misión y Visión Section */}
        <section className="py-24 bg-card/50 border-y border-white/5 relative overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Misión */}
              <div className="group p-10 rounded-[2.5rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(240,118,41,0.1)]">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-wider">Nuestra Misión</h3>
                <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                  Empoderar a la próxima generación de líderes académicos mediante una educación matemática de alto nivel, accesible y tecnológicamente avanzada, que despierte el pensamiento crítico y la pasión por el conocimiento.
                </p>
              </div>

              {/* Visión */}
              <div className="group p-10 rounded-[2.5rem] bg-gradient-to-br from-white/5 to-transparent border border-white/10 hover:border-primary/50 transition-all duration-500 hover:shadow-[0_20px_50px_rgba(240,118,41,0.1)]">
                <div className="w-16 h-16 rounded-2xl bg-primary/20 flex items-center justify-center mb-8 group-hover:scale-110 transition-transform duration-500">
                  <Eye className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-3xl font-black text-white mb-6 uppercase tracking-wider">Nuestra Visión</h3>
                <p className="text-lg text-muted-foreground font-medium leading-relaxed">
                  Ser la plataforma educativa líder en Latinoamérica, reconocida por revolucionar el aprendizaje de las ciencias exactas y por ser el pilar fundamental en la formación de los futuros innovadores de la región.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Valores Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
              <h2 className="text-4xl font-black text-white uppercase tracking-wider">Valores que nos Definen</h2>
              <p className="text-lg text-muted-foreground font-medium">Los pilares sobre los cuales construimos nuestra excelencia educativa día tras día.</p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: Award, title: "Excelencia", desc: "Buscamos la perfección en cada material y clase que entregamos." },
                { icon: Rocket, title: "Innovación", desc: "Integramos las últimas tecnologías para un aprendizaje dinámico." },
                { icon: BookOpen, title: "Compromiso", desc: "Tu meta es nuestra meta. Te acompañamos hasta lograrlo." },
                { icon: Users, title: "Integridad", desc: "Actuamos con transparencia y ética en toda nuestra formación." }
              ].map((valor, idx) => (
                <div key={idx} className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-300 group">
                  <valor.icon className="w-10 h-10 text-primary mb-6 group-hover:scale-110 transition-transform" />
                  <h4 className="text-xl font-black text-white mb-3 uppercase tracking-wide">{valor.title}</h4>
                  <p className="text-muted-foreground font-medium leading-relaxed">{valor.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-24">
          <div className="container mx-auto px-4">
            <div className="relative rounded-[3rem] overflow-hidden p-12 md:p-20 text-center space-y-8 border border-white/10">
              <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-primary/20 backdrop-blur-3xl"></div>
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-primary/30 via-transparent to-primary/10"></div>
              </div>
              
              <div className="relative z-10 max-w-3xl mx-auto space-y-8">
                <h2 className="text-4xl md:text-6xl font-black text-white leading-tight">
                  ¿Listo para comenzar tu <span className="italic">propia historia</span> de éxito?
                </h2>
                <p className="text-xl text-white/80 font-medium">
                  Únete a miles de estudiantes que ya están transformando su futuro con nosotros.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button 
                    size="lg" 
                    className="h-16 px-12 rounded-full bg-white text-primary hover:bg-white/90 font-black uppercase tracking-widest text-sm shadow-xl"
                    onClick={() => router.push("/registro")}
                  >
                    Regístrate Ahora
                  </Button>
                  <Button 
                    size="lg" 
                    variant="outline"
                    className="h-16 px-12 rounded-full border-white/30 text-white hover:bg-white/10 font-black uppercase tracking-widest text-sm"
                  >
                    Ver Planes
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
