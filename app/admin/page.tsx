'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { User, getAllUsers, updateUserRole } from '@/lib/auth';
import { ROLES, Role, RoleLevel } from '@/lib/roles';
import Header from '@/components/layout/Header';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';

export default function AdminPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    if (user.role.level < RoleLevel.STAFF) {
      router.push('/dashboard');
      return;
    }

    loadUsers();
    setLoading(false);
  }, [user, router]);

  const loadUsers = async () => {
    const allUsers = await getAllUsers();
    setUsers(allUsers);
  };

  const promoteUser = async (targetUser: User, newRole: Role) => {
    if (newRole.level === RoleLevel.FONDATEUR && user?.role.level !== RoleLevel.FONDATEUR) {
      alert('Seuls les Fondateurs peuvent promouvoir d\'autres Fondateurs');
      return;
    }

    const result = await updateUserRole(targetUser.id, newRole);

    if (result.success) {
      if (targetUser.id === user?.id) {
        alert(`Tu es maintenant ${newRole.name}! La page va se recharger.`);
        window.location.reload();
      } else {
        loadUsers();
        alert(`${targetUser.username} est maintenant ${newRole.name}`);
      }
    } else {
      alert(`Erreur: ${result.error}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
            <span className="text-white text-xl font-bold">NG</span>
          </div>
          <p className="text-white/50">Chargement...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role.level < RoleLevel.STAFF) {
    return null;
  }

  return (
    <div className="min-h-screen relative z-10">
      <Header />
      
      <div className="pt-[73px]">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.push('/dashboard')}
              className="mb-3 text-white/40 hover:text-white transition-colors text-sm flex items-center gap-1"
            >
              <span>←</span>
              <span>Retour au dashboard</span>
            </button>
            <h1 className="text-3xl font-bold text-white mb-1">
              Administration
            </h1>
            <p className="text-white/50">
              Gestion des utilisateurs et des rôles
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <GlassCard padding="md">
              <div className="text-white/40 text-xs uppercase tracking-wide mb-1">Total</div>
              <div className="text-2xl font-bold text-white">{users.length}</div>
            </GlassCard>
            <GlassCard padding="md">
              <div className="text-white/40 text-xs uppercase tracking-wide mb-1">Fondateurs</div>
              <div className="text-2xl font-bold text-red-400">
                {users.filter(u => u.role.level === RoleLevel.FONDATEUR).length}
              </div>
            </GlassCard>
            <GlassCard padding="md">
              <div className="text-white/40 text-xs uppercase tracking-wide mb-1">Staff</div>
              <div className="text-2xl font-bold text-purple-400">
                {users.filter(u => u.role.level === RoleLevel.STAFF).length}
              </div>
            </GlassCard>
            <GlassCard padding="md">
              <div className="text-white/40 text-xs uppercase tracking-wide mb-1">Recrues</div>
              <div className="text-2xl font-bold text-white/50">
                {users.filter(u => u.role.level === RoleLevel.RECRUE).length}
              </div>
            </GlassCard>
          </div>

          {/* Liste des utilisateurs */}
          <GlassCard padding="lg">
            <h2 className="text-lg font-semibold text-white mb-6">
              Utilisateurs
            </h2>

            <div className="space-y-3">
              {users.map((targetUser) => (
                <div
                  key={targetUser.id}
                  className="bg-white/5 rounded-xl p-4 hover:bg-white/[0.07] transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                        <span className="text-sm font-semibold text-white/70">
                          {targetUser.username.substring(0, 2).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-white">
                            {targetUser.username}
                          </span>
                          <Badge 
                            variant={
                              targetUser.role.level === RoleLevel.FONDATEUR ? 'owner' :
                              targetUser.role.level === RoleLevel.STAFF ? 'staff' :
                              targetUser.role.level === RoleLevel.GOUVERNEUR ? 'admin' :
                              'default'
                            }
                            size="sm"
                          >
                            {targetUser.role.name}
                          </Badge>
                        </div>
                        <div className="text-white/40 text-xs">{targetUser.email}</div>
                      </div>
                    </div>

                    {/* Actions */}
                    {targetUser.id !== user.id ? (
                      <div className="flex gap-2">
                        {user.role.level === RoleLevel.FONDATEUR &&
                          targetUser.role.level !== RoleLevel.FONDATEUR && (
                            <button
                              onClick={() => promoteUser(targetUser, ROLES.FONDATEUR)}
                              className="px-3 py-1.5 rounded-lg bg-red-500/20 text-red-400 hover:bg-red-500/30 transition-all text-xs font-medium"
                            >
                              Fondateur
                            </button>
                          )}

                        {targetUser.role.level !== RoleLevel.STAFF && (
                          <button
                            onClick={() => promoteUser(targetUser, ROLES.STAFF)}
                            className="px-3 py-1.5 rounded-lg bg-purple-500/20 text-purple-400 hover:bg-purple-500/30 transition-all text-xs font-medium"
                          >
                            Staff
                          </button>
                        )}

                        {targetUser.role.level !== RoleLevel.GOUVERNEUR && (
                          <button
                            onClick={() => promoteUser(targetUser, ROLES.GOUVERNEUR)}
                            className="px-3 py-1.5 rounded-lg bg-blue-500/20 text-blue-400 hover:bg-blue-500/30 transition-all text-xs font-medium"
                          >
                            Gouverneur
                          </button>
                        )}

                        {targetUser.role.level !== RoleLevel.RECRUE && (
                          <button
                            onClick={() => promoteUser(targetUser, ROLES.RECRUE)}
                            className="px-3 py-1.5 rounded-lg bg-white/10 text-white/50 hover:bg-white/20 transition-all text-xs font-medium"
                          >
                            Recrue
                          </button>
                        )}
                      </div>
                    ) : (
                      <span className="text-white/30 text-xs italic">C'est toi</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
