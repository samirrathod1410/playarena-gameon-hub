import { useState, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, Grid3X3, List } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import GroundCard from "@/components/GroundCard";
import { grounds, sportCategories, type SportCategory, type Ground } from "@/data/grounds";

const areas = ["All Areas", "Satellite", "Bopal", "Vastrapur", "Thaltej", "Maninagar", "Navrangpura", "SG Highway", "Prahlad Nagar", "Gota", "Chandkheda"];

const BrowseGrounds = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialSport = searchParams.get("sport") || "";
  const initialQuery = searchParams.get("q") || "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedSport, setSelectedSport] = useState(initialSport);
  const [selectedArea, setSelectedArea] = useState("All Areas");
  const [sortBy, setSortBy] = useState("rating");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [compareList, setCompareList] = useState<Ground[]>([]);

  const filtered = useMemo(() => {
    let result = [...grounds];
    if (selectedSport) result = result.filter((g) => g.sport === selectedSport);
    if (selectedArea !== "All Areas") result = result.filter((g) => g.area === selectedArea);
    if (query) {
      const q = query.toLowerCase();
      result = result.filter((g) => g.name.toLowerCase().includes(q) || g.location.toLowerCase().includes(q) || g.sport.toLowerCase().includes(q));
    }
    if (sortBy === "rating") result.sort((a, b) => b.rating - a.rating);
    else if (sortBy === "price-low") result.sort((a, b) => a.basePrice - b.basePrice);
    else if (sortBy === "price-high") result.sort((a, b) => b.basePrice - a.basePrice);
    else if (sortBy === "reviews") result.sort((a, b) => b.reviewCount - a.reviewCount);
    return result;
  }, [selectedSport, selectedArea, query, sortBy]);

  const toggleCompare = (ground: Ground) => {
    setCompareList((prev) =>
      prev.find((g) => g.id === ground.id) ? prev.filter((g) => g.id !== ground.id) : prev.length < 3 ? [...prev, ground] : prev
    );
  };

  return (
    <main className="container py-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-heading font-bold">
            Browse <span className="text-primary">Grounds</span>
          </h1>
          <p className="text-muted-foreground mt-1">Find the perfect ground for your next game</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search grounds..." value={query} onChange={(e) => setQuery(e.target.value)} className="pl-10 bg-secondary/60" />
          </div>
          <Select value={selectedArea} onValueChange={setSelectedArea}>
            <SelectTrigger className="w-full md:w-44 bg-secondary/60"><SelectValue /></SelectTrigger>
            <SelectContent>{areas.map((a) => <SelectItem key={a} value={a}>{a}</SelectItem>)}</SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-44 bg-secondary/60"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="rating">Top Rated</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="reviews">Most Reviews</SelectItem>
            </SelectContent>
          </Select>
          <div className="flex gap-1">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="icon" onClick={() => setViewMode("grid")}><Grid3X3 className="h-4 w-4" /></Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="icon" onClick={() => setViewMode("list")}><List className="h-4 w-4" /></Button>
          </div>
        </div>

        {/* Sport filter chips */}
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedSport === "" ? "default" : "outline"}
            className="cursor-pointer px-4 py-1.5"
            onClick={() => setSelectedSport("")}
          >
            All Sports
          </Badge>
          {sportCategories.map((s) => (
            <Badge
              key={s.name}
              variant={selectedSport === s.name ? "default" : "outline"}
              className="cursor-pointer px-4 py-1.5"
              onClick={() => setSelectedSport(selectedSport === s.name ? "" : s.name)}
            >
              {s.icon} {s.name}
            </Badge>
          ))}
        </div>

        {/* Compare bar */}
        {compareList.length > 0 && (
          <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/30">
            <span className="text-sm font-medium">Comparing: {compareList.map((g) => g.name).join(", ")}</span>
            <span className="text-xs text-muted-foreground">({compareList.length}/3)</span>
            <a href={`/compare?ids=${compareList.map((g) => g.id).join(",")}`}>
              <Button size="sm">Compare Now</Button>
            </a>
            <Button variant="ghost" size="sm" onClick={() => setCompareList([])}>Clear</Button>
          </div>
        )}

        {/* Results */}
        <p className="text-sm text-muted-foreground">{filtered.length} grounds found</p>
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "flex flex-col gap-4"}>
          {filtered.map((ground) => (
            <GroundCard
              key={ground.id}
              ground={ground}
              onCompare={toggleCompare}
              isComparing={!!compareList.find((g) => g.id === ground.id)}
            />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <p className="text-xl text-muted-foreground">No grounds found matching your filters.</p>
            <Button variant="ghost" className="mt-4 text-primary" onClick={() => { setQuery(""); setSelectedSport(""); setSelectedArea("All Areas"); }}>
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </main>
  );
};

export default BrowseGrounds;
