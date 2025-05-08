import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, computed } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { PetsApiResponse, Pet } from '../../models/pets/pet.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  private http = inject(HttpClient);

  private petsSignal = signal<Pet[]>([]);
  public totalPets = computed(() => this.petsSignal().length);

  loadPetsByType(type: string): Observable<PetsApiResponse> {
    const obs$ = this.http.get<PetsApiResponse>(environment.apiUrl + `Pets/${type}`);
    obs$.subscribe({
      next: (res) => this.petsSignal.set(res.data),
      error: (err) => console.error(err),
    });
    return obs$;
  }

  loadAllPets(): void {
    this.http.get<PetsApiResponse>(environment.apiUrl + `Pets/getallpets`).subscribe({
      next: (res) => this.petsSignal.set(res.data),
      error: (err) => console.error('Failed to load all pets:', err),
    });
  }

  getPetsSignal() {
    return this.petsSignal.asReadonly();
  }
}
