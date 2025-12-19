'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
      alert('✅ Tu as rejoint le pays avec succès !');
    } else {
      alert(result.error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Chargement...</div>
      </div>
    );
  }

  const myCountryIds = new Set(myCountries.map(c => c.id));

  return (
    <div className="min-h-screen py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <button
              onClick={() => router.push('/dashboard')}
              className="mb-4 text-white/60 hover:text-white transition-colors"
            >
              ← Retour au dashboard
            </button>
            <h1 className="text-4xl font-bold gradient-text mb-2">
              Pays disponibles
            </h1>
            <p className="text-white/60">
              Rejoins un pays ou crée le tien
            </p>
          </div>
          <GlassButton
            variant="primary"
            onClick={() => router.push('/countries/create')}
          >
            Créer un pays
          </GlassButton>
        </div>

        {/* Mes pays */}
        {myCountries.length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-white mb-6">
              Mes pays ({myCountries.length})
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {myCountries.map((country) => (
                <div
                  key={country.id}
                  onClick={() => router.push(`/countries/${country.id}`)}
                  style={{
                    background: `linear-gradient(135deg, ${country.color}20, ${country.color}05)`,
                    borderColor: `${country.color}30`,
                  }}
                  className="p-6 rounded-glass border cursor-pointer hover:scale-105 transition-transform backdrop-blur-md bg-white/5"
                >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-5xl">{country.flag_emoji}</span>
                      <span
                        className="px-2 py-1 rounded-full text-xs font-semibold"
                        style={{
                          backgroundColor: `${country.color}30`,
                          color: country.color,
                        }}
                      >
                        Membre
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {country.name}
                    </h3>
                    <p className="text-white/60 text-sm mb-4 line-clamp-2">
                      {country.description || 'Aucune description'}
                    </p>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-white/60">
                        {country.member_count} membre{country.member_count > 1 ? 's' : ''}
                      </span>
                      <span className="text-white/60">
                        Fondé par {country.owner?.username}
                      </span>
                    </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tous les pays */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-6">
            Tous les pays ({allCountries.length})
          </h2>
          {allCountries.length === 0 ? (
            <GlassCard className="p-12 text-center">
              <h3 className="text-xl font-bold text-white mb-2">
                Aucun pays pour le moment
              </h3>
              <p className="text-white/60 mb-6">
                Sois le premier à créer un pays et à bâtir ton empire !
              </p>
              <GlassButton
                variant="primary"
                onClick={() => router.push('/countries/create')}
              >
                Créer le premier pays
              </GlassButton>
            </GlassCard>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {allCountries.map((country) => {
                const isMember = myCountryIds.has(country.id);
                return (
                  <div
                    key={country.id}
                    className="p-6 rounded-glass border backdrop-blur-md bg-white/5"
                    style={{
                      background: `linear-gradient(135deg, ${country.color}15, ${country.color}03)`,
                      borderColor: `${country.color}20`,
                    }}
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-5xl">{country.flag_emoji}</span>
                      {isMember && (
                        <span
                          className="px-2 py-1 rounded-full text-xs font-semibold"
                          style={{
                            backgroundColor: `${country.color}30`,
                            color: country.color,
                          }}
                        >
                          Membre
                        </span>
                      )}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">
                      {country.name}
                    </h3>
                    <p className="text-white/60 text-sm mb-4 line-clamp-2">
                      {country.description || 'Aucune description'}
                    </p>
                    <div className="flex items-center justify-between text-sm mb-4">
                      <span className="text-white/60">
                        {country.member_count} membre{country.member_count > 1 ? 's' : ''}
                      </span>
                      <span className="text-white/60">
                        par {country.owner?.username}
                      </span>
                    </div>
                    {!isMember ? (
                      <GlassButton
                        variant="primary"
                        onClick={() => handleJoin(country.id)}
                        className="w-full"
                      >
                        Rejoindre
                      </GlassButton>
                    ) : (
                      <GlassButton
                        variant="secondary"
                        onClick={() => router.push(`/countries/${country.id}`)}
                        className="w-full"
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
  );
}
