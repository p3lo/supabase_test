import { useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      // console.log({ event, session });
      // Send session to /api/auth route to set the auth cookie.
      // NOTE: this is only needed if you're doing SSR (getServerSideProps)!

      fetch('/api/set-auth-cookie', {
        method: 'POST',
        headers: new Headers({ 'Content-Type': 'application/json' }),
        credentials: 'same-origin',
        body: JSON.stringify({ event, session }),
      }).then((res) => res.json());
    });

    return () => {
      authListener.unsubscribe();
    };
  }, []);
  return <Component {...pageProps} />;
}

export default MyApp;
