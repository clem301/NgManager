'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import Badge from '@/components/ui/Badge';
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
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="text-white font-medium">Pays introuvable</div>
      </div>
    );
  }

  return (
    <div className="flex-1 p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header du pays */}
        <GlassCard padding="lg">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center text-4xl">
              {country.flag_emoji}
            </div>
            <div>
              <h1 className="text-2xl font-bold gradient-text-orange text-glow-orange">
                Page de {country.name.toLowerCase()}
              </h1>
              <div className="w-16 h-1 bg-accent rounded-full mt-2" />
            </div>
          </div>
          <p className="text-white/60 text-sm">
            Fondé par {country.owner?.username}
          </p>
          {country.description && (
            <p className="text-white/70 mt-4 pt-4 border-t border-white/10">{country.description}</p>
          )}
          
          {/* Stats */}
          <div className="flex items-center gap-6 mt-6 pt-6 border-t border-white/10">
            <div>
              <div className="text-2xl font-bold text-white">{members.length}</div>
              <div className="text-xs text-white/40 uppercase tracking-wide">Membres</div>
            </div>
            <div className="w-px h-10 bg-white/10" />
            <div>
              <div className="text-2xl font-bold text-green-400">0</div>
              <div className="text-xs text-white/40 uppercase tracking-wide">Bunkers</div>
            </div>
          </div>
        </GlassCard>

        {/* Liste des membres */}
        <div>
          <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
            Membres
            <Badge variant="default" size="sm">{members.length}</Badge>
          </h2>
          
          <div className="glass rounded-xl overflow-hidden">
            {members.map((member, index) => (
              <div
                key={member.id}
                className={`p-4 flex items-center justify-between ${
                  index !== members.length - 1 ? 'border-b border-white/5' : ''
                } hover:bg-white/5 transition-colors`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                    <span className="text-sm font-semibold text-white/70">
                      {member.user?.username?.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <div className="font-medium text-white">
                      {member.user?.username}
                    </div>
                    <div className="text-white/40 text-xs">{member.user?.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge 
                    variant={
                      member.user?.role_name === 'Fondateur' ? 'owner' :
                      member.user?.role_name === 'Staff' ? 'staff' :
                      member.user?.role_name === 'Président' ? 'president' :
                      'member'
                    }
                    size="sm"
                  >
                    {member.user?.role_name}
                  </Badge>
                  <span className="text-white/40 text-xs px-2 py-1 bg-white/5 rounded-full">
                    {member.country_role}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
