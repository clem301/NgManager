import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import GlassInput from '@/components/ui/GlassInput';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <div className="w-24 h-24 rounded-glass-lg bg-white/10 flex items-center justify-center mx-auto shadow-glow mb-6">
              <span className="text-5xl font-bold">NG</span>
            </div>
          </Link>
          <h1 className="text-4xl font-bold mb-2 gradient-text">Créer un compte</h1>
          <p className="text-white/60">Rejoignez NG Manager dès aujourd&apos;hui</p>
        </div>

        <GlassCard className="p-8">
          <form className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-white/80 mb-2">
                Nom d&apos;utilisateur
              </label>
              <GlassInput
                id="username"
                type="text"
                placeholder="JohnDoe"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                Email
              </label>
              <GlassInput
                id="email"
                type="email"
                placeholder="votre@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-white/80 mb-2">
                Mot de passe
              </label>
              <GlassInput
                id="password"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-white/80 mb-2">
                Confirmer le mot de passe
              </label>
              <GlassInput
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-start">
              <input type="checkbox" id="terms" className="mt-1 mr-2" required />
              <label htmlFor="terms" className="text-sm text-white/60">
                J&apos;accepte les conditions d&apos;utilisation et la politique de confidentialité
              </label>
            </div>

            <GlassButton variant="primary" className="w-full">
              Créer mon compte
            </GlassButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Vous avez déjà un compte ?{' '}
              <Link href="/login" className="text-white font-semibold hover:underline">
                Se connecter
              </Link>
            </p>
          </div>
        </GlassCard>

        <div className="text-center">
          <Link href="/" className="text-white/60 text-sm hover:text-white transition-colors">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </div>
    </div>
  );
}
