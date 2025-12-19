'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import { getCountryById, getCountryMembers, getUserCountries, CountryWithOwner } from '@/lib/countries';
import { RoleLevel } from '@/lib/roles';

export default function CountryPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const [country, setCountry] = useState<CountryWithOwner | null>(null);
  const [members, setMembers] = useState<any[]>([]);
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

    const [countryData, membersData, userCountriesData] = await Promise.all([
      getCountryById(params.id as string),
      getCountryMembers(params.id as string),
      getUserCountries(user.id),
    ]);

    setCountry(countryData);
    setMembers(membersData);
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

  const isMember = members.some(m => m.user_id === user?.id);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 p-6 space-y-6">
        <div className="space-y-2">
          <h2 className="text-xl font-bold text-white mb-4">Navigation</h2>

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

        <div className="border-t border-white/10 pt-6">
          <h3 className="text-sm font-semibold text-white/40 mb-3">MES PAYS</h3>
          <div className="space-y-1">
            {userCountries.map((c) => (
              <button
                key={c.id}
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
                <span className="text-sm truncate">{c.name}</span>
              </button>
            ))}
          </div>

          {user && user.role.level >= RoleLevel.STAFF && (
            <button
              onClick={() => router.push('/countries')}
              className="w-full text-left px-4 py-2 mt-2 rounded-lg text-white/60 hover:text-white hover:bg-white/5 transition-all text-sm"
            >
              + Rejoindre un pays
            </button>
          )}
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        <div className="max-w-6xl mx-auto space-y-8">
          {/* Header */}
          <div
            className="p-8 rounded-glass border-2"
            style={{
              backgroundColor: `${country.color}10`,
              borderColor: `${country.color}50`,
            }}
          >
            <div className="flex items-center gap-4 mb-4">
              <span className="text-6xl">{country.flag_emoji}</span>
              <div>
                <h1 className="text-4xl font-bold text-white">{country.name}</h1>
                <p className="text-white/60">Fondé par {country.owner?.username}</p>
              </div>
            </div>
            {country.description && (
              <p className="text-white/70 mt-4">{country.description}</p>
            )}
          </div>

          {/* Members */}
          <GlassCard className="p-6">
            <h2 className="text-2xl font-bold text-white mb-6">
              Membres ({members.length})
            </h2>
            <div className="space-y-3">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="glass-card p-4 flex items-center justify-between"
                >
                  <div>
                    <div className="text-white font-semibold">
                      {member.user?.username}
                    </div>
                    <div className="text-white/60 text-sm">{member.user?.email}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{
                        backgroundColor: `${member.user?.role_color}20`,
                        color: member.user?.role_color,
                        border: `1px solid ${member.user?.role_color}50`,
                      }}
                    >
                      {member.user?.role_name}
                    </span>
                    <span className="text-white/40 text-xs">
                      {member.country_role}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
