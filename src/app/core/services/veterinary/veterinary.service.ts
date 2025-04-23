import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { filter, map, Observable } from "rxjs";
import { DoctorModel, DoctorResponse, VetClinic, VetClinicResponse } from "../../models/veterinary/veterinary.model";
import { environment } from "../../../../environments/environment.prod";


@Injectable({
    providedIn: 'root'
})

export class VetsService {
    private http = inject(HttpClient);

    // Get all docotrs
    getAllDoctors(): Observable<DoctorResponse> {
        return this.http.get<DoctorResponse>(environment.apiUrl + 'doctors/getdoctors');
    }
    
    // Get single Doctor
    getDoctor(doctorId: string): Observable<DoctorModel> {
        return this.http.get<{updatedDoc: DoctorModel}>(environment.apiUrl + 'doctors/get-doctor/' + doctorId)
        .pipe(map(response => response.updatedDoc));
    }
    
    // Get all clinics 
    getAllClinics(): Observable<VetClinic[]> {
        return this.http.get<VetClinicResponse>(environment.apiUrl + 'vet/getallvet').pipe(map((res) => res.data.filter((data) => data.vetImage && data.desc)))
    }

    // Get single clinic
    getClinic(clinicId: string): Observable<VetClinic> {
        return this.http
          .get<{ status: string, data: {data: VetClinic} }>(environment.apiUrl + 'vet/getvet/' + clinicId)
          .pipe(map(res => res.data.data));
      }
    
}