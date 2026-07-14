import { supabase } from '@/lib/supabase';

export default async function saveSchema(schema: string) {
  const {
    data: { user },
  } = await supabase.auth.getUser();
  console.log('Current user:', user);
  if (!user) {
    throw new Error('User is not authenticated');
  }

  const { error } = await supabase.from('saved_schemas').upsert(
    {
      user_id: user.id,
      schema,
    },
    {
      onConflict: 'user_id',
    },
  );

  if (error) {
    throw error;
  }
}
