import { User } from "./User";

export interface AuthTokenResponse {
    token_type: string;
    access_token?: string;
    refresh_token?: string;
    expires_in?: number;
    expire_date?: string;
    id_token?: string;
    user?: User;
}

export interface AuthError extends Error {
    
}

export class AuthToken {
    constructor (
        tokenType: string = "Bearer", 
        accessToken: string = '',
        refreshToken: string = '',
        expiresIn: number = 0,
        expiryDate: Date = new Date(),
        idToken: string = '',
        user?: User
    ) {}

    static parse(response: AuthTokenResponse): AuthToken {
        return new AuthToken(
            response.token_type,
            response.access_token,
            response.refresh_token,
            response.expires_in,
            response.expire_date ? new Date(response.expire_date) : new Date(),
            response.id_token,
            response.user
        );
    }
}