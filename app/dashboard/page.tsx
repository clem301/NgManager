'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import Badge from '@/components/ui/Badge';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading, logout } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white/60">Chargement...</div>
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
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-5xl font-bold gradient-text mb-2">Dashboard</h1>
            <p className="text-white/60">Content de te revoir, {user.username} ! 👋</p>
          </div>
          <GlassButton variant="secondary" onClick={handleLogout}>
            Déconnexion
          </GlassButton>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <GlassCard className="p-6">
            <div className="text-4xl mb-3">🏰</div>
            <h3 className="text-2xl font-bold mb-2">0</h3>
            <p className="text-white/60 text-sm">Pays gérés</p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="text-4xl mb-3">👥</div>
            <h3 className="text-2xl font-bold mb-2">0</h3>
            <p className="text-white/60 text-sm">Membres actifs</p>
          </GlassCard>

          <GlassCard className="p-6">
            <div className="text-4xl mb-3">✨</div>
            <h3 className="text-2xl font-bold mb-2">0</h3>
            <p className="text-white/60 text-sm">Créations</p>
          </GlassCard>
        </div>

        {/* Welcome Card */}
        <GlassCard strong className="p-10">
          <div className="text-center space-y-6">
            <div className="text-6xl">🎉</div>
            <h2 className="text-3xl font-bold gradient-text">Bienvenue sur ton dashboard !</h2>
            <p className="text-white/70 text-lg max-w-2xl mx-auto">
              Ton compte a été créé avec succès. C&apos;est ici que tu vas pouvoir gérer tes pays,
              tes équipes et tout ton empire virtuel.
            </p>
            <Badge variant="default">Application en développement</Badge>
          </div>
        </GlassCard>

        {/* Quick Actions */}
        <div>
          <h2 className="text-2xl font-bold mb-6 gradient-text">Actions rapides</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <GlassCard className="p-6 hover:scale-105 transition-transform cursor-pointer">
              <div className="text-4xl mb-4">➕</div>
              <h3 className="text-xl font-bold mb-2">Créer un pays</h3>
              <p className="text-white/60 text-sm">
                Lance-toi et crée ton premier pays virtuel
              </p>
            </GlassCard>

            <GlassCard className="p-6 hover:scale-105 transition-transform cursor-pointer">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="text-xl font-bold mb-2">Rejoindre un pays</h3>
              <p className="text-white/60 text-sm">
                Trouve un pays existant et fais ta demande
              </p>
            </GlassCard>
          </div>
        </div>

        {/* User Info */}
        <GlassCard className="p-6">
          <h3 className="text-lg font-bold mb-4">Informations du compte</h3>
          <div className="space-y-2 text-white/70">
            <div className="flex justify-between">
              <span>Nom d&apos;utilisateur :</span>
              <span className="text-white font-semibold">{user.username}</span>
            </div>
            <div className="flex justify-between">
              <span>Email :</span>
              <span className="text-white font-semibold">{user.email}</span>
            </div>
            <div className="flex justify-between">
              <span>ID :</span>
              <span className="text-white/40 font-mono text-sm">{user.id}</span>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
