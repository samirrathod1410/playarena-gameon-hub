import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/components/ui/sonner";
import { Trash2 } from "lucide-react";

const statusColors: Record<string, string> = {
  Pending: "bg-accent/10 text-accent",
  Confirmed: "bg-primary/10 text-primary",
  Cancelled: "bg-destructive/10 text-destructive",
};

const AdminBookings = () => {
  const queryClient = useQueryClient();
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("");

  const { data: bookings = [], isLoading } = useQuery({
    queryKey: ["admin-bookings", statusFilter, dateFilter],
    queryFn: async () => {
      let query = supabase.from("bookings").select("*").order("created_at", { ascending: false });
      if (statusFilter !== "all") query = query.eq("status", statusFilter);
      if (dateFilter) query = query.eq("booking_date", dateFilter);
      const { data, error } = await query;
      if (error) throw error;
      return data;
    },
  });

  const updateStatus = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      const { error } = await supabase.from("bookings").update({ status }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-bookings"] }); toast.success("Booking updated"); },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteBooking = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("bookings").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["admin-bookings"] }); toast.success("Booking deleted"); },
    onError: (e: any) => toast.error(e.message),
  });

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-heading font-bold">Manage Bookings</h1>
        <p className="text-muted-foreground text-sm">{bookings.length} bookings found.</p>
      </div>

      <div className="flex flex-wrap gap-3">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-40 bg-secondary/40 border-border/50">
            <SelectValue placeholder="Filter status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Pending">Pending</SelectItem>
            <SelectItem value="Confirmed">Confirmed</SelectItem>
            <SelectItem value="Cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
        <Input type="date" value={dateFilter} onChange={(e) => setDateFilter(e.target.value)} className="w-44 bg-secondary/40 border-border/50" />
        {dateFilter && <Button variant="ghost" size="sm" onClick={() => setDateFilter("")}>Clear date</Button>}
      </div>

      {isLoading ? (
        <p className="text-muted-foreground text-sm">Loading...</p>
      ) : (
        <div className="space-y-3">
          {bookings.map((b: any) => (
            <Card key={b.id} className="glass-card">
              <CardContent className="p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-4">
                  <span className="text-xs font-mono text-muted-foreground">{b.booking_id}</span>
                  <div>
                    <p className="text-sm font-medium">{b.name}</p>
                    <p className="text-xs text-muted-foreground">{b.turf_name} • {b.mobile}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-xs text-muted-foreground">{b.booking_date} • {b.time_slot}</span>
                  <span className="text-sm font-semibold">₹{b.amount}</span>
                  <Badge className={`text-xs ${statusColors[b.status] || ""}`}>{b.status}</Badge>
                  {b.status === "Pending" && (
                    <Button variant="outline" size="sm" className="text-xs text-primary border-primary/30 hover:bg-primary/10" onClick={() => updateStatus.mutate({ id: b.id, status: "Confirmed" })}>
                      Confirm
                    </Button>
                  )}
                  {b.status !== "Cancelled" && (
                    <Button variant="ghost" size="sm" className="text-xs text-destructive hover:bg-destructive/10" onClick={() => updateStatus.mutate({ id: b.id, status: "Cancelled" })}>
                      Cancel
                    </Button>
                  )}
                  <Button variant="ghost" size="sm" className="text-xs text-destructive hover:bg-destructive/10" onClick={() => deleteBooking.mutate(b.id)}>
                    <Trash2 className="h-3 w-3" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
          {bookings.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No bookings found.</p>}
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
