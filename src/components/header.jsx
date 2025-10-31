import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";
import { useAuth } from "../context/AuthContext";

export default function Header() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleLogout = async () => {
    await signOut();
    navigate("/");
    setMenuOpen(false);
  };

  const navLinks = user
    ? [
        { name: "HOME", path: "/" },
        { name: "CUSTOMIZE", path: "/customize" },
        { name: "DASHBOARD", path: "/dashboard" },
        { name: "CONTACT US", path: "/" },
      ]
    : [
        { name: "HOME", path: "/" },
        { name: "CUSTOMIZE", path: "/customize" },
        { name: "CONTACT US", path: "/" },
        { name: "LOGIN", path: "/login" },
        { name: "REGISTER", path: "/register" },
      ];

  return (
    <header className="flex items-center justify-between fixed top-0 left-0 z-50 bg-black text-white w-full h-[80px] px-5 md:px-20 shadow-2xl">
      
      {/* Logo */}
      <div 
        className="flex items-center cursor-pointer"
        onClick={() => navigate("/")}
      >
        <img 
          src="/logo.png" 
          alt="Logo" 
          className="w-[120px] md:w-[160px]" 
        />
      </div>

      {/* Desktop Menu */}
      <nav className="hidden md:flex gap-6 text-sm items-center">
        {navLinks.map((item, idx) => (
          <Link
            key={idx}
            to={item.path}
            className="hover:text-[#F77603] px-3 py-1 border-b-2 border-transparent hover:border-[#F77603] transition"
            style={{ fontFamily: "Judson" }}
          >
            {item.name}
          </Link>
        ))}
        {user && (
          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
            style={{ fontFamily: "Judson" }}
          >
            Logout
          </button>
        )}
      </nav>

      {/* User Icon (Desktop) */}
      <div className="hidden md:block">
        <img
          src="/user.jpg"
          alt="user"
          className="w-[40px] h-[40px] rounded-full object-cover cursor-pointer"
          onClick={() => user && navigate("/dashboard")}
        />
      </div>

      {/* Mobile Menu Button */}
      <button 
        className="text-white text-2xl md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FiX /> : <FiMenu />}
      </button>

      {/* Mobile Drawer Menu */}
      {menuOpen && (
        <div className="fixed top-0 right-0 w-[70%] h-full bg-black border-l border-[#F77603] shadow-xl flex flex-col items-center pt-24 gap-6 md:hidden">

          {navLinks.map((item, idx) => (
            <Link
              key={idx}
              to={item.path}
              onClick={() => setMenuOpen(false)}
              className="text-lg hover:text-[#F77603]"
              style={{ fontFamily: "Judson" }}
            >
              {item.name}
            </Link>
          ))}

          {user && (
            <button
              onClick={handleLogout}
              className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg transition"
              style={{ fontFamily: "Judson" }}
            >
              Logout
            </button>
          )}

          <img
            src="/user.jpg"
            alt="user"
            className="w-[80px] h-[80px] rounded-full border border-[#F77603] cursor-pointer"
            onClick={() => {
              if (user) {
                navigate("/dashboard");
                setMenuOpen(false);
              }
            }}
          />

        </div>
      )}
    </header>
  );
}
