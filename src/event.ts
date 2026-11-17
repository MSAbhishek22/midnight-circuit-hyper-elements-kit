/**
 * The event every template in the kit announces.
 * Change this one file and the email, the web page, the PDF ticket and the
 * social card all follow — that is the point of the kit.
 */
export const event = {
  name: "Midnight Circuit",
  edition: "Vol. 04",
  tagline: "A 24-hour hackathon, shot in one take.",
  city: "Bengaluru",
  venue: "The Old Projection House, MG Road",
  doors: "Fri 11 Dec 2026 · Doors 18:00",
  runs: "11–12 December 2026",
  ends: "Demos from 18:00, Sat 12 Dec",
  url: "https://midnightcircuit.example.com",
  registerUrl: "https://midnightcircuit.example.com/register",
  prizePool: "₹4,00,000",
  hackers: "300 hackers · 75 teams · 24 hours",
};

export const schedule = [
  { time: "18:00", item: "Doors — registration, wristbands, first coffee" },
  { time: "19:00", item: "Opening frame — theme reveal and the rules of the night" },
  { time: "20:00", item: "Teams lock. Hacking begins." },
  { time: "02:00", item: "The midnight screening — snacks, stretch, a short film" },
  { time: "08:00", item: "Sunrise stand-up — mentors walk the floor" },
  { time: "16:00", item: "Last reel — code freeze warnings begin" },
  { time: "18:00", item: "Code freeze. Demos, judging and the closing ceremony" },
];

export const tracks = [
  {
    name: "The Heist",
    brief: "Fintech and payments. Move money like you stole the scene.",
    prize: "₹1,50,000",
  },
  {
    name: "The Sequel",
    brief: "AI agents that finish what the first film started.",
    prize: "₹1,50,000",
  },
  {
    name: "Director's Cut",
    brief: "Open theme. The boldest cut wins — design counts double.",
    prize: "₹1,00,000",
  },
];

export const judges = [
  { initials: "MK", name: "Meera Krishnan", role: "CTO, payments infrastructure" },
  { initials: "DO", name: "Daniel Osei", role: "AI research lead" },
  { initials: "PL", name: "Petra Lindqvist", role: "Design director, ex-studio" },
];

export const ticket = {
  code: "MC4-2026-0117",
  row: "Row F",
  seat: "Seat 12",
  tier: "Hacker Pass — full 24 hours",
};
