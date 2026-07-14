import { supabase } from '@/lib/supabase';

export default async function loadSchema() {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from('saved_schemas')
    .select('schema')
    .eq('user_id', user.id)
    .single();

  if (error) {
    return null;
  }

  return data.schema;
}
