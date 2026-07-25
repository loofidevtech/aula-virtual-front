-- Script de Datos Iniciales (Seed Data) para Aula Virtual
-- Cursos, Etapas, Niveles, Módulos, Lecciones y Materiales iniciales

-- 1. INSERTAR CURSOS
INSERT INTO public.courses (id, title, description, category, is_active)
VALUES 
    ('aritm', 'Curso de Aritmética', 'Fundamentos de aritmética, números reales, razones y proporciones.', 'Matemáticas', true),
    ('algeb', 'Curso de Álgebra', 'Lógica matemática, ecuaciones, polinomios y funciones.', 'Matemáticas', true),
    ('geom', 'Curso de Geometría', 'Ángulos, triángulos, relaciones métricas y geometría del espacio.', 'Matemáticas', true),
    ('onem', 'Preparación ONEM', 'Entrenamiento intensivo para la Olimpiada Nacional Escolar de Matemática.', 'Olimpiadas', true)
ON CONFLICT (id) DO UPDATE SET
    title = EXCLUDED.title,
    description = EXCLUDED.description,
    category = EXCLUDED.category;

-- 2. ETAPAS Y NIVELES DEMO (ONEM)
INSERT INTO public.stages (id, course_id, title, order_index)
VALUES 
    ('e1111111-1111-1111-1111-111111111111', 'onem', 'Fase Escolar', 1),
    ('e2222222-2222-2222-2222-222222222222', 'onem', 'Fase UGel / Regional', 2)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.levels (id, stage_id, title, order_index)
VALUES 
    ('l1111111-1111-1111-1111-111111111111', 'e1111111-1111-1111-1111-111111111111', 'Nivel 1 (1° y 2° Sec)', 1),
    ('l2222222-2222-2222-2222-222222222222', 'e1111111-1111-1111-1111-111111111111', 'Nivel 2 (3° y 4° Sec)', 2)
ON CONFLICT (id) DO NOTHING;

INSERT INTO public.modules (id, level_id, title, order_index)
VALUES 
    ('m1111111-1111-1111-1111-111111111111', 'l1111111-1111-1111-1111-111111111111', 'geometria', 1),
    ('m2222222-2222-2222-2222-222222222222', 'l1111111-1111-1111-1111-111111111111', 'algebra', 2)
ON CONFLICT (id) DO NOTHING;

-- 3. LECCIONES / VIDEOS DE PRUEBA
INSERT INTO public.lessons (id, module_id, title, duration, video_url, is_premium, order_index)
VALUES 
    ('v1111111-1111-1111-1111-111111111111', 'm1111111-1111-1111-1111-111111111111', 'Ángulos y Triángulos Básicos', '15:30', 'https://www.youtube.com/embed/dQw4w9WgXcQ', false, 1),
    ('v2222222-2222-2222-2222-222222222222', 'm1111111-1111-1111-1111-111111111111', 'Teorema de Pitágoras y Aplicaciones', '18:45', 'https://www.youtube.com/embed/dQw4w9WgXcQ', false, 2),
    ('v3333333-3333-3333-3333-333333333333', 'm1111111-1111-1111-1111-111111111111', 'Semejanza y Congruencia', '22:10', 'https://www.youtube.com/embed/dQw4w9WgXcQ', false, 3),
    ('v4444444-4444-4444-4444-444444444444', 'm1111111-1111-1111-1111-111111111111', 'Geometría del Espacio Avanzada (Premium)', '25:00', 'https://www.youtube.com/embed/dQw4w9WgXcQ', true, 4)
ON CONFLICT (id) DO NOTHING;

-- 4. MATERIALES DE ESTUDIO
INSERT INTO public.materials (id, module_id, title, type, size, url)
VALUES 
    ('mat_1', 'm1111111-1111-1111-1111-111111111111', 'Guía de estudio - Unidad 1', 'PDF', '2.4 MB', '/materials/guia1.pdf'),
    ('mat_2', 'm1111111-1111-1111-1111-111111111111', 'Ejercicios resueltos - Geometría', 'PDF', '1.8 MB', '/materials/ejercicios1.pdf'),
    ('mat_3', 'm1111111-1111-1111-1111-111111111111', 'Fórmulas y teoremas clave', 'PDF', '850 KB', '/materials/formulas1.pdf')
ON CONFLICT (id) DO NOTHING;
