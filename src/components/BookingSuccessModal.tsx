import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, Calendar, Clock, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface BookingSuccessModalProps {
  open: boolean;
  onClose: () => void;
  booking?: {
    groundName: string;
    date: string;
    time: string;
    total: number;
  };
}

const BookingSuccessModal = ({ open, onClose, booking }: BookingSuccessModalProps) => (
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
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className="glass-card rounded-2xl p-8 max-w-sm w-full text-center space-y-5 relative"
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={onClose} className="absolute top-4 right-4 text-muted-foreground hover:text-foreground">
            <X className="h-5 w-5" />
          </button>

          {/* Success animation */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.2, damping: 10 }}
          >
            <CheckCircle className="h-16 w-16 mx-auto text-primary" />
          </motion.div>

          {/* Confetti dots */}
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                background: i % 3 === 0 ? "hsl(var(--primary))" : i % 3 === 1 ? "hsl(var(--accent))" : "hsl(var(--destructive))",
                top: "50%",
                left: "50%",
              }}
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                x: Math.cos((i * 30 * Math.PI) / 180) * 120,
                y: Math.sin((i * 30 * Math.PI) / 180) * 120,
              }}
              transition={{ duration: 0.8, delay: 0.3 }}
            />
          ))}

          <h2 className="text-2xl font-heading font-bold text-primary">Booking Confirmed!</h2>

          {booking && (
            <div className="space-y-2 text-sm text-left bg-secondary/30 rounded-xl p-4">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                <span>{booking.groundName}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                <span>{booking.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-primary flex-shrink-0" />
                <span>{booking.time}</span>
              </div>
              <div className="pt-2 border-t border-border/30 font-heading font-bold text-lg text-primary">
                Total: ₹{booking.total}
              </div>
            </div>
          )}

          <div className="flex gap-2">
            <Button onClick={onClose} className="flex-1 btn-glow rounded-xl">
              Done
            </Button>
            <Button variant="outline" className="flex-1 rounded-xl border-primary/30" onClick={onClose}>
              Share on WhatsApp
            </Button>
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);

export default BookingSuccessModal;
