import { ChartLine } from 'lucide-react';
import { NavLink } from 'react-router';
import { ThemeToggle } from './theme-toggle';
import { cn } from '~/lib/utils';

const Navbar = () => {
  const base = 'hover:text-primary text-muted-foreground font-medium';
  const active = 'text-primary font-semibold';

  return (
    <nav className="bg-background sticky top-0 z-50 border-b">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <NavLink
          to="/"
          className="text-primary flex items-center gap-2 text-lg font-bold"
        >
          <ChartLine className="h-5 w-5" />
          <span className="hidden sm:block">Coin Dashboard</span>
        </NavLink>

        {/* Nav */}
        <div className="flex items-center gap-6">
          <div className="space-x-6 text-sm">
            <NavLink
              to="/"
              className={({ isActive }) => cn(base, isActive && active)}
            >
              Home
            </NavLink>
            <NavLink
              to="/about"
              className={({ isActive }) => cn(base, isActive && active)}
            >
              About
            </NavLink>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
