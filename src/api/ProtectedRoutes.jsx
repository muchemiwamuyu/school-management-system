import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
// import { Children } from "react";

const ProtectedRoutes = ({ children }) => {
  const { auth } = useAuth();

  if (!auth.token) {
    return <Navigate to="/register-admin" replace />;
  }

  return children;
};

export default ProtectedRoutes