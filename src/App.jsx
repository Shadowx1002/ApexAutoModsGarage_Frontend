import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import HomePage from "./pages/homePage";
import Header from "./components/header";
import RegisterPage from "./pages/registerPage";
import LoginPage from "./pages/loginPage";
import CustomizePage from "./pages/customizePage";
import DashboardPage from "./pages/dashboardPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div>
          <Header />

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/customize" element={<CustomizePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
