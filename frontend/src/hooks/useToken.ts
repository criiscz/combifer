import {useEffect, useMemo, useState} from 'react';
import Cookie from 'universal-cookie';

export const useToken = () => {
  const cookie = useMemo(() => new Cookie(), []);
  const [token, setToken] = useState<string | undefined>(undefined);

  useEffect(() => {
    setToken(cookie.get('userToken'));
  }, [cookie]);

  return token;
}

