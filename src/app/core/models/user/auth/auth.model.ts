import { UserData } from "../details/user-details.model";

export interface SignUpModel {
    name: string;
    email: string;
    password: string;
    role: string;
}

export interface SignInModel {
    email: string;
    password: string;
}

export interface AuthResponse {
    status: string;
    token: string;
    data: {
      result: UserData;
    };
  }
  