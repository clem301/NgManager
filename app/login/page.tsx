'use client';

import { useState, FormEvent } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import GlassInput from '@/components/ui/GlassInput';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { login } from '@/lib/auth';
import { useAuth } from '@/contexts/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login: setUser } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    const result = await login(email, password);

    if (result.success && result.user) {
      setUser(result.user);
      router.push('/dashboard');
    } else {
      setError(result.error || 'Une erreur est survenue');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-20 px-6">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-block">
            <div className="w-24 h-24 rounded-glass-lg bg-white/10 flex items-center justify-center mx-auto shadow-glow mb-6">
              <span className="text-5xl font-bold">NG</span>
            </div>
          </Link>
          <h1 className="text-4xl font-bold mb-2 gradient-text">Re ! 👋</h1>
          <p className="text-white/60">Connecte-toi pour gérer ton empire</p>
        </div>

        <GlassCard className="p-8">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 rounded-glass bg-red-500/20 border border-red-500/30 text-red-200 text-sm">
                {error}
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-white/80 mb-2">
                Email
              </label>
              <GlassInput
                id="email"
                type="email"
                placeholder="votre@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <GlassButton variant="primary" className="w-full" type="submit" disabled={loading}>
              {loading ? 'Connexion...' : 'Se connecter'}
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
