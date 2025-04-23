import { Review } from './../service/service.model';


// Doctors
export interface DoctorModel {
  _id: string;
  id: string;
  name: string;
  doctorImage: string;
  description: string;
  rate: number;
  numberOfRate: number;
  review: string;
  about: string;
  accepted_pet_types: string[];
  imagesProfile: string[];
  phone: string;
  specialized_in: string[];
  reviewsOfDoctor: Review[];
  __v: number;
}

export interface DoctorResponse {
    doctors: DoctorModel[];
}

// Clinics
export interface VetClinic {
  _id: string;
  vetName: string;
  vetImage?: string;
  bio: string;
  rate: number;
  numberOfRate: string;
  review: string;
  callNumber: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  desc?: string;
  locations: {
    coordinates: [number, number]; // [longitude, latitude]
    address: string;
    type: 'Point';
  };
}

export interface VetClinicResponse {
  results: number;
  data: VetClinic[];
}
