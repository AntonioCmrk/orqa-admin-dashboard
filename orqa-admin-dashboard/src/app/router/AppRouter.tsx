import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Dashboard } from "../../pages/Dashboard/Dashboard";
import { Login } from "../../pages/Login/Login";
import { Profile } from "../../pages/Profile/Profile";
import { Users } from "../../pages/Users/Users";
import { ProtectedRoute } from "./ProtectedRoute";
import { PublicRoute } from "./PublicRoute";

export function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<Login />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/users" element={<Users />} />
          <Route path="/profile" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
