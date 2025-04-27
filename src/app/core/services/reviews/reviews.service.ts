import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment.prod';

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

  deleteReview(reviewId: string) {
    // Logic to delete a review
  }
}
