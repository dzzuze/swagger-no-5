import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  const { schema } = await request.json();

  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
      },
      {
        status: 401,
      },
    );
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
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({
    success: true,
  });
}

export async function GET() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      {
        error: 'Unauthorized',
      },
      {
        status: 401,
      },
    );
  }

  const { data, error } = await supabase
    .from('saved_schemas')
    .select('schema')
    .eq('user_id', user.id)
    .single();

  if (error) {
    return NextResponse.json({ schema: null });
  }

  return NextResponse.json({
    schema: '',
  });
}
