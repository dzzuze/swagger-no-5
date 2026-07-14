'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';

export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => {
      setMounted(true);
    }, 0);

    return () => clearTimeout(id);
  }, []);
  if (!mounted) {
    return (
      <button className="rounded-md border border-gray-400 cursor-pointer p-2">
        <Moon size={20} />
      </button>
    );
  }

  return (
    <button
      className="rounded-md border border-gray-400 cursor-pointer p-2"
      onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
    >
      {resolvedTheme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
}
