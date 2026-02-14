import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { LayoutDashboard, MapPin, CalendarDays, Users, LogOut, ChevronLeft, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";
import { useState } from "react";
import Logo from "@/components/Logo";

const sidebarItems = [
  { label: "Dashboard", to: "/admin", icon: LayoutDashboard },
  { label: "Grounds", to: "/admin/grounds", icon: MapPin },
  { label: "Bookings", to: "/admin/bookings", icon: CalendarDays },
  { label: "Users", to: "/admin/users", icon: Users },
];

const AdminLayout = () => {
  const location = useLocation();
  const { signOut } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleLogout = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className={`${collapsed ? "w-16" : "w-60"} bg-card/80 backdrop-blur-xl border-r border-border/30 flex flex-col transition-all duration-300`}>
        <div className="p-4 flex items-center justify-between border-b border-border/20">
          {!collapsed && <Logo />}
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)} className="hover:bg-primary/10">
            {collapsed ? <Menu className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </div>

        <nav className="flex-1 p-2 space-y-1">
          {sidebarItems.map((item) => {
            const active = location.pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                  active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                }`}
              >
                <item.icon className="h-4 w-4 shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div className="p-2 border-t border-border/20">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-destructive hover:bg-destructive/10 w-full transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {!collapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
