'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import { getCountryById } from '@/lib/countries';

export default function CountryBunkerPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const [country, setCountry] = useState<any>(null);
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

    const countryData = await getCountryById(params.id as string);
    setCountry(countryData);
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
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Bunker</h1>
          <p className="text-white/60">Gestion des bunkers de {country.name}</p>
        </div>

        <GlassCard className="p-8 text-center">
          <div className="text-white/60">Page BK en construction</div>
        </GlassCard>
      </div>
    </div>
  );
}
