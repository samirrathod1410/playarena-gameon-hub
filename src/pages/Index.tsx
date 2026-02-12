import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowRight, MapPin, Users, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GroundCard from "@/components/GroundCard";
import { grounds, sportCategories } from "@/data/grounds";
import { useState } from "react";

const stats = [
  { label: "Grounds Listed", value: "60+", icon: MapPin },
  { label: "Active Players", value: "5,000+", icon: Users },
  { label: "Bookings Made", value: "10,000+", icon: Calendar },
  { label: "Avg Rating", value: "4.5★", icon: Star },
];

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const featured = grounds.filter((_, i) => i % 7 === 0).slice(0, 6);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden py-24 md:py-36">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl" />
        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center space-y-6"
          >
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black leading-tight">
              Every Game{" "}
              <span className="text-primary text-glow">Starts Here.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover, compare, and book the best sports grounds in Ahmedabad. From Box Cricket to Basketball — your perfect arena awaits.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by sport, area..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary/60 border-border/50"
                />
              </div>
              <Link to={`/browse${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ""}`}>
                <Button className="w-full sm:w-auto font-semibold">
                  Find Grounds <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sport Categories */}
      <section className="container py-16">
        <h2 className="text-2xl md:text-3xl font-heading font-bold text-center mb-10">
          Browse by <span className="text-primary">Sport</span>
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {sportCategories.map((sport, i) => (
            <motion.div
              key={sport.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={`/browse?sport=${encodeURIComponent(sport.name)}`}
                className="flex flex-col items-center gap-3 p-6 rounded-xl bg-card border border-border/50 hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5 transition-all duration-300 group"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform">{sport.icon}</span>
                <span className="text-sm font-heading font-semibold text-center">{sport.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center p-6 rounded-xl bg-card border border-border/50">
              <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-heading font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Grounds */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-2xl md:text-3xl font-heading font-bold">
            Featured <span className="text-primary">Grounds</span>
          </h2>
          <Link to="/browse">
            <Button variant="ghost" className="text-primary">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((ground) => (
            <GroundCard key={ground.id} ground={ground} />
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16">
        <div className="relative rounded-2xl overflow-hidden p-10 md:p-16 text-center bg-gradient-to-br from-primary/10 via-card to-accent/10 border border-border/50">
          <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
            Ready to <span className="text-primary text-glow">Play?</span>
          </h2>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Join thousands of players who book their favourite sports grounds through PlayArena.
          </p>
          <Link to="/browse">
            <Button size="lg" className="font-heading font-semibold">
              Browse All Grounds <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
};

export default Index;
