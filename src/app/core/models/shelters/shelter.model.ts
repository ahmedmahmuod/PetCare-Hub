import { Review } from "../service/service.model";

interface ShelterLocation {
  coordinates: [number, number]; // [longitude, latitude]
  address: string;
  type: string; // "Point" in this case
}

export interface ShelterModel {
  locations: ShelterLocation;
  _id: string;
  shelterName: string;
  shelterImage: string;
  shelterNumber: string;
  description: string;
  rate: number;
  numberOfRates: number;
  pets_Id: string[];
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number; // version key from MongoDB
  about: string;
  shelterImages: string[];
  id: string; // duplicate of _id
  reviewsOfShelter: Review[];
}

// For the API response structure
export interface SheltersResponse {
  allShelters: ShelterModel[];
}
