import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({ children }) => {
  const { token } = useSelector((state) => state.auth); // 👈 lire le vrai token depuis Redux

  

  return children;
};

export default PrivateRoute;
