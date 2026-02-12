export type SportCategory = "Box Cricket" | "Football" | "Badminton" | "Tennis" | "Basketball" | "Multi-Sports";

export interface Ground {
  id: string;
  name: string;
  sport: SportCategory;
  location: string;
  area: string;
  address: string;
  image: string;
  images: string[];
  rating: number;
  reviewCount: number;
  basePrice: number;
  slotDuration: number; // in minutes
  openTime: string;
  closeTime: string;
  facilities: string[];
  description: string;
  phone: string;
  ownerName: string;
}

export interface Review {
  id: string;
  groundId: string;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export const sportCategories: { name: SportCategory; icon: string; slotDuration: number }[] = [
  { name: "Box Cricket", icon: "🏏", slotDuration: 120 },
  { name: "Football", icon: "⚽", slotDuration: 90 },
  { name: "Badminton", icon: "🏸", slotDuration: 60 },
  { name: "Tennis", icon: "🎾", slotDuration: 60 },
  { name: "Basketball", icon: "🏀", slotDuration: 60 },
  { name: "Multi-Sports", icon: "🏟️", slotDuration: 60 },
];

const areas = ["Satellite", "Bopal", "Vastrapur", "Thaltej", "Maninagar", "Navrangpura", "SG Highway", "Prahlad Nagar", "Gota", "Chandkheda"];

const facilityOptions = ["Parking", "Changing Room", "Floodlights", "Drinking Water", "Washroom", "First Aid", "Cafeteria", "Seating Area", "Coaching Available", "Equipment Rental"];

const groundImages = [
  "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=800&h=500&fit=crop",
  "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=800&h=500&fit=crop",
];

const groundNamesBySport: Record<SportCategory, string[]> = {
  "Box Cricket": [
    "Stumps Arena", "Cricket Hub 360", "Six & Out Arena", "PowerPlay Zone", "Boundary Line Turf",
    "Howzat Arena", "Wicket World", "Cricket Paradise", "Super Over Ground", "The Pitch Ahmedabad",
  ],
  "Football": [
    "Kick Zone Turf", "Goal Arena", "Striker's Field", "Football Factory", "The Green Pitch",
    "Penalty Box Turf", "Hat-trick Arena", "FC Ground Ahmedabad", "Soccer Hub", "Goalpost Turf",
  ],
  "Badminton": [
    "Shuttle Zone", "Smash Arena", "Drop Shot Courts", "Feather Shuttle Hub", "Rally Point Arena",
    "Net Edge Courts", "Shuttle Masters", "Ace Badminton Club", "Clear & Smash", "Court King Arena",
  ],
  "Tennis": [
    "Ace Tennis Club", "Grand Slam Arena", "Baseline Courts", "Match Point Turf", "Tennis Edge",
    "Volley Point Arena", "Deuce Court Club", "Top Spin Arena", "Love Game Courts", "Rally Masters",
  ],
  "Basketball": [
    "Dunk Zone Arena", "Hoop Dreams Court", "Slam Dunk Hub", "Three Point Arena", "Basket Central",
    "Court Kings Arena", "Fast Break Zone", "Alley Oop Arena", "Rebound Courts", "Swish Arena",
  ],
  "Multi-Sports": [
    "All Sports Arena", "Multi Play Zone", "Sports Central Hub", "The Sports Village", "Arena 360",
    "PlayAll Ground", "Universal Sports Hub", "Infinity Sports Arena", "Total Sports Zone", "The Sports Deck",
  ],
};

function generateGrounds(): Ground[] {
  const grounds: Ground[] = [];
  let id = 1;

  for (const category of sportCategories) {
    const names = groundNamesBySport[category.name];
    for (let i = 0; i < 10; i++) {
      const area = areas[i % areas.length];
      const numFacilities = 4 + Math.floor(Math.random() * 5);
      const shuffledFacilities = [...facilityOptions].sort(() => Math.random() - 0.5).slice(0, numFacilities);
      const basePrice = category.name === "Box Cricket" ? 800 + Math.floor(Math.random() * 700)
        : category.name === "Football" ? 1200 + Math.floor(Math.random() * 800)
        : 300 + Math.floor(Math.random() * 400);

      grounds.push({
        id: `ground-${id}`,
        name: names[i],
        sport: category.name,
        location: `${area}, Ahmedabad`,
        area,
        address: `${Math.floor(Math.random() * 200) + 1}, ${area} Road, ${area}, Ahmedabad - ${380000 + Math.floor(Math.random() * 100)}`,
        image: groundImages[id % groundImages.length],
        images: groundImages.slice(0, 3 + Math.floor(Math.random() * 3)),
        rating: Number((3.5 + Math.random() * 1.5).toFixed(1)),
        reviewCount: 10 + Math.floor(Math.random() * 90),
        basePrice,
        slotDuration: category.slotDuration,
        openTime: "06:00",
        closeTime: "23:00",
        facilities: shuffledFacilities,
        description: `${names[i]} is one of the finest ${category.name.toLowerCase()} grounds in ${area}, Ahmedabad. Equipped with professional-grade facilities and maintained to the highest standards for an exceptional playing experience.`,
        phone: `+91 98${Math.floor(10000000 + Math.random() * 89999999)}`,
        ownerName: `Owner ${id}`,
      });
      id++;
    }
  }
  return grounds;
}

export const grounds = generateGrounds();

const reviewComments = [
  "Great ground with excellent facilities!",
  "Had an amazing experience. Will definitely come back.",
  "Good turf quality but parking is limited.",
  "Loved the floodlights and ambiance. Perfect for evening games.",
  "Affordable pricing and well-maintained ground.",
  "The staff was very helpful and friendly.",
  "Best ground in the area, highly recommended!",
  "Decent ground but could improve the washroom facilities.",
  "Perfect for weekend games with friends and family.",
  "Professional-grade turf, felt like playing in a stadium!",
];

const reviewerNames = ["Raj Patel", "Priya Shah", "Amit Kumar", "Sneha Desai", "Vikram Singh", "Anjali Mehta", "Karan Joshi", "Nisha Gupta", "Rohit Sharma", "Meera Thakkar"];

export function getReviewsForGround(groundId: string): Review[] {
  const count = 3 + Math.floor(Math.random() * 5);
  return Array.from({ length: count }, (_, i) => ({
    id: `review-${groundId}-${i}`,
    groundId,
    userName: reviewerNames[i % reviewerNames.length],
    rating: 3 + Math.floor(Math.random() * 3),
    comment: reviewComments[i % reviewComments.length],
    date: new Date(2025, Math.floor(Math.random() * 12), 1 + Math.floor(Math.random() * 28)).toISOString().split("T")[0],
  }));
}

export function calculatePrice(basePrice: number, startTime: string, date: Date): { total: number; base: number; peakMultiplier: number; weekendMultiplier: number } {
  const hour = parseInt(startTime.split(":")[0]);
  const day = date.getDay();

  const peakMultiplier = hour >= 17 && hour < 22 ? 2 : 1;
  const weekendMultiplier = day === 0 || day === 6 ? 1.25 : 1;
  const total = Math.round(basePrice * peakMultiplier * weekendMultiplier);

  return { total, base: basePrice, peakMultiplier, weekendMultiplier };
}

export function generateSlots(openTime: string, closeTime: string, slotDuration: number): { start: string; end: string }[] {
  const slots: { start: string; end: string }[] = [];
  const [openH, openM] = openTime.split(":").map(Number);
  const [closeH, closeM] = closeTime.split(":").map(Number);
  const openMinutes = openH * 60 + openM;
  const closeMinutes = closeH * 60 + closeM;

  let current = openMinutes;
  while (current + slotDuration <= closeMinutes) {
    const startH = Math.floor(current / 60);
    const startM = current % 60;
    const endH = Math.floor((current + slotDuration) / 60);
    const endM = (current + slotDuration) % 60;
    slots.push({
      start: `${String(startH).padStart(2, "0")}:${String(startM).padStart(2, "0")}`,
      end: `${String(endH).padStart(2, "0")}:${String(endM).padStart(2, "0")}`,
    });
    current += slotDuration;
  }
  return slots;
}
