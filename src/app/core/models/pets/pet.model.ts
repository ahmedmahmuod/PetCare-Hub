export interface Pet {
  _id: string;
  name: string;
  petImage: string;
  type: string;
  birthday: string;
  category: string;
  gender: string;
  profileBio: string;
  weight: number;
  adoptionDay?: string;
  size: string;
  owner: string;
  availableForAdoption?: boolean;
  user?: string;
  vaccinations_id?: string[];
  id: string;
}

export interface PetsApiResponse {
  status: string;
  data: Pet[];
}
