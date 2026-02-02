'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import Badge from '@/components/ui/Badge';
import Header from '@/components/layout/Header';
import { RoleLevel } from '@/lib/roles';

export default function ProfilePage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

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

  if (!user) {
    return null;
  }

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <div className="min-h-screen relative z-10">
      <Header />
      
      <div className="pt-[73px]">
        <div className="max-w-2xl mx-auto px-6 py-8 space-y-6">
          {/* Bouton retour */}
          <button
            onClick={() => router.push('/dashboard')}
            className="text-white/40 hover:text-white transition-colors text-sm flex items-center gap-1"
          >
            <span>←</span>
            <span>Retour au dashboard</span>
          </button>

          {/* Header */}
          <GlassCard padding="lg">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center shadow-glow">
                  <span className="text-2xl font-bold text-white">
                    {user.username.substring(0, 2).toUpperCase()}
                  </span>
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-white">{user.username}</h1>
                  <div className="flex items-center gap-2 mt-1">
                    <Badge 
                      variant={
                        user.role.level === RoleLevel.FONDATEUR ? 'owner' :
                        user.role.level === RoleLevel.STAFF ? 'staff' :
                        user.role.level === RoleLevel.GOUVERNEUR ? 'admin' :
                        'default'
                      }
                      dot
                    >
                      {user.role.name}
                    </Badge>
                  </div>
                </div>
              </div>
              <GlassButton variant="ghost" onClick={handleLogout}>
                Déconnexion
              </GlassButton>
            </div>
          </GlassCard>

          {/* Informations */}
          <GlassCard padding="lg">
            <h3 className="text-sm font-semibold text-white/40 uppercase tracking-wide mb-4">
              Informations du compte
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-white/50 text-sm">Nom d'utilisateur</span>
                <span className="font-medium text-white">{user.username}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-white/50 text-sm">Email</span>
                <span className="font-medium text-white">{user.email}</span>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-white/50 text-sm">Grade</span>
                <Badge 
                  variant={
                    user.role.level === RoleLevel.FONDATEUR ? 'owner' :
                    user.role.level === RoleLevel.STAFF ? 'staff' :
                    user.role.level === RoleLevel.GOUVERNEUR ? 'admin' :
                    'default'
                  }
                  size="sm"
                >
                  {user.role.name}
                </Badge>
              </div>
              <div className="flex justify-between items-center py-2 border-b border-white/10">
                <span className="text-white/50 text-sm">Niveau</span>
                <span className="font-medium text-white">{user.role.level}</span>
              </div>
              <div className="flex justify-between items-center py-2">
                <span className="text-white/50 text-sm">ID</span>
                <span className="font-mono text-xs text-white/40">{user.id}</span>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-white/5 rounded-xl">
              <p className="text-sm text-white/50 italic">{user.role.description}</p>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
