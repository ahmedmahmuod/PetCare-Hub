import { Pet } from "../../pets/pet.model";

export interface UserData {
  _id: string;
  name: string;
  email: string;
  services_id?: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
  pets?: Pet[];
  profileImage?: string;
  favPet?: string[];
  favProduct?: string[];
  followers?: string[];
  following?: string[];
  role: string;
  cards?: {
    cardNumber: string;
    cardExpireDate: string;
    hashedCardSecurityCode: string;
  }[];
  id: string;
  phoneNumber?: string;
}

export interface UserDataResponse {
  status: string;
  data: {
    data: UserData;
  };
}

export interface UpdateProfileDto {
  name?: string;
  email?: string;
  phoneNumber?: string;
  profileImage?: File;
  passwordCurrent?: string;
  password?: string;
}