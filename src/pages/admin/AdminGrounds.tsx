import { grounds } from "@/data/grounds";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Edit, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/sonner";

const AdminGrounds = () => (
  <div className="p-6 space-y-6">
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-heading font-bold">Manage Grounds</h1>
        <p className="text-muted-foreground text-sm">{grounds.length} grounds listed</p>
      </div>
      <Button className="btn-glow rounded-xl" onClick={() => toast.info("Add ground form coming soon!")}>
        <Plus className="h-4 w-4 mr-1" /> Add Ground
      </Button>
    </div>

    <div className="grid gap-3">
      {grounds.slice(0, 20).map((g) => (
        <Card key={g.id} className="glass-card">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src={g.image} alt={g.name} className="w-16 h-12 rounded-lg object-cover" />
              <div>
                <p className="font-medium text-sm">{g.name}</p>
                <p className="text-xs text-muted-foreground">{g.location}</p>
              </div>
              <Badge variant="secondary" className="text-xs">{g.sport}</Badge>
              <span className="text-sm font-semibold text-primary">₹{g.basePrice}/slot</span>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="hover:bg-primary/10" onClick={() => toast.info("Edit coming soon!")}>
                <Edit className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" className="hover:bg-destructive/10 text-destructive" onClick={() => toast.info("Delete coming soon!")}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  </div>
);

export default AdminGrounds;
