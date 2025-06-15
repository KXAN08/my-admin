import { Outlet, Navigate } from 'react-router-dom';

const AuthLayout = () => {
  const token = localStorage.getItem('token');
  if (token) return <Navigate to="/profile" />; 
  return (
    <div className="auth-bg w-full h-screen flex items-center justify-center">
      <Outlet />
    </div>
  );
};


export default AuthLayout;
