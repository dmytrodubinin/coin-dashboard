import { ChartLine } from "lucide-react";
import { NavLink } from "react-router";

const Navbar = () => {
  const base = "transition hover:text-blue-400";
  const active = "text-blue-400 ";

  return (
    <nav className="bg-primary sticky top-0 z-50 shadow-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <NavLink
          to="/"
          className="flex items-center gap-2 text-lg font-bold text-blue-300"
        >
          <ChartLine />
          <span>Coin Dashboard</span>
        </NavLink>

        {/* Nav */}
        <div className="flex items-center gap-6">
          <div className="space-x-4 text-sm text-gray-300">
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? active : base)}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => (isActive ? active : base)}
            >
              About
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
