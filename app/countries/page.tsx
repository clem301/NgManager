'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import Badge from '@/components/ui/Badge';
import Header from '@/components/layout/Header';
import { getAllCountries, getUserCountries, joinCountry, CountryWithOwner } from '@/lib/countries';

export default function CountriesPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [allCountries, setAllCountries] = useState<CountryWithOwner[]>([]);
  const [myCountries, setMyCountries] = useState<CountryWithOwner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    loadCountries();
  }, [user, router]);

  const loadCountries = async () => {
    if (!user) return;

    const [all, mine] = await Promise.all([
      getAllCountries(),
      getUserCountries(user.id),
    ]);

    setAllCountries(all);
    setMyCountries(mine);
    setLoading(false);
  };

  const handleJoin = async (countryId: string) => {
    if (!user) return;

    const result = await joinCountry(countryId, user.id, user.role.level);

    if (result.success) {
      loadCountries();
      alert('Tu as rejoint le pays avec succès !');
    } else {
      alert(result.error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center">
          <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
            <span className="text-white text-xl font-bold">NG</span>
          </div>
          <p className="text-white/50">Chargement...</p>
        </div>
      </div>
    );
  }

  const myCountryIds = new Set(myCountries.map(c => c.id));

  return (
    <div className="min-h-screen relative z-10">
      <Header />
      
      <div className="pt-[73px]">
        <div className="max-w-6xl mx-auto px-6 py-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <button
                onClick={() => router.push('/dashboard')}
                className="mb-3 text-white/40 hover:text-white transition-colors text-sm flex items-center gap-1"
              >
                <span>←</span>
                <span>Retour au dashboard</span>
              </button>
              <h1 className="text-3xl font-bold text-white mb-1">
                Pays disponibles
              </h1>
              <p className="text-white/50">
                Rejoins un pays ou crée le tien
              </p>
            </div>
            <GlassButton
              variant="primary"
              onClick={() => router.push('/countries/create')}
            >
              + Créer un pays
            </GlassButton>
          </div>

          {/* Mes pays */}
          {myCountries.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                Mes pays
                <Badge variant="primary" size="sm">{myCountries.length}</Badge>
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {myCountries.map((country) => (
                  <div
                    key={country.id}
                    onClick={() => router.push(`/countries/${country.id}`)}
                    className="glass rounded-xl p-5 cursor-pointer glass-hover group"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-2xl">
                        {country.flag_emoji}
                      </div>
                      <Badge variant="member" size="sm">Membre</Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-1 group-hover:text-primary transition-colors">
                      {country.name}
                    </h3>
                    <p className="text-white/40 text-sm mb-3 line-clamp-2">
                      {country.description || 'Aucune description'}
                    </p>
                    <div className="flex items-center justify-between text-xs text-white/40 pt-3 border-t border-white/10">
                      <span>{country.member_count} membre{country.member_count > 1 ? 's' : ''}</span>
                      <span>par {country.owner?.username}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tous les pays */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
              Tous les pays
              <Badge variant="default" size="sm">{allCountries.length}</Badge>
            </h2>
            
            {allCountries.length === 0 ? (
              <GlassCard padding="lg" className="text-center">
                <div className="text-5xl mb-4">🏴</div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  Aucun pays pour le moment
                </h3>
                <p className="text-white/50 mb-6">
                  Sois le premier à créer un pays !
                </p>
                <GlassButton
                  variant="primary"
                  onClick={() => router.push('/countries/create')}
                >
                  Créer le premier pays
                </GlassButton>
              </GlassCard>
            ) : (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {allCountries.map((country) => {
                  const isMember = myCountryIds.has(country.id);
                  return (
                    <div key={country.id} className="glass rounded-xl p-5">
                      <div className="flex items-start justify-between mb-3">
                        <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center text-2xl">
                          {country.flag_emoji}
                        </div>
                        {isMember && <Badge variant="member" size="sm">Membre</Badge>}
                      </div>
                      <h3 className="text-lg font-semibold text-white mb-1">
                        {country.name}
                      </h3>
                      <p className="text-white/40 text-sm mb-3 line-clamp-2">
                        {country.description || 'Aucune description'}
                      </p>
                      <div className="flex items-center justify-between text-xs text-white/40 mb-4">
                        <span>{country.member_count} membre{country.member_count > 1 ? 's' : ''}</span>
                        <span>par {country.owner?.username}</span>
                      </div>
                      {!isMember ? (
                        <GlassButton
                          variant="primary"
                          onClick={() => handleJoin(country.id)}
                          fullWidth
                        >
                          Rejoindre
                        </GlassButton>
                      ) : (
                        <GlassButton
                          variant="secondary"
                          onClick={() => router.push(`/countries/${country.id}`)}
                          fullWidth
                        >
                          Voir le pays
                        </GlassButton>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
