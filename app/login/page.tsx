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
    <div className="min-h-screen flex items-center justify-center py-12 px-6 relative z-10">
      <div className="max-w-md w-full space-y-8 animate-fadeUp">
        {/* Header */}
        <div className="text-center">
          <Link href="/" className="inline-block">
            <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto shadow-glow mb-6">
              <span className="text-2xl font-bold text-white">NG</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">
            Content de te revoir
          </h1>
          <p className="text-white/50">Connecte-toi pour gérer ton empire</p>
        </div>

        {/* Form Card */}
        <GlassCard padding="lg">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {error && (
              <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm">
                {error}
              </div>
            )}

            <GlassInput
              id="email"
              label="Email"
              type="email"
              placeholder="votre@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <GlassInput
              id="password"
              label="Mot de passe"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <GlassButton variant="primary" fullWidth type="submit" disabled={loading}>
              {loading ? 'Connexion...' : 'Se connecter'}
            </GlassButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/50 text-sm">
              Pas encore de compte ?{' '}
              <Link href="/signup" className="text-primary font-medium hover:underline">
                Créer un compte
              </Link>
            </p>
          </div>
        </GlassCard>

        {/* Back link */}
        <div className="text-center">
          <Link href="/" className="text-white/40 text-sm hover:text-white transition-colors inline-flex items-center gap-2">
            <span>←</span>
            <span>Retour à l'accueil</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
