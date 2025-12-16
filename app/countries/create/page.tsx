'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import GlassInput from '@/components/ui/GlassInput';
import { createCountry } from '@/lib/countries';

const FLAG_EMOJIS = ['🏴', '🏳️', '🚩', '🏁', '🎌', '🏴‍☠️', '🏳️‍🌈', '⚫', '🔴', '🔵', '🟢', '🟡', '🟣'];
const COLORS = [
  { name: 'Bleu', value: '#3b82f6' },
  { name: 'Rouge', value: '#ef4444' },
  { name: 'Vert', value: '#22c55e' },
  { name: 'Violet', value: '#a855f7' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Rose', value: '#ec4899' },
  { name: 'Jaune', value: '#eab308' },
  { name: 'Gris', value: '#6b7280' },
];

export default function CreateCountryPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [flagEmoji, setFlagEmoji] = useState('🏴');
  const [color, setColor] = useState('#3b82f6');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!user) {
    router.push('/login');
    return null;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (name.length < 3) {
      setError('Le nom doit contenir au moins 3 caractères');
      setLoading(false);
      return;
    }

    const result = await createCountry(name, description, user.id, flagEmoji, color);

    if (result.success) {
      router.push('/countries');
    } else {
      setError(result.error || 'Une erreur est survenue');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => router.push('/dashboard')}
          className="mb-6 text-white/60 hover:text-white transition-colors"
        >
          ← Retour au dashboard
        </button>

        <div className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">
            Créer un pays 🏰
          </h1>
          <p className="text-white/60">
            Lance ton empire virtuel et invite des membres
          </p>
        </div>

        <GlassCard className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 rounded-glass bg-red-500/20 border border-red-500/30 text-red-200 text-sm">
                {error}
              </div>
            )}

            {/* Nom du pays */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-white/80 mb-2">
                Nom du pays *
              </label>
              <GlassInput
                id="name"
                type="text"
                placeholder="Ex: République de NG"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={50}
              />
              <p className="text-white/40 text-xs mt-1">
                {name.length}/50 caractères
              </p>
            </div>

            {/* Description */}
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-white/80 mb-2">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Décris ton pays, ses valeurs, ses objectifs..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                maxLength={500}
                className="w-full px-4 py-3 rounded-glass bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-all resize-none"
              />
              <p className="text-white/40 text-xs mt-1">
                {description.length}/500 caractères
              </p>
            </div>

            {/* Drapeau */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Drapeau
              </label>
              <div className="grid grid-cols-7 gap-2">
                {FLAG_EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setFlagEmoji(emoji)}
                    className={`
                      text-3xl p-3 rounded-glass transition-all
                      ${flagEmoji === emoji
                        ? 'bg-white/20 border-2 border-white/50 scale-110'
                        : 'bg-white/5 border border-white/10 hover:bg-white/10'
                      }
                    `}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>

            {/* Couleur */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Couleur thématique
              </label>
              <div className="grid grid-cols-4 gap-3">
                {COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    onClick={() => setColor(c.value)}
                    className={`
                      p-4 rounded-glass transition-all flex items-center gap-2
                      ${color === c.value
                        ? 'border-2 scale-105'
                        : 'border hover:scale-105'
                      }
                    `}
                    style={{
                      backgroundColor: `${c.value}20`,
                      borderColor: `${c.value}${color === c.value ? '' : '50'}`,
                    }}
                  >
                    <div
                      className="w-6 h-6 rounded-full"
                      style={{ backgroundColor: c.value }}
                    />
                    <span className="text-white/80 text-sm">{c.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Aperçu */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Aperçu
              </label>
              <div
                className="p-6 rounded-glass border-2"
                style={{
                  backgroundColor: `${color}10`,
                  borderColor: `${color}50`,
                }}
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-4xl">{flagEmoji}</span>
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      {name || 'Nom du pays'}
                    </h3>
                    <p className="text-white/60 text-sm">
                      Fondé par {user.username}
                    </p>
                  </div>
                </div>
                {description && (
                  <p className="text-white/70 text-sm mt-3">
                    {description}
                  </p>
                )}
              </div>
            </div>

            {/* Boutons */}
            <div className="flex gap-3">
              <GlassButton
                variant="secondary"
                onClick={() => router.push('/dashboard')}
                type="button"
                className="flex-1"
              >
                Annuler
              </GlassButton>
              <GlassButton
                variant="primary"
                type="submit"
                disabled={loading || !name}
                className="flex-1"
              >
                {loading ? 'Création...' : '🏰 Créer le pays'}
              </GlassButton>
            </div>
          </form>
        </GlassCard>
      </div>
    </div>
  );
}
