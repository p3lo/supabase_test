import Account from '../components/Account';
import PlayWithDb from '../components/PlayWithDb';
import { supabase } from '../lib/supabaseClient';

function profile() {
  return (
    <div className="h-screen text-white bg-gray-800">
      <Account />
      <PlayWithDb />
    </div>
  );
}

export default profile;

export const getServerSideProps = async ({ req }) => {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  console.log(user);
  if (!user) {
    // If no user, redirect to index.
    return { props: {}, redirect: { destination: '/login', permanent: false } };
  }

  // if (user?.app_metadata?.role !== 'admin') {
  //   return { props: {}, redirect: { destination: '/', permanent: false } };
  // }

  return {
    props: {
      kkt: JSON.stringify('kkt'),
    },
  };
};
