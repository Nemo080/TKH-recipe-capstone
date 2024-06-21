import { useEffect } from 'react';
import { Navigate } from 'react-router-dom';

const Logout = ({ handleLogout }) => {
  useEffect(() => {
    if (typeof handleLogout === 'function') {
    handleLogout();
    }
  }, [handleLogout]);

  return <Navigate to="/login" />;
};

export default Logout;