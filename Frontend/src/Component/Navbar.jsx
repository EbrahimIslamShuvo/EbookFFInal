import { NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import { getCartList } from "../Data/addToCartList";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(
    getCartList().length
  );

  useEffect(() => {
    const updateCart = () => {
      setCartCount(getCartList().length);
    };

    window.addEventListener("cartUpdated", updateCart);

    return () => {
      window.removeEventListener("cartUpdated", updateCart);
    };
  }, []);

  return (
    <header className="flex justify-between items-center px-6 py-4 shadow">
      <img src={logo} className="w-24" />

      <nav className="flex gap-6">
        <NavLink to="/">Home</NavLink>
        <NavLink to="/all-books">All Books</NavLink>
        <NavLink to="/blogs">Blogs</NavLink>
        <NavLink to="/about">About</NavLink>
        <NavLink to="/contact">Contact</NavLink>
      </nav>

      <div className="flex gap-4">
        <NavLink to="/cart">
          Cart ({cartCount})
        </NavLink>
        <NavLink to="/login">Login</NavLink>
      </div>
    </header>
  );
};

export default Navbar;
