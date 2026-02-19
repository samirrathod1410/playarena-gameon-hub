import { motion } from "framer-motion";
import { Gift, Star, Trophy, Zap, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const levels = [
  { name: "Bronze", min: 0, max: 500, color: "text-orange-400" },
  { name: "Silver", min: 500, max: 1500, color: "text-gray-300" },
  { name: "Gold", min: 1500, max: 3000, color: "text-accent" },
  { name: "Platinum", min: 3000, max: 5000, color: "text-primary" },
];

const rewards = [
  { title: "₹100 Cashback", points: 200, icon: "💰", description: "Get ₹100 off your next booking" },
  { title: "Free 30 Min Slot", points: 350, icon: "⏱️", description: "Extend your game with a free 30-minute slot" },
  { title: "10% Discount Coupon", points: 150, icon: "🎟️", description: "10% off on any booking for 7 days" },
  { title: "Priority Booking", points: 500, icon: "⚡", description: "Book peak slots before anyone else" },
];

const Rewards = () => {
  const userPoints = 820;
  const currentLevel = levels.find((l) => userPoints >= l.min && userPoints < l.max) || levels[0];
  const nextLevel = levels[levels.indexOf(currentLevel) + 1];
  const progress = nextLevel
    ? ((userPoints - currentLevel.min) / (nextLevel.min - currentLevel.min)) * 100
    : 100;

  return (
    <main className="container py-12 space-y-10">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center space-y-3">
        <h1 className="text-3xl md:text-4xl font-heading font-bold">
          Your <span className="text-primary text-glow">Rewards</span>
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Earn points every time you book. Redeem for cashback, free slots, and exclusive perks.
        </p>
      </motion.div>

      {/* Points & Level */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 }}>
          <Card className="glass-card">
            <CardContent className="p-6 flex flex-col items-center gap-4">
              {/* Animated Circle */}
              <div className="relative w-40 h-40">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 120 120">
                  <circle cx="60" cy="60" r="52" fill="none" stroke="hsl(var(--secondary))" strokeWidth="8" />
                  <circle
                    cx="60" cy="60" r="52" fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="8"
                    strokeLinecap="round"
                    strokeDasharray={`${progress * 3.27} ${327 - progress * 3.27}`}
                    className="transition-all duration-1000"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-3xl font-heading font-bold text-primary">{userPoints}</span>
                  <span className="text-xs text-muted-foreground">points</span>
                </div>
              </div>
              <div className="text-center">
                <p className={`text-lg font-heading font-bold ${currentLevel.color}`}>
                  <Trophy className="inline h-5 w-5 mr-1" />
                  {currentLevel.name} Member
                </p>
                {nextLevel && (
                  <p className="text-xs text-muted-foreground mt-1">
                    {nextLevel.min - userPoints} points to {nextLevel.name}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Level Progress */}
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
          <Card className="glass-card h-full">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Zap className="h-5 w-5 text-accent" /> Level Progress
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {levels.map((level, i) => {
                const isActive = level.name === currentLevel.name;
                const isCompleted = userPoints >= level.max;
                return (
                  <div key={level.name} className="space-y-1.5">
                    <div className="flex items-center justify-between text-sm">
                      <span className={`font-medium ${isActive ? level.color : "text-muted-foreground"}`}>
                        {level.name}
                      </span>
                      <span className="text-xs text-muted-foreground">{level.min} - {level.max} pts</span>
                    </div>
                    <Progress
                      value={isCompleted ? 100 : isActive ? progress : 0}
                      className="h-2"
                    />
                  </div>
                );
              })}
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Redeemable Rewards */}
      <div>
        <h2 className="text-xl font-heading font-bold mb-6 flex items-center gap-2">
          <Gift className="h-5 w-5 text-primary" /> Redeem Rewards
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {rewards.map((reward, i) => (
            <motion.div
              key={reward.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
            >
              <Card className="glass-card hover-lift group">
                <CardContent className="p-5 space-y-3 text-center">
                  <span className="text-4xl block">{reward.icon}</span>
                  <h3 className="font-heading font-bold text-sm">{reward.title}</h3>
                  <p className="text-xs text-muted-foreground">{reward.description}</p>
                  <div className="flex items-center justify-center gap-1 text-xs">
                    <Star className="h-3 w-3 text-accent" />
                    <span className="font-semibold text-accent">{reward.points} points</span>
                  </div>
                  <Button
                    size="sm"
                    variant={userPoints >= reward.points ? "default" : "outline"}
                    disabled={userPoints < reward.points}
                    className="w-full text-xs"
                  >
                    {userPoints >= reward.points ? "Redeem" : "Not enough points"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Rewards;
