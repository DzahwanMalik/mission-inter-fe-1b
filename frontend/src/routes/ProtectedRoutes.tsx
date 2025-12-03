import { Navigate } from "react-router";
import useUser from "../hooks/useUsername";
import MainLayout from "../layouts/MainLayout";

const ProtectedRoutes = () => {
  const { user, loading } = useUser();

  if (loading) return null; // Render nothing while loading

  return user ? <MainLayout /> : <Navigate to="/auth/login" />;
};

export default ProtectedRoutes;
