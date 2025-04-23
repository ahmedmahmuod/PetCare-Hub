import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { Observable } from 'rxjs';
import { PetsApiResponse } from '../../models/pets/pet.model';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
    private http = inject(HttpClient);

    // Get pets by type
    getPetsType(type: string): Observable<PetsApiResponse> {
      return this.http.get<PetsApiResponse>(environment.apiUrl + `Pets/${type}`);
    }
}
