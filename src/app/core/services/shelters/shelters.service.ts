import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';
import { ShelterModel, SheltersResponse } from '../../models/shelters/shelter.model';
import { Pet } from '../../models/pets/pet.model';

@Injectable({
  providedIn: 'root'
})
export class SheltersService {
  private http = inject(HttpClient)

  // Get all shelters
   getAllShelters(): Observable<SheltersResponse> {
    return this.http.get<SheltersResponse>(environment.apiUrl + 'shelters/allShelters');
  }

  // get shelter by id
  getShelterById(shelterId: string): Observable<ShelterModel> {
    return this.http.get<ShelterModel>(environment.apiUrl + 'shelters/getShelter/'+ shelterId )
  }

  // Get pets of shelter
  getPetsOfShelter(shelterId: string): Observable<Pet[]> {
    return this.http.get<Pet[]>(environment.apiUrl + 'shelters/petsInShelter/'+ shelterId );
  }

}
