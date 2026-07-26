// src/lib/solucionario-service.ts
// Single Source of Truth: Recursos de solucionarios guardados en Supabase.
// El administrador guarda desde el panel → todos los alumnos ven los cambios inmediatamente.

import { supabase } from "@/lib/supabase";

export interface SolucionarioResource {
  id?: string;
  solucionario_id: string;
  nivel_id: string;
  year: number;
  pdf_url?: string;
  pdf_title?: string;
  video_url?: string;
  video_title?: string;
  simulacro_url?: string;
  simulacro_title?: string;
  is_free?: boolean;
  updated_at?: string;
}

export const solucionarioService = {
  /**
   * Obtener el recurso (PDF, video, simulacro) de un solucionario, nivel y año específico.
   * Lee directamente de Supabase para garantizar datos actualizados en todos los dispositivos.
   */
  async getResource(
    solucionarioId: string,
    nivelId: string,
    year: number
  ): Promise<SolucionarioResource | null> {
    try {
      const { data, error } = await supabase
        .from("solucionario_resources")
        .select("*")
        .eq("solucionario_id", solucionarioId)
        .eq("nivel_id", nivelId)
        .eq("year", year)
        .maybeSingle();

      if (error) {
        console.error("[solucionario-service] Error al obtener recurso:", error.message);
        return null;
      }

      return data ?? null;
    } catch (err) {
      console.error("[solucionario-service] Error inesperado al obtener recurso:", err);
      return null;
    }
  },

  /**
   * Guardar o actualizar un recurso de solucionario (UPSERT).
   * Solo el administrador debería invocar esta función.
   */
  async saveResource(resource: SolucionarioResource): Promise<{ success: boolean; error?: string }> {
    try {
      const payload = {
        solucionario_id: resource.solucionario_id,
        nivel_id: resource.nivel_id,
        year: resource.year,
        pdf_url: resource.pdf_url ?? null,
        pdf_title: resource.pdf_title ?? null,
        video_url: resource.video_url ?? null,
        video_title: resource.video_title ?? null,
        simulacro_url: resource.simulacro_url ?? null,
        simulacro_title: resource.simulacro_title ?? null,
        is_free: resource.is_free ?? true,
      };

      const { error } = await supabase
        .from("solucionario_resources")
        .upsert(payload, {
          onConflict: "solucionario_id,nivel_id,year",
        });

      if (error) {
        console.error("[solucionario-service] Error al guardar recurso:", error.message);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      console.error("[solucionario-service] Error inesperado al guardar recurso:", message);
      return { success: false, error: message };
    }
  },

  /**
   * Eliminar un recurso de solucionario.
   * Solo el administrador debería invocar esta función.
   */
  async deleteResource(
    solucionarioId: string,
    nivelId: string,
    year: number
  ): Promise<{ success: boolean; error?: string }> {
    try {
      const { error } = await supabase
        .from("solucionario_resources")
        .delete()
        .eq("solucionario_id", solucionarioId)
        .eq("nivel_id", nivelId)
        .eq("year", year);

      if (error) {
        console.error("[solucionario-service] Error al eliminar recurso:", error.message);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      const message = err instanceof Error ? err.message : "Error desconocido";
      console.error("[solucionario-service] Error inesperado al eliminar recurso:", message);
      return { success: false, error: message };
    }
  },
};
