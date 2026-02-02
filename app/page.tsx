import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="min-h-screen relative z-10">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center min-h-screen px-6 py-20">
        <div className="text-center space-y-6 max-w-3xl mx-auto animate-fadeUp">
          {/* Title */}
          <h1 className="text-5xl lg:text-7xl font-black">
            <span className="gradient-text">NG Manager</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl lg:text-2xl font-medium text-white/90">
            Gestion de pays RP
          </p>

          {/* Description */}
          <p className="text-base text-white/50 max-w-xl mx-auto">
            Gérez vos pays, vos membres et vos bunkers en un seul endroit.
          </p>

          {/* CTA */}
          <div className="pt-6">
            <Link href="/login">
              <GlassButton variant="primary" size="lg">
                Se connecter
              </GlassButton>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="px-6 py-20 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            <GlassCard hover padding="lg">
              <h3 className="text-base font-semibold text-white mb-2">Gestion des pays</h3>
              <p className="text-white/40 text-sm">
                Créez et administrez vos pays avec leurs membres.
              </p>
            </GlassCard>

            <GlassCard hover padding="lg">
              <h3 className="text-base font-semibold text-white mb-2">Système de grades</h3>
              <p className="text-white/40 text-sm">
                Définissez les rôles et permissions de chaque membre.
              </p>
            </GlassCard>

            <GlassCard hover padding="lg">
              <h3 className="text-base font-semibold text-white mb-2">Gestion des bunkers</h3>
              <p className="text-white/40 text-sm">
                Assignez et suivez les bunkers de votre pays.
              </p>
            </GlassCard>

            <GlassCard hover padding="lg">
              <h3 className="text-base font-semibold text-white mb-2">Suivi des membres</h3>
              <p className="text-white/40 text-sm">
                Consultez la liste et les infos de chaque membre.
              </p>
            </GlassCard>

            <GlassCard hover padding="lg">
              <h3 className="text-base font-semibold text-white mb-2">Multi-pays</h3>
              <p className="text-white/40 text-sm">
                Gérez plusieurs pays depuis un seul compte.
              </p>
            </GlassCard>

            <GlassCard hover padding="lg">
              <h3 className="text-base font-semibold text-white mb-2">Panel admin</h3>
              <p className="text-white/40 text-sm">
                Contrôle total pour les fondateurs et le staff.
              </p>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
