'use client';

import { useState, FormEvent } from 'react';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import GlassInput from '@/components/ui/GlassInput';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { register, login } from '@/lib/auth';
import { useAuth } from '@/contexts/AuthContext';

export default function SignupPage() {
  const router = useRouter();
  const { login: setUser } = useAuth();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      return;
    }

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères');
      return;
    }

    setLoading(true);

    const result = await register(username, email, password);

    if (result.success) {
      const loginResult = await login(email, password);
      if (loginResult.success && loginResult.user) {
        setUser(loginResult.user);
        router.push('/dashboard');
      }
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
            Bienvenue
          </h1>
          <p className="text-white/50">Rejoins l'aventure NG Manager</p>
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
              id="username"
              label="Nom d'utilisateur"
              type="text"
              placeholder="JohnDoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />

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
              hint="Minimum 6 caractères"
            />

            <GlassInput
              id="confirmPassword"
              label="Confirmer le mot de passe"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <div className="flex items-start gap-2">
              <input 
                type="checkbox" 
                id="terms" 
                required 
                className="mt-1 w-4 h-4 rounded bg-white/10 border-white/20 text-primary focus:ring-primary"
              />
              <label htmlFor="terms" className="text-sm text-white/50">
                J'accepte les conditions d'utilisation
              </label>
            </div>

            <GlassButton variant="primary" fullWidth type="submit" disabled={loading}>
              {loading ? 'Création...' : 'Créer mon compte'}
            </GlassButton>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/50 text-sm">
              Déjà inscrit ?{' '}
              <Link href="/login" className="text-primary font-medium hover:underline">
                Connecte-toi
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
