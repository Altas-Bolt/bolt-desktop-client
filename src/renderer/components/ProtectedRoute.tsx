import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from 'renderer/context/authContext';

interface ProtectedRouteProps {
  children: React.ReactElement | React.ReactElement[];
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const auth = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.email) {
      navigate('/');
    }
  }, [auth]);

  return <>{children}</>;
};
