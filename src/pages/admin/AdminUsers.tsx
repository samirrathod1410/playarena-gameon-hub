import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Shield, Ban } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const mockUsers = Array.from({ length: 10 }, (_, i) => ({
  id: `user-${i + 1}`,
  name: ["Raj Patel", "Priya Shah", "Amit Kumar", "Sneha Desai", "Vikram Singh", "Anjali Mehta", "Karan Joshi", "Nisha Gupta", "Rohit Sharma", "Meera Thakkar"][i],
  email: `user${i + 1}@example.com`,
  role: (["user", "user", "owner", "user", "user", "user", "owner", "user", "user", "admin"] as const)[i],
  bookings: 5 + i * 3,
  status: i === 4 ? "blocked" : "active",
}));

const AdminUsers = () => (
  <div className="p-6 space-y-6">
    <div>
      <h1 className="text-2xl font-heading font-bold">Manage Users</h1>
      <p className="text-muted-foreground text-sm">{mockUsers.length} registered users.</p>
    </div>

    <div className="space-y-3">
      {mockUsers.map((u) => (
        <Card key={u.id} className="glass-card">
          <CardContent className="p-4 flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-4">
              <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-sm font-bold text-primary">
                {u.name.charAt(0)}
              </div>
              <div>
                <p className="text-sm font-medium">{u.name}</p>
                <p className="text-xs text-muted-foreground">{u.email}</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-xs text-muted-foreground">{u.bookings} bookings</span>
              <Badge variant="secondary" className="text-xs capitalize">{u.role}</Badge>
              {u.status === "blocked" && <Badge className="bg-destructive/10 text-destructive text-xs">Blocked</Badge>}
              <Button variant="ghost" size="sm" className="text-xs hover:bg-primary/10" onClick={() => toast.info("Role management coming soon!")}>
                <Shield className="h-3 w-3 mr-1" /> Assign Role
              </Button>
              <Button variant="ghost" size="sm" className="text-xs text-destructive hover:bg-destructive/10" onClick={() => toast.info("Block/unblock coming soon!")}>
                <Ban className="h-3 w-3 mr-1" /> {u.status === "blocked" ? "Unblock" : "Block"}
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default AdminUsers;
