'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User, getAllUsers, updateUserRole } from '@/lib/auth';
import { ROLES, Role, RoleLevel } from '@/lib/roles';

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier que l'utilisateur est Fondateur ou Staff
    if (!user) {
      router.push('/login');
      return;
    }

    if (user.role.level < RoleLevel.STAFF) {
      router.push('/dashboard');
      return;
    }

    // Charger tous les utilisateurs
    loadUsers();
    setLoading(false);
  }, [user, router]);

  const loadUsers = async () => {
    const allUsers = await getAllUsers();
    setUsers(allUsers);
  };

  const promoteUser = async (targetUser: User, newRole: Role) => {
    // Seulement les Fondateurs peuvent promouvoir d'autres Fondateurs
    if (newRole.level === RoleLevel.FONDATEUR && user?.role.level !== RoleLevel.FONDATEUR) {
      alert('Seuls les Fondateurs peuvent promouvoir d\'autres Fondateurs');
      return;
    }

    const result = await updateUserRole(targetUser.id, newRole);

    if (result.success) {
      // Si c'est l'utilisateur connecté, recharger la page pour mettre à jour l'interface
      if (targetUser.id === user?.id) {
        alert(`✅ Tu es maintenant ${newRole.emoji} ${newRole.name}! La page va se recharger.`);
        window.location.reload();
      } else {
        loadUsers();
        alert(`✅ ${targetUser.username} est maintenant ${newRole.emoji} ${newRole.name}`);
      }
    } else {
      alert(`❌ Erreur: ${result.error}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  if (!user || user.role.level < RoleLevel.STAFF) {
    return null;
  }

  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push('/dashboard')}
            className="mb-4 text-white/60 hover:text-white transition-colors"
          >
            ← Retour au dashboard
          </button>
          <h1 className="text-4xl font-bold text-white mb-2">
            🛡️ Administration
          </h1>
          <p className="text-white/60">
            Gestion des utilisateurs et des rôles
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="glass-card p-4">
            <div className="text-white/60 text-sm">Total utilisateurs</div>
            <div className="text-3xl font-bold text-white">{users.length}</div>
          </div>
          <div className="glass-card p-4">
            <div className="text-white/60 text-sm">Fondateurs</div>
            <div className="text-3xl font-bold text-red-500">
              {users.filter(u => u.role.level === RoleLevel.FONDATEUR).length}
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="text-white/60 text-sm">Staff</div>
            <div className="text-3xl font-bold text-purple-500">
              {users.filter(u => u.role.level === RoleLevel.STAFF).length}
            </div>
          </div>
          <div className="glass-card p-4">
            <div className="text-white/60 text-sm">Recrues</div>
            <div className="text-3xl font-bold text-gray-500">
              {users.filter(u => u.role.level === RoleLevel.RECRUE).length}
            </div>
          </div>
        </div>

        {/* Liste des utilisateurs */}
        <div className="glass-card p-6">
          <h2 className="text-2xl font-bold text-white mb-6">
            👥 Liste des utilisateurs
          </h2>

          <div className="space-y-4">
            {users.map((targetUser) => (
              <div
                key={targetUser.id}
                className="glass-card p-4 flex items-center justify-between"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-white font-semibold">
                      {targetUser.username}
                    </span>
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border"
                      style={{
                        backgroundColor: `${targetUser.role.color}20`,
                        borderColor: `${targetUser.role.color}50`,
                        color: targetUser.role.color,
                      }}
                    >
                      {targetUser.role.emoji} {targetUser.role.name}
                    </span>
                  </div>
                  <div className="text-white/60 text-sm">{targetUser.email}</div>
                </div>

                {/* Actions de promotion */}
                {targetUser.id !== user.id && (
                  <div className="flex gap-2">
                    {/* Bouton Fondateur (seulement pour les Fondateurs) */}
                    {user.role.level === RoleLevel.FONDATEUR &&
                      targetUser.role.level !== RoleLevel.FONDATEUR && (
                        <button
                          onClick={() => promoteUser(targetUser, ROLES.FONDATEUR)}
                          className="px-3 py-1 rounded-lg bg-red-500/20 border border-red-500/50 text-red-500 hover:bg-red-500/30 transition-all text-sm"
                        >
                          🔴 Fondateur
                        </button>
                      )}

                    {/* Bouton Staff */}
                    {targetUser.role.level !== RoleLevel.STAFF && (
                      <button
                        onClick={() => promoteUser(targetUser, ROLES.STAFF)}
                        className="px-3 py-1 rounded-lg bg-purple-500/20 border border-purple-500/50 text-purple-500 hover:bg-purple-500/30 transition-all text-sm"
                      >
                        🟣 Staff
                      </button>
                    )}

                    {/* Bouton Gouverneur */}
                    {targetUser.role.level !== RoleLevel.GOUVERNEUR && (
                      <button
                        onClick={() => promoteUser(targetUser, ROLES.GOUVERNEUR)}
                        className="px-3 py-1 rounded-lg bg-blue-500/20 border border-blue-500/50 text-blue-500 hover:bg-blue-500/30 transition-all text-sm"
                      >
                        🔵 Gouverneur
                      </button>
                    )}

                    {/* Bouton Recrue (rétrograder) */}
                    {targetUser.role.level !== RoleLevel.RECRUE && (
                      <button
                        onClick={() => promoteUser(targetUser, ROLES.RECRUE)}
                        className="px-3 py-1 rounded-lg bg-gray-500/20 border border-gray-500/50 text-gray-400 hover:bg-gray-500/30 transition-all text-sm"
                      >
                        ⚪ Recrue
                      </button>
                    )}
                  </div>
                )}

                {targetUser.id === user.id && (
                  <div className="text-white/40 text-sm italic">
                    C'est toi 😎
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
