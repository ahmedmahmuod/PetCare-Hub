import { HttpClient } from "@angular/common/http";
import { inject, Injectable, signal, computed } from "@angular/core";
import { map, Observable } from "rxjs";
import { DoctorModel, DoctorResponse, VetClinic, VetClinicResponse } from "../../models/veterinary/veterinary.model";
import { environment } from "../../../../environments/environment.prod";

@Injectable({
  providedIn: 'root'
})
export class VetsService {
  private http = inject(HttpClient);

  // === Signals ===
    private doctorsSignal = signal<DoctorModel[]>([]);
    private clinicsSignal = signal<VetClinic[]>([]);

    private isLoadingDoctors = signal<boolean>(false);
    private isLoadingClinics = signal<boolean>(false);

    public readonly allDoctors = computed(() => this.doctorsSignal());
    public readonly allClinics = computed(() => this.clinicsSignal());

    public readonly loadingDoctors = computed(() => this.isLoadingDoctors());
    public readonly loadingClinics = computed(() => this.isLoadingClinics());

    // === Load Doctors ===
    loadDoctors() {
    this.isLoadingDoctors.set(true);
    this.http.get<DoctorResponse>(environment.apiUrl + 'doctors/getdoctors')
        .pipe(map(res => res.doctors.filter(doc => doc.name && doc.imagesProfile)))
        .subscribe({
        next: (doctors) => {
            this.doctorsSignal.set(doctors);
            this.isLoadingDoctors.set(false);
        },
        error: (err) => {
            console.error('Failed to load doctors:', err);
            this.isLoadingDoctors.set(false);
        }
        });
    }

    // === Load Clinics ===
    loadClinics() {
    this.isLoadingClinics.set(true);
    this.http.get<VetClinicResponse>(environment.apiUrl + 'vet/getallvet')
        .pipe(map(res => res.data.filter(clinic => clinic.vetImage && clinic.vetName)))
        .subscribe({
        next: (clinics) => {
            this.clinicsSignal.set(clinics);
            this.isLoadingClinics.set(false);
        },
        error: (err) => {
            console.error('Failed to load clinics:', err);
            this.isLoadingClinics.set(false);
        }
        });
    }

    // Get single clinic
    getClinic(clinicId: string): Observable<VetClinic> {
        return this.http
          .get<{ status: string, data: {data: VetClinic} }>(environment.apiUrl + 'vet/getvet/' + clinicId)
          .pipe(map(res => res.data.data));
    }

    // Get single Doctor
    getDoctor(doctorId: string): Observable<DoctorModel> {
        return this.http.get<{updatedDoc: DoctorModel}>(environment.apiUrl + 'doctors/get-doctor/' + doctorId)
        .pipe(map(response => response.updatedDoc));
    }

    // Add New Doctor
    addDoctor(doctor: FormData): Observable<any> {
        return this.http.post<any>(environment.apiUrl + 'doctors/add-doctor', doctor);
    }

    // Add New Clinic
    addClinic(clinic: FormData): Observable<any> {
        return this.http.post<any>(environment.apiUrl + 'vet/createvet', clinic);
    }
}