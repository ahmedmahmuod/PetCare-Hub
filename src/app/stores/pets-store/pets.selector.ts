import { PetsState } from './pets.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';

export const selectPetsState = createFeatureSelector<PetsState>('pets');

export const selectPets = createSelector(
  selectPetsState,
  (state) => state.pets || []
);

export const selectPetsLoading = createSelector(
  selectPetsState,
  (state) => state.loading
);

export const selectPetsError = createSelector(
  selectPetsState,
  (state) => state.error
);
