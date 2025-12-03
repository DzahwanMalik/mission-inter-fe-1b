import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/Registerpage";
import "./styles/global.css";
import AuthLayout from "./layouts/AuthLayout";
import HomePage from "./pages/HomePage";
import ProfilePage from "./pages/ProfilePage";
import { UserProvider } from "./contexts/userContext";
import ProtectedRoutes from "./routes/ProtectedRoutes";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route index path="/" element={<LandingPage />} />

          <Route path="/auth" element={<AuthLayout />}>
            <Route index element={<Navigate to="login" replace />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<RegisterPage />} />
          </Route>

          <Route path="/:user" element={<ProtectedRoutes />}>
            <Route index element={<Navigate to="home" replace />} />
            <Route path="home" element={<HomePage />} />
            <Route path="series" element={<h1>Ini Series Page</h1>} />
            <Route path="films" element={<h1>Ini Films Page</h1>} />
            <Route path="daftarSaya" element={<h1>Ini Daftar Saya Page</h1>} />
            <Route path="profile" element={<ProfilePage />} />
          </Route>

          <Route path="*" element={<h1>404 Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
);
