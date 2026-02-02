'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getCountryById, getUserCountries, CountryWithOwner } from '@/lib/countries';
import { RoleLevel } from '@/lib/roles';
import Header from '@/components/layout/Header';

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

  if (!country) {
    return (
      <div className="min-h-screen flex items-center justify-center relative z-10">
        <div className="text-center">
          <div className="text-5xl mb-4">❌</div>
          <p className="text-white font-medium">Pays introuvable</p>
        </div>
      </div>
    );
  }

  const isCurrentPage = (path: string) => pathname === path;

  return (
    <div className="min-h-screen relative z-10">
      <Header />
      
      <div className="flex pt-[73px]">
        {/* Sidebar */}
        <div className="w-64 min-h-[calc(100vh-73px)] glass border-r border-white/5 p-5 hidden lg:block">
          {/* Navigation globale */}
          <div className="space-y-1 mb-6">
            <button
              onClick={() => router.push('/profile')}
              className="w-full text-left px-3 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm"
            >
              Profil
            </button>

            {user && user.role.level >= RoleLevel.STAFF && (
              <button
                onClick={() => router.push('/admin')}
                className="w-full text-left px-3 py-2 rounded-xl text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm"
              >
                Administration
              </button>
            )}
          </div>

          {/* Section pays */}
          <div className="border-t border-white/10 pt-5">
            {user && user.role.level >= RoleLevel.STAFF ? (
              <>
                <h3 className="text-[11px] font-semibold text-white/40 uppercase tracking-wider mb-3 px-3">
                  Mes pays
                </h3>
                <div className="space-y-3">
                  {userCountries.map((c) => (
                    <div key={c.id} className="space-y-1">
                      <button
                        onClick={() => router.push(`/countries/${c.id}`)}
                        className={`w-full text-left px-3 py-2 rounded-xl transition-all flex items-center gap-2 ${
                          c.id === country.id
                            ? 'bg-primary/20 text-primary border border-primary/30'
                            : 'text-white/60 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <span className="text-lg">{c.flag_emoji}</span>
                        <span className="text-sm font-medium truncate">{c.name}</span>
                      </button>

                      {c.id === country.id && (
                        <div className="ml-6 space-y-0.5">
                          <button
                            onClick={() => router.push(`/countries/${c.id}`)}
                            className={`w-full text-left px-3 py-1.5 rounded-lg transition-all text-sm ${
                              isCurrentPage(`/countries/${c.id}`)
                                ? 'bg-white/10 text-white font-medium'
                                : 'text-white/50 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            Accueil
                          </button>
                          <button
                            onClick={() => router.push(`/countries/${c.id}/bunker`)}
                            className={`w-full text-left px-3 py-1.5 rounded-lg transition-all text-sm ${
                              isCurrentPage(`/countries/${c.id}/bunker`)
                                ? 'bg-white/10 text-white font-medium'
                                : 'text-white/50 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            Bunkers
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <button
                  onClick={() => router.push('/countries')}
                  className="w-full text-left px-3 py-2 mt-4 rounded-xl text-primary hover:bg-primary/10 transition-all text-sm font-medium"
                >
                  + Rejoindre un pays
                </button>
              </>
            ) : (
              <>
                <div className="flex items-center gap-2 mb-4 px-2">
                  <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center text-xl">
                    {country.flag_emoji}
                  </div>
                  <h3 className="text-base font-semibold text-white">{country.name}</h3>
                </div>
                <div className="space-y-0.5">
                  <button
                    onClick={() => router.push(`/countries/${country.id}`)}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-all text-sm ${
                      isCurrentPage(`/countries/${country.id}`)
                        ? 'bg-primary/20 text-primary font-medium border border-primary/30'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Accueil
                  </button>
                  <button
                    onClick={() => router.push(`/countries/${country.id}/bunker`)}
                    className={`w-full text-left px-3 py-2 rounded-xl transition-all text-sm ${
                      isCurrentPage(`/countries/${country.id}/bunker`)
                        ? 'bg-primary/20 text-primary font-medium border border-primary/30'
                        : 'text-white/60 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    Bunkers
                  </button>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Main content */}
        <div className="flex-1 overflow-hidden">
          <div className="animate-fadeUp">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
