import { ServicesService } from './../../core/services/services/services.service';
import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as PetsActions from './pets.actions';
import { PetsService } from '../../core/services/pets/pets.services';

@Injectable()
export class PetsEffects {
  private actions$ = inject(Actions);
  private petsServices = inject(PetsService);

  loadPets$ = createEffect(() =>
    this.actions$.pipe(
      ofType(PetsActions.loadPets),
      mergeMap(({ petType }) =>
        this.petsServices.loadPetsByType(petType).pipe(
          map((response) => {
            const pets = response.data; 
            return PetsActions.loadPetsSuccess({ pets });
          }),
          catchError((error) => of(PetsActions.loadPetsFailure({ error })))
        )
      )
    )
  );
}