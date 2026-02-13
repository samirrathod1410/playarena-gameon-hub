import { motion } from "framer-motion";
import { Calendar, Clock, IndianRupee, Star, X, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

const upcomingBookings = [
  { id: 1, ground: "Stumps Arena", sport: "Box Cricket", date: "2026-02-15", time: "18:00 - 20:00", price: 1600, status: "confirmed" },
  { id: 2, ground: "Kick Zone Turf", sport: "Football", date: "2026-02-17", time: "19:30 - 21:00", price: 2400, status: "confirmed" },
];

const pastBookings = [
  { id: 3, ground: "Shuttle Zone", sport: "Badminton", date: "2026-02-10", time: "07:00 - 08:00", price: 400, status: "completed" },
  { id: 4, ground: "Ace Tennis Club", sport: "Tennis", date: "2026-02-08", time: "17:00 - 18:00", price: 700, status: "completed" },
  { id: 5, ground: "Dunk Zone Arena", sport: "Basketball", date: "2026-02-05", time: "06:00 - 07:00", price: 350, status: "cancelled" },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState<"bookings" | "profile">("bookings");
  const totalSpent = [...upcomingBookings, ...pastBookings].filter(b => b.status !== "cancelled").reduce((a, b) => a + b.price, 0);

  return (
    <main className="container py-12 space-y-8">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-heading font-bold">
          Welcome back, <span className="text-primary">Player</span>
        </h1>
        <p className="text-muted-foreground mt-1">Manage your bookings and profile</p>
      </motion.div>

      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Upcoming", value: upcomingBookings.length, icon: Calendar, color: "text-primary" },
          { label: "Total Bookings", value: upcomingBookings.length + pastBookings.length, icon: Clock, color: "text-accent" },
          { label: "Total Spent", value: `₹${totalSpent}`, icon: IndianRupee, color: "text-primary" },
          { label: "Reward Points", value: "820", icon: Star, color: "text-accent" },
        ].map((stat, i) => (
          <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
            <Card className="glass-card">
              <CardContent className="p-4 flex items-center gap-3">
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
                <div>
                  <p className="text-xl font-heading font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-2">
        <Button variant={activeTab === "bookings" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("bookings")}>
          <Calendar className="h-4 w-4 mr-1" /> Bookings
        </Button>
        <Button variant={activeTab === "profile" ? "default" : "outline"} size="sm" onClick={() => setActiveTab("profile")}>
          <Settings className="h-4 w-4 mr-1" /> Profile
        </Button>
      </div>

      {activeTab === "bookings" && (
        <div className="space-y-8">
          {/* Upcoming */}
          <div>
            <h2 className="text-lg font-heading font-bold mb-4">Upcoming Bookings</h2>
            <div className="space-y-3">
              {upcomingBookings.map((b) => (
                <Card key={b.id} className="glass-card hover-lift">
                  <CardContent className="p-4 flex items-center justify-between flex-wrap gap-3">
                    <div className="space-y-1">
                      <h3 className="font-heading font-bold">{b.ground}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{b.date}</span>
                        <span>{b.time}</span>
                        <Badge variant="secondary">{b.sport}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-heading font-bold text-primary">₹{b.price}</span>
                      <Button variant="outline" size="sm" className="text-destructive border-destructive/30 hover:bg-destructive/10">
                        <X className="h-3 w-3 mr-1" /> Cancel
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* History */}
          <div>
            <h2 className="text-lg font-heading font-bold mb-4">Booking History</h2>
            <div className="space-y-3">
              {pastBookings.map((b) => (
                <Card key={b.id} className="glass-card opacity-80">
                  <CardContent className="p-4 flex items-center justify-between flex-wrap gap-3">
                    <div className="space-y-1">
                      <h3 className="font-heading font-bold">{b.ground}</h3>
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span>{b.date}</span>
                        <span>{b.time}</span>
                        <Badge variant="secondary">{b.sport}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-heading font-bold text-primary">₹{b.price}</span>
                      <Badge variant={b.status === "completed" ? "default" : "destructive"}>
                        {b.status}
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "profile" && (
        <Card className="glass-card max-w-lg">
          <CardHeader><CardTitle className="flex items-center gap-2"><User className="h-5 w-5" /> Edit Profile</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label>Full Name</Label>
              <Input defaultValue="Player One" className="bg-secondary/40 border-border/50" />
            </div>
            <div className="space-y-2">
              <Label>Email</Label>
              <Input defaultValue="player@example.com" className="bg-secondary/40 border-border/50" />
            </div>
            <div className="space-y-2">
              <Label>Phone</Label>
              <Input defaultValue="+91 98765 43210" className="bg-secondary/40 border-border/50" />
            </div>
            <Button className="btn-glow">Save Changes</Button>
          </CardContent>
        </Card>
      )}
    </main>
  );
};

export default Dashboard;
