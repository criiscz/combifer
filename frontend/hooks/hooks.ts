import { useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Cookie from 'universal-cookie';

export const useLoginStatus = () => {
  const cookies = useMemo(() => new Cookie(), []);
  const router = useRouter();

  useEffect(() => {
    if (cookies.get('role') !== 'Administrator'
      && window.location.pathname !== '/dashboard/inventory' // this is ugly
      && window.location.pathname !== '/dashboard/sells' // this is ugly
    ) {
      router.push('/dashboard');
    }
  }, [cookies, router]);

  return {
    isLoggedIn: cookies.get('role') !== null,
    isAdmin: cookies.get('role') === 'Administrator',
  };
};