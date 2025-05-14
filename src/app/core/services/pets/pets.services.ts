import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal, computed } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { PetsApiResponse, Pet } from '../../models/pets/pet.model';
import { Observable } from 'rxjs';
import { Review } from '../../models/service/service.model';

@Injectable({
  providedIn: 'root',
})
export class PetsService {
  private http = inject(HttpClient);

  private petsSignal = signal<Pet[]>([]);
  public totalPets = computed(() => this.petsSignal().length);
  public allPets = computed(() => this.petsSignal());
  
  private myPetsSignal = signal<Pet[]>([]);
  public myPets = computed(() => this.myPetsSignal());

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

  // Get my pets
  getMyPets() {
    return this.http.get<PetsApiResponse>(environment.apiUrl + 'Pets/getmypets').subscribe({
      next: (res) => {
        this.myPetsSignal.set(res.data);
      }
    })
  }

  // Add pet to my pets
  addPetToMyPets(pet: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'Pets/addpetuser', pet)
  }

  // Edit my pet
  editMyPet(id: string, data: any): Observable<any> {
    return this.http.patch<any>(`${environment.apiUrl}Pets/updateMyPet/${id}`, data);
  }
  
  // Delete my pet
  deleteMyPet(id: string): Observable<any> {
    return this.http.delete<any>(`${environment.apiUrl}Pets/deletePet/${id}`);
  }


  
}
