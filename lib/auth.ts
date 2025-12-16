// Système d'authentification avec Supabase
import { supabase } from './supabase';
import { Role, ROLES } from './roles';

export interface User {
  id: string;
  username: string;
  email: string;
  role: Role;
  countryId?: string;
}

export const AUTH_STORAGE_KEY = 'ng_manager_user';

// Hash simple (à améliorer en production avec bcrypt côté serveur)
function simpleHash(password: string): string {
  return btoa(password + 'ng_manager_salt');
}

export async function register(username: string, email: string, password: string): Promise<{ success: boolean; error?: string }> {
  try {
    // Vérifier si l'utilisateur existe déjà
    const { data: existingUser } = await supabase
      .from('users')
      .select('email')
      .eq('email', email)
      .single();

    if (existingUser) {
      return { success: false, error: 'Cet email est déjà utilisé' };
    }

    // Créer le nouvel utilisateur avec le rôle RECRUE par défaut
    const { data, error } = await supabase
      .from('users')
      .insert([{
        username,
        email,
        password_hash: simpleHash(password),
        role_id: ROLES.RECRUE.id,
        role_name: ROLES.RECRUE.name,
        role_level: ROLES.RECRUE.level,
        role_color: ROLES.RECRUE.color,
        role_emoji: ROLES.RECRUE.emoji,
        role_description: ROLES.RECRUE.description,
      }])
      .select()
      .single();

    if (error) {
      console.error('Registration error:', error);
      return { success: false, error: 'Erreur lors de l\'inscription' };
    }

    return { success: true };
  } catch (error) {
    console.error('Registration error:', error);
    return { success: false, error: 'Erreur lors de l\'inscription' };
  }
}

export async function login(email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('email', email)
      .eq('password_hash', simpleHash(password))
      .single();

    if (error || !data) {
      return { success: false, error: 'Email ou mot de passe incorrect' };
    }

    // Convertir les données Supabase en User
    const user: User = {
      id: data.id,
      username: data.username,
      email: data.email,
      role: {
        id: data.role_id,
        name: data.role_name,
        level: data.role_level,
        color: data.role_color,
        emoji: data.role_emoji,
        description: data.role_description,
        permissions: ROLES[data.role_id.toUpperCase() as keyof typeof ROLES]?.permissions || [],
      },
      countryId: data.country_id || undefined,
    };

    // Sauvegarder l'utilisateur connecté dans localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));
    }

    return { success: true, user };
  } catch (error) {
    console.error('Login error:', error);
    return { success: false, error: 'Erreur lors de la connexion' };
  }
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  }
}

export function getCurrentUser(): User | null {
  if (typeof window === 'undefined') return null;

  const userStr = localStorage.getItem(AUTH_STORAGE_KEY);
  if (!userStr) return null;

  try {
    return JSON.parse(userStr);
  } catch {
    return null;
  }
}

export async function getAllUsers(): Promise<User[]> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching users:', error);
      return [];
    }

    return data.map(dbUser => ({
      id: dbUser.id,
      username: dbUser.username,
      email: dbUser.email,
      role: {
        id: dbUser.role_id,
        name: dbUser.role_name,
        level: dbUser.role_level,
        color: dbUser.role_color,
        emoji: dbUser.role_emoji,
        description: dbUser.role_description,
        permissions: ROLES[dbUser.role_id.toUpperCase() as keyof typeof ROLES]?.permissions || [],
      },
      countryId: dbUser.country_id || undefined,
    }));
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
}

export async function updateUserRole(userId: string, newRole: Role): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('users')
      .update({
        role_id: newRole.id,
        role_name: newRole.name,
        role_level: newRole.level,
        role_color: newRole.color,
        role_emoji: newRole.emoji,
        role_description: newRole.description,
      })
      .eq('id', userId);

    if (error) {
      console.error('Error updating role:', error);
      return { success: false, error: 'Erreur lors de la mise à jour du rôle' };
    }

    // Mettre à jour le localStorage si c'est l'utilisateur connecté
    if (typeof window !== 'undefined') {
      const currentUser = getCurrentUser();
      if (currentUser && currentUser.id === userId) {
        currentUser.role = newRole;
        localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(currentUser));
      }
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating role:', error);
    return { success: false, error: 'Erreur lors de la mise à jour du rôle' };
  }
}
