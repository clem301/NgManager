'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import GlassInput from '@/components/ui/GlassInput';
import Header from '@/components/layout/Header';
import { createCountry } from '@/lib/countries';

const FLAG_EMOJIS = ['🏴', '🏳️', '🚩', '🏁', '🎌', '🏴‍☠️', '⚫', '🔴', '🔵', '🟢', '🟡', '🟣', '🟠'];
const COLORS = [
  { name: 'Rose', value: '#e879f9' },
  { name: 'Orange', value: '#f97316' },
  { name: 'Bleu', value: '#3b82f6' },
  { name: 'Vert', value: '#22c55e' },
  { name: 'Violet', value: '#a855f7' },
  { name: 'Rouge', value: '#ef4444' },
  { name: 'Cyan', value: '#06b6d4' },
  { name: 'Jaune', value: '#eab308' },
];

export default function CreateCountryPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [flagEmoji, setFlagEmoji] = useState('🏴');
  const [color, setColor] = useState('#e879f9');
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
    <div className="min-h-screen relative z-10">
      <Header />
      
      <div className="pt-[73px]">
        <div className="max-w-2xl mx-auto px-6 py-8">
          <button
            onClick={() => router.push('/dashboard')}
            className="mb-6 text-white/40 hover:text-white transition-colors text-sm flex items-center gap-1"
          >
            <span>←</span>
            <span>Retour au dashboard</span>
          </button>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Créer un pays
            </h1>
            <p className="text-white/50">
              Lance ton empire virtuel et invite des membres
            </p>
          </div>

          <GlassCard padding="lg">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-3 rounded-xl bg-red-500/20 border border-red-500/30 text-red-400 text-sm">
                  {error}
                </div>
              )}

              <GlassInput
                id="name"
                label="Nom du pays"
                type="text"
                placeholder="Ex: République de NG"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                maxLength={50}
                hint={`${name.length}/50 caractères`}
              />

              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-sm font-medium text-white/80">
                  Description
                </label>
                <textarea
                  id="description"
                  placeholder="Décris ton pays, ses valeurs, ses objectifs..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder:text-white/40 focus:outline-none focus:border-primary/50 transition-all resize-none"
                />
                <p className="text-xs text-white/40">{description.length}/500 caractères</p>
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
                        text-2xl p-3 rounded-xl transition-all border
                        ${flagEmoji === emoji
                          ? 'bg-primary/20 border-primary scale-105'
                          : 'bg-white/5 border-white/10 hover:bg-white/10'
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
                <div className="grid grid-cols-4 gap-2">
                  {COLORS.map((c) => (
                    <button
                      key={c.value}
                      type="button"
                      onClick={() => setColor(c.value)}
                      className={`
                        p-3 rounded-xl transition-all flex items-center gap-2 border
                        ${color === c.value
                          ? 'border-2 scale-105'
                          : 'border-white/10 hover:border-white/20'
                        }
                      `}
                      style={{
                        backgroundColor: `${c.value}20`,
                        borderColor: color === c.value ? c.value : undefined,
                      }}
                    >
                      <div
                        className="w-5 h-5 rounded-full"
                        style={{ backgroundColor: c.value }}
                      />
                      <span className="text-white/70 text-xs">{c.name}</span>
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
                  className="p-5 rounded-xl border-2 glass"
                  style={{ borderColor: `${color}50` }}
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                      style={{ backgroundColor: `${color}30` }}
                    >
                      {flagEmoji}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {name || 'Nom du pays'}
                      </h3>
                      <p className="text-white/50 text-sm">
                        Fondé par {user.username}
                      </p>
                    </div>
                  </div>
                  {description && (
                    <p className="text-white/60 text-sm mt-3 pt-3 border-t border-white/10">
                      {description}
                    </p>
                  )}
                </div>
              </div>

              {/* Boutons */}
              <div className="flex gap-3 pt-2">
                <GlassButton
                  variant="secondary"
                  onClick={() => router.push('/dashboard')}
                  type="button"
                  fullWidth
                >
                  Annuler
                </GlassButton>
                <GlassButton
                  variant="primary"
                  type="submit"
                  disabled={loading || !name}
                  fullWidth
                >
                  {loading ? 'Création...' : 'Créer le pays'}
                </GlassButton>
              </div>
            </form>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
