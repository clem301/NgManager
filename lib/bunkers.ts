import { supabase } from './supabase';

export type BunkerStatus = 'vacant' | 'paid' | 'occupied';

export interface Bunker {
  id: string;
  country_id: string;
  x: number; // Coordonnée info (texte)
  y: number; // Coordonnée info (texte)
  pos_x: number; // Position visuelle sur canvas
  pos_y: number; // Position visuelle sur canvas
  status: BunkerStatus;
  name?: string;
  occupant_id?: string;
  occupant?: {
    id: string;
    username: string;
    email: string;
  };
  created_at: string;
  updated_at: string;
}

/**
 * Récupérer tous les bunkers d'un pays
 */
export async function getCountryBunkers(countryId: string): Promise<Bunker[]> {
  try {
    const { data, error } = await supabase
      .from('bunkers')
      .select(`
        *,
        occupant:users(id, username, email)
      `)
      .eq('country_id', countryId)
      .order('y', { ascending: true })
      .order('x', { ascending: true });

    if (error) {
      console.error('Error fetching bunkers:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching bunkers:', error);
    return [];
  }
}

/**
 * Créer un nouveau bunker
 */
export async function createBunker(
  countryId: string,
  x: number,
  y: number,
  posX: number,
  posY: number,
  status: BunkerStatus = 'vacant',
  name?: string,
  occupantId?: string
): Promise<{ success: boolean; bunker?: Bunker; error?: string }> {
  try {
    const { data, error} = await supabase
      .from('bunkers')
      .insert([{
        country_id: countryId,
        x,
        y,
        pos_x: posX,
        pos_y: posY,
        status,
        name,
        occupant_id: occupantId,
      }])
      .select()
      .single();

    if (error) {
      console.error('Error creating bunker:', error);
      return { success: false, error: 'Erreur lors de la création du bunker' };
    }

    return { success: true, bunker: data };
  } catch (error) {
    console.error('Error creating bunker:', error);
    return { success: false, error: 'Erreur lors de la création du bunker' };
  }
}

/**
 * Mettre à jour un bunker
 */
export async function updateBunker(
  bunkerId: string,
  updates: Partial<Pick<Bunker, 'x' | 'y' | 'pos_x' | 'pos_y' | 'status' | 'name' | 'occupant_id'>>
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('bunkers')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', bunkerId);

    if (error) {
      console.error('Error updating bunker:', error);
      return { success: false, error: 'Erreur lors de la mise à jour du bunker' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating bunker:', error);
    return { success: false, error: 'Erreur lors de la mise à jour du bunker' };
  }
}

/**
 * Supprimer un bunker
 */
export async function deleteBunker(bunkerId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('bunkers')
      .delete()
      .eq('id', bunkerId);

    if (error) {
      console.error('Error deleting bunker:', error);
      return { success: false, error: 'Erreur lors de la suppression du bunker' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting bunker:', error);
    return { success: false, error: 'Erreur lors de la suppression du bunker' };
  }
}
