// src/lib/supabase.ts
"use client"

const isBrowser = typeof window !== 'undefined'

function getMockUsers() {
  if (!isBrowser) return [];
  const stored = localStorage.getItem('mock_users');
  if (!stored) {
    const initial = [
      { 
        id: 'student_default', 
        email: 'estudiante@albert.com', 
        password: 'estudiante123', 
        user_metadata: { full_name: 'Andrés Castro', rol: 'ESTUDIANTE' } 
      },
      { 
        id: 'admin_default', 
        email: 'admin@albert.com', 
        password: 'admin123', 
        user_metadata: { full_name: 'Administrador Principal', rol: 'ADMIN' } 
      }
    ];
    localStorage.setItem('mock_users', JSON.stringify(initial));
    return initial;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
}

function saveMockUser(user: any) {
  if (!isBrowser) return;
  const users = getMockUsers();
  users.push(user);
  localStorage.setItem('mock_users', JSON.stringify(users));
}

function getMockProfiles() {
  if (!isBrowser) return [];
  const stored = localStorage.getItem('mock_profiles');
  if (!stored) {
    const initial = [
      { 
        id: 'student_default', 
        full_name: 'Andrés Castro', 
        email: 'estudiante@albert.com', 
        rol: 'ESTUDIANTE' 
      },
      { 
        id: 'admin_default', 
        full_name: 'Administrador Principal', 
        email: 'admin@albert.com', 
        rol: 'ADMIN' 
      }
    ];
    localStorage.setItem('mock_profiles', JSON.stringify(initial));
    return initial;
  }
  try {
    return JSON.parse(stored);
  } catch (e) {
    return [];
  }
}

function saveMockProfile(profile: any) {
  if (!isBrowser) return;
  const profiles = getMockProfiles();
  profiles.push(profile);
  localStorage.setItem('mock_profiles', JSON.stringify(profiles));
}

export const supabase: any = {
  auth: {
    async signInWithPassword({ email, password }: any) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const users = getMockUsers();
      const user = users.find((u: any) => u.email === email && u.password === password);
      
      if (user) {
        return {
          data: {
            user: {
              id: user.id,
              email: user.email,
              user_metadata: user.user_metadata
            }
          },
          error: null
        };
      }
      
      return {
        data: { user: null },
        error: { message: "Credenciales de inicio de sesión inválidas" }
      };
    },
    
    async signUp({ email, password, options }: any) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const users = getMockUsers();
      if (users.some((u: any) => u.email === email)) {
        return {
          data: { user: null },
          error: { message: "El correo electrónico ya está registrado" }
        };
      }
      
      const newUser = {
        id: `u_${Date.now()}`,
        email,
        password,
        user_metadata: options?.data || {}
      };
      
      saveMockUser(newUser);
      
      return {
        data: {
          user: {
            id: newUser.id,
            email: newUser.email,
            user_metadata: newUser.user_metadata
          }
        },
        error: null
      };
    },
    
    async signOut() {
      return { error: null };
    }
  },
  
  from(table: string) {
    return {
      async insert(data: any) {
        await new Promise(resolve => setTimeout(resolve, 300));
        if (table === 'perfiles') {
          saveMockProfile(data);
        }
        return { error: null };
      },
      
      select(columns: string) {
        return {
          eq(field: string, value: any) {
            return {
              async single() {
                await new Promise(resolve => setTimeout(resolve, 300));
                if (table === 'perfiles') {
                  const profiles = getMockProfiles();
                  const profile = profiles.find((p: any) => p[field] === value);
                  if (profile) {
                    return { data: profile, error: null };
                  }
                }
                return { data: null, error: { message: "Registro no encontrado" } };
              }
            };
          }
        };
      }
    };
  }
};
