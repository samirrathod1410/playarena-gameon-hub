import { Link } from "react-router-dom";

const Logo = ({ className = "" }: { className?: string }) => (
  <Link to="/" className={`flex items-center gap-2 ${className}`}>
    <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="6" width="32" height="24" rx="4" stroke="hsl(120 100% 62%)" strokeWidth="2" fill="none" />
      <path d="M14 12 L14 24 L24 18 Z" fill="hsl(120 100% 62%)" />
      <line x1="6" y1="30" x2="30" y2="30" stroke="hsl(120 100% 62%)" strokeWidth="1.5" strokeDasharray="2 2" />
    </svg>
    <span className="text-xl font-heading font-bold tracking-tight">
      <span className="text-primary">Play</span>
      <span className="text-foreground">Arena</span>
    </span>
  </Link>
);

export default Logo;
