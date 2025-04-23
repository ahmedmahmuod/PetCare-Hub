import { createReducer, on } from '@ngrx/store';
import * as PetsActions from './pets.actions';
import { initialState } from './pets.state';

export const petsReducer = createReducer(
  initialState,
  on(PetsActions.loadPets, (state) => ({ ...state, loading: true })),
  on(PetsActions.loadPetsSuccess, (state, { pets }) => ({
    ...state,
    loading: false,
    pets,
    error: null,
  })),
  on(PetsActions.loadPetsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
