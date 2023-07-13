// eslint-disable-next-line @typescript-eslint/no-unused-vars
import React, { PropsWithChildren, createContext, useContext, useEffect, useState } from 'react';
import { AuthToken } from './model/AuthToken';
import GolfCanadaClient, { GOLF_CANADA_AUTH_TOKEN } from './client/GolfCanadaClient';

export interface GolfCanadaContextType {
  authToken?: AuthToken;
  client?: GolfCanadaClient;
}

const GolfCanadaContext = createContext<GolfCanadaContextType>({
  authToken: undefined,
  client: undefined
});

export const useGolfCanada = (): GolfCanadaContextType => useContext<GolfCanadaContextType>(GolfCanadaContext);

export const GolfCanadaProvider = ({
  children
}: PropsWithChildren): React.ReactElement => {
  const [authToken, setAuthToken] = useState<AuthToken>();
  const [client] = useState<GolfCanadaClient>(
    new GolfCanadaClient()
  );

  useEffect(() => {       
    chrome.storage.local.get(GOLF_CANADA_AUTH_TOKEN)
      .then( value => console.log(value) )
      .catch( error => console.log(error) )    
  }, [])

  return (
    <GolfCanadaContext.Provider value={{
      authToken: authToken,
      client: client
    }}>
      { children }
    </GolfCanadaContext.Provider>
  )
};