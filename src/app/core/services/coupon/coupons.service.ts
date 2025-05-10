import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';

export interface Coupon {
  _id: string;
  name: string;
  expire: string;
  discount: number;
  createdAt: string; 
  updatedAt: string;
  __v: number;
}

export interface CouponsResponse {
  results: number;
  data: Coupon[];
}


@Injectable({
  providedIn: 'root'
})
export class CouponsService {
  private http = inject(HttpClient);

  private couponSignal = signal<Coupon[]>([]);
  public allCoupons = this.couponSignal.asReadonly();

  // Get all coupons 
  getAllCoupons(): void {
     this.http.get<any>(environment.apiUrl + 'coupon/getallcoupon').pipe(map((res) => res.data)).subscribe((res) => {
      this.couponSignal.set(res)
    })
  }

  // Create a new coupon
  createCoupon(formData: any): Observable<any> {
    return this.http.post<any>(environment.apiUrl + 'coupon/createcoupon', formData);
  }
}
