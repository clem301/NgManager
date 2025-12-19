'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import { getCountryById, getCountryMembers } from '@/lib/countries';

export default function CountryPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const [country, setCountry] = useState<any>(null);
  const [members, setMembers] = useState<any[]>([]);
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

    const [countryData, membersData] = await Promise.all([
      getCountryById(params.id as string),
      getCountryMembers(params.id as string),
    ]);

    setCountry(countryData);
    setMembers(membersData);
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-white/60">Chargement...</div>
      </div>
    );
  }

  if (!country) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-white">Pays introuvable</div>
      </div>
    );
  }

  return (
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
  );
}
