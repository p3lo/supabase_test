import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function Account() {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [website, setWebsite] = useState(null);
  const [avatar_url, setAvatarUrl] = useState(null);
  const [session, setSession] = useState(null);
  const router = useRouter();

  useEffect(() => {
    getProfile();
    const session = supabase.auth.session();
    setSession(session);
    console.log(session);
  }, []);

  async function getProfile() {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
        setWebsite(data.website);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ username, website, avatar_url }) {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center py-10 mx-auto space-y-5 text-white bg-gray-800">
      <div className="grid grid-cols-2 space-x-4">
        <label className="items-end text-right" htmlFor="email">
          Email
        </label>
        <input className="bg-gray-800 " id="email" type="text" defaultValue={session?.user.email} disabled />
      </div>
      <div className="grid grid-cols-2 space-x-4">
        <label className="items-end text-right " htmlFor="username">
          Name
        </label>
        <input
          className="bg-gray-800 border outline-none"
          id="username"
          type="text"
          value={username || ''}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-2 space-x-4">
        <label className="items-end text-right " htmlFor="website">
          Website
        </label>
        <input
          className="bg-gray-800 border outline-none"
          id="website"
          type="website"
          value={website || ''}
          onChange={(e) => setWebsite(e.target.value)}
        />
      </div>

      <div className="flex flex-col space-y-4">
        <button
          className="p-3 border"
          onClick={() => updateProfile({ username, website, avatar_url })}
          disabled={loading}
        >
          {loading ? 'Loading ...' : 'Update'}
        </button>
        <button
          className="p-3 border"
          onClick={() => {
            supabase.auth.signOut();
            router.push('/');
          }}
        >
          Sign Out
        </button>
      </div>

      <div></div>
    </div>
  );
}
