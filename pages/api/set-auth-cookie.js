import { supabase } from '../../lib/supabaseClient';

const handler = async (req, res) => {
  supabase.auth.api.setAuthCookie(req, res);
};

export default handler;
