export interface Review {
  _id: string;
  name: string;
  email: string;
  review: string;
  rating: number;
  createdAt: string;
  service: string;
  user: {
    _id: string;
    name: string;
    profileImage: string;
    id: string;
  };
  __v: number;
  id: string;
}

export interface ServiceProfileModel {
  _id: string;
  icon: string;
  name: string;
  description: string;
  rate: number;
  numberOfRate: number;
  imagesProfile: string[];
  price: number;
  from: number;
  to: number;
  pricePer: string;
  about: string;
  accepted_pet_types: string[];
  accepted_pet_sizes: string[];
  question1: [string, string];
  question2: [string, string];
  question3: [string, string];
  __v: number;
  serviceProfile: string;
  reviewsOfService: Review[];
  id: string;
}

export interface ServiceModel {
  _id: string;
  serviceType: string;
  city: string;
  serviceImage: string;
  rate: number;
  price: number;
  pricePer: string;
  serviceProfile: ServiceProfileModel;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface ServicesModelResponse {
  length: number;
  shuffledServices: ServiceModel[];
}
