import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Logo from "./Logo";
import { sportCategories } from "@/data/grounds";

const Footer = () => (
  <footer className="border-t border-border/30 bg-card/30 mt-20">
    <div className="container py-12">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
        <div className="md:col-span-2 space-y-4">
          <Logo />
          <p className="text-sm text-muted-foreground max-w-xs">
            Every Game Starts Here. Discover and book the best sports grounds in Ahmedabad.
          </p>
          <div className="flex gap-4">
            {[
              { name: "Twitter", icon: "𝕏" },
              { name: "Instagram", icon: "📸" },
              { name: "Facebook", icon: "📘" },
              { name: "YouTube", icon: "▶️" },
            ].map((s) => (
              <a key={s.name} href="#" className="w-9 h-9 rounded-lg bg-secondary/50 flex items-center justify-center text-sm hover:bg-primary/20 hover:text-primary transition-all">
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-sm mb-4">Quick Links</h4>
          <ul className="space-y-2.5">
            {[
              { label: "Home", to: "/" },
              { label: "Browse Grounds", to: "/browse" },
              { label: "Compare", to: "/compare" },
              { label: "Rewards", to: "/rewards" },
              { label: "Dashboard", to: "/dashboard" },
              { label: "Contact", to: "/contact" },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-sm text-muted-foreground hover:text-primary transition-colors">{l.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-heading font-semibold text-sm mb-4">Sports</h4>
          <ul className="space-y-2.5">
            {sportCategories.map((s) => (
              <li key={s.name}>
                <Link to={`/browse?sport=${encodeURIComponent(s.name)}`} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  {s.icon} {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="font-heading font-semibold text-sm mb-4">Newsletter</h4>
          <p className="text-xs text-muted-foreground">Get updates on new grounds and exclusive deals.</p>
          <div className="flex gap-2">
            <Input placeholder="Your email" className="bg-secondary/40 border-border/50 text-sm" />
            <Button size="icon" className="btn-glow flex-shrink-0">
              <Mail className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-2 pt-2">
            <h4 className="font-heading font-semibold text-sm">Contact</h4>
            <ul className="space-y-1.5 text-xs text-muted-foreground">
              <li>Ahmedabad, Gujarat, India</li>
              <li>hello@playarena.in</li>
              <li>+91 98765 43210</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-xs text-muted-foreground">© 2026 PlayArena.in. All rights reserved.</p>
        <div className="flex gap-4 text-xs text-muted-foreground">
          <Link to="#" className="hover:text-primary transition-colors">Terms of Service</Link>
          <Link to="#" className="hover:text-primary transition-colors">Privacy Policy</Link>
          <Link to="#" className="hover:text-primary transition-colors">Refund Policy</Link>
        </div>
        <p className="text-xs text-muted-foreground italic">"Every Game Starts Here."</p>
      </div>
    </div>
  </footer>
);

export default Footer;
