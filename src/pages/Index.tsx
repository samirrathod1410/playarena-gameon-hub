import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, ArrowRight, MapPin, Users, Calendar, Star, Trophy, Zap } from "lucide-react";
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

const fadeInUp = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
};

const Index = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const featured = grounds.filter((_, i) => i % 7 === 0).slice(0, 6);

  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden py-28 md:py-40">
        {/* Animated gradient bg */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-card/50 to-primary/5" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full bg-primary/5 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full bg-accent/5 blur-[100px]" />

        {/* Floating sports icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {["🏏", "⚽", "🏸", "🎾", "🏀", "🏟️"].map((icon, i) => (
            <motion.span
              key={i}
              className="absolute text-3xl md:text-4xl opacity-10"
              style={{
                top: `${15 + (i * 13) % 70}%`,
                left: `${5 + (i * 17) % 90}%`,
              }}
              animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
            >
              {icon}
            </motion.span>
          ))}
        </div>

        <div className="container relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl mx-auto text-center space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-primary">
              <Zap className="h-3 w-3" /> India's Premium Sports Booking Platform
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-black leading-tight">
              Every Game{" "}
              <span className="text-primary text-glow">Starts Here.</span>
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Discover, compare, and book the best sports grounds in Ahmedabad. From Box Cricket to Basketball — your perfect arena awaits.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by sport, area..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-secondary/40 border-border/30 rounded-xl h-12"
                />
              </div>
              <Link to={`/browse${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ""}`}>
                <Button size="lg" className="w-full sm:w-auto btn-glow rounded-xl font-semibold h-12">
                  Book Your Game Now <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
            <div className="flex justify-center">
              <Link to="/browse">
                <Button variant="ghost" className="text-muted-foreground hover:text-primary">
                  Explore Grounds <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sport Categories */}
      <section className="container py-16">
        <motion.h2 {...fadeInUp} transition={{ delay: 0.1 }} viewport={{ once: true }} whileInView="animate" initial="initial"
          className="text-2xl md:text-3xl font-heading font-bold text-center mb-10">
          Browse by <span className="text-primary">Sport</span>
        </motion.h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {sportCategories.map((sport, i) => (
            <motion.div
              key={sport.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <Link
                to={`/browse?sport=${encodeURIComponent(sport.name)}`}
                className="flex flex-col items-center gap-3 p-6 rounded-xl glass-card hover:border-primary/30 hover-lift transition-all duration-300 group"
              >
                <span className="text-4xl group-hover:scale-110 transition-transform duration-300">{sport.icon}</span>
                <span className="text-sm font-heading font-semibold text-center">{sport.name}</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className="container py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="text-center p-6 rounded-xl glass-card"
            >
              <stat.icon className="h-6 w-6 mx-auto mb-2 text-primary" />
              <p className="text-2xl font-heading font-bold text-primary">{stat.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Featured Grounds */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-10">
          <motion.h2 {...fadeInUp} whileInView="animate" viewport={{ once: true }} initial="initial"
            className="text-2xl md:text-3xl font-heading font-bold">
            Featured <span className="text-primary">Grounds</span>
          </motion.h2>
          <Link to="/browse">
            <Button variant="ghost" className="text-primary hover:bg-primary/10">
              View All <ArrowRight className="h-4 w-4 ml-1" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((ground, i) => (
            <motion.div
              key={ground.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <GroundCard ground={ground} />
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="container py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-2xl overflow-hidden p-10 md:p-16 text-center glass-card border-primary/20"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
          <div className="relative z-10">
            <Trophy className="h-10 w-10 mx-auto mb-4 text-accent" />
            <h2 className="text-2xl md:text-4xl font-heading font-bold mb-4">
              Ready to <span className="text-primary text-glow">Play?</span>
            </h2>
            <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
              Join thousands of players who book their favourite sports grounds through PlayArena.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/browse">
                <Button size="lg" className="btn-glow rounded-xl font-heading font-semibold">
                  Book Your Game Now <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
              <Link to="/rewards">
                <Button variant="outline" size="lg" className="rounded-xl border-accent/30 text-accent hover:bg-accent/10">
                  <Star className="h-4 w-4 mr-1" /> Earn Rewards
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden p-3 bg-background/90 backdrop-blur-lg border-t border-border/30">
        <Link to="/browse">
          <Button className="w-full btn-glow rounded-xl font-semibold h-12">
            Book Your Game Now <ArrowRight className="h-4 w-4 ml-1" />
          </Button>
        </Link>
      </div>
    </main>
  );
};

export default Index;
