import { createClient } from '@/lib/supabase-server';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const supabase = await createClient();

    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { method, url, headers, body: requestBody, response } = body;

    if (!method || !url) {
      return NextResponse.json(
        { error: 'Method and URL are required' },
        { status: 400 },
      );
    }

    const { data, error } = await supabase
      .from('history')
      .insert({
        user_id: user.id,
        method,
        url,
        headers: headers || {},
        body: requestBody,
        response,
      })
      .select()
      .single();

    if (error) {
      console.error('Database insert error:', error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
  } catch (catchError: unknown) {
    const errorMessage =
      catchError instanceof Error
        ? catchError.message
        : 'Internal Server Error';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
