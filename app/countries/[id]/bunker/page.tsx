'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import { getCountryById } from '@/lib/countries';
import { getCountryBunkers, createBunker, updateBunker, deleteBunker, Bunker, BunkerStatus } from '@/lib/bunkers';

const GRID_SIZE = 20; // 20x20 grille

export default function CountryBunkerPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const [country, setCountry] = useState<any>(null);
  const [bunkers, setBunkers] = useState<Bunker[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBunker, setSelectedBunker] = useState<Bunker | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newBunkerPos, setNewBunkerPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!user) {
      router.push('/login');
      return;
    }

    loadData();
  }, [params.id, user, router]);

  const loadData = async () => {
    if (!user || !params.id) return;

    const [countryData, bunkersData] = await Promise.all([
      getCountryById(params.id as string),
      getCountryBunkers(params.id as string),
    ]);

    setCountry(countryData);
    setBunkers(bunkersData);
    setLoading(false);
  };

  const getBunkerAt = (x: number, y: number) => {
    return bunkers.find(b => b.x === x && b.y === y);
  };

  const handleCellClick = (x: number, y: number) => {
    const bunker = getBunkerAt(x, y);
    if (bunker) {
      setSelectedBunker(bunker);
    } else {
      setNewBunkerPos({ x, y });
      setShowAddModal(true);
    }
  };

  const handleAddBunker = async (status: BunkerStatus, name?: string) => {
    const result = await createBunker(
      params.id as string,
      newBunkerPos.x,
      newBunkerPos.y,
      status,
      name
    );

    if (result.success) {
      loadData();
      setShowAddModal(false);
    } else {
      alert(result.error);
    }
  };

  const handleUpdateBunker = async (status: BunkerStatus, name?: string) => {
    if (!selectedBunker) return;

    const result = await updateBunker(selectedBunker.id, { status, name });

    if (result.success) {
      loadData();
      setSelectedBunker(null);
    } else {
      alert(result.error);
    }
  };

  const handleDeleteBunker = async () => {
    if (!selectedBunker) return;

    const result = await deleteBunker(selectedBunker.id);

    if (result.success) {
      loadData();
      setSelectedBunker(null);
    } else {
      alert(result.error);
    }
  };

  const getStatusColor = (status: BunkerStatus) => {
    switch (status) {
      case 'vacant': return '#6b7280';
      case 'paid': return '#eab308';
      case 'occupied': return '#22c55e';
    }
  };

  const getStatusText = (status: BunkerStatus) => {
    switch (status) {
      case 'vacant': return 'Vacant';
      case 'paid': return 'Payé';
      case 'occupied': return 'Occupé';
    }
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
      <div className="max-w-7xl mx-auto space-y-6">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Bunker</h1>
          <p className="text-white/60">Gestion des bunkers de {country.name}</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <GlassCard className="p-4">
            <div className="text-2xl font-bold text-gray-400">{bunkers.filter(b => b.status === 'vacant').length}</div>
            <div className="text-sm text-white/60">Vacants</div>
          </GlassCard>
          <GlassCard className="p-4">
            <div className="text-2xl font-bold text-yellow-500">{bunkers.filter(b => b.status === 'paid').length}</div>
            <div className="text-sm text-white/60">Payés</div>
          </GlassCard>
          <GlassCard className="p-4">
            <div className="text-2xl font-bold text-green-500">{bunkers.filter(b => b.status === 'occupied').length}</div>
            <div className="text-sm text-white/60">Occupés</div>
          </GlassCard>
        </div>

        {/* Grille interactive */}
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">Carte des bunkers</h2>
          <div className="overflow-auto">
            <div
              className="inline-grid gap-1"
              style={{
                gridTemplateColumns: `repeat(${GRID_SIZE}, minmax(0, 1fr))`,
              }}
            >
              {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, index) => {
                const x = index % GRID_SIZE;
                const y = Math.floor(index / GRID_SIZE);
                const bunker = getBunkerAt(x, y);

                return (
                  <button
                    key={`${x}-${y}`}
                    onClick={() => handleCellClick(x, y)}
                    className="w-8 h-8 border border-white/10 hover:border-white/30 transition-all relative group"
                    style={{
                      backgroundColor: bunker ? `${getStatusColor(bunker.status)}30` : 'rgba(255,255,255,0.02)',
                    }}
                    title={bunker ? `(${x},${y}) - ${getStatusText(bunker.status)}${bunker.name ? ` - ${bunker.name}` : ''}` : `(${x},${y})`}
                  >
                    {bunker && (
                      <div
                        className="absolute inset-0 flex items-center justify-center"
                        style={{ color: getStatusColor(bunker.status) }}
                      >
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: getStatusColor(bunker.status) }} />
                      </div>
                    )}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-black/90 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                      ({x},{y})
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </GlassCard>

        {/* Légende */}
        <GlassCard className="p-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: `${getStatusColor('vacant')}50` }} />
              <span className="text-sm text-white/60">Vacant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: `${getStatusColor('paid')}50` }} />
              <span className="text-sm text-white/60">Payé</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: `${getStatusColor('occupied')}50` }} />
              <span className="text-sm text-white/60">Occupé</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Modal ajout bunker */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
          <GlassCard className="p-6 max-w-md w-full m-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-white mb-4">
              Ajouter un bunker ({newBunkerPos.x}, {newBunkerPos.y})
            </h3>
            <div className="space-y-3">
              <GlassButton
                variant="secondary"
                onClick={() => handleAddBunker('vacant')}
                className="w-full"
              >
                Vacant
              </GlassButton>
              <GlassButton
                variant="primary"
                onClick={() => handleAddBunker('paid', `BK-${newBunkerPos.x}-${newBunkerPos.y}`)}
                className="w-full"
              >
                Payé
              </GlassButton>
              <GlassButton
                variant="primary"
                onClick={() => handleAddBunker('occupied', `BK-${newBunkerPos.x}-${newBunkerPos.y}`)}
                className="w-full"
              >
                Occupé
              </GlassButton>
            </div>
          </GlassCard>
        </div>
      )}

      {/* Modal détails bunker */}
      {selectedBunker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedBunker(null)}>
          <GlassCard className="p-6 max-w-md w-full m-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-white mb-4">
              Bunker ({selectedBunker.x}, {selectedBunker.y})
            </h3>
            <div className="space-y-4">
              <div>
                <div className="text-sm text-white/60">Statut</div>
                <div className="text-white font-semibold" style={{ color: getStatusColor(selectedBunker.status) }}>
                  {getStatusText(selectedBunker.status)}
                </div>
              </div>
              {selectedBunker.name && (
                <div>
                  <div className="text-sm text-white/60">Nom</div>
                  <div className="text-white">{selectedBunker.name}</div>
                </div>
              )}
              {selectedBunker.occupant && (
                <div>
                  <div className="text-sm text-white/60">Occupant</div>
                  <div className="text-white">{selectedBunker.occupant.username}</div>
                </div>
              )}
              <div className="flex gap-2">
                <GlassButton
                  variant="secondary"
                  onClick={() => handleUpdateBunker('vacant')}
                  className="flex-1"
                >
                  Vacant
                </GlassButton>
                <GlassButton
                  variant="primary"
                  onClick={() => handleUpdateBunker('paid', selectedBunker.name)}
                  className="flex-1"
                >
                  Payé
                </GlassButton>
                <GlassButton
                  variant="primary"
                  onClick={() => handleUpdateBunker('occupied', selectedBunker.name)}
                  className="flex-1"
                >
                  Occupé
                </GlassButton>
              </div>
              <GlassButton
                variant="secondary"
                onClick={handleDeleteBunker}
                className="w-full"
              >
                Supprimer
              </GlassButton>
            </div>
          </GlassCard>
        </div>
      )}
    </div>
  );
}
