// Utilitaires admin pour gérer les utilisateurs (côté client pour le moment)
import { User } from './auth';
import { Role, ROLES } from './roles';

export function promoteUser(email: string, newRole: Role): boolean {
  if (typeof window === 'undefined') return false;

  try {
    // Récupérer tous les utilisateurs
    const usersStr = localStorage.getItem('ng_manager_users');
    if (!usersStr) return false;

    const users: User[] = JSON.parse(usersStr);

    // Trouver l'utilisateur
    const userIndex = users.findIndex(u => u.email === email);
    if (userIndex === -1) return false;

    // Mettre à jour le rôle
    users[userIndex].role = newRole;

    // Sauvegarder
    localStorage.setItem('ng_manager_users', JSON.stringify(users));

    // Si c'est l'utilisateur connecté, mettre à jour aussi sa session
    const currentUserStr = localStorage.getItem('ng_manager_user');
    if (currentUserStr) {
      const currentUser: User = JSON.parse(currentUserStr);
      if (currentUser.email === email) {
        currentUser.role = newRole;
        localStorage.setItem('ng_manager_user', JSON.stringify(currentUser));
      }
    }

    return true;
  } catch (error) {
    console.error('Error promoting user:', error);
    return false;
  }
}

// Fonction pour promouvoir un utilisateur par son email depuis la console
export function makeFounder(email: string): void {
  const success = promoteUser(email, ROLES.FONDATEUR);
  if (success) {
    console.log(`✅ ${email} est maintenant Fondateur!`);
    console.log('Recharge la page pour voir les changements.');
  } else {
    console.error(`❌ Impossible de promouvoir ${email}`);
  }
}

export function makeStaff(email: string): void {
  const success = promoteUser(email, ROLES.STAFF);
  if (success) {
    console.log(`✅ ${email} est maintenant Staff!`);
    console.log('Recharge la page pour voir les changements.');
  } else {
    console.error(`❌ Impossible de promouvoir ${email}`);
  }
}

export function makeGovernor(email: string): void {
  const success = promoteUser(email, ROLES.GOUVERNEUR);
  if (success) {
    console.log(`✅ ${email} est maintenant Gouverneur!`);
    console.log('Recharge la page pour voir les changements.');
  } else {
    console.error(`❌ Impossible de promouvoir ${email}`);
  }
}

// Exposer les fonctions dans la console pour debug
if (typeof window !== 'undefined') {
  (window as any).ngAdmin = {
    makeFounder,
    makeStaff,
    makeGovernor,
    promoteUser,
  };
}
