-- Migración inicial de esquema para Aula Virtual (PostgreSQL / Supabase)
-- Single Source of Truth: Esquema de base de datos relacional y seguridad RLS

-- 1. ENUMS
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('ADMIN', 'ESTUDIANTE');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE subscription_status AS ENUM ('FREE', 'PREMIUM');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. TABLA DE PERFILES
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    role user_role NOT NULL DEFAULT 'ESTUDIANTE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. TABLA DE CURSOS
CREATE TABLE IF NOT EXISTS public.courses (
    id TEXT PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    is_active BOOLEAN NOT NULL DEFAULT TRUE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. TABLA DE ETAPAS
CREATE TABLE IF NOT EXISTS public.stages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. TABLA DE NIVELES
CREATE TABLE IF NOT EXISTS public.levels (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    stage_id UUID NOT NULL REFERENCES public.stages(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. TABLA DE MÓDULOS
CREATE TABLE IF NOT EXISTS public.modules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    level_id UUID NOT NULL REFERENCES public.levels(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    order_index INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. TABLA DE LECCIONES / VIDEOS
CREATE TABLE IF NOT EXISTS public.lessons (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    duration TEXT NOT NULL,
    video_url TEXT NOT NULL,
    is_premium BOOLEAN NOT NULL DEFAULT FALSE,
    order_index INT NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. TABLA DE MATERIALES ADICIONALES
CREATE TABLE IF NOT EXISTS public.materials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    module_id UUID NOT NULL REFERENCES public.modules(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    type TEXT NOT NULL,
    size TEXT NOT NULL,
    url TEXT NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 9. TABLA DE SUSCRIPCIONES A CURSOS
CREATE TABLE IF NOT EXISTS public.course_subscriptions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    status subscription_status NOT NULL DEFAULT 'FREE',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, course_id)
);

-- 10. TABLA DE SEGUIMIENTO FREEMIUM / VISUALIZACIONES
CREATE TABLE IF NOT EXISTS public.video_watches (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
    lesson_id UUID NOT NULL REFERENCES public.lessons(id) ON DELETE CASCADE,
    watched_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(user_id, lesson_id)
);

-- 11. TABLA DE PREGUNTAS Y SIMULACROS
CREATE TABLE IF NOT EXISTS public.quiz_questions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    course_id TEXT NOT NULL REFERENCES public.courses(id) ON DELETE CASCADE,
    question TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_answer INT NOT NULL,
    points INT NOT NULL DEFAULT 10,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 12. ROW LEVEL SECURITY (RLS)
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.levels ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lessons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.materials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.course_subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.video_watches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quiz_questions ENABLE ROW LEVEL SECURITY;

-- 13. POLÍTICAS RLS
CREATE POLICY "Cursos públicos" ON public.courses FOR SELECT USING (true);
CREATE POLICY "Etapas públicas" ON public.stages FOR SELECT USING (true);
CREATE POLICY "Niveles públicos" ON public.levels FOR SELECT USING (true);
CREATE POLICY "Módulos públicos" ON public.modules FOR SELECT USING (true);
CREATE POLICY "Lecciones públicas" ON public.lessons FOR SELECT USING (true);
CREATE POLICY "Materiales públicos" ON public.materials FOR SELECT USING (true);
CREATE POLICY "Preguntas públicas" ON public.quiz_questions FOR SELECT USING (true);

CREATE POLICY "Perfil personal accesible por usuario" ON public.profiles
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Actualizar perfil propio" ON public.profiles
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Suscripciones personales accesibles por usuario" ON public.course_subscriptions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Registrar visualización propia" ON public.video_watches
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Ver visualizaciones propias" ON public.video_watches
    FOR SELECT USING (auth.uid() = user_id);

-- 14. TRIGGER DE REGISTRO AUTOMÁTICO DE USUARIOS (DEFENSIVO)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
DECLARE
    user_rol_val user_role := 'ESTUDIANTE'::user_role;
    meta_rol text;
BEGIN
    IF NEW.raw_user_meta_data IS NOT NULL AND NEW.raw_user_meta_data->>'rol' IS NOT NULL THEN
        meta_rol := upper(NEW.raw_user_meta_data->>'rol');
        IF meta_rol = 'ADMIN' THEN
            user_rol_val := 'ADMIN'::user_role;
        END IF;
    END IF;

    INSERT INTO public.profiles (id, full_name, email, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email, 'Usuario Registrado'),
        NEW.email,
        user_rol_val
    )
    ON CONFLICT (id) DO UPDATE SET
        full_name = EXCLUDED.full_name,
        email = EXCLUDED.email,
        updated_at = NOW();
    RETURN NEW;
EXCEPTION WHEN OTHERS THEN
    INSERT INTO public.profiles (id, full_name, email, role)
    VALUES (
        NEW.id,
        COALESCE(NEW.email, 'Usuario Registrado'),
        NEW.email,
        'ESTUDIANTE'::user_role
    )
    ON CONFLICT (id) DO NOTHING;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

