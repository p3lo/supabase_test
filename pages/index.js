import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import Auth from '../components/Auth';
import Account from '../components/Account';
import Link from 'next/link';

export default function Home() {
  const [session, setSession] = useState(null);

  useEffect(() => {
    setSession(supabase.auth.session());

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
  }, []);

  return (
    <div className="flex items-center justify-center w-full h-screen space-x-2 text-white bg-gray-800">
      <Link href="/login">
        <a className="p-3 border">To Login Page</a>
      </Link>
      <Link href="/profile">
        <a className="p-3 border">To Profile Page</a>
      </Link>
    </div>
  );
}
