import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/sonner";

const mockBookings = Array.from({ length: 12 }, (_, i) => ({
  id: `BK-${1000 + i}`,
  user: ["Raj Patel", "Priya Shah", "Amit Kumar", "Sneha Desai", "Vikram Singh", "Anjali Mehta"][i % 6],
  ground: ["Stumps Arena", "Kick Zone Turf", "Shuttle Zone", "Ace Tennis Club"][i % 4],
  date: `2026-02-${15 + (i % 14)}`,
  time: `${8 + (i % 12)}:00 - ${9 + (i % 12)}:00`,
  amount: `₹${800 + i * 100}`,
  status: ["confirmed", "pending", "cancelled"][i % 3] as string,
}));

const statusColors: Record<string, string> = {
  confirmed: "bg-primary/10 text-primary",
  pending: "bg-accent/10 text-accent",
  cancelled: "bg-destructive/10 text-destructive",
};

const AdminBookings = () => (
  <div className="p-6 space-y-6">
    <div>
      <h1 className="text-2xl font-heading font-bold">Manage Bookings</h1>
      <p className="text-muted-foreground text-sm">View and manage all bookings.</p>
    </div>

    <div className="space-y-3">
      {mockBookings.map((b) => (
        <Card key={b.id} className="glass-card">
          <CardContent className="p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-muted-foreground">{b.id}</span>
              <div>
                <p className="text-sm font-medium">{b.user}</p>
                <p className="text-xs text-muted-foreground">{b.ground}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground">{b.date} • {b.time}</span>
              <span className="text-sm font-semibold">{b.amount}</span>
              <Badge className={`text-xs capitalize ${statusColors[b.status]}`}>{b.status}</Badge>
              {b.status !== "cancelled" && (
                <Button variant="ghost" size="sm" className="text-xs text-destructive hover:bg-destructive/10" onClick={() => toast.info("Cancel coming soon!")}>
                  Cancel
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default AdminBookings;
