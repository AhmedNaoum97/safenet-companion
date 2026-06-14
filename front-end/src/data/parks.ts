// src/data/parks.ts
// This file contains the "database" (static list) of parks.
// The Park type lives in src/types/park.ts (single source of truth).

import type { Park } from "../types/park";

export const parks: Park[] = [
  // 🇳🇴 Norway
  {
    id: "jotunheimen",
    name: "Jotunheimen National Park",
    country: "Norway",
    region: "Europe",
    isNorwegian: true,
    popularWithNorwegians: true,
    description:
      "Home to Norway's highest peaks, dramatic ridges and glacier valleys. A classic destination for hikers.",
    bestSeason: "June - September",
    activities: ["Hiking", "Glaciers", "Lakes"],
  },
  {
    id: "lofoten",
    name: "Lofotodden National Park",
    country: "Norway",
    region: "Europe",
    isNorwegian: true,
    popularWithNorwegians: true,
    description:
      "Wild mountains rising from the sea, white beaches and charming fishing villages.",
    bestSeason: "May - August",
    activities: ["Coastal hikes", "Photography", "Kayaking"],
  },

  // 🇪🇸 Spain
  {
    id: "teide",
    name: "Teide National Park",
    country: "Spain",
    region: "Europe",
    isNorwegian: false,
    popularWithNorwegians: true,
    description:
      "Volcanic landscapes on Tenerife with Spain's highest peak and spectacular night skies.",
    bestSeason: "Year-round",
    activities: ["Hiking", "Stargazing", "Scenic drives"],
  },

  // 🇮🇹 Italy
  {
    id: "dolomiti-bellunesi",
    name: "Dolomiti Bellunesi National Park",
    country: "Italy",
    region: "Europe",
    isNorwegian: false,
    popularWithNorwegians: true,
    description:
      "Dramatic Dolomite mountains, alpine meadows and traditional northern Italian villages.",
    bestSeason: "June - September",
    activities: ["Trekking", "Via ferrata", "Family hikes"],
  },

  // 🇬🇷 Greece
  {
    id: "olympus",
    name: "Olympus National Park",
    country: "Greece",
    region: "Europe",
    isNorwegian: false,
    popularWithNorwegians: true,
    description:
      "Mount Olympus – mythical home of Zeus, with deep gorges, tall peaks and Mediterranean climate.",
    bestSeason: "May - October",
    activities: ["Hiking", "Mythology", "Photography"],
  },

  // 🇹🇭 Thailand
  {
    id: "khao-sok",
    name: "Khao Sok National Park",
    country: "Thailand",
    region: "Asia",
    isNorwegian: false,
    popularWithNorwegians: true,
    description:
      "Lush rainforest, dramatic limestone cliffs and the beautiful Cheow Lan Lake with floating bungalows.",
    bestSeason: "December - April",
    activities: ["Jungle trekking", "Boat tours", "Wildlife watching"],
  },

  // 🇲🇦 Morocco
  {
    id: "toubkal",
    name: "Toubkal National Park",
    country: "Morocco",
    region: "Africa",
    isNorwegian: false,
    popularWithNorwegians: true,
    description:
      "The Atlas Mountains, Berber culture and the summit of North Africa's highest peak.",
    bestSeason: "April - June & September - October",
    activities: ["Trekking", "Beaches", "Cultural trips"],
  },

  // 🇯🇵 Japan
  {
    id: "fuji-hakone-izu",
    name: "Fuji-Hakone-Izu National Park",
    country: "Japan",
    region: "Asia",
    isNorwegian: false,
    popularWithNorwegians: true,
    description:
      "Mount Fuji views, hot springs, lakes and volcanic islands close to Tokyo.",
    bestSeason: "April - November",
    activities: ["Hiking", "Onsen", "Sightseeing"],
  },
];

/*
Template for adding more parks:

{
  id: "",
  name: "",
  country: "",
  region: "",
  isNorwegian: false,
  popularWithNorwegians: false,
  description: "",
  bestSeason: "",
  activities: [],
}
*/
