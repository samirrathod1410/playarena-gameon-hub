import { Link } from "react-router-dom";
import Logo from "./Logo";
import { sportCategories } from "@/data/grounds";

const Footer = () => (
  <footer className="border-t border-border/50 bg-card/40 mt-20">
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="space-y-4">
          <Logo />
          <p className="text-sm text-muted-foreground max-w-xs">
            Every Game Starts Here. Discover and book the best sports grounds in Ahmedabad.
          </p>
          <div className="flex gap-3">
            {["Twitter", "Instagram", "Facebook"].map((s) => (
              <a key={s} href="#" className="text-xs text-muted-foreground hover:text-primary transition-colors">{s}</a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-sm mb-4">Quick Links</h4>
          <ul className="space-y-2">
            {[{ label: "Home", to: "/" }, { label: "Browse Grounds", to: "/browse" }, { label: "Compare", to: "/compare" }, { label: "Contact", to: "/contact" }].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-sm mb-4">Sports</h4>
          <ul className="space-y-2">
            {sportCategories.map((s) => (
              <li key={s.name}>
                <Link to={`/browse?sport=${encodeURIComponent(s.name)}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {s.icon} {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-sm mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Ahmedabad, Gujarat, India</li>
            <li>hello@playarena.in</li>
            <li>+91 98765 43210</li>
          </ul>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground">© 2026 PlayArena.in. All rights reserved.</p>
        <p className="text-xs text-muted-foreground italic">"Every Game Starts Here."</p>
      </div>
    </div>
  </footer>
);

export default Footer;
