"use client"

import { ArrowRight, BookOpen, FileText, PlayCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
      color: "bg-ring/20 text-ring" // Light Blue
    },
    {
      icon: BookOpen,
      title: "Material Académico Especializado",
      description: "Guías, compendios y bancos de preguntas diseñados por expertos en ingreso universitario.",
      color: "bg-accent/20 text-accent" // Lime Green
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
      <section className="relative px-4 pb-20 pt-24 md:pb-40 md:pt-32 lg:pt-40">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div className="space-y-12">
              <div className="inline-flex items-center gap-3 rounded-full bg-primary/10 px-6 py-2 text-sm font-black text-primary border-2 border-primary/20 animate-in fade-in slide-in-from-bottom duration-700">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                Ciclo Escolar y Pre-Universitario 2026
              </div>
              
              <div className="space-y-6">
                <h1 className="text-balance text-6xl font-black tracking-tighter text-secondary md:text-7xl lg:text-8xl leading-[0.95] animate-in fade-in slide-in-from-left duration-1000">
                  Asegura tu ingreso a la <span className="text-primary italic underline decoration-primary/20 underline-offset-8">universidad.</span>
                </h1>
                
                <p className="max-w-xl text-pretty text-2xl text-muted-foreground leading-relaxed font-medium animate-in fade-in slide-in-from-left duration-1000 delay-200">
                  <span className="font-black text-secondary">LoofiDev Academy</span> es la plataforma educativa diseñada para maximizar tu potencial académico con tecnología de vanguardia.
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-6 pt-4 animate-in fade-in slide-in-from-bottom duration-1000 delay-400">
                <Button 
                  size="lg" 
                  onClick={onGetStarted} 
                  className="h-20 px-12 gap-4 rounded-3xl bg-primary text-white font-black text-2xl hover:bg-primary/90 hover:scale-105 transition-all shadow-2xl shadow-primary/30 active:scale-95 group"
                >
                  Regístrate Gratis
                  <ArrowRight className="h-8 w-8 group-hover:translate-x-2 transition-transform" />
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="h-20 px-12 rounded-3xl border-4 border-secondary/10 font-black text-xl text-secondary hover:bg-secondary hover:text-white transition-all active:scale-95"
                >
                  Conocer Planes
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-8 pt-8 animate-in fade-in duration-1000 delay-600">
                <div className="flex -space-x-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-14 w-14 rounded-full border-4 border-white bg-secondary/10 flex items-center justify-center font-black text-secondary">
                      {String.fromCharCode(64 + i)}
                    </div>
                  ))}
                </div>
                <p className="text-lg font-bold text-secondary/60">
                  <span className="text-secondary font-black">+500 alumnos</span> ya confían en nosotros
                </p>
              </div>
            </div>

            {/* Hero Visual */}
            <div className="relative animate-in fade-in zoom-in duration-1000 delay-300">
              <div className="relative aspect-square w-full">
                {/* Decorative Frames */}
                <div className="absolute -top-10 -right-10 h-64 w-64 rounded-[4rem] bg-accent/20 -z-10 animate-pulse rotate-12" />
                <div className="absolute -bottom-10 -left-10 h-80 w-80 rounded-full bg-secondary/10 -z-10 animate-bounce duration-[5000ms]" />
                
                <div className="group relative h-full w-full overflow-hidden rounded-[4rem] border-[12px] border-white bg-white shadow-[0_50px_100px_-20px_rgba(0,0,0,0.25)] transition-transform duration-700 hover:rotate-2">
                  <Image 
                    src="/placeholder.jpg" 
                    alt="Academia Online" 
                    fill 
                    className="object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                  
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button className="group/play relative flex h-28 w-28 items-center justify-center rounded-full bg-white text-primary shadow-2xl transition-all hover:scale-110 hover:bg-primary hover:text-white active:scale-95">
                      <PlayCircle className="h-16 w-16 fill-current" />
                      <span className="absolute -inset-4 animate-ping rounded-full bg-white/30 group-hover/play:bg-primary/30" />
                    </button>
                  </div>

                  <div className="absolute bottom-10 left-10 right-10 flex justify-between items-end">
                    <div className="space-y-1">
                      <p className="text-white font-black text-2xl">Clases en Vivo</p>
                      <p className="text-white/80 font-bold">Lunes a Viernes 4:00 PM</p>
                    </div>
                    <div className="flex gap-2">
                       <div className="h-3 w-12 rounded-full bg-primary" />
                       <div className="h-3 w-3 rounded-full bg-white/40" />
                       <div className="h-3 w-3 rounded-full bg-white/40" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Carousel Section */}
      <section className="bg-muted/30 py-32 overflow-hidden relative">
        <div className="container mx-auto px-4 mb-20 relative z-10 text-center space-y-6">
          <h2 className="text-5xl md:text-6xl font-black text-secondary tracking-tight">Testimonios que <span className="text-primary italic">Inspiran</span></h2>
          <p className="text-muted-foreground text-xl font-medium max-w-2xl mx-auto">Únete a la comunidad de estudiantes que están transformando su futuro con Albert Math Academy.</p>
        </div>
        
        <div className="flex w-[200%] animate-infinite-scroll">
          {[...testimonials, ...testimonials].map((t, i) => (
            <div key={i} className="w-[350px] md:w-[500px] px-8 flex-shrink-0">
              <Card className="bg-white border-none text-secondary rounded-[4rem] h-full hover:shadow-[0_40px_80px_-15px_rgba(0,0,0,0.1)] transition-all duration-500 hover:-translate-y-4 p-4">
                <CardContent className="p-10 space-y-8">
                  <div className="flex gap-1 text-primary">
                    {[1,2,3,4,5].map(s => <svg key={s} className="h-6 w-6 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>)}
                  </div>
                  <p className="italic text-2xl text-secondary/80 leading-relaxed font-medium">"{t.text}"</p>
                  <div className="flex items-center gap-6 border-t border-secondary/5 pt-8">
                    <div className="h-16 w-16 rounded-[1.5rem] bg-secondary/10 flex items-center justify-center font-black text-secondary text-2xl shadow-inner">
                       {t.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-secondary text-2xl tracking-tight">{t.name}</p>
                      <p className="text-sm font-black text-primary uppercase tracking-[0.2em]">{t.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </section>

      {/* Methodology Section */}
      <section className="bg-white px-4 py-32 md:py-48">
        <div className="container mx-auto max-w-7xl">
          <div className="mb-24 text-center space-y-6">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-secondary">
              Prepárate para <span className="text-primary italic underline decoration-primary/20 underline-offset-8">Ganar.</span>
            </h2>
            <p className="mx-auto max-w-2xl text-2xl text-muted-foreground font-medium leading-relaxed">
              Combinamos la excelencia académica tradicional con una plataforma digital de última generación diseñada para tu éxito.
            </p>
          </div>

          <div className="grid gap-12 md:grid-cols-3">
            {methodologyCards.map((card, index) => (
              <Card
                key={index}
                className="group border-none bg-muted/30 rounded-[4rem] p-8 shadow-none hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.15)] hover:bg-white transition-all duration-700 hover:-translate-y-6"
              >
                <CardHeader className="p-8">
                  <div className={`mb-10 flex h-24 w-24 items-center justify-center rounded-[2rem] ${card.color} shadow-2xl group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                    <card.icon className="h-12 w-12" />
                  </div>
                  <CardTitle className="text-3xl font-black text-secondary tracking-tight">{card.title}</CardTitle>
                </CardHeader>
                <CardContent className="px-8 pb-10">
                  <p className="text-muted-foreground text-xl leading-relaxed font-medium">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-40 relative bg-secondary overflow-hidden">
        {/* Background Patterns */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:40px_40px]" />
        </div>

        <div className="container mx-auto max-w-5xl text-center space-y-16 relative z-10">
          <h2 className="text-6xl md:text-8xl font-black tracking-tighter text-white leading-[0.9]">
            ¿Listo para el siguiente <span className="text-primary italic">nivel?</span>
          </h2>
          <p className="text-2xl text-white/70 font-medium max-w-2xl mx-auto leading-relaxed">
            No pierdas más tiempo. Regístrate hoy y obtén acceso inmediato a nuestros simulacros gratuitos y clases modelo.
          </p>
          <div className="flex flex-col md:flex-row gap-8 justify-center pt-8">
            <Button 
              size="lg" 
              onClick={onGetStarted} 
              className="h-24 px-16 gap-6 rounded-[2.5rem] bg-primary text-white font-black text-3xl hover:bg-primary/90 hover:scale-105 transition-all shadow-3xl shadow-primary/40 active:scale-95"
            >
              Unirme Gratis
              <ArrowRight className="h-10 w-10" />
            </Button>
            <a 
              href="https://wa.me/51992350023" 
              target="_blank" 
              rel="noopener noreferrer"
              className="h-24 px-16 inline-flex items-center gap-6 rounded-[2.5rem] bg-[#25D366] text-white font-black text-3xl hover:bg-[#128C7E] hover:scale-105 transition-all shadow-3xl shadow-green-500/40 active:scale-95"
            >
              WhatsApp
              <svg className="h-10 w-10 fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* Floating WhatsApp */}
      <a 
        href="https://wa.me/51992350023" 
        target="_blank" 
        rel="noopener noreferrer"
        className="fixed bottom-12 right-12 z-50 flex h-20 w-20 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_20px_50px_rgba(37,211,102,0.4)] hover:scale-110 active:scale-95 transition-all animate-bounce duration-[3000ms] hover:rotate-12"
      >
        <svg className="h-12 w-12 fill-current" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
        </svg>
      </a>

      {/* Footer */}
      <footer className="bg-[#F8FAFC] border-t border-secondary/5 px-4 pt-20 pb-16">
        <div className="container mx-auto max-w-7xl">
          <div className="grid gap-16 lg:grid-cols-4 lg:items-start">
            <div className="lg:col-span-2 space-y-8">
               <Image 
                 src="/logo_principal.png" 
                 alt="Logo" 
                 width={500} 
                 height={150} 
                 className="h-40 w-auto drop-shadow-md" 
               />
               <p className="text-muted-foreground text-lg font-medium leading-relaxed max-w-md">
                 Formando los futuros líderes de las mejores universidades del país con tecnología y pasión.
               </p>
               <div className="flex gap-4">
                  <a href="https://www.facebook.com/share/p/1bDyeYx7Av/" target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center text-white hover:bg-primary hover:-translate-y-1 transition-all shadow-lg shadow-secondary/10">
                     <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  </a>
                  <a href="https://youtube.com/@albertmath12?si=8q9SL4BZUbK8aZe4" target="_blank" rel="noopener noreferrer" className="h-12 w-12 rounded-xl bg-secondary flex items-center justify-center text-white hover:bg-primary hover:-translate-y-1 transition-all shadow-lg shadow-secondary/10">
                     <svg className="h-6 w-6 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
               </div>
            </div>

            <div className="space-y-8">
               <h4 className="text-sm font-black text-secondary uppercase tracking-[0.2em]">Navegación</h4>
               <ul className="space-y-4">
                 {["Inicio", "Práctica con Albert", "Planes", "Preguntas Frecuentes"].map(link => (
                   <li key={link}>
                     <button className="text-muted-foreground text-base font-bold hover:text-primary transition-colors">{link}</button>
                   </li>
                 ))}
               </ul>
            </div>

            <div className="space-y-8">
               <h4 className="text-sm font-black text-secondary uppercase tracking-[0.2em]">Contacto</h4>
               <ul className="space-y-6">
                 <li className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Llámanos</span>
                    <span className="text-2xl font-black text-secondary">992 350 023</span>
                 </li>
                 <li className="flex flex-col gap-1">
                    <span className="text-[10px] font-black text-primary uppercase tracking-widest">Escríbenos</span>
                    <span className="text-lg font-black text-secondary">hola@albertmath.com</span>
                 </li>
               </ul>
            </div>
          </div>
          
          <div className="mt-20 pt-8 border-t border-secondary/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest text-center">
              &copy; 2026 Albert Math Academy. Todos los derechos reservados.
            </p>
            <div className="flex gap-8">
               {["Términos", "Privacidad", "Cookies"].map(item => (
                 <button key={item} className="text-[10px] font-black text-secondary/40 uppercase tracking-widest hover:text-primary transition-colors">
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

