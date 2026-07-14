'use client';

import { useEffect, useState } from 'react';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import Link from 'next/link';
import { signOutAction } from '@/app/actions/auth';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';

export default function Header() {
  const router = useRouter();
  const [isAuth, setIsAuth] = useState<boolean>(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setIsAuth(!!session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuth(!!session);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await signOutAction();
    router.refresh();
  };

  return (
    <header className="flex justify-between gap-6 items-center px-6 py-5 border-b border-gray-400 ">
      <nav className="flex gap-10 items-center">
        <div className="text-2xl font-bold">SwaggerAPI</div>
        {isAuth && (
          <ul className="flex items-center gap-6 text-xl">
            <li>
              <Link href="/swagger">Swagger</Link>
            </li>
            <li>
              <Link href="/history">History</Link>
            </li>
            <li>
              <Link href="/about">About</Link>
            </li>
          </ul>
        )}
      </nav>
      <div className="flex items-center gap-4">
        <ThemeToggle />
        {isAuth && (
          <button
            onClick={handleSignOut}
            className="text-base font-medium px-4 py-1.5 border border-purple-500 rounded-xl hover:bg-purple-700 hover:text-white transition-all cursor-pointer"
          >
            Sign Out
          </button>
        )}
      </div>
    </header>
  );
}
/**
 * <ul className="flex items-center gap-6 text-xl">
          <li>
            <Link href="/swagger">Swagger</Link>
          </li>
          <li>
            <Link href="/history">History</Link>
          </li>
          <li>
            <Link href="/about">About</Link>
          </li>
        </ul>
 */
