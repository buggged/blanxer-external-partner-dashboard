import generalConstants from '@constants/general';
import LoginPassword from '@features/auth/LoginPassword';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

function App() {
  // const { storageToState, user } = useAuth();
  // useEffect(() => {
  //   storageToState();
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<IsLogged />} />
        <Route path='/login' element={<LoginPassword />} />
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
