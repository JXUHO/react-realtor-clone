import { Outlet, Navigate } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";

const PrivateRoute = () => {
  const {isLoggedIn, isLoading} = useAuthStatus()
  
  if (isLoading) {
    return <h3>Loading...</h3>
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
