import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';

export default function HomePage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-6">
      <div className="max-w-6xl mx-auto space-y-16">
        <div className="text-center space-y-8">
          <div className="w-32 h-32 rounded-glass-lg bg-white/10 flex items-center justify-center mx-auto shadow-glow mb-8">
            <span className="text-6xl font-bold">NG</span>
          </div>

          <h1 className="text-7xl lg:text-9xl font-bold leading-tight">
            <span className="gradient-text">NG Manager</span>
          </h1>

          <p className="text-2xl lg:text-3xl text-white/80 leading-relaxed max-w-4xl mx-auto font-light">
            Logiciel de gestion de pays virtuels
          </p>

          <p className="text-lg lg:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto">
            Organisez et administrez plusieurs pays virtuels avec une hiérarchie complète,
            des rôles personnalisables et des outils de gestion dédiés
          </p>
        </div>

        <GlassCard strong className="p-10 lg:p-16">
          <h2 className="text-4xl font-bold mb-8 text-center gradient-text">Qu&apos;est-ce que NG Manager ?</h2>
          <div className="space-y-6 text-white/70 leading-relaxed text-lg text-center max-w-3xl mx-auto">
            <p>
              <strong className="text-white">NG Manager</strong> est une plateforme de gestion conçue pour organiser
              et administrer plusieurs pays virtuels au sein d&apos;une communauté.
            </p>
            <p>
              Chaque pays dispose de sa propre hiérarchie, de membres avec des rôles spécifiques,
              et d&apos;outils de gestion dédiés pour les créations, demandes, historique et communication.
            </p>
          </div>
        </GlassCard>

        <div>
          <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Fonctionnalités principales</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <GlassCard className="p-8 text-center">
              <div className="text-5xl mb-4">🔐</div>
              <h3 className="text-xl font-bold mb-3">Authentification</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Système sécurisé avec validation manuelle et support 2FA
              </p>
            </GlassCard>

            <GlassCard className="p-8 text-center">
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-3">Rôles hiérarchiques</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Gestion complète des rôles et permissions par pays
              </p>
            </GlassCard>

            <GlassCard className="p-8 text-center">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-bold mb-3">Créations</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Soumission et validation de projets et constructions
              </p>
            </GlassCard>

            <GlassCard className="p-8 text-center">
              <div className="text-5xl mb-4">📜</div>
              <h3 className="text-xl font-bold mb-3">Historique</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Traçabilité complète de toutes les actions
              </p>
            </GlassCard>

            <GlassCard className="p-8 text-center">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-3">Communication</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Messagerie et forums par pays
              </p>
            </GlassCard>

            <GlassCard className="p-8 text-center">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-3">Administration</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Panneaux Staff et Propriétaire pour la gestion globale
              </p>
            </GlassCard>
          </div>
        </div>

        <div className="text-center mt-8">
          <Badge variant="default">En développement</Badge>
        </div>
      </div>
    </div>
  );
}
