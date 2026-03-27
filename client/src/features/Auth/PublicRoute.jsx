
import { useSelector } from 'react-redux';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { selectCurrentToken } from './AuthSlice';

const PublicRoute = () => {
  const token = useSelector(selectCurrentToken);
  const location = useLocation();

  // If no token, send to login but save the current location to return later
  return token ? <Navigate to="/" state={{ from: location }} replace /> : <Outlet/>;
};

export default PublicRoute
