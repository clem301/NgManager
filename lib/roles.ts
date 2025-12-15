// Système de grades/rôles inspiré de NationGlory

export enum RoleLevel {
  RECRUE = 10,
  MEMBRE = 20,
  OFFICIER = 40,
  GOUVERNEUR = 60,
  STAFF = 80,
  FONDATEUR = 100,
}

export interface Role {
  id: string;
  name: string;
  level: RoleLevel;
  color: string;
  emoji: string;
  description: string;
  permissions: Permission[];
}

export enum Permission {
  // Permissions globales (Staff/Fondateur)
  MANAGE_USERS = 'manage_users',
  MANAGE_ALL_COUNTRIES = 'manage_all_countries',
  VIEW_LOGS = 'view_logs',
  MANAGE_STAFF = 'manage_staff',

  // Permissions pays (Gouverneur)
  MANAGE_COUNTRY = 'manage_country',
  MANAGE_MEMBERS = 'manage_members',
  MANAGE_ROLES = 'manage_roles',
  DELETE_COUNTRY = 'delete_country',

  // Permissions officier
  VALIDATE_CREATIONS = 'validate_creations',
  MANAGE_REQUESTS = 'manage_requests',
  KICK_MEMBERS = 'kick_members',
  SEND_ANNOUNCEMENTS = 'send_announcements',

  // Permissions membre
  CREATE_CONTENT = 'create_content',
  MAKE_REQUESTS = 'make_requests',
  USE_CHAT = 'use_chat',
  VIEW_HISTORY = 'view_history',

  // Permissions recrue
  VIEW_CONTENT = 'view_content',
  SEND_JOIN_REQUEST = 'send_join_request',
}

export const ROLES: Record<string, Role> = {
  FONDATEUR: {
    id: 'fondateur',
    name: 'Fondateur',
    level: RoleLevel.FONDATEUR,
    color: '#ff0000',
    emoji: '🔴',
    description: 'Créateur de NG Manager - Accès total',
    permissions: Object.values(Permission), // Toutes les permissions
  },

  STAFF: {
    id: 'staff',
    name: 'Staff',
    level: RoleLevel.STAFF,
    color: '#ff6b00',
    emoji: '🟠',
    description: 'Équipe de gestion - Accès limité à l\'administration',
    permissions: [
      Permission.VIEW_LOGS,
      Permission.MANAGE_ALL_COUNTRIES,
      Permission.MANAGE_USERS,
      Permission.VALIDATE_CREATIONS,
      Permission.MANAGE_REQUESTS,
    ],
  },

  GOUVERNEUR: {
    id: 'gouverneur',
    name: 'Gouverneur',
    level: RoleLevel.GOUVERNEUR,
    color: '#ffd700',
    emoji: '👑',
    description: 'Dirigeant du pays - Tous les pouvoirs dans son pays',
    permissions: [
      Permission.MANAGE_COUNTRY,
      Permission.MANAGE_MEMBERS,
      Permission.MANAGE_ROLES,
      Permission.DELETE_COUNTRY,
      Permission.VALIDATE_CREATIONS,
      Permission.MANAGE_REQUESTS,
      Permission.KICK_MEMBERS,
      Permission.SEND_ANNOUNCEMENTS,
      Permission.CREATE_CONTENT,
      Permission.MAKE_REQUESTS,
      Permission.USE_CHAT,
      Permission.VIEW_HISTORY,
      Permission.VIEW_CONTENT,
    ],
  },

  OFFICIER: {
    id: 'officier',
    name: 'Officier',
    level: RoleLevel.OFFICIER,
    color: '#00ff88',
    emoji: '⭐',
    description: 'Bras droit du gouverneur - Gestion quotidienne',
    permissions: [
      Permission.VALIDATE_CREATIONS,
      Permission.MANAGE_REQUESTS,
      Permission.KICK_MEMBERS,
      Permission.SEND_ANNOUNCEMENTS,
      Permission.CREATE_CONTENT,
      Permission.MAKE_REQUESTS,
      Permission.USE_CHAT,
      Permission.VIEW_HISTORY,
      Permission.VIEW_CONTENT,
    ],
  },

  MEMBRE: {
    id: 'membre',
    name: 'Membre',
    level: RoleLevel.MEMBRE,
    color: '#00aaff',
    emoji: '🎖️',
    description: 'Membre confirmé - Accès standard',
    permissions: [
      Permission.CREATE_CONTENT,
      Permission.MAKE_REQUESTS,
      Permission.USE_CHAT,
      Permission.VIEW_HISTORY,
      Permission.VIEW_CONTENT,
    ],
  },

  RECRUE: {
    id: 'recrue',
    name: 'Recrue',
    level: RoleLevel.RECRUE,
    color: '#888888',
    emoji: '🔰',
    description: 'Nouveau membre - Accès limité',
    permissions: [
      Permission.VIEW_CONTENT,
      Permission.USE_CHAT,
      Permission.SEND_JOIN_REQUEST,
    ],
  },
};

export function hasPermission(userRole: Role, permission: Permission): boolean {
  return userRole.permissions.includes(permission);
}

export function canManageRole(userRole: Role, targetRole: Role): boolean {
  // On peut gérer un rôle seulement si notre niveau est supérieur
  return userRole.level > targetRole.level;
}

export function getRoleByLevel(level: RoleLevel): Role | undefined {
  return Object.values(ROLES).find(role => role.level === level);
}

export function getRoleById(id: string): Role | undefined {
  return ROLES[id.toUpperCase()];
}
