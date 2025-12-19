'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getCountryById, getUserCountries, CountryWithOwner } from '@/lib/countries';
import { RoleLevel } from '@/lib/roles';

export default function CountryLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const { user } = useAuth();
  const [country, setCountry] = useState<CountryWithOwner | null>(null);
  const [userCountries, setUserCountries] = useState<CountryWithOwner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    loadCountryData();
  }, [params.id, user, router]);

  const loadCountryData = async () => {
    if (!user || !params.id) return;

    const [countryData, userCountriesData] = await Promise.all([
      getCountryById(params.id as string),
      getUserCountries(user.id),
    ]);

    setCountry(countryData);
    setUserCountries(userCountriesData);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white/60">Chargement...</div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Pays introuvable</div>
      </div>
    );
  }

  const isCurrentPage = (path: string) => pathname === path;

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 p-6 space-y-6">
        {/* Navigation globale */}
        <div className="space-y-2">
          <button
            onClick={() => router.push('/profile')}
            className="w-full text-left px-4 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all"
          >
            Profil
          </button>

          {user && user.role.level >= RoleLevel.STAFF && (
            <button
              onClick={() => router.push('/admin')}
              className="w-full text-left px-4 py-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all"
            >
              Administration
            </button>
          )}
        </div>

        {/* Section pays avec sous-menus */}
        <div className="border-t border-white/10 pt-6">
          {/* Si Staff/Fondateur: afficher tous les pays avec sous-menus */}
          {user && user.role.level >= RoleLevel.STAFF ? (
            <>
              <h3 className="text-sm font-semibold text-white/40 mb-3">MES PAYS</h3>
              <div className="space-y-4">
                {userCountries.map((c) => (
                  <div key={c.id} className="space-y-1">
                    {/* Nom du pays */}
                    <button
                      onClick={() => router.push(`/countries/${c.id}`)}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all flex items-center gap-2 ${
                        c.id === country.id
                          ? 'bg-white/10 text-white'
                          : 'text-white/60 hover:text-white hover:bg-white/5'
                      }`}
                      style={{
                        borderLeft: c.id === country.id ? `3px solid ${c.color}` : 'none',
                      }}
                    >
                      <span className="text-lg">{c.flag_emoji}</span>
                      <span className="text-sm truncate font-semibold">{c.name}</span>
                    </button>

                    {/* Sous-menus du pays (uniquement si c'est le pays actuel) */}
                    {c.id === country.id && (
                      <div className="ml-4 space-y-1">
                        <button
                          onClick={() => router.push(`/countries/${c.id}`)}
                          className={`w-full text-left px-4 py-1.5 rounded-lg transition-all text-sm ${
                            isCurrentPage(`/countries/${c.id}`)
                              ? 'bg-white/10 text-white'
                              : 'text-white/60 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          Accueil
                        </button>
                        <button
                          onClick={() => router.push(`/countries/${c.id}/bunker`)}
                          className={`w-full text-left px-4 py-1.5 rounded-lg transition-all text-sm ${
                            isCurrentPage(`/countries/${c.id}/bunker`)
                              ? 'bg-white/10 text-white'
                              : 'text-white/60 hover:text-white hover:bg-white/5'
                          }`}
                        >
                          BK
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <button
                onClick={() => router.push('/countries')}
                className="w-full text-left px-4 py-2 mt-4 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm"
              >
                + Rejoindre un pays
              </button>
            </>
          ) : (
            // Si utilisateur normal: afficher uniquement le pays actuel avec ses sous-menus
            <>
              <div className="flex items-center gap-2 mb-4 px-2">
                <span className="text-2xl">{country.flag_emoji}</span>
                <h3 className="text-lg font-bold text-white">{country.name}</h3>
              </div>
              <div className="space-y-1">
                <button
                  onClick={() => router.push(`/countries/${country.id}`)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                    isCurrentPage(`/countries/${country.id}`)
                      ? 'bg-white/10 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  Accueil
                </button>
                <button
                  onClick={() => router.push(`/countries/${country.id}/bunker`)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                    isCurrentPage(`/countries/${country.id}/bunker`)
                      ? 'bg-white/10 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/5'
                  }`}
                >
                  BK
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Main content avec animation */}
      <div className="flex-1 overflow-hidden">
        <div className="animate-fadeIn">
          {children}
        </div>
      </div>
    </div>
  );
}
