import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import GlassInput from '@/components/ui/GlassInput';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <div className="w-24 h-24 rounded-glass-lg bg-white/10 flex items-center justify-center mx-auto shadow-glow mb-6">
              <span className="text-5xl font-bold">NG</span>
            </div>
          </Link>
          <h1 className="text-4xl font-bold mb-2 gradient-text">Connexion</h1>
          <p className="text-white/60">Connectez-vous à votre compte NG Manager</p>
        </div>

        <GlassCard className="p-8">
          <form className="space-y-6">
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="mr-2" />
                <span className="text-white/60">Se souvenir de moi</span>
              </label>
              <a href="#" className="text-white/80 hover:text-white transition-colors">
                Mot de passe oublié ?
              </a>
            </div>

            <GlassButton variant="primary" className="w-full">
              Se connecter
            </GlassButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/60 text-sm">
              Pas encore de compte ?{' '}
              <Link href="/signup" className="text-white font-semibold hover:underline">
                Créer un compte
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
