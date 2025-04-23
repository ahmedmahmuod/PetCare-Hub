import { HttpClient } from "@angular/common/http";
import { inject, Injectable } from "@angular/core";
import { map, Observable } from "rxjs";
import { environment } from "../../../../environments/environment.prod";
import { UserData, UserDataResponse } from "../../models/user/details/user-details.model";

@Injectable({
    providedIn: 'root'
})
export class UsersService {
    private http = inject(HttpClient);

    // Get one user by id
    getOneUserById (userId: string): Observable<UserData> {
        return this.http.get<UserDataResponse>(environment.apiUrl + `user/getOneUser/${userId}`).pipe(map((res) => res.data.data));
    }
}