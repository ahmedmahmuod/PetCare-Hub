import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ReviewsService {
  private http = inject(HttpClient);

  // Add a review for a service, shelter, or doctor
  addServiceReview(review: string, rating: number, serviceId: string) {
    return this.http.post(environment.apiUrl + 'reviews/createReviewService/' + serviceId , { review, rating });
  }

  addShelterReview(review: string, rating: number, shelterId: string) {
    return this.http.post(environment.apiUrl + 'reviews/createReviewShelter/' + shelterId , { review, rating });
  }

  addDoctorReview(review: string, rating: number, doctorId: string) {
    return this.http.post(environment.apiUrl + 'reviews/createReviewDoctor/' + doctorId , { review, rating });
  }

  // Delete my Review
  deleteReview(reviewId: string): Observable<any> {
    return this.http.delete<any>(environment.apiUrl + `reviews/deleteReview/${reviewId}`);
  }

  // Update my Review
  updateReview(review: any): Observable<any> {
    const body = { review: review.review, rating: review.rating };
    return this.http.patch<any>(`${environment.apiUrl}reviews/updateReview/${review.id}`, body)
  }

}
