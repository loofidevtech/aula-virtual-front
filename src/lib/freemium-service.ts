// src/lib/freemium-service.ts

export interface UserProfile {
  name: string;
  email?: string;
  role?: "student" | "admin";
}

export interface VideoAccessCheckResult {
  hasAccess: boolean;
  reason?: "limit_reached" | "not_subscribed" | "other";
  watchedCount: number;
  limit: number;
}

export type EnrollmentStatus = "none" | "free" | "premium";

export interface Material {
  id: string;
  title: string;
  type: string;
  size: string;
  url: string;
}

export const freemiumService = {
  /**
   * Get the current logged-in user profile from localStorage.
   * Falls back to a guest user if not authenticated.
   */
  getCurrentUser(): UserProfile {
    if (typeof window === "undefined") {
      return { name: "Usuario Invitado" };
    }
    try {
      const userStr = localStorage.getItem("currentUser");
      if (userStr) {
        const parsed = JSON.parse(userStr);
        return {
          name: parsed.name || "Usuario",
          email: parsed.email || undefined,
          role: parsed.role || "student",
        };
      }
    } catch (e) {
      console.error("Error reading user from localStorage:", e);
    }
    // Return mock active user
    return { name: "Adrian M.", email: "adrian@ejemplo.com", role: "student" };
  },

  /**
   * Get watched video IDs list for a specific course
   */
  getWatchedVideos(courseId: string): string[] {
    if (typeof window === "undefined") return [];
    try {
      const listStr = localStorage.getItem(`watched_videos_${courseId}`);
      if (listStr) {
        return JSON.parse(listStr);
      }
    } catch (e) {
      console.error("Error reading watched videos:", e);
    }
    return [];
  },

  /**
   * Persist a video watch event for a specific course
   */
  trackVideoWatch(courseId: string, videoId: string): string[] {
    if (typeof window === "undefined") return [];
    try {
      const current = this.getWatchedVideos(courseId);
      if (!current.includes(videoId)) {
        const updated = [...current, videoId];
        localStorage.setItem(`watched_videos_${courseId}`, JSON.stringify(updated));
        return updated;
      }
      return current;
    } catch (e) {
      console.error("Error writing watched video:", e);
    }
    return [];
  },

  /**
   * Get the student's enrollment status for a specific course.
   */
  getEnrollmentStatus(courseId: string): EnrollmentStatus {
    if (typeof window === "undefined") return "none";
    try {
      const enrollmentsStr = localStorage.getItem("student_enrollments");
      if (enrollmentsStr) {
        const enrollments = JSON.parse(enrollmentsStr) as Record<string, { subscribed: boolean }>;
        if (enrollments[courseId]) {
          return enrollments[courseId].subscribed ? "premium" : "free";
        }
      } else {
        // Fallback default setup
        const initialMock: Record<string, { subscribed: boolean }> = {
          aritm: { subscribed: false },
          algeb: { subscribed: false },
        };
        localStorage.setItem("student_enrollments", JSON.stringify(initialMock));
        if (initialMock[courseId]) {
          return initialMock[courseId].subscribed ? "premium" : "free";
        }
      }
    } catch (e) {
      console.error("Error reading enrollment status:", e);
    }
    return "none";
  },

  /**
   * Enroll the user in a course under the Free tier.
   */
  enrollInCourse(courseId: string): void {
    if (typeof window === "undefined") return;
    try {
      const enrollmentsStr = localStorage.getItem("student_enrollments") || "{}";
      const enrollments = JSON.parse(enrollmentsStr);
      enrollments[courseId] = { subscribed: false }; // Enrolled in free tier by default
      localStorage.setItem("student_enrollments", JSON.stringify(enrollments));
    } catch (e) {
      console.error("Error saving course enrollment:", e);
    }
  },

  /**
   * Directly sets/modifies the premium subscription status of a course.
   */
  setPremiumAccess(courseId: string, isPremium: boolean): void {
    if (typeof window === "undefined") return;
    try {
      const enrollmentsStr = localStorage.getItem("student_enrollments") || "{}";
      const enrollments = JSON.parse(enrollmentsStr);
      if (enrollments[courseId]) {
        enrollments[courseId].subscribed = isPremium;
      } else if (isPremium) {
        enrollments[courseId] = { subscribed: true };
      }
      localStorage.setItem("student_enrollments", JSON.stringify(enrollments));
    } catch (e) {
      console.error("Error setting premium access:", e);
    }
  },

  /**
   * Checks if it's the first time the student enters a course classroom.
   */
  checkAndClearFirstAccess(courseId: string): boolean {
    if (typeof window === "undefined") return false;
    const key = `first_access_${courseId}`;
    const alreadyVisited = localStorage.getItem(key);
    if (!alreadyVisited) {
      localStorage.setItem(key, "true");
      return true; // Yes, first time
    }
    return false; // No, already visited
  },

  /**
   * Checks if a course was newly upgraded to Premium, for triggering the lock animation.
   */
  checkAndClearFirstPremiumUnlock(courseId: string): boolean {
    if (typeof window === "undefined") return false;
    const isPremium = this.getEnrollmentStatus(courseId) === "premium";
    if (!isPremium) return false;

    const key = `first_premium_animated_${courseId}`;
    const alreadyAnimated = localStorage.getItem(key);
    if (!alreadyAnimated) {
      localStorage.setItem(key, "true");
      return true; // Needs animation
    }
    return false; // Already animated before
  },

  /**
   * Check access permissions for a specific video in a course
   */
  checkVideoAccess(
    courseId: string,
    videoId: string,
    userRole: "student" | "admin" = "student"
  ): VideoAccessCheckResult {
    const limit = 3;
    if (userRole === "admin") {
      return { hasAccess: true, watchedCount: 0, limit };
    }

    const enrollment = this.getEnrollmentStatus(courseId);
    if (enrollment === "premium") {
      return { hasAccess: true, watchedCount: 0, limit };
    }
    if (enrollment === "none") {
      return { hasAccess: false, reason: "not_subscribed", watchedCount: 0, limit };
    }

    const watched = this.getWatchedVideos(courseId);
    if (watched.includes(videoId)) {
      return { hasAccess: true, watchedCount: watched.length, limit };
    }

    if (watched.length >= limit) {
      return {
        hasAccess: false,
        reason: "limit_reached",
        watchedCount: watched.length,
        limit,
      };
    }

    return { hasAccess: true, watchedCount: watched.length, limit };
  },

  /**
   * Compiles the sales contact WhatsApp URL using current session and navigation metadata
   */
  generateWhatsAppUrl(
    userName: string,
    userEmail: string | undefined,
    courseName: string,
    moduleName: string,
    videoTitle: string
  ): string {
    const targetNumber = "34680803900"; // +34 680 80 39 00
    const cleanCourseName = courseName.replace(/^Curso\s+/i, ""); 
    
    const message = 
`Hola, me interesa adquirir el acceso completo a la plataforma.

*Detalles del Curso:*
• *Curso:* Curso de ${cleanCourseName}
• *Módulo:* ${moduleName}
• *Última clase vista:* ${videoTitle}

*Información del Alumno:*
• *Nombre:* ${userName}
• *Email:* ${userEmail || "No registrado"}

Actualmente estoy visualizando el contenido gratuito y deseo desbloquear todos los módulos para continuar con mi aprendizaje. ¡Muchas gracias!`;
    
    return `https://wa.me/${targetNumber}?text=${encodeURIComponent(message)}`;
  },

  /**
   * Get dynamic study materials for a specific course module.
   */
  getModuleMaterials(courseId: string, moduleId: string): Material[] {
    if (typeof window === "undefined") return [];
    try {
      const key = `materials_${courseId}_${moduleId}`;
      const stored = localStorage.getItem(key);
      if (stored) {
        return JSON.parse(stored);
      }

      // Fallback initial mock files for Geometry (geometria)
      if (courseId === "onem" && moduleId === "geometria") {
        const initial = [
          { id: "mat_1", title: "Guía de estudio - Unidad 1", type: "PDF", size: "2.4 MB", url: "/materials/guia1.pdf" },
          { id: "mat_2", title: "Ejercicios resueltos - Geometría", type: "PDF", size: "1.8 MB", url: "/materials/ejercicios1.pdf" },
          { id: "mat_3", title: "Fórmulas y teoremas clave", type: "PDF", size: "850 KB", url: "/materials/formulas1.pdf" },
          { id: "mat_4", title: "Problemas de práctica avanzada", type: "PDF", size: "3.2 MB", url: "/materials/practica1.pdf" },
        ];
        localStorage.setItem(key, JSON.stringify(initial));
        return initial;
      }
    } catch (e) {
      console.error("Error reading module materials:", e);
    }
    return [];
  },

  /**
   * Adds a new material resource to a course module.
   */
  addModuleMaterial(courseId: string, moduleId: string, material: Omit<Material, "id">): Material {
    const key = `materials_${courseId}_${moduleId}`;
    const list = this.getModuleMaterials(courseId, moduleId);
    const newMaterial: Material = {
      ...material,
      id: `mat_${Date.now()}`
    };
    const updated = [...list, newMaterial];
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(updated));
    }
    return newMaterial;
  },

  /**
   * Deletes a material resource from a course module.
   */
  deleteModuleMaterial(courseId: string, moduleId: string, materialId: string): boolean {
    const key = `materials_${courseId}_${moduleId}`;
    const list = this.getModuleMaterials(courseId, moduleId);
    const filtered = list.filter(m => m.id !== materialId);
    if (typeof window !== "undefined") {
      localStorage.setItem(key, JSON.stringify(filtered));
      return true;
    }
    return false;
  }
};
