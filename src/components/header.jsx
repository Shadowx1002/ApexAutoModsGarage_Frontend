import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { FiMenu, FiX } from "react-icons/fi";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const [user, setUser] = useState(null);

  const email = localStorage.getItem("email");

  // Check user on load
  useEffect(() => {
    const storedUser = localStorage.getItem("role");
    setUser(storedUser);
  }, []);

  // Debounce live search
  useEffect(() => {
    if (search.trim() !== "") {
      const delay = setTimeout(() => {
        navigate(`/search/${search}`);
      }, 500);
      return () => clearTimeout(delay);
    }
  }, [search, navigate]);

  // Reset search when path changes
  useEffect(() => {
    if (!location.pathname.startsWith("/search")) {
      setSearch("");
    }
  }, [location]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUser(null);
    navigate("/login");
  };

  const navLinks = [
    { name: "HOME", path: "/" },
    { name: "CUSTOMIZE", path: "/costomize" },
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
      <nav className="hidden md:flex gap-6 text-sm">
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
      </nav>

      {/* User Icon (Desktop) */}
      <div className="hidden md:block">
        <img
          src="/user.jpg"
          alt="user"
          className="w-[40px] h-[40px] rounded-full object-cover"
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

          <img
            src="/user.jpg"
            alt="user"
            className="w-[80px] h-[80px] rounded-full border border-[#F77603]"
          />

        </div>
      )}
    </header>
  );
}
