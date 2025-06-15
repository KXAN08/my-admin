import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import Group from './layout/dashboard/Group';
import DashboardLayout from './layout/dashboard/DashboardLayout';
import AuthLayout from './layout/auth/AuthLayout';

import { useTheme } from './store/useTheme';

const App = () => {
  const init = useTheme((state) => state.init);

  useEffect(() => {
    init();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>
        <Route element={<DashboardLayout />}>
          <Route path="/profile" element={<Profile />} />
          <Route path="/group/:groupId" element={<Group />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
