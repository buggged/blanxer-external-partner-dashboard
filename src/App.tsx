import { KDashboardLayout } from '@components/KDashboardLayout';
import generalConstants from '@constants/general';
import ChangePassword from '@features/auth/ChangePassword';
import LoginPassword from '@features/auth/LoginPassword';
import HomeDashboard from '@features/homeDashboard/HomeDashboard';
import { useStore } from '@store/store';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

function App() {

  const { isLoggedIn } = useStore();

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<IsLogged />} />
        <Route path='/login' element={<LoginPassword />} />
        <Route path='/change-password' element={<ChangePassword />} />


        {isLoggedIn && (
          <Route path='/dashboard' element={<KDashboardLayout />}>
            <Route index element={<HomeDashboard />} />
          </Route>
        )}

        <Route path='*' element={<Navigate to='/' />} />
      </Routes>
    </BrowserRouter>
  );
}

const NavigateDashboard = () => <Navigate to='/dashboard' />;
const IsLogged = () => {
  const logged = !!localStorage.getItem(
    generalConstants.localStorage.access_token,
  );
  if (logged) return <NavigateDashboard />;
  return <Navigate to='/login' />;
};
export default App;
