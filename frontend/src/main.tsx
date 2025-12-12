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
import SeriesPage from "./pages/SeriesPage";
import FilmsPage from "./pages/FilmPage";
import MyListPage from "./pages/MyListPage";
import FilmGenresPage from "./pages/FilmGenresPage";
import SeriesGenrePage from "./pages/SeriesGenrePage";
import SubscriptionPage from "./pages/SubscriptionPage";
import PaymentPage from "./pages/PaymentPage";

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
            <Route path="series" element={<SeriesPage />} />
            <Route path="movies" element={<FilmsPage />} />
            <Route path="my-list" element={<MyListPage />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="movies/genre/:id" element={<FilmGenresPage />} />
            <Route path="tv/genre/:id" element={<SeriesGenrePage />} />
            <Route path="subscription" element={<SubscriptionPage />} />
            <Route path="subscription/:id" element={<PaymentPage />} />
          </Route>

          <Route path="*" element={<h1>404 Page Not Found</h1>} />
        </Routes>
      </BrowserRouter>
    </UserProvider>
  </StrictMode>
);
