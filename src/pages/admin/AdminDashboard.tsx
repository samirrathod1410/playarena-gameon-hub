import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, DollarSign, Users, Clock, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

const AdminDashboard = () => {
  const { user } = useAuth();

  const { data: bookings = [] } = useQuery({
    queryKey: ["admin-dash-bookings"],
    queryFn: async () => {
      const { data, error } = await supabase.from("bookings").select("*");
      if (error) throw error;
      return data;
    },
  });

  const { data: lastLogin } = useQuery({
    queryKey: ["admin-last-login"],
    queryFn: async () => {
      if (!user) return null;
      const { data } = await supabase.from("admin_logs").select("login_time").eq("admin_id", user.id).order("login_time", { ascending: false }).limit(1);
      return data?.[0]?.login_time || null;
    },
    enabled: !!user,
  });

  const today = new Date().toISOString().split("T")[0];
  const totalBookings = bookings.length;
  const todayBookings = bookings.filter((b: any) => b.booking_date === today).length;
  const pendingBookings = bookings.filter((b: any) => b.status === "Pending").length;
  const confirmedBookings = bookings.filter((b: any) => b.status === "Confirmed").length;
  const totalRevenue = bookings.filter((b: any) => b.status !== "Cancelled").reduce((s: number, b: any) => s + (b.amount || 0), 0);

  const stats = [
    { label: "Total Bookings", value: totalBookings.toString(), icon: CalendarDays, change: "" },
    { label: "Total Revenue", value: `₹${totalRevenue.toLocaleString("en-IN")}`, icon: DollarSign, change: "" },
    { label: "Pending", value: pendingBookings.toString(), icon: Clock, change: "" },
    { label: "Confirmed", value: confirmedBookings.toString(), icon: TrendingUp, change: "" },
  ];

  // Top turfs by booking count
  const turfCounts: Record<string, { count: number; revenue: number }> = {};
  bookings.forEach((b: any) => {
    if (!turfCounts[b.turf_name]) turfCounts[b.turf_name] = { count: 0, revenue: 0 };
    turfCounts[b.turf_name].count++;
    if (b.status !== "Cancelled") turfCounts[b.turf_name].revenue += b.amount || 0;
  });
  const topGrounds = Object.entries(turfCounts)
    .sort((a, b) => b[1].revenue - a[1].revenue)
    .slice(0, 5)
    .map(([name, d]) => ({ name, revenue: `₹${d.revenue.toLocaleString("en-IN")}`, bookings: d.count }));

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">Admin Dashboard</h1>
        <p className="text-muted-foreground text-sm">
          Overview of your platform performance.
          {lastLogin && <span className="ml-2">Last login: {new Date(lastLogin).toLocaleString()}</span>}
        </p>
        <p className="text-muted-foreground text-xs mt-1">Today's Bookings: {todayBookings}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => (
          <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
            <Card className="glass-card">
              <CardContent className="p-5">
                <div className="flex items-center justify-between mb-3">
                  <div className="p-2 rounded-xl bg-primary/10"><s.icon className="h-5 w-5 text-primary" /></div>
                </div>
                <p className="text-2xl font-heading font-bold">{s.value}</p>
                <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      <Card className="glass-card">
        <CardHeader><CardTitle className="text-lg">Top Grounds by Revenue</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {topGrounds.length === 0 && <p className="text-sm text-muted-foreground">No bookings yet.</p>}
            {topGrounds.map((g, i) => (
              <div key={g.name} className="flex items-center justify-between p-3 rounded-xl bg-secondary/20 border border-border/20">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-bold text-primary w-6">#{i + 1}</span>
                  <span className="text-sm font-medium">{g.name}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-muted-foreground">{g.bookings} bookings</span>
                  <span className="font-semibold text-primary">{g.revenue}</span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminDashboard;
