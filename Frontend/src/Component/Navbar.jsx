import { NavLink, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { getCartList } from "../Data/addToCartList";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(getCartList().length);
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  const navigate = useNavigate();

  useEffect(() => {
    const updateCart = () => {
      setCartCount(getCartList().length);
    };

    const updateAuth = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("cartUpdated", updateCart);
    window.addEventListener("authChanged", updateAuth);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
      window.removeEventListener("authChanged", updateAuth);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    window.dispatchEvent(new Event("authChanged"));
    navigate("/login");
  };

  return (
    <div className="flex flex-col">
      {/* Top Offer Bar */}
      <div className="bg-[#3059b8] text-white text-center py-2 text-sm font-medium">
        Flat 30% OFF on All eBooks — Limited Time Only!
      </div>

      {/* Main Navbar */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-12 py-4 flex justify-between items-center">

          {/* Logo (Zoomed) */}
          <NavLink to="/" className="flex items-center scale-160  hover:scale-115 transition">
            <img
              src={logo}
              alt="Logo"
              className="h-12 md:h-14 object-contain hover:scale-105 transition"
            />
          </NavLink>

          {/* Navigation */}
          <nav className="flex gap-8 text-sm font-medium text-gray-700">
            <NavLink
              to="/"
              className="hover:text-[#3059b8] transition"
            >
              Home
            </NavLink>
            <NavLink
              to="/all-books"
              className="hover:text-[#3059b8] transition"
            >
              All Books
            </NavLink>
            <NavLink
              to="/blogs"
              className="hover:text-[#3059b8] transition"
            >
              Blogs
            </NavLink>
            <NavLink
              to="/about"
              className="hover:text-[#3059b8] transition"
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              className="hover:text-[#3059b8] transition"
            >
              Contact
            </NavLink>
          </nav>

          {/* Actions */}
          <div className="flex gap-6 items-center text-sm font-medium">
            <NavLink
              to="/cart"
              className="hover:text-[#3059b8] transition"
            >
              Cart
              <span className="ml-1 text-xs bg-[#3059b8] text-white px-2 py-0.5 rounded-full">
                {cartCount}
              </span>
            </NavLink>

            {isLoggedIn ? (
              <>
                <NavLink
                  to="/dashboard"
                  className="hover:text-[#3059b8] transition"
                >
                  Profile
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-600 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <NavLink
                to="/login"
                className="hover:text-[#3059b8] transition"
              >
                Login
              </NavLink>
            )}
          </div>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
