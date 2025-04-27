import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { BehaviorSubject, map, Observable } from "rxjs";
import { environment } from "../../../../environments/environment.prod";
import { UserData, UserDataResponse } from "../../models/user/details/user-details.model";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private http = inject(HttpClient);

    private userSubject = new BehaviorSubject<UserData | null>(null);
    public user$ = this.userSubject.asObservable();

    // Get me user data
    getMeUserData (): Observable<UserData> {
        return this.http.get<UserDataResponse>(environment.apiUrl + 'user/getuser').pipe(map((res) => {
            this.userSubject.next(res.data.data);
            return res.data.data;
        }));
    }

    // Get one user by id
    getOneUserById (userId: string): Observable<UserData> {
        return this.http.get<UserDataResponse>(environment.apiUrl + `user/getOneUser/${userId}`).pipe(map((res) => res.data.data));
    }
}