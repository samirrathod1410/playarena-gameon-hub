import { Link } from "react-router-dom";
import { Star, MapPin, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Ground } from "@/data/grounds";

const GroundCard = ({ ground, onCompare, isComparing }: { ground: Ground; onCompare?: (g: Ground) => void; isComparing?: boolean }) => (
  <Card className="group overflow-hidden bg-card border-border/50 hover:border-primary/40 transition-all duration-300 hover:shadow-lg hover:shadow-primary/5">
    <div className="relative overflow-hidden">
      <img
        src={ground.image}
        alt={ground.name}
        className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />
      <Badge className="absolute top-3 left-3 bg-primary text-primary-foreground font-semibold">
        {ground.sport}
      </Badge>
      <div className="absolute top-3 right-3 flex items-center gap-1 bg-background/80 backdrop-blur-sm rounded-full px-2 py-1">
        <Star className="h-3 w-3 fill-primary text-primary" />
        <span className="text-xs font-semibold">{ground.rating}</span>
      </div>
    </div>
    <CardContent className="p-4 space-y-3">
      <h3 className="font-heading font-bold text-lg line-clamp-1">{ground.name}</h3>
      <div className="flex items-center gap-1 text-muted-foreground text-sm">
        <MapPin className="h-3.5 w-3.5" />
        <span className="line-clamp-1">{ground.location}</span>
      </div>
      <div className="flex items-center gap-1 text-muted-foreground text-sm">
        <Clock className="h-3.5 w-3.5" />
        <span>{ground.slotDuration} min slots</span>
      </div>
      <div className="flex items-center justify-between pt-2">
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
              className={isComparing ? "border-primary text-primary" : "border-border/50"}
            >
              {isComparing ? "Added" : "Compare"}
            </Button>
          )}
          <Link to={`/ground/${ground.id}`}>
            <Button size="sm">View</Button>
          </Link>
        </div>
      </div>
    </CardContent>
  </Card>
);

export default GroundCard;
