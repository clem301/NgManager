import React from 'react';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';

export default function HomePage() {
  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Header */}
        <div className="text-center space-y-6">
          <div className="w-24 h-24 rounded-glass-lg bg-white/10 flex items-center justify-center mx-auto shadow-glow">
            <span className="text-5xl font-bold">NG</span>
          </div>

          <h1 className="text-6xl lg:text-8xl font-bold leading-tight">
            <span className="gradient-text">NG Manager</span>
          </h1>

          <p className="text-xl lg:text-2xl text-white/70 leading-relaxed max-w-3xl mx-auto">
            Application web complète de gestion multi-pays avec authentification,
            rôles hiérarchiques et panneau d'administration
          </p>
        </div>

        {/* Project Description */}
        <GlassCard strong className="p-8 lg:p-12">
          <h2 className="text-3xl font-bold mb-6 gradient-text">📋 À propos du projet</h2>
          <div className="space-y-4 text-white/70 leading-relaxed">
            <p>
              <strong className="text-white">NG Manager</strong> est une plateforme de gestion conçue pour organiser
              et administrer plusieurs pays virtuels au sein d'une communauté. Chaque pays dispose de sa propre
              hiérarchie, de membres avec des rôles spécifiques, et d'outils de gestion dédiés.
            </p>
            <p>
              Le système permet la création de contenus (constructions, projets), la gestion de demandes
              de ressources, un historique complet des actions, une messagerie interne et des forums de discussion
              par pays.
            </p>
          </div>
        </GlassCard>

        {/* Key Features */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center gradient-text">✨ Fonctionnalités principales</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <GlassCard className="p-6">
              <div className="flex gap-4">
                <span className="text-3xl">🔐</span>
                <div>
                  <h3 className="text-xl font-bold mb-2">Authentification sécurisée</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Système de création de compte avec validation manuelle par les administrateurs de chaque pays.
                    Support 2FA optionnel et notifications email automatiques.
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex gap-4">
                <span className="text-3xl">👥</span>
                <div>
                  <h3 className="text-xl font-bold mb-2">Gestion des rôles</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Système de rôles hiérarchiques entièrement personnalisable. Création, modification et
                    suppression de rôles avec permissions granulaires. Promotions et rétrogradations.
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex gap-4">
                <span className="text-3xl">✨</span>
                <div>
                  <h3 className="text-xl font-bold mb-2">Créations & Demandes</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Les membres peuvent soumettre leurs créations (constructions, projets) et faire des demandes
                    de ressources ou d'aide. Système de validation avec archivage automatique.
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex gap-4">
                <span className="text-3xl">📜</span>
                <div>
                  <h3 className="text-xl font-bold mb-2">Historique complet</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Timeline détaillée de toutes les actions effectuées dans le pays : créations, demandes,
                    promotions, mouvements de membres. Logs inaltérables et traçabilité totale.
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex gap-4">
                <span className="text-3xl">💬</span>
                <div>
                  <h3 className="text-xl font-bold mb-2">Communication interne</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Boîte aux lettres pour la messagerie privée entre membres et forums de discussion
                    par pays pour échanger sur les projets et événements.
                  </p>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6">
              <div className="flex gap-4">
                <span className="text-3xl">🛡️</span>
                <div>
                  <h3 className="text-xl font-bold mb-2">Zones d'administration</h3>
                  <p className="text-white/60 text-sm leading-relaxed">
                    Zone Staff pour observation des logs globaux (lecture seule) et panneau Propriétaire
                    pour gestion complète de tous les pays et utilisateurs.
                  </p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>

        {/* Technical Stack */}
        <GlassCard strong className="p-8 lg:p-12">
          <h2 className="text-3xl font-bold mb-6 gradient-text">🛠️ Technologies</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4 text-white/90">Frontend</h3>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-center gap-2">
                  <span className="text-green-400">▪</span> Next.js 14 (App Router)
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">▪</span> React 18
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">▪</span> TypeScript
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-400">▪</span> Tailwind CSS
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-white/90">Backend (prévu)</h3>
              <ul className="space-y-2 text-white/70">
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">▪</span> Next.js API Routes
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">▪</span> Prisma ORM
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">▪</span> SQLite / PostgreSQL
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-400">▪</span> NextAuth.js
                </li>
              </ul>
            </div>
          </div>
        </GlassCard>

        {/* Design System */}
        <div>
          <h2 className="text-3xl font-bold mb-8 text-center gradient-text">🎨 Charte graphique</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <GlassCard className="p-6 text-center">
              <div className="text-4xl mb-3">🌌</div>
              <h3 className="font-bold mb-2">Thème sombre</h3>
              <p className="text-white/60 text-sm">Dégradé noir-violet animé avec effets subtils</p>
            </GlassCard>

            <GlassCard className="p-6 text-center">
              <div className="text-4xl mb-3">💎</div>
              <h3 className="font-bold mb-2">Glassmorphisme</h3>
              <p className="text-white/60 text-sm">Effets de verre avec blur et transparence</p>
            </GlassCard>

            <GlassCard className="p-6 text-center">
              <div className="text-4xl mb-3">✨</div>
              <h3 className="font-bold mb-2">Animations fluides</h3>
              <p className="text-white/60 text-sm">Transitions douces et effets glow</p>
            </GlassCard>
          </div>
        </GlassCard>

        {/* Footer Info */}
        <div className="text-center">
          <GlassCard className="inline-block px-8 py-4">
            <div className="flex items-center gap-3">
              <Badge variant="default">En développement</Badge>
              <span className="text-white/60 text-sm">Maquette UI/UX v1.0</span>
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
