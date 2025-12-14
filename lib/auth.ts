// Système d'authentification simple avec localStorage
export interface User {
  id: string;
  username: string;
  email: string;
}

export const AUTH_STORAGE_KEY = 'ng_manager_user';

export function register(username: string, email: string, password: string): { success: boolean; error?: string } {
  // Vérifier si l'utilisateur existe déjà
  const users = getAllUsers();
  if (users.find(u => u.email === email)) {
    return { success: false, error: 'Cet email est déjà utilisé' };
  }

  // Créer le nouvel utilisateur
  const newUser: User = {
    id: Math.random().toString(36).substr(2, 9),
    username,
    email,
  };

  // Sauvegarder dans localStorage
  users.push(newUser);
  localStorage.setItem('ng_manager_users', JSON.stringify(users));

  // Sauvegarder le mot de passe (simplifié, normalement on hashe)
  const passwords = JSON.parse(localStorage.getItem('ng_manager_passwords') || '{}');
  passwords[email] = password;
  localStorage.setItem('ng_manager_passwords', JSON.stringify(passwords));

  return { success: true };
}

export function login(email: string, password: string): { success: boolean; user?: User; error?: string } {
  const users = getAllUsers();
  const passwords = JSON.parse(localStorage.getItem('ng_manager_passwords') || '{}');

  const user = users.find(u => u.email === email);

  if (!user) {
    return { success: false, error: 'Email ou mot de passe incorrect' };
  }

  if (passwords[email] !== password) {
    return { success: false, error: 'Email ou mot de passe incorrect' };
  }

  // Sauvegarder l'utilisateur connecté
  localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(user));

  return { success: true, user };
}

export function logout() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
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

function getAllUsers(): User[] {
  if (typeof window === 'undefined') return [];

  const usersStr = localStorage.getItem('ng_manager_users');
  if (!usersStr) return [];

  try {
    return JSON.parse(usersStr);
  } catch {
    return [];
  }
}
