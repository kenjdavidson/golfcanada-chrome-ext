import { Axios, toFormData } from 'axios';
import { AuthToken, AuthTokenResponse } from '../model/AuthToken';

export const GOLF_CANADA_AUTH_TOKEN = "GOLF_CANADA_AUTH_TOKEN";
export const GOLF_CANADA_BASE_URL = "https://scg.golfcanada.ca"

export class Client {    
    accessToken?: string;
    axios: Axios;

    constructor(
        accessToken = process.env.GOLF_CANADA_AUTH_TOKEN
    ) {
        this.accessToken = accessToken;

        this.axios = new Axios({
            baseURL: GOLF_CANADA_BASE_URL
        });

        this.axios.interceptors.request.use(config => {
            if (this.accessToken) {
                config.headers.Authorization = `Bearer: ${this.accessToken}`
            }
            
            return config;
        })
    }

    login = async (username: string, password: string): Promise<AuthToken> => {
        const loginUrl = "/connect/token";

        const body = new URLSearchParams({
            grant_type: 'password',
            scope: 'address email offline_access openid phone profile roles',
            username,
            password
        });

        const response = await this.axios.post<AuthTokenResponse | string>(loginUrl, body.toString(), {
            headers: {
                "User-Agent": "golfcanada-cli",
                "Accept": "*/*"
            }
        });
        
        if (response.status == 400) {
            const error = JSON.parse(response.data as string)
            throw new Error(error.error_description);
        }

        return AuthToken.parse(response.data as AuthTokenResponse);
    }
}

export default new Client();