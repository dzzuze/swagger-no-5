import { createClient } from '@/lib/supabase-server';
import { redirect } from 'next/navigation';
import HistoryList from '@/components/HistoryList';

export default async function HistoryPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/sign-in');
  }

  const { data: history, error } = await supabase
    .from('history')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  if (error) {
    console.error(error);
    return (
      <div className="text-red-500 font-medium">
        Failed to load request history
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Request History</h1>
      <HistoryList history={history || []} />
    </div>
  );
}
