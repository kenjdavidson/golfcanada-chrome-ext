import { Axios } from 'axios';
import { AuthToken, AuthTokenResponse } from '../model/AuthToken';

export const GOLF_CANADA_AUTH_TOKEN = 'GOLF_CANADA_AUTH_TOKEN';
export const GOLF_CANADA_BASE_URL = 'https://scg.golfcanada.ca';

type OnRefreshListener = (token: AuthToken) => void;

export default class Client {
  authToken?: AuthToken;
  onRefreshToken?: OnRefreshListener;
  axios: Axios;

  constructor(authToken?: AuthToken, onRefresh?: OnRefreshListener) {
    this.authToken = authToken;
    this.onRefreshToken = onRefresh;

    this.axios = new Axios({
      baseURL: GOLF_CANADA_BASE_URL,
    });

    this.axios.interceptors.request.use((config) => {
      if (this.authToken?.accessToken) {
        config.headers.Authorization = `Bearer: ${this.authToken?.accessToken}`;
      }

      return config;
    });
  }

  login = async (username: string, password: string): Promise<AuthToken> => {
    const loginUrl = '/connect/token';

    const body = new URLSearchParams({
      grant_type: 'password',
      scope: 'address email offline_access openid phone profile roles',
      username,
      password,
    });

    const response = await this.axios.post<AuthTokenResponse | string>(loginUrl, body.toString(), {
      headers: {
        'User-Agent': 'golfcanada-cli',
        Accept: '*/*',
      },
    });

    if (response.status != 200) {
      const error = JSON.parse(response.data as string);
      throw new Error(error.error_description);
    }

    this.authToken = AuthToken.parse(response.data as AuthTokenResponse);
    return this.authToken;
  };

  refreshToken = async (): Promise<AuthToken> => {
    const loginUrl = '/connect/token';

    const body = new URLSearchParams({
      grant_type: 'refresh_token',
      scope: 'address email offline_access openid phone profile roles',
      refresh_token: this.authToken?.refreshToken || ''
    });

    const response = await this.axios.post<AuthTokenResponse | string>(loginUrl, body.toString(), {
      headers: {
        'User-Agent': 'golfcanada-cli',
        Accept: '*/*',
      },
    });

    if (response.status != 200) {
      const error = JSON.parse(response.data as string);
      throw new Error(error.error_description);
    }

    this.authToken = AuthToken.parse(response.data as AuthTokenResponse);
    this.onRefreshToken && this.onRefreshToken(this.authToken)
    return this.authToken;
  }
}
