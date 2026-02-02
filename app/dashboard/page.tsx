'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { getUserCountries, CountryWithOwner } from '@/lib/countries';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();
  const [userCountries, setUserCountries] = useState<CountryWithOwner[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
      return;
    }

    if (user) {
      loadUserCountries();
    }
  }, [user, loading, router]);

  const loadUserCountries = async () => {
    if (!user) return;

    const countries = await getUserCountries(user.id);
    setUserCountries(countries);
    setLoadingCountries(false);

    if (countries.length > 0) {
      router.push(`/countries/${countries[0].id}`);
    }
  };

  if (loading || loadingCountries) {
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

  if (!user) {
    return null;
  }

  if (userCountries.length === 0) {
    router.push('/countries');
    return null;
  }

  return null;
}
