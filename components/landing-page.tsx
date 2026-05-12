"use client"

import { ArrowRight, BookOpen, FileText, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"

interface LandingPageProps {
  onGetStarted: () => void
}

export function LandingPage({ onGetStarted }: LandingPageProps) {
  const methodologyCards = [
    {
      icon: PlayCircle,
      title: "Clases en Vivo y Grabadas",
      description: "Accede a sesiones interactivas y repasa las grabaciones cuantas veces necesites para dominar cada tema.",
      color: "bg-primary/10 text-primary"
    },
    {
      icon: FileText,
      title: "Simulacros Tipo Admisión",
      description: "Evalúa tu nivel con exámenes reales cronometrados y obtén un análisis detallado de tu desempeño.",
      color: "bg-ring/20 text-ring" 
    },
    {
      icon: BookOpen,
      title: "Material Académico Especializado",
      description: "Guías, compendios y bancos de preguntas diseñados por expertos en ingreso universitario.",
      color: "bg-accent/20 text-accent"
    },
  ]

  const testimonials = [
    { name: "Juan Pérez", role: "Ingresante UNMSM", text: "Gracias a LoofiDev Academy logré mi meta. Los simulacros son idénticos a los reales." },
    { name: "María García", role: "Estudiante de Secundaria", text: "Mis notas en el colegio mejoraron muchísimo desde que estudio aquí. ¡Albert es el mejor!" },
    { name: "Carlos Ruiz", role: "Ingresante UNI", text: "La metodología es super dinámica. Las clases de física y química me ayudaron a entender todo." },
    { name: "Ana Torres", role: "Prep. San Marcos", text: "El material en PDF es muy completo. Lo recomiendo al 100% para prepararse en serio." },
    { name: "Luis Mendoza", role: "Estudiante 5to Año", text: "Ideal para quienes buscamos ingresar a la primera. La plataforma es muy fácil de usar." },
    { name: "Sofía Castro", role: "Ingresante PUCP", text: "Los bancos de preguntas me salvaron. Practicar con Albert es clave para no fallar." },
  ]

  return (
    <div className="relative overflow-hidden bg-white">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-secondary/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Hero Section */}
      <section className="relative px-4 pb-16 pt-20 md:pb-24 md:pt-28 lg:pt-32">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div className="space-y-8">
              <div className="inline-flex items-center gap-2.5 rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold text-primary border border-primary/20 animate-in fade-in slide-in-from-bottom duration-700">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                </span>
                Ciclo Escolar y Pre-Universitario 2026
              </div>
              
              <div className="space-y-5">
                <h1 className="text-balance text-4xl font-bold tracking-tight text-secondary md:text-5xl lg:text-6xl leading-[1.1] animate-in fade-in slide-in-from-left duration-1000">
                  Asegura tu ingreso a la <span className="text-primary italic underline decoration-primary/20 underline-offset-8">universidad.</span>
                </h1>
                
                <p className="max-w-lg text-pretty text-lg text-muted-foreground leading-relaxed font-medium animate-in fade-in slide-in-from-left duration-1000 delay-200">
                  <span className="font-black text-secondary">LoofiDev Academy</span> es la plataforma educativa diseñada para maximizar tu potencial académico con tecnología de vanguardia.
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-4 pt-4 animate-in fade-in slide-in-from-bottom duration-1000 delay-400">
                <Button 
                  size="lg" 
                  onClick={onGetStarted} 
                  className="h-14 px-8 gap-3 rounded-2xl bg-primary text-white font-bold text-lg hover:bg-primary/90 hover:scale-105 transition-all shadow-xl shadow-primary/20 active:scale-95 group"
                >
                  Regístrate Gratis
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-14 px-8 rounded-2xl border-2 border-secondary/10 font-bold text-base text-secondary hover:bg-secondary hover:text-white transition-all active:scale-95"
                >
                  Conocer Planes
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-6 animate-in fade-in duration-1000 delay-600">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-10 w-10 rounded-full border-2 border-white bg-secondary/10 flex items-center justify-center font-bold text-secondary text-xs">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-sm font-bold text-secondary/60">
                  <span className="text-secondary font-black">+500 alumnos</span> ya confían en nosotros
                </p>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative animate-in fade-in zoom-in duration-1000 delay-300">
              <div className="relative aspect-square w-full max-w-[500px] mx-auto lg:mx-0">
                {/* Decorative Frames */}
                <div className="absolute -top-6 -right-6 h-48 w-48 rounded-3xl bg-accent/20 -z-10 animate-pulse rotate-6" />
                <div className="absolute -bottom-6 -left-6 h-56 w-56 rounded-full bg-secondary/10 -z-10 animate-bounce duration-[5000ms]" />
                
                <div className="group relative h-full w-full overflow-hidden rounded-[3rem] border-[8px] border-white bg-white shadow-2xl transition-transform duration-700 hover:rotate-1">
                  <Image 
                    src="/placeholder.jpg" 
                    alt="Academia Online" 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/60 via-transparent to-transparent opacity-60" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="group/play relative flex h-20 w-20 items-center justify-center rounded-full bg-white text-primary shadow-2xl transition-all hover:scale-110 hover:bg-primary hover:text-white active:scale-95">
                      <PlayCircle className="h-12 w-12 fill-current" />
                      <span className="absolute -inset-3 animate-ping rounded-full bg-white/30 group-hover/play:bg-primary/30" />
                    </button>
                  </div>

                  <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
                    <div className="space-y-0.5">
                      <p className="text-white font-bold text-lg">Clases en Vivo</p>
                      <p className="text-white/80 font-medium text-xs">Lunes a Viernes 4:00 PM</p>
                    </div>
                    <div className="flex gap-1.5">
                       <div className="h-2 w-8 rounded-full bg-primary" />
                       <div className="h-2 w-2 rounded-full bg-white/40" />
                       <div className="h-2 w-2 rounded-full bg-white/40" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section className="bg-muted/30 py-20 overflow-hidden relative">
        <div className="container mx-auto px-4 mb-12 relative z-10 text-center space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold text-secondary tracking-tight">Testimonios que <span className="text-primary italic">Inspiran</span></h2>
          <p className="text-muted-foreground text-lg font-medium max-w-2xl mx-auto">Únete a la comunidad de estudiantes que están transformando su futuro con Albert Math Academy.</p>
        </div>
        
        <div className="flex w-[200%] animate-infinite-scroll">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="w-[300px] md:w-[450px] px-6 flex-shrink-0">
              <Card className="bg-white border-none text-secondary rounded-[2.5rem] h-full shadow-lg hover:shadow-xl transition-all duration-500 hover:-translate-y-2 p-2">
                <CardContent className="p-8 space-y-6">
                  <div className="flex gap-1 text-primary">
                    {[1,2,3,4,5].map(s => <svg key={s} className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                  </div>
                  <p className="italic text-lg text-secondary/80 leading-relaxed font-medium">"{t.text}"</p>
                  <div className="flex items-center gap-4 border-t border-secondary/5 pt-6">
                    <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center font-bold text-secondary text-xl shadow-inner">
                       {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-secondary text-lg leading-none">{t.name}</p>
                      <p className="text-[10px] font-bold text-primary uppercase tracking-widest mt-1">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology Section */}
      <section className="bg-white px-4 py-24 md:py-32">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-16 text-center space-y-4">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-secondary">
              Prepárate para <span className="text-primary italic underline decoration-primary/20 underline-offset-8">Ganar.</span>
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground font-medium leading-relaxed">
              Combinamos la excelencia académica tradicional con una plataforma digital de última generación diseñada para tu éxito.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {methodologyCards.map((card, index) => (
              <Card
                key={index}
                className="group border-none bg-muted/30 rounded-3xl p-6 shadow-none hover:shadow-xl hover:bg-white transition-all duration-700 hover:-translate-y-2"
              >
                <CardHeader className="p-6">
                  <div className={`mb-8 flex h-16 w-16 items-center justify-center rounded-2xl ${card.color} shadow-lg group-hover:scale-110 transition-all duration-500`}>
                    <card.icon className="h-8 w-8" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-secondary tracking-tight">{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-6 pb-8">
                  <p className="text-muted-foreground text-base leading-relaxed font-medium">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-32 relative bg-secondary overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="container mx-auto max-w-4xl text-center space-y-10 relative z-10">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-white leading-[1.1]">
            ¿Listo para el siguiente <span className="text-primary italic">nivel?</span>
          </h2>
          <p className="text-lg text-white/70 font-medium max-w-xl mx-auto leading-relaxed">
            No pierdas más tiempo. Regístrate hoy y obtén acceso inmediato a nuestros simulacros gratuitos y clases modelo.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center pt-4">
            <Button 
              size="lg" 
              onClick={onGetStarted} 
              className="h-16 px-10 gap-4 rounded-2xl bg-primary text-white font-bold text-xl hover:bg-primary/90 hover:scale-105 transition-all shadow-xl shadow-primary/30 active:scale-95"
            >
              Unirme Gratis
              <ArrowRight className="h-6 w-6" />
            </Button>
            <a 
              href="https://wa.me/51992350023" 
              target="_blank" 
              rel="noopener noreferrer"
              className="h-16 px-10 inline-flex items-center gap-4 rounded-2xl bg-[#25D366] text-white font-bold text-xl hover:bg-[#128C7E] hover:scale-105 transition-all shadow-xl shadow-green-500/30 active:scale-95"
            >
              WhatsApp
              <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a 
        href="https://wa.me/51992350023" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-8 right-8 z-50 flex h-16 w-16 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl hover:scale-110 active:scale-95 transition-all animate-bounce duration-[3000ms] hover:rotate-6"
      >
        <svg className="h-10 w-10 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Footer */}
      <footer className="bg-[#F8FAFC] border-t border-secondary/5 px-4 pt-16 pb-12">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-4 lg:items-start">
            <div className="lg:col-span-2 space-y-6">
               <Image 
                 src="/logo_principal.png" 
                 alt="Logo" 
                 width={160} 
                 height={40} 
                 className="h-10 w-auto drop-shadow-sm" 
               />
               <p className="text-muted-foreground text-sm font-medium leading-relaxed max-w-md">
                 Formando los futuros líderes de las mejores universidades del país con tecnología y pasión.
               </p>
               <div className="flex gap-3">
                  <a href="https://youtube.com/@albertmath12?si=8q9SL4BZUbK8aZe4" target="_blank" rel="noopener noreferrer" className="h-10 w-10 rounded-lg bg-secondary flex items-center justify-center text-white hover:bg-primary transition-all">
                     <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
               </div>
            </div>

            <div className="space-y-6">
               <h4 className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Navegación</h4>
               <ul className="space-y-3">
                 {["Inicio", "Práctica con Albert", "Planes", "Preguntas Frecuentes"].map(link => (
                   <li key={link}>
                     <button className="text-muted-foreground text-sm font-bold hover:text-primary transition-colors">{link}</button>
                   </li>
                 ))}
               </ul>
            </div>

            <div className="space-y-6">
               <h4 className="text-[10px] font-bold text-secondary uppercase tracking-[0.2em]">Contacto</h4>
               <ul className="space-y-4">
                 <li className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-bold text-primary uppercase tracking-widest">Llámanos</span>
                    <span className="text-xl font-bold text-secondary">992 350 023</span>
                 </li>
                 <li className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-bold text-primary uppercase tracking-widest">Escríbenos</span>
                    <span className="text-base font-bold text-secondary">hola@albertmath.com</span>
                 </li>
               </ul>
            </div>
          </div>
          
          <div className="mt-16 pt-8 border-t border-secondary/5 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">
              &copy; 2026 Albert Math Academy.
            </p>
            <div className="flex gap-6">
               {["Términos", "Privacidad"].map(item => (
                 <button key={item} className="text-[9px] font-bold text-secondary/40 uppercase tracking-widest hover:text-primary transition-colors">
                   {item}
                 </button>
               ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
