// lib/data/courses.ts
// Single Source of Truth para los datos del Aula Virtual
import catalog from "./academy_catalog.json"

export type Badge = "Teoría" | "Problemas" | "Simulacros" | "Mini simulacro"

export interface CourseModule {
  id: string
  number: number
  title: string
  description: string
  badges: Badge[]
  estimatedHours: string
  icon: string // lucide-react icon name
}

export interface Level {
  id: string
  number: number
  title: string
  subtitle: string // ej: "1° y 2° de secundaria"
  modules: CourseModule[]
}

export interface Stage {
  id: string
  title: string
  description: string
  color: string // Tailwind gradient class
  icon: string
  levels: Level[]
}

export interface Course {
  id: string
  title: string
  subtitle: string
  description: string
  totalStages: number
  totalModules: number
  levelsPerStage: number
  stages: Stage[]
  gradient?: string
}

export interface ProgramCard {
  id: string
  title: string
  subtitle: string
  gradient: string // Tailwind gradient classes
  textColor: string
}

// ── Data ──────────────────────────────────────────────────────────────────────

export const programs: ProgramCard[] = [
  {
    id: "onem",
    title: "ONEM",
    subtitle: "Olimpiada Nacional Escolar de Matemática",
    gradient: "from-blue-800 to-blue-600",
    textColor: "text-white",
  },
  {
    id: "canguro",
    title: "CANGURO",
    subtitle: "Concurso Internacional Canguro Matemático",
    gradient: "from-orange-600 to-amber-500",
    textColor: "text-white",
  },
  {
    id: "conamat",
    title: "CONAMAT",
    subtitle: "Concurso Nacional de Matemática",
    gradient: "from-red-700 to-red-500",
    textColor: "text-white",
  },
  {
    id: "geometry",
    title: "Geometry",
    subtitle: "Iranian Geometry Olympiad",
    gradient: "from-slate-800 to-slate-600",
    textColor: "text-white",
  },
]

export const nationalOlympiads: ProgramCard[] = [
  {
    id: "cmb",
    title: "CMB",
    subtitle: "Concurso Nacional de Matemática Binaria",
    gradient: "from-emerald-800 to-emerald-600",
    textColor: "text-white",
  },
  {
    id: "conemate",
    title: "CONEMATE",
    subtitle: "Concurso Nacional de Matemática",
    gradient: "from-teal-700 to-teal-500",
    textColor: "text-white",
  },
  {
    id: "comp-paralela",
    title: "Comp. Paralela",
    subtitle: "Competencia Paralela",
    gradient: "from-rose-800 to-rose-600",
    textColor: "text-white",
  },
]

