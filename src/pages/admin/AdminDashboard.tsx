import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CalendarDays, DollarSign, Users, MapPin, TrendingUp } from "lucide-react";

const stats = [
  { label: "Total Bookings", value: "1,247", icon: CalendarDays, change: "+12%" },
  { label: "Total Revenue", value: "₹8,45,000", icon: DollarSign, change: "+18%" },
  { label: "Total Users", value: "3,560", icon: Users, change: "+8%" },
  { label: "Active Grounds", value: "60", icon: MapPin, change: "+5" },
];

const topGrounds = [
  { name: "Stumps Arena", revenue: "₹1,20,000", bookings: 245 },
  { name: "Kick Zone Turf", revenue: "₹98,000", bookings: 198 },
  { name: "Shuttle Zone", revenue: "₹76,500", bookings: 167 },
  { name: "Ace Tennis Club", revenue: "₹65,000", bookings: 134 },
  { name: "Dunk Zone Arena", revenue: "₹54,200", bookings: 112 },
];

const AdminDashboard = () => (
  <div className="p-6 space-y-6">
    <div>
      <h1 className="text-2xl font-heading font-bold">Admin Dashboard</h1>
      <p className="text-muted-foreground text-sm">Overview of your platform performance.</p>
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
          <Card className="glass-card">
            <CardContent className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-xl bg-primary/10"><s.icon className="h-5 w-5 text-primary" /></div>
                <span className="text-xs font-medium text-primary flex items-center gap-1"><TrendingUp className="h-3 w-3" />{s.change}</span>
              </div>
              <p className="text-2xl font-heading font-bold">{s.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>

    <Card className="glass-card">
      <CardHeader><CardTitle className="text-lg">Top 5 Grounds by Revenue</CardTitle></CardHeader>
      <CardContent>
        <div className="space-y-3">
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

export default AdminDashboard;
