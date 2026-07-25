// src/types/database.types.ts
// Tipos fuertemente tipados derivados directamente del esquema PostgreSQL/Supabase (Single Source of Truth)

export type UserRole = 'ADMIN' | 'ESTUDIANTE';
export type SubscriptionStatus = 'FREE' | 'PREMIUM';

export interface Profile {
  id: string;
  full_name: string;
  email: string;
  phone?: string | null;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface Course {
  id: string;
  title: string;
  description?: string | null;
  category: string;
  is_active: boolean;
  created_at: string;
}

export interface Stage {
  id: string;
  course_id: string;
  title: string;
  order_index: number;
  created_at: string;
}

export interface Level {
  id: string;
  stage_id: string;
  title: string;
  order_index: number;
  created_at: string;
}

export interface Module {
  id: string;
  level_id: string;
  title: string;
  order_index: number;
  created_at: string;
}

export interface Lesson {
  id: string;
  module_id: string;
  title: string;
  duration: string;
  video_url: string;
  is_premium: boolean;
  order_index: number;
  created_at: string;
}

export interface Material {
  id: string;
  module_id: string;
  title: string;
  type: string;
  size: string;
  url: string;
  created_at: string;
}

export interface CourseSubscription {
  id: string;
  user_id: string;
  course_id: string;
  status: SubscriptionStatus;
  created_at: string;
  updated_at: string;
}

export interface VideoWatch {
  id: string;
  user_id: string;
  lesson_id: string;
  watched_at: string;
}

export interface QuizQuestion {
  id: string;
  course_id: string;
  question: string;
  options: string[];
  correct_answer: number;
  points: number;
  created_at: string;
}
