import { useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { Star, MapPin, Clock, Check, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { grounds } from "@/data/grounds";

const CompareGrounds = () => {
  const [searchParams] = useSearchParams();
  const idsParam = searchParams.get("ids");
  const preselected = idsParam ? idsParam.split(",").map((id) => grounds.find((g) => g.id === id)).filter(Boolean) : [];

  const [selected, setSelected] = useState<(typeof grounds[0] | null)[]>([
    preselected[0] || null,
    preselected[1] || null,
    preselected[2] || null,
  ]);

  const allFacilities = useMemo(() => {
    const set = new Set<string>();
    selected.forEach((g) => g?.facilities.forEach((f) => set.add(f)));
    return Array.from(set).sort();
  }, [selected]);

  const setSlot = (index: number, id: string) => {
    const g = grounds.find((g) => g.id === id) || null;
    setSelected((prev) => { const next = [...prev]; next[index] = g; return next; });
  };

  return (
    <main className="container py-8">
      <h1 className="text-3xl font-heading font-bold mb-2">
        Compare <span className="text-primary">Grounds</span>
      </h1>
      <p className="text-muted-foreground mb-8">Select up to 3 grounds to compare side-by-side</p>

      <div className="overflow-x-auto">
        <div className="min-w-[800px]">
          {/* Selectors */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div className="font-heading font-semibold text-sm text-muted-foreground pt-2">Select Grounds</div>
            {[0, 1, 2].map((i) => (
              <Select key={i} value={selected[i]?.id || ""} onValueChange={(v) => setSlot(i, v)}>
                <SelectTrigger className="bg-secondary/60"><SelectValue placeholder={`Ground ${i + 1}`} /></SelectTrigger>
                <SelectContent>
                  {grounds.map((g) => (
                    <SelectItem key={g.id} value={g.id}>{g.name} ({g.sport})</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
          </div>

          {/* Images */}
          <div className="grid grid-cols-4 gap-4 mb-6">
            <div />
            {selected.map((g, i) => (
              <div key={i} className="rounded-xl overflow-hidden h-40 bg-secondary">
                {g && <img src={g.image} alt={g.name} className="w-full h-full object-cover" />}
              </div>
            ))}
          </div>

          {/* Rows */}
          {[
            { label: "Name", render: (g: typeof grounds[0]) => <span className="font-semibold">{g.name}</span> },
            { label: "Sport", render: (g: typeof grounds[0]) => g.sport },
            { label: "Location", render: (g: typeof grounds[0]) => <span className="flex items-center gap-1"><MapPin className="h-3 w-3" />{g.location}</span> },
            { label: "Rating", render: (g: typeof grounds[0]) => <span className="flex items-center gap-1"><Star className="h-3 w-3 fill-primary text-primary" />{g.rating} ({g.reviewCount} reviews)</span> },
            { label: "Base Price", render: (g: typeof grounds[0]) => <span className="text-primary font-bold">₹{g.basePrice}/slot</span> },
            { label: "Slot Duration", render: (g: typeof grounds[0]) => <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{g.slotDuration} min</span> },
            { label: "Hours", render: (g: typeof grounds[0]) => `${g.openTime} - ${g.closeTime}` },
          ].map((row) => (
            <div key={row.label} className="grid grid-cols-4 gap-4 py-3 border-b border-border/30">
              <div className="text-sm font-medium text-muted-foreground">{row.label}</div>
              {selected.map((g, i) => (
                <div key={i} className="text-sm">{g ? row.render(g) : "—"}</div>
              ))}
            </div>
          ))}

          {/* Facilities */}
          {allFacilities.length > 0 && (
            <>
              <div className="mt-6 mb-3 font-heading font-semibold text-sm">Facilities</div>
              {allFacilities.map((f) => (
                <div key={f} className="grid grid-cols-4 gap-4 py-2 border-b border-border/20">
                  <div className="text-sm text-muted-foreground">{f}</div>
                  {selected.map((g, i) => (
                    <div key={i} className="text-sm">
                      {g ? (g.facilities.includes(f) ? <Check className="h-4 w-4 text-primary" /> : <X className="h-4 w-4 text-muted-foreground/30" />) : "—"}
                    </div>
                  ))}
                </div>
              ))}
            </>
          )}

          {/* Actions */}
          <div className="grid grid-cols-4 gap-4 mt-6">
            <div />
            {selected.map((g, i) => (
              <div key={i}>
                {g && (
                  <Link to={`/ground/${g.id}`}>
                    <Button className="w-full" size="sm">View Details</Button>
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default CompareGrounds;
