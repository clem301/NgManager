'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import GlassCard from '@/components/ui/GlassCard';
import GlassButton from '@/components/ui/GlassButton';
import GlassInput from '@/components/ui/GlassInput';
import { getCountryById } from '@/lib/countries';
import { getCountryBunkers, createBunker, updateBunker, deleteBunker, Bunker, BunkerStatus } from '@/lib/bunkers';

export default function CountryBunkerPage() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const [country, setCountry] = useState<any>(null);
  const [bunkers, setBunkers] = useState<Bunker[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBunker, setSelectedBunker] = useState<Bunker | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [rightClickPos, setRightClickPos] = useState<{ posX: number; posY: number } | null>(null);
  const [newBunker, setNewBunker] = useState({ x: 0, y: 0, name: '', status: 'vacant' as BunkerStatus });
  const [draggingBunker, setDraggingBunker] = useState<Bunker | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });

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

  const handleAddBunker = async () => {
    if (!newBunker.name.trim()) {
      alert('Le nom du bunker est requis');
      return;
    }

    // Utiliser rightClickPos si disponible, sinon (0, 0) par défaut
    const posX = rightClickPos?.posX ?? 0;
    const posY = rightClickPos?.posY ?? 0;

    const result = await createBunker(
      params.id as string,
      newBunker.x,
      newBunker.y,
      posX,
      posY,
      newBunker.status,
      newBunker.name
    );

    if (result.success) {
      loadData();
      setShowAddModal(false);
      setRightClickPos(null);
      setNewBunker({ x: 0, y: 0, name: '', status: 'vacant' });
    } else {
      alert(result.error);
    }
  };

  const handleUpdateBunker = async (status: BunkerStatus) => {
    if (!selectedBunker) return;

    const result = await updateBunker(selectedBunker.id, { status });

    if (result.success) {
      loadData();
      setSelectedBunker(null);
    } else {
      alert(result.error);
    }
  };

  const handleDeleteBunker = async () => {
    if (!selectedBunker) return;

    if (!confirm('Supprimer ce bunker ?')) return;

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

  // Canvas libre - pas de limites basées sur les bunkers
  const canvasWidth = 2000;
  const canvasHeight = 1200;

  return (
    <div className="flex-1 p-8">
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Bunker</h1>
            <p className="text-white/60">Construction des couloirs de {country.name}</p>
          </div>
          <GlassButton variant="primary" onClick={() => setShowAddModal(true)}>
            + Ajouter un bunker
          </GlassButton>
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

        {/* Canvas libre */}
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">Plan des couloirs</h2>
          <p className="text-sm text-white/60 mb-4">Clic droit pour ajouter • Glisser-déposer pour déplacer</p>
          <div className="overflow-auto bg-black/20 p-8 rounded-lg" style={{ minHeight: '600px' }}>
            <div
              className="relative"
              style={{
                width: `${canvasWidth}px`,
                height: `${canvasHeight}px`
              }}
              onContextMenu={(e) => {
                e.preventDefault();
                // Calculer la position visuelle où placer le bunker (libre, pas sur grille)
                const rect = e.currentTarget.getBoundingClientRect();
                const posX = e.clientX - rect.left - 35;
                const posY = e.clientY - rect.top - 35;

                // Ouvrir le modal d'ajout avec la position pré-calculée
                setRightClickPos({ posX, posY });
                setShowAddModal(true);
              }}
              onMouseMove={(e) => {
                if (draggingBunker) {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const newPosX = e.clientX - rect.left - dragOffset.x;
                  const newPosY = e.clientY - rect.top - dragOffset.y;

                  // Mettre à jour la position visuellement
                  const element = document.getElementById(`bunker-${draggingBunker.id}`);
                  if (element) {
                    element.style.left = `${newPosX}px`;
                    element.style.top = `${newPosY}px`;
                  }
                }
              }}
              onMouseUp={() => {
                if (draggingBunker) {
                  // Sauvegarder la nouvelle position visuelle (pos_x, pos_y)
                  const element = document.getElementById(`bunker-${draggingBunker.id}`);
                  if (element) {
                    const posX = parseInt(element.style.left);
                    const posY = parseInt(element.style.top);

                    updateBunker(draggingBunker.id, { pos_x: posX, pos_y: posY }).then(() => {
                      loadData();
                    });
                  }
                  setDraggingBunker(null);
                }
              }}
            >
              {/* Grille de fond */}
              <div className="absolute inset-0 pointer-events-none" style={{
                backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)',
                backgroundSize: '40px 40px'
              }} />

              {/* Bunkers */}
              {bunkers.map((bunker) => (
                <button
                  key={bunker.id}
                  id={`bunker-${bunker.id}`}
                  onClick={(e) => {
                    if (!draggingBunker) {
                      e.stopPropagation();
                      setSelectedBunker(bunker);
                    }
                  }}
                  onMouseDown={(e) => {
                    if (e.button === 0) { // Clic gauche uniquement
                      const rect = e.currentTarget.getBoundingClientRect();
                      setDragOffset({
                        x: e.clientX - rect.left - 35,
                        y: e.clientY - rect.top - 35
                      });
                      setDraggingBunker(bunker);
                    }
                  }}
                  className="absolute flex flex-col items-center justify-center p-3 rounded-lg border-2 transition-all hover:scale-110 hover:z-10"
                  style={{
                    left: `${bunker.pos_x}px`,
                    top: `${bunker.pos_y}px`,
                    width: '70px',
                    height: '70px',
                    backgroundColor: `${getStatusColor(bunker.status)}40`,
                    borderColor: getStatusColor(bunker.status),
                    boxShadow: `0 0 20px ${getStatusColor(bunker.status)}30`,
                    cursor: draggingBunker?.id === bunker.id ? 'grabbing' : 'grab',
                  }}
                >
                  <div className="text-xs text-white font-semibold truncate w-full text-center pointer-events-none">{bunker.name}</div>
                  <div className="w-2 h-2 rounded-full mt-1 pointer-events-none" style={{ backgroundColor: getStatusColor(bunker.status) }} />
                </button>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Légende */}
        <GlassCard className="p-4">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: getStatusColor('vacant') }} />
              <span className="text-sm text-white/60">Vacant</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: getStatusColor('paid') }} />
              <span className="text-sm text-white/60">Payé</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 rounded" style={{ backgroundColor: getStatusColor('occupied') }} />
              <span className="text-sm text-white/60">Occupé</span>
            </div>
          </div>
        </GlassCard>

        {/* Liste des bunkers */}
        <GlassCard className="p-6">
          <h2 className="text-xl font-bold text-white mb-4">Liste des bunkers ({bunkers.length})</h2>
          <div className="space-y-2 max-h-96 overflow-auto">
            {bunkers.length === 0 ? (
              <div className="text-center text-white/60 py-8">
                Aucun bunker. Commence à construire ton couloir!
              </div>
            ) : (
              bunkers.map((bunker) => (
                <button
                  key={bunker.id}
                  onClick={() => setSelectedBunker(bunker)}
                  className="w-full glass-card p-4 flex items-center justify-between hover:bg-white/5 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: getStatusColor(bunker.status) }} />
                    <div className="text-left">
                      <div className="text-white font-semibold">{bunker.name}</div>
                      <div className="text-white/60 text-sm">({bunker.x}, {bunker.y})</div>
                    </div>
                  </div>
                  <div className="text-sm font-semibold" style={{ color: getStatusColor(bunker.status) }}>
                    {getStatusText(bunker.status)}
                  </div>
                </button>
              ))
            )}
          </div>
        </GlassCard>
      </div>

      {/* Modal ajout */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setShowAddModal(false)}>
          <div onClick={e => e.stopPropagation()}>
            <GlassCard className="p-6 max-w-md w-full m-4">
              <h3 className="text-xl font-bold text-white mb-4">Nouveau bunker</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Nom</label>
                  <GlassInput
                    value={newBunker.name}
                    onChange={(e) => setNewBunker({ ...newBunker, name: e.target.value })}
                    placeholder="Ex: BK-A1, Couloir Nord..."
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-white/60 mb-2">X</label>
                    <GlassInput
                      type="number"
                      value={newBunker.x.toString()}
                      onChange={(e) => setNewBunker({ ...newBunker, x: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-white/60 mb-2">Y</label>
                    <GlassInput
                      type="number"
                      value={newBunker.y.toString()}
                      onChange={(e) => setNewBunker({ ...newBunker, y: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Statut</label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['vacant', 'paid', 'occupied'] as BunkerStatus[]).map((status) => (
                      <button
                        key={status}
                        onClick={() => setNewBunker({ ...newBunker, status })}
                        className={`p-3 rounded-lg border-2 transition-all ${
                          newBunker.status === status
                            ? `border-2`
                            : 'border-white/10 hover:border-white/30'
                        }`}
                        style={{
                          borderColor: newBunker.status === status ? getStatusColor(status) : undefined,
                          backgroundColor: newBunker.status === status ? `${getStatusColor(status)}20` : undefined,
                        }}
                      >
                        <div className="text-sm text-white">{getStatusText(status)}</div>
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex gap-2 pt-2">
                  <GlassButton variant="secondary" onClick={() => setShowAddModal(false)} className="flex-1">
                    Annuler
                  </GlassButton>
                  <GlassButton variant="primary" onClick={handleAddBunker} className="flex-1">
                    Créer
                  </GlassButton>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {/* Modal détails */}
      {selectedBunker && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={() => setSelectedBunker(null)}>
          <div onClick={e => e.stopPropagation()}>
            <GlassCard className="p-6 max-w-md w-full m-4">
              <h3 className="text-xl font-bold text-white mb-4">{selectedBunker.name}</h3>
              <div className="space-y-4">
                <div>
                  <div className="text-sm text-white/60">Position</div>
                  <div className="text-white font-mono">({selectedBunker.x}, {selectedBunker.y})</div>
                </div>
                <div>
                  <div className="text-sm text-white/60">Statut</div>
                  <div className="font-semibold" style={{ color: getStatusColor(selectedBunker.status) }}>
                    {getStatusText(selectedBunker.status)}
                  </div>
                </div>
                {selectedBunker.occupant && (
                  <div>
                    <div className="text-sm text-white/60">Occupant</div>
                    <div className="text-white">{selectedBunker.occupant.username}</div>
                  </div>
                )}
                <div>
                  <div className="text-sm text-white/60 mb-2">Changer le statut</div>
                  <div className="grid grid-cols-3 gap-2">
                    {(['vacant', 'paid', 'occupied'] as BunkerStatus[]).map((status) => (
                      <GlassButton
                        key={status}
                        variant={status === selectedBunker.status ? 'primary' : 'secondary'}
                        onClick={() => handleUpdateBunker(status)}
                        className="text-sm"
                      >
                        {getStatusText(status)}
                      </GlassButton>
                    ))}
                  </div>
                </div>
                <GlassButton variant="secondary" onClick={handleDeleteBunker} className="w-full">
                  Supprimer
                </GlassButton>
              </div>
            </GlassCard>
          </div>
        </div>
      )}
    </div>
  );
}
