import { User } from "../model/User";

export interface AuthTokenResponse {
  token_type: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  expire_date: string;
  id_token: string;
  user: User;
}


