import { Link } from "react-router-dom";
import { Star, MapPin, Clock, Heart, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Ground } from "@/data/grounds";
import { useState } from "react";

const GroundCard = ({ ground, onCompare, isComparing }: { ground: Ground; onCompare?: (g: Ground) => void; isComparing?: boolean }) => {
  const [liked, setLiked] = useState(false);

  return (
    <Card className="group overflow-hidden glass-card hover-lift hover:border-primary/30 transition-all duration-300">
      <div className="relative overflow-hidden">
        <img
          src={ground.image}
          alt={ground.name}
          className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />

        <Badge className="absolute top-3 left-3 gradient-primary text-primary-foreground font-semibold shadow-md">
          {ground.sport}
        </Badge>
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button
            onClick={(e) => { e.preventDefault(); setLiked(!liked); }}
            className="p-1.5 rounded-full bg-background/60 backdrop-blur-sm hover:bg-background/80 transition-colors"
          >
            <Heart className={`h-4 w-4 transition-colors ${liked ? "fill-destructive text-destructive" : "text-foreground/70"}`} />
          </button>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-background/70 backdrop-blur-sm rounded-full px-2.5 py-1">
          <Star className="h-3.5 w-3.5 fill-accent text-accent" />
          <span className="text-xs font-bold">{ground.rating}</span>
        </div>
        {ground.rating > 4.3 && (
          <div className="absolute bottom-3 right-3">
            <Badge variant="secondary" className="bg-accent/20 text-accent border-accent/30 text-xs">
              <Zap className="h-3 w-3 mr-0.5" /> Instant Book
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4 space-y-3">
        <h3 className="font-heading font-bold text-lg line-clamp-1 group-hover:text-primary transition-colors">{ground.name}</h3>
        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <MapPin className="h-3.5 w-3.5 flex-shrink-0" />
          <span className="line-clamp-1">{ground.location}</span>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground text-sm">
          <Clock className="h-3.5 w-3.5 flex-shrink-0" />
          <span>{ground.slotDuration} min slots</span>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border/30">
          <div>
            <span className="text-primary font-heading font-bold text-lg">₹{ground.basePrice}</span>
            <span className="text-muted-foreground text-xs ml-1">/ slot</span>
          </div>
          <div className="flex gap-2">
            {onCompare && (
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => { e.preventDefault(); onCompare(ground); }}
                className={`rounded-xl text-xs ${isComparing ? "border-primary text-primary" : "border-border/50"}`}
              >
                {isComparing ? "Added" : "Compare"}
              </Button>
            )}
            <Link to={`/ground/${ground.id}`}>
              <Button size="sm" className="btn-glow rounded-xl text-xs">Book Now</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default GroundCard;
