import generalConstants from '@constants/general';
import { useStore } from '@store/store';
import { useCallback } from 'react';

export default function useAuth() {
  const doLogout = useCallback(() => {
    localStorage.removeItem(generalConstants.localStorage.user_data);
    localStorage.removeItem(generalConstants.localStorage.access_token);
    localStorage.removeItem(generalConstants.localStorage.refresh_token);

    useStore.setState({ isLoggedIn: false, user: null });
  }, []);

  return { doLogout };
}