export const courses: Course[] = [
  {
    id: "onem",
    title: "Curso ONEM",
    subtitle: "Olimpiada Nacional Escolar de Matemática",
    description:
      "Preparación estructurada por etapas y niveles para la Olimpiada Nacional Escolar de Matemática.",
    totalStages: 4,
    totalModules: 12,
    levelsPerStage: 3,
    stages: [
      {
        id: "institucional",
        title: "Etapa Institucional",
        description: "Primera selección en tu institución.",
        color: "from-blue-700 to-blue-500",
        icon: "School",
        levels: [
          {
            id: "nivel-1",
            number: 1,
            title: "Nivel 1",
            subtitle: "1° y 2° de secundaria",
            modules: [
              {
                id: "geometria",
                number: 1,
                title: "Geometría",
                description: "Figuras, ángulos, perímetros y áreas",
                badges: ["Teoría", "Problemas", "Mini simulacro"],
                estimatedHours: "3-4 h de estudio",
                icon: "Triangle",
              },
              {
                id: "teoria-numeros",
                number: 2,
                title: "Teoría de Números",
                description: "Divisibilidad, primos y operaciones",
                badges: ["Teoría", "Problemas", "Mini simulacro"],
                estimatedHours: "3-4 h de estudio",
                icon: "Hash",
              },
              {
                id: "combinatoria",
                number: 3,
                title: "Combinatoria",
                description: "Conteo, estrategias y casos",
                badges: ["Teoría", "Problemas", "Mini simulacro"],
                estimatedHours: "3-4 h de estudio",
                icon: "Share2",
              },
              {
                id: "razonamiento",
                number: 4,
                title: "Razonamiento Matemático",
                description: "Lógica, patrones y análisis",
                badges: ["Teoría", "Problemas", "Mini simulacro"],
                estimatedHours: "3-4 h de estudio",
                icon: "Brain",
              },
              {
                id: "algebra",
                number: 5,
                title: "Álgebra",
                description: "Expresiones, ecuaciones y relaciones",
                badges: ["Teoría", "Problemas", "Mini simulacro"],
                estimatedHours: "3-4 h de estudio",
                icon: "Superscript",
              },
            ],
          },
          {
            id: "nivel-2",
            number: 2,
            title: "Nivel 2",
            subtitle: "3° y 4° de secundaria",
            modules: [
              {
                id: "geometria-avanzada",
                number: 1,
                title: "Geometría Avanzada",
                description: "Círculos, polígonos y transformaciones",
                badges: ["Teoría", "Problemas", "Simulacros"],
                estimatedHours: "4-5 h de estudio",
                icon: "Circle",
              },
              {
                id: "algebra-avanzada",
                number: 2,
                title: "Álgebra Avanzada",
                description: "Sistemas, inecuaciones y funciones",
                badges: ["Teoría", "Problemas", "Simulacros"],
                estimatedHours: "4-5 h de estudio",
                icon: "FunctionSquare",
              },
              {
                id: "numeros-avanzado",
                number: 3,
                title: "Números Avanzado",
                description: "Congruencias y aritmética modular",
                badges: ["Teoría", "Problemas", "Mini simulacro"],
                estimatedHours: "3-4 h de estudio",
                icon: "Calculator",
              },
            ],
          },
          {
            id: "nivel-3",
            number: 3,
            title: "Nivel 3",
            subtitle: "5° de secundaria",
            modules: [
              {
                id: "olimpico",
                number: 1,
                title: "Nivel Olímpico",
                description: "Problemas de alto nivel y competencia",
                badges: ["Teoría", "Problemas", "Simulacros"],
                estimatedHours: "5-6 h de estudio",
                icon: "Trophy",
              },
            ],
          },
        ],
      },
      {
        id: "ugel",
        title: "Etapa UGEL",
        description: "Clasificatoria a nivel de UGEL.",
        color: "from-teal-700 to-teal-500",
        icon: "Users",
        levels: [
          {
            id: "nivel-1",
            number: 1,
            title: "Nivel 1",
            subtitle: "1° y 2° de secundaria",
            modules: [],
          },
          {
            id: "nivel-2",
            number: 2,
            title: "Nivel 2",
            subtitle: "3° y 4° de secundaria",
            modules: [],
          },
          {
            id: "nivel-3",
            number: 3,
            title: "Nivel 3",
            subtitle: "5° de secundaria",
            modules: [],
          },
        ],
      },
      {
        id: "dre",
        title: "Etapa DRE",
        description: "Clasificatoria a nivel de región.",
        color: "from-violet-700 to-violet-500",
        icon: "MapPin",
        levels: [
          {
            id: "nivel-1",
            number: 1,
            title: "Nivel 1",
            subtitle: "1° y 2° de secundaria",
            modules: [],
          },
          {
            id: "nivel-2",
            number: 2,
            title: "Nivel 2",
            subtitle: "3° y 4° de secundaria",
            modules: [],
          },
          {
            id: "nivel-3",
            number: 3,
            title: "Nivel 3",
            subtitle: "5° de secundaria",
            modules: [],
          },
        ],
      },
      {
        id: "nacional",
        title: "Etapa Nacional",
        description: "La gran final: los mejores del país.",
        color: "from-rose-700 to-rose-500",
        icon: "Trophy",
        levels: [
          {
            id: "nivel-1",
            number: 1,
            title: "Nivel 1",
            subtitle: "1° y 2° de secundaria",
            modules: [],
          },
          {
            id: "nivel-2",
            number: 2,
            title: "Nivel 2",
            subtitle: "3° y 4° de secundaria",
            modules: [],
          },
          {
            id: "nivel-3",
            number: 3,
            title: "Nivel 3",
            subtitle: "5° de secundaria",
            modules: [],
          },
        ],
      },
    ],
  },
]

export function getCourse(id: string): Course | undefined {
  const found = courses.find((c) => c.id === id)
  if (found) return found

  // Si no está en el array estático de courses, lo buscamos en el catálogo de programas
  const prog = catalog.programas.find((p) => p.id === id)
  if (!prog) return undefined

  // Determinamos un gradiente acorde a su color de acento
  let gradient = "from-blue-900 via-blue-800 to-blue-700"
  if (prog.id === "canguro_matematico") gradient = "from-orange-700 via-orange-600 to-amber-600"
  if (prog.id === "conamat") gradient = "from-red-800 via-red-700 to-red-600"
  if (prog.id === "concurso_matematica_binaria") gradient = "from-emerald-800 via-emerald-700 to-teal-700"
  if (prog.id === "conemate") gradient = "from-teal-800 via-teal-700 to-cyan-700"
  if (prog.id === "juegos_logicos") gradient = "from-amber-700 via-orange-600 to-amber-500"
  if (prog.id === "onem") gradient = "from-blue-800 via-blue-700 to-indigo-700"

  // Obtenemos el curso ONEM como base para clonar su estructura de etapas, niveles y módulos
  const baseCourse = courses.find((c) => c.id === "onem")!

  return {
    id: prog.id,
    title: prog.title,
    subtitle: (prog as any).type ? `Programa ${(prog as any).type}` : "Programa Oficial de Entrenamiento",
    description: `Estructura de entrenamiento especializada por etapas y niveles para ${prog.title}.`,
    totalStages: baseCourse.totalStages,
    totalModules: baseCourse.totalModules,
    levelsPerStage: baseCourse.levelsPerStage,
    gradient,
    stages: baseCourse.stages.map(stage => ({
      ...stage,
    }))
  }
}

export function getStage(courseId: string, stageId: string): Stage | undefined {
  return getCourse(courseId)?.stages.find((s) => s.id === stageId)
}

export function getLevel(
  courseId: string,
  stageId: string,
  levelId: string
): Level | undefined {
  return getStage(courseId, stageId)?.levels.find((l) => l.id === levelId)
}
