import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { map, Observable } from 'rxjs';
import { ServiceModel, ServiceProfileModel, ServicesModelResponse } from '../../models/service/service.model';

@Injectable({
  providedIn: 'root',
})
export class ServicesService {
  serviceId = signal<string>('');
  
  constructor(private http: HttpClient) {}

  // Get all services
  getAllServices(): Observable<ServiceModel[]> {
    return this.http.get<ServicesModelResponse>(environment.apiUrl + 'services/getAllServices')
      .pipe(
        map((response) => response.shuffledServices) 
      );
  }

  // Get Single Servce details
  getSingleService(serviceId: string): Observable<ServiceProfileModel> {
    return this.http.get<{ updatedDoc: ServiceProfileModel }>(environment.apiUrl + `serviceProfile/get-serviceProfile/${serviceId}`)
    .pipe(
      map((response) => response.updatedDoc) 
    );
  }

  // Get all services by type & city
  getServicesByTypeAndCity(serviceType?: string, city?: string): Observable<ServiceModel[]> {
    let params = new HttpParams();

    if (serviceType) {
      params = params.append('serviceType', serviceType);
    }
    
    if (city) {
      params = params.append('location', city);
    }
  
    return this.http.get<ServicesModelResponse>(environment.apiUrl + 'services/getService', { params }).pipe(
      map((response) => response.shuffledServices || [])
    );
  }

  
  // Add service request
  addServiceRequest(requestData: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + `request/addRequest`, {requestData});
  } 
}
