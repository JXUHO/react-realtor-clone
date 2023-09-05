import { Outlet, Navigate } from "react-router-dom";
import useAuthStatus from "../hooks/useAuthStatus";
import Spinner from "./Spinner";


const PrivateRoute = () => {
  const {isLoggedIn, isLoading} = useAuthStatus()

  if (isLoading) {
    return <Spinner/>
  }

  return isLoggedIn ? <Outlet /> : <Navigate to="/sign-in" />;
};

export default PrivateRoute;
