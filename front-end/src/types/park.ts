// src/types/park.ts
export type Park = {
  id: string;
  name: string;
  country: string;
  region: string;

  isNorwegian: boolean;
  popularWithNorwegians: boolean;

  description: string;
  descriptionLong?: string; // optional for later
  bestSeason: string;
  activities: string[];

  // Extras for later features / future-proofing
  lat?: number;
  lng?: number;
  imageUrl?: string;
};
