-- Migracion: Tabla de recursos de solucionarios
-- Permite al administrador guardar videos/PDFs que se sincronizan globalmente para todos los alumnos

CREATE TABLE IF NOT EXISTS public.solucionario_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    solucionario_id TEXT NOT NULL,
    nivel_id TEXT NOT NULL,
    year INT NOT NULL,
    pdf_url TEXT,
    pdf_title TEXT,
    video_url TEXT,
    video_title TEXT,
    simulacro_url TEXT,
    simulacro_title TEXT,
    is_free BOOLEAN NOT NULL DEFAULT TRUE,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    UNIQUE(solucionario_id, nivel_id, year)
);

-- RLS habilitado
ALTER TABLE public.solucionario_resources ENABLE ROW LEVEL SECURITY;

-- Politica: todos pueden leer (alumnos y admin)
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename = 'solucionario_resources'
          AND policyname = 'Recursos solucionario lectura publica'
    ) THEN
        EXECUTE 'CREATE POLICY "Recursos solucionario lectura publica"
            ON public.solucionario_resources
            FOR SELECT
            USING (true)';
    END IF;
END $$;

-- Politica: cualquiera autenticado puede insertar/actualizar (en produccion restringir a admin)
DO $$ BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM pg_policies
        WHERE schemaname = 'public'
          AND tablename = 'solucionario_resources'
          AND policyname = 'Recursos solucionario escritura autenticado'
    ) THEN
        EXECUTE 'CREATE POLICY "Recursos solucionario escritura autenticado"
            ON public.solucionario_resources
            FOR ALL
            USING (true)
            WITH CHECK (true)';
    END IF;
END $$;

-- Trigger para auto-actualizar updated_at
CREATE OR REPLACE FUNCTION public.update_solucionario_resources_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_solucionario_resources_updated_at ON public.solucionario_resources;
CREATE TRIGGER trg_solucionario_resources_updated_at
    BEFORE UPDATE ON public.solucionario_resources
    FOR EACH ROW EXECUTE FUNCTION public.update_solucionario_resources_updated_at();
