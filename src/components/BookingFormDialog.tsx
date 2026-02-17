import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/components/ui/sonner";
import { generateBookingId, openWhatsAppForAdmin, openWhatsAppForCustomer } from "@/lib/whatsapp";

interface BookingFormDialogProps {
  open: boolean;
  onClose: () => void;
  turfName: string;
  date: string;
  timeSlot: string;
  amount: number;
  onSuccess: (booking: { bookingId: string; groundName: string; date: string; time: string; total: number }) => void;
}

const BookingFormDialog = ({ open, onClose, turfName, date, timeSlot, amount, onSuccess }: BookingFormDialogProps) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    email: user?.email || "",
    paymentMethod: "Pay at Turf",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.mobile.trim() || !form.email.trim()) {
      toast.error("Please fill all required fields");
      return;
    }
    if (!/^\d{10}$/.test(form.mobile.replace(/\D/g, "").slice(-10))) {
      toast.error("Enter a valid 10-digit mobile number");
      return;
    }

    setLoading(true);
    const bookingId = generateBookingId();

    try {
      const { error } = await supabase.from("bookings").insert({
        booking_id: bookingId,
        user_id: user?.id,
        name: form.name.trim(),
        mobile: form.mobile.trim(),
        email: form.email.trim(),
        turf_name: turfName,
        booking_date: date,
        time_slot: timeSlot,
        payment_method: form.paymentMethod,
        amount,
        status: "Pending",
      });

      if (error) throw error;

      const bookingInfo = {
        bookingId,
        name: form.name.trim(),
        mobile: form.mobile.trim(),
        email: form.email.trim(),
        turfName,
        bookingDate: date,
        timeSlot,
        paymentMethod: form.paymentMethod,
      };

      // Trigger WhatsApp for admin and customer
      openWhatsAppForAdmin(bookingInfo);
      setTimeout(() => openWhatsAppForCustomer(bookingInfo), 1000);

      onSuccess({ bookingId, groundName: turfName, date, time: timeSlot, total: amount });
      onClose();
      setForm({ name: "", mobile: "", email: user?.email || "", paymentMethod: "Pay at Turf" });
    } catch (err: any) {
      toast.error(err.message || "Booking failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="glass-card rounded-2xl p-6 max-w-md w-full space-y-4 relative"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
              <X className="h-5 w-5" />
            </button>

            <h2 className="text-xl font-heading font-bold text-primary">Book Now</h2>
            <div className="text-sm text-muted-foreground space-y-1">
              <p><strong>Turf:</strong> {turfName}</p>
              <p><strong>Date:</strong> {date} | <strong>Time:</strong> {timeSlot}</p>
              <p><strong>Amount:</strong> ₹{amount}</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <Label>Full Name *</Label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-secondary/40 border-border/50" required maxLength={100} />
              </div>
              <div>
                <Label>Mobile Number *</Label>
                <Input value={form.mobile} onChange={(e) => setForm({ ...form, mobile: e.target.value })} placeholder="9876543210" className="bg-secondary/40 border-border/50" required maxLength={15} />
              </div>
              <div>
                <Label>Email *</Label>
                <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-secondary/40 border-border/50" required maxLength={255} />
              </div>
              <div>
                <Label>Payment Method</Label>
                <Select value={form.paymentMethod} onValueChange={(v) => setForm({ ...form, paymentMethod: v })}>
                  <SelectTrigger className="bg-secondary/40 border-border/50">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Pay at Turf">Pay at Turf</SelectItem>
                    <SelectItem value="Online">Online</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button type="submit" className="w-full btn-glow rounded-xl font-semibold" disabled={loading}>
                {loading ? "Booking..." : "Confirm Booking"}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default BookingFormDialog;
