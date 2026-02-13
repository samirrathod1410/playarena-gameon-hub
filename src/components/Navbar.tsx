import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Search, User, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import Logo from "./Logo";
import { sportCategories } from "@/data/grounds";

const navLinks = [
  { label: "Home", to: "/" },
  { label: "Browse", to: "/browse" },
  { label: "Compare", to: "/compare" },
  { label: "Rewards", to: "/rewards" },
  { label: "Contact", to: "/contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 transition-all duration-300 ${scrolled ? "glass shadow-lg shadow-background/50" : "bg-background/80 backdrop-blur-md border-b border-border/30"}`}>
      <div className="container flex h-16 items-center justify-between">
        <Logo />

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:text-primary hover:bg-primary/5 ${
                location.pathname === link.to ? "text-primary bg-primary/10" : "text-muted-foreground"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <Link to="/browse">
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <Search className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/dashboard">
            <Button variant="ghost" size="icon" className="hover:bg-primary/10">
              <User className="h-4 w-4" />
            </Button>
          </Link>
          <Link to="/login">
            <Button size="sm" className="btn-glow rounded-xl font-semibold">
              Login
            </Button>
          </Link>
        </div>

        {/* Mobile toggle */}
        <Button variant="ghost" size="icon" className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden glass border-t border-border/30 pb-4 animate-fade-in">
          <nav className="container flex flex-col gap-1 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                onClick={() => setOpen(false)}
                className={`px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                  location.pathname === link.to ? "text-primary bg-primary/10" : "text-muted-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <div className="px-4 pt-2 flex flex-wrap gap-2">
              {sportCategories.map((s) => (
                <Link
                  key={s.name}
                  to={`/browse?sport=${encodeURIComponent(s.name)}`}
                  onClick={() => setOpen(false)}
                  className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-primary/20 transition-colors"
                >
                  {s.icon} {s.name}
                </Link>
              ))}
            </div>
            <div className="px-4 pt-2 flex gap-2">
              <Link to="/login" onClick={() => setOpen(false)} className="flex-1">
                <Button className="w-full btn-glow" size="sm">Login</Button>
              </Link>
              <Link to="/dashboard" onClick={() => setOpen(false)} className="flex-1">
                <Button variant="outline" className="w-full" size="sm">
                  <User className="h-4 w-4 mr-1" /> Dashboard
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
