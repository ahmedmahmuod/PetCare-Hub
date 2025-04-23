import { Pet } from '../../core/models/pets/pet.model';

export interface PetsState {
  pets: Pet[];
  loading: boolean;
  error: string | null;
}

export const initialState: PetsState = {
  pets: [],
  loading: false,
  error: null,
};
