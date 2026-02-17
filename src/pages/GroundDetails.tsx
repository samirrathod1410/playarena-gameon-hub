import { useParams, Link, useNavigate } from "react-router-dom";
import { Star, MapPin, Clock, Phone, ChevronLeft, Calendar as CalendarIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { grounds, generateSlots, calculatePrice, getReviewsForGround } from "@/data/grounds";
import { useState } from "react";
import { motion } from "framer-motion";
import BookingSuccessModal from "@/components/BookingSuccessModal";
import BookingFormDialog from "@/components/BookingFormDialog";
import { useAuth } from "@/contexts/AuthContext";

import { toast } from "@/components/ui/sonner";

const GroundDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const ground = grounds.find((g) => g.id === id);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [successBooking, setSuccessBooking] = useState<{ groundName: string; date: string; time: string; total: number } | undefined>();

  if (!ground) {
    return (
      <main className="container py-16 text-center">
        <h1 className="text-2xl font-heading font-bold">Ground not found</h1>
        <Link to="/browse"><Button className="mt-4 btn-glow rounded-xl">Back to Browse</Button></Link>
      </main>
    );
  }

  const slots = generateSlots(ground.openTime, ground.closeTime, ground.slotDuration);
  const reviews = getReviewsForGround(ground.id);
  const bookedSlots = new Set(slots.filter((_, i) => i % 5 === 2 || i % 7 === 0).map((s) => s.start));
  const selectedPricing = selectedSlot ? calculatePrice(ground.basePrice, selectedSlot, selectedDate) : null;
  const selectedSlotObj = selectedSlot ? slots.find(s => s.start === selectedSlot) : null;

  const handleBookNow = () => {
    if (!user) {
      toast.error("Please login to book a slot");
      navigate("/login");
      return;
    }
    if (selectedSlot) setShowBookingForm(true);
  };

  const handleBookingSuccess = (booking: { bookingId: string; groundName: string; date: string; time: string; total: number }) => {
    setSuccessBooking(booking);
    setShowSuccess(true);
    setSelectedSlot(null);
  };

  return (
    <main className="container py-8">
      <Link to="/browse" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6 transition-colors">
        <ChevronLeft className="h-4 w-4" /> Back to Browse
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Images */}
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <img src={ground.images[0]} alt={ground.name} className="w-full h-64 md:h-80 object-cover rounded-xl" />
            <div className="grid grid-cols-2 gap-3">
              {ground.images.slice(1, 5).map((img, i) => (
                <img key={i} src={img} alt={`${ground.name} ${i + 2}`} className="w-full h-full object-cover rounded-xl" />
              ))}
            </div>
          </motion.div>

          {/* Info */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="gradient-primary text-primary-foreground">{ground.sport}</Badge>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-accent text-accent" />
                <span className="font-semibold">{ground.rating}</span>
                <span className="text-muted-foreground text-sm">({ground.reviewCount} reviews)</span>
              </div>
            </div>
            <h1 className="text-3xl font-heading font-bold">{ground.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" /> {ground.address}
            </div>
            <p className="text-muted-foreground leading-relaxed">{ground.description}</p>
          </div>

          {/* Facilities */}
          <Card className="glass-card">
            <CardHeader><CardTitle className="text-lg">Facilities</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {ground.facilities.map((f) => (
                  <Badge key={f} variant="secondary" className="px-3 py-1.5 rounded-lg">{f}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pricing Table */}
          <Card className="glass-card">
            <CardHeader><CardTitle className="text-lg">Pricing</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-xl bg-secondary/30 border border-border/30">
                  <p className="text-xs text-muted-foreground mb-1">Regular</p>
                  <p className="text-xl font-heading font-bold text-primary">₹{ground.basePrice}</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/30 border border-border/30">
                  <p className="text-xs text-muted-foreground mb-1">Peak (5-10 PM)</p>
                  <p className="text-xl font-heading font-bold text-primary">₹{ground.basePrice * 2}</p>
                </div>
                <div className="p-4 rounded-xl bg-secondary/30 border border-border/30">
                  <p className="text-xs text-muted-foreground mb-1">Weekend Peak</p>
                  <p className="text-xl font-heading font-bold text-accent">₹{Math.round(ground.basePrice * 2 * 1.25)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card className="glass-card">
            <CardHeader><CardTitle className="text-lg">Reviews</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {reviews.map((r) => (
                <div key={r.id} className="p-4 rounded-xl bg-secondary/20 border border-border/20 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-sm">{r.userName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < r.rating ? "fill-accent text-accent" : "text-muted-foreground/30"}`} />
                      ))}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">{r.comment}</p>
                  <p className="text-xs text-muted-foreground">{r.date}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Booking */}
        <div className="space-y-6">
          <Card className="glass-card sticky top-20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" /> Book a Slot
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(d) => { if (d) { setSelectedDate(d); setSelectedSlot(null); } }}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                className="rounded-xl border border-border/30 pointer-events-auto"
              />

              <div>
                <h4 className="text-sm font-medium mb-3">Available Slots</h4>
                <div className="grid grid-cols-2 gap-2 max-h-48 overflow-y-auto">
                  {slots.map((slot) => {
                    const isBooked = bookedSlots.has(slot.start);
                    const isSelected = selectedSlot === slot.start;
                    return (
                      <button
                        key={slot.start}
                        disabled={isBooked}
                        onClick={() => setSelectedSlot(isSelected ? null : slot.start)}
                        className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                          isBooked ? "bg-destructive/10 text-muted-foreground cursor-not-allowed line-through"
                          : isSelected ? "gradient-primary text-primary-foreground shadow-md"
                          : "bg-secondary/30 hover:bg-primary/10 hover:text-primary border border-border/20"
                        }`}
                      >
                        <span className="flex items-center justify-center gap-1">
                          {!isBooked && !isSelected && <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />}
                          {slot.start} - {slot.end}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {selectedPricing && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 rounded-xl bg-primary/5 border border-primary/20 space-y-2"
                >
                  <h4 className="text-sm font-semibold">Price Breakdown</h4>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Base Price</span>
                    <span>₹{selectedPricing.base}</span>
                  </div>
                  {selectedPricing.peakMultiplier > 1 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Peak Hours (×{selectedPricing.peakMultiplier})</span>
                      <span className="text-accent">Applied</span>
                    </div>
                  )}
                  {selectedPricing.weekendMultiplier > 1 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Weekend (×{selectedPricing.weekendMultiplier})</span>
                      <span className="text-accent">Applied</span>
                    </div>
                  )}
                  <div className="flex justify-between font-heading font-bold text-lg pt-2 border-t border-border/30">
                    <span>Total</span>
                    <span className="text-primary">₹{selectedPricing.total}</span>
                  </div>
                </motion.div>
              )}

              <Button
                className="w-full font-heading font-semibold btn-glow rounded-xl"
                size="lg"
                disabled={!selectedSlot}
                onClick={handleBookNow}
              >
                {selectedSlot ? "Book Now" : "Select a Slot"}
              </Button>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>{ground.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{ground.openTime} - {ground.closeTime}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {selectedSlot && selectedPricing && selectedSlotObj && (
        <BookingFormDialog
          open={showBookingForm}
          onClose={() => setShowBookingForm(false)}
          turfName={ground.name}
          date={selectedDate.toISOString().split("T")[0]}
          timeSlot={`${selectedSlotObj.start} - ${selectedSlotObj.end}`}
          amount={selectedPricing.total}
          onSuccess={handleBookingSuccess}
        />
      )}

      <BookingSuccessModal
        open={showSuccess}
        onClose={() => setShowSuccess(false)}
        booking={successBooking}
      />
    </main>
  );
};

export default GroundDetails;
