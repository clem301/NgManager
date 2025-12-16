import { supabase } from './supabase';

export interface Country {
  id: string;
  name: string;
  description?: string;
  owner_id: string;
  flag_emoji: string;
  color: string;
  member_count: number;
  created_at: string;
  updated_at: string;
}

export interface CountryMember {
  id: string;
  country_id: string;
  user_id: string;
  country_role: string;
  joined_at: string;
}

export interface CountryWithOwner extends Country {
  owner?: {
    id: string;
    username: string;
    email: string;
  };
}

/**
 * Créer un nouveau pays
 */
export async function createCountry(
  name: string,
  description: string,
  ownerId: string,
  flagEmoji: string = '🏴',
  color: string = '#3b82f6'
): Promise<{ success: boolean; country?: Country; error?: string }> {
  try {
    // Créer le pays
    const { data: country, error: countryError } = await supabase
      .from('countries')
      .insert([{
        name,
        description,
        owner_id: ownerId,
        flag_emoji: flagEmoji,
        color,
      }])
      .select()
      .single();

    if (countryError) {
      console.error('Error creating country:', countryError);
      return { success: false, error: 'Erreur lors de la création du pays' };
    }

    // Ajouter automatiquement le créateur comme membre
    const { error: memberError } = await supabase
      .from('country_members')
      .insert([{
        country_id: country.id,
        user_id: ownerId,
        country_role: 'fondateur',
      }]);

    if (memberError) {
      console.error('Error adding owner as member:', memberError);
    }

    return { success: true, country };
  } catch (error) {
    console.error('Error creating country:', error);
    return { success: false, error: 'Erreur lors de la création du pays' };
  }
}

/**
 * Récupérer tous les pays
 */
export async function getAllCountries(): Promise<CountryWithOwner[]> {
  try {
    const { data, error } = await supabase
      .from('countries')
      .select(`
        *,
        owner:users!countries_owner_id_fkey(id, username, email)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching countries:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching countries:', error);
    return [];
  }
}

/**
 * Récupérer un pays par son ID
 */
export async function getCountryById(countryId: string): Promise<CountryWithOwner | null> {
  try {
    const { data, error } = await supabase
      .from('countries')
      .select(`
        *,
        owner:users!countries_owner_id_fkey(id, username, email)
      `)
      .eq('id', countryId)
      .single();

    if (error) {
      console.error('Error fetching country:', error);
      return null;
    }

    return data;
  } catch (error) {
    console.error('Error fetching country:', error);
    return null;
  }
}

/**
 * Récupérer les pays d'un utilisateur
 */
export async function getUserCountries(userId: string): Promise<CountryWithOwner[]> {
  try {
    const { data, error } = await supabase
      .from('country_members')
      .select(`
        country:countries(
          *,
          owner:users!countries_owner_id_fkey(id, username, email)
        )
      `)
      .eq('user_id', userId);

    if (error) {
      console.error('Error fetching user countries:', error);
      return [];
    }

    return (data?.map(item => item.country).filter(Boolean) as unknown as CountryWithOwner[]) || [];
  } catch (error) {
    console.error('Error fetching user countries:', error);
    return [];
  }
}

/**
 * Récupérer les membres d'un pays
 */
export async function getCountryMembers(countryId: string) {
  try {
    const { data, error } = await supabase
      .from('country_members')
      .select(`
        *,
        user:users(id, username, email, role_name, role_emoji, role_color)
      `)
      .eq('country_id', countryId)
      .order('joined_at', { ascending: true });

    if (error) {
      console.error('Error fetching country members:', error);
      return [];
    }

    return data || [];
  } catch (error) {
    console.error('Error fetching country members:', error);
    return [];
  }
}

/**
 * Rejoindre un pays
 */
export async function joinCountry(
  countryId: string,
  userId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('country_members')
      .insert([{
        country_id: countryId,
        user_id: userId,
        country_role: 'membre',
      }]);

    if (error) {
      console.error('Error joining country:', error);
      return { success: false, error: 'Erreur lors de l\'adhésion au pays' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error joining country:', error);
    return { success: false, error: 'Erreur lors de l\'adhésion au pays' };
  }
}

/**
 * Quitter un pays
 */
export async function leaveCountry(
  countryId: string,
  userId: string
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('country_members')
      .delete()
      .eq('country_id', countryId)
      .eq('user_id', userId);

    if (error) {
      console.error('Error leaving country:', error);
      return { success: false, error: 'Erreur lors du départ du pays' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error leaving country:', error);
    return { success: false, error: 'Erreur lors du départ du pays' };
  }
}

/**
 * Mettre à jour un pays
 */
export async function updateCountry(
  countryId: string,
  updates: Partial<Pick<Country, 'name' | 'description' | 'flag_emoji' | 'color'>>
): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('countries')
      .update(updates)
      .eq('id', countryId);

    if (error) {
      console.error('Error updating country:', error);
      return { success: false, error: 'Erreur lors de la mise à jour du pays' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error updating country:', error);
    return { success: false, error: 'Erreur lors de la mise à jour du pays' };
  }
}

/**
 * Supprimer un pays
 */
export async function deleteCountry(countryId: string): Promise<{ success: boolean; error?: string }> {
  try {
    const { error } = await supabase
      .from('countries')
      .delete()
      .eq('id', countryId);

    if (error) {
      console.error('Error deleting country:', error);
      return { success: false, error: 'Erreur lors de la suppression du pays' };
    }

    return { success: true };
  } catch (error) {
    console.error('Error deleting country:', error);
    return { success: false, error: 'Erreur lors de la suppression du pays' };
  }
}
