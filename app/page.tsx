import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import Badge from '@/components/ui/Badge';
import Link from 'next/link';

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
            Gérez vos pays virtuels comme un pro
          </p>

          <p className="text-lg lg:text-xl text-white/60 leading-relaxed max-w-3xl mx-auto">
            Parce que diriger un empire virtuel, c&apos;est sérieux 😎
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Link href="/login">
              <GlassButton variant="primary" className="px-8 py-3">
                Se connecter
              </GlassButton>
            </Link>
            <Link href="/signup">
              <GlassButton variant="secondary" className="px-8 py-3">
                Créer un compte
              </GlassButton>
            </Link>
          </div>
        </div>

        <GlassCard strong className="p-10 lg:p-16">
          <h2 className="text-4xl font-bold mb-8 text-center gradient-text">C&apos;est quoi ce truc ?</h2>
          <div className="space-y-6 text-white/70 leading-relaxed text-lg text-center max-w-3xl mx-auto">
            <p>
              <strong className="text-white">NG Manager</strong>, c&apos;est ton outil pour gérer ta commu de pays virtuels.
              Chaque pays a sa team, ses grades, et ses règles. Simple, efficace.
            </p>
            <p>
              Créations, demandes, historique, messagerie... Tout est là pour que tu puisses te concentrer
              sur l&apos;essentiel : faire vivre ton univers. 🌍
            </p>
          </div>
        </GlassCard>

        <div>
          <h2 className="text-4xl font-bold mb-12 text-center gradient-text">Ce que tu peux faire</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <GlassCard className="p-8 text-center hover:scale-105 transition-transform">
              <div className="text-5xl mb-4">🔐</div>
              <h3 className="text-xl font-bold mb-3">Sécurité béton</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Validation manuelle + 2FA. On rigole pas avec la sécu.
              </p>
            </GlassCard>

            <GlassCard className="p-8 text-center hover:scale-105 transition-transform">
              <div className="text-5xl mb-4">👥</div>
              <h3 className="text-xl font-bold mb-3">Grades custom</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Crée tes rôles, définis les perms. Ton pays, tes règles.
              </p>
            </GlassCard>

            <GlassCard className="p-8 text-center hover:scale-105 transition-transform">
              <div className="text-5xl mb-4">✨</div>
              <h3 className="text-xl font-bold mb-3">Système de créations</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Partage tes projets, valide ceux des autres. Tout simplement.
              </p>
            </GlassCard>

            <GlassCard className="p-8 text-center hover:scale-105 transition-transform">
              <div className="text-5xl mb-4">📜</div>
              <h3 className="text-xl font-bold mb-3">Historique complet</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Tout est tracé. Parce que savoir qui a fait quoi, c&apos;est important.
              </p>
            </GlassCard>

            <GlassCard className="p-8 text-center hover:scale-105 transition-transform">
              <div className="text-5xl mb-4">💬</div>
              <h3 className="text-xl font-bold mb-3">Messagerie intégrée</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                MP, forums... Tout pour que ta team reste connectée.
              </p>
            </GlassCard>

            <GlassCard className="p-8 text-center hover:scale-105 transition-transform">
              <div className="text-5xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold mb-3">Panel admin</h3>
              <p className="text-white/60 text-sm leading-relaxed">
                Zone staff + zone proprio. Le contrôle total, quoi.
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
