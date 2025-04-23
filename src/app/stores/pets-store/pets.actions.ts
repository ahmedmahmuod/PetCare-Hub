import { createAction, props } from '@ngrx/store';
import { Pet } from '../../core/models/pets/pet.model';

export const loadPets = createAction(
  '[Pets] Load Pets',
  props<{ petType: string }>() 

);

export const loadPetsSuccess = createAction(
  '[Pets] Load Pets Success',
  props<{ pets: Pet[] }>()
);

export const loadPetsFailure = createAction(
  '[Pets] Load Pets Failure',
  props<{ error: any }>()
);