import { useParams, Link } from "react-router-dom";
import { Star, MapPin, Clock, Phone, ChevronLeft, Calendar as CalendarIcon, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { grounds, generateSlots, calculatePrice, getReviewsForGround } from "@/data/grounds";
import { useState } from "react";

const GroundDetails = () => {
  const { id } = useParams();
  const ground = grounds.find((g) => g.id === id);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);

  if (!ground) {
    return (
      <main className="container py-16 text-center">
        <h1 className="text-2xl font-heading font-bold">Ground not found</h1>
        <Link to="/browse"><Button className="mt-4">Back to Browse</Button></Link>
      </main>
    );
  }

  const slots = generateSlots(ground.openTime, ground.closeTime, ground.slotDuration);
  const reviews = getReviewsForGround(ground.id);
  const bookedSlots = new Set(slots.filter((_, i) => i % 5 === 2 || i % 7 === 0).map((s) => s.start));

  const selectedPricing = selectedSlot ? calculatePrice(ground.basePrice, selectedSlot, selectedDate) : null;

  return (
    <main className="container py-8">
      <Link to="/browse" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-primary mb-6">
        <ChevronLeft className="h-4 w-4" /> Back to Browse
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Images */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <img src={ground.images[0]} alt={ground.name} className="w-full h-64 md:h-80 object-cover rounded-xl" />
            <div className="grid grid-cols-2 gap-3">
              {ground.images.slice(1, 5).map((img, i) => (
                <img key={i} src={img} alt={`${ground.name} ${i + 2}`} className="w-full h-full object-cover rounded-xl" />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <Badge className="bg-primary text-primary-foreground">{ground.sport}</Badge>
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-primary text-primary" />
                <span className="font-semibold">{ground.rating}</span>
                <span className="text-muted-foreground text-sm">({ground.reviewCount} reviews)</span>
              </div>
            </div>
            <h1 className="text-3xl font-heading font-bold">{ground.name}</h1>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="h-4 w-4" /> {ground.address}
            </div>
            <p className="text-muted-foreground">{ground.description}</p>
          </div>

          {/* Facilities */}
          <Card className="bg-card border-border/50">
            <CardHeader><CardTitle className="text-lg">Facilities</CardTitle></CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {ground.facilities.map((f) => (
                  <Badge key={f} variant="secondary" className="px-3 py-1.5">{f}</Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Pricing Table */}
          <Card className="bg-card border-border/50">
            <CardHeader><CardTitle className="text-lg">Pricing</CardTitle></CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-xs text-muted-foreground mb-1">Regular</p>
                  <p className="text-xl font-heading font-bold text-primary">₹{ground.basePrice}</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-xs text-muted-foreground mb-1">Peak (5-10 PM)</p>
                  <p className="text-xl font-heading font-bold text-primary">₹{ground.basePrice * 2}</p>
                </div>
                <div className="p-4 rounded-lg bg-secondary/50">
                  <p className="text-xs text-muted-foreground mb-1">Weekend Peak</p>
                  <p className="text-xl font-heading font-bold text-primary">₹{Math.round(ground.basePrice * 2 * 1.25)}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Reviews */}
          <Card className="bg-card border-border/50">
            <CardHeader><CardTitle className="text-lg">Reviews</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              {reviews.map((r) => (
                <div key={r.id} className="p-4 rounded-lg bg-secondary/30 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span className="font-medium text-sm">{r.userName}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <Star key={i} className={`h-3 w-3 ${i < r.rating ? "fill-primary text-primary" : "text-muted-foreground/30"}`} />
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
          <Card className="bg-card border-border/50 sticky top-20">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CalendarIcon className="h-5 w-5 text-primary" /> Book a Slot
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Date Picker */}
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={(d) => { if (d) { setSelectedDate(d); setSelectedSlot(null); } }}
                disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                className="rounded-md border border-border/50"
              />

              {/* Time Slots */}
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
                        className={`px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                          isBooked ? "bg-destructive/20 text-muted-foreground cursor-not-allowed line-through"
                          : isSelected ? "bg-primary text-primary-foreground neon-border"
                          : "bg-secondary/50 hover:bg-primary/20 hover:text-primary"
                        }`}
                      >
                        {slot.start} - {slot.end}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Price Breakdown */}
              {selectedPricing && (
                <div className="p-4 rounded-lg bg-primary/5 border border-primary/20 space-y-2">
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
                  <div className="flex justify-between font-heading font-bold text-lg pt-2 border-t border-border/50">
                    <span>Total</span>
                    <span className="text-primary">₹{selectedPricing.total}</span>
                  </div>
                </div>
              )}

              <Button className="w-full font-heading font-semibold" size="lg" disabled={!selectedSlot}>
                {selectedSlot ? "Book Now" : "Select a Slot"}
              </Button>

              {/* Contact */}
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
    </main>
  );
};

export default GroundDetails;
