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

    // Si l'utilisateur a un pays, rediriger vers le premier pays
    if (countries.length > 0) {
      router.push(`/countries/${countries[0].id}`);
    }
  };

  if (loading || loadingCountries) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white/60">Chargement...</div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  // Si aucun pays, rediriger vers la liste des pays
  if (userCountries.length === 0) {
    router.push('/countries');
    return null;
  }

  return null;
}
