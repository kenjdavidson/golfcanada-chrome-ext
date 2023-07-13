import { AuthTokenResponse } from '../client/AuthTokenResponse';
import { User } from './User';

export class AuthToken {
  tokenType: string;
  accessToken: string;
  refreshToken: string;
  idToken: string;
  expiresIn: number;
  expiryDate: Date;
  user: User;

  constructor(
    tokenType = 'Bearer',
    accessToken: string,
    refreshToken: string,
    expiresIn: number,
    expiryDate: Date,
    idToken: string,
    user: User,
  ) {
    this.tokenType = tokenType;
    this.accessToken = accessToken;
    this.refreshToken = refreshToken;
    this.expiresIn = expiresIn;
    this.expiryDate = expiryDate;
    this.idToken = idToken;
    this.user = user;
  }

  static parse(response: AuthTokenResponse): AuthToken {
    return new AuthToken(
      response.token_type,
      response.access_token,
      response.refresh_token,
      response.expires_in,
      response.expire_date ? new Date(response.expire_date) : new Date(),
      response.id_token,
      response.user,
    );
  }
}
