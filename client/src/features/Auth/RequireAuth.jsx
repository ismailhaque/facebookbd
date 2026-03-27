
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectCurrentToken } from './AuthSlice';
import Header from '../../component/Header/Header';
import Layout from '../../component/Layout/Layout';

const RequireAuth = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  // If no token, send to login but save the current location to return later
  return token ?  <Layout /> : <Navigate to="/login" state={{ from: location }} replace />;
};

export default RequireAuth