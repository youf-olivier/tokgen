import { useCallback, useState } from 'react';

import OidcModule from './OidcModule';

import './App.scss';
import 'antd/dist/antd.css';
import Header from 'Header';
import ConfigurationLoader from 'ConfigurationLoader';

function useSessionStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  const setValue = value => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}

function App() {
  const [error, setError] = useState(null);
  const [oidcConfiguration, setOidcConfiguration] = useSessionStorage('oidcConfig', null);
  const [confIsHidden, setConfIsHidden] = useState(false);
  const location = window.location.href;

  const loadConfiguration = useCallback(
    strConfig => {
      setError(null);
      try {
        const maConf = {
          ...JSON.parse(strConfig),
          redirect_uri: `${location}authentication/callback`,
          silent_redirect_uri: `${location}authentication/silent_callback`,
          post_logout_redirect_uri: location,
        };
        setOidcConfiguration(maConf);
      } catch (e) {
        setError(e.message);
      }
    },
    [location, setOidcConfiguration]
  );

  const unloadConfiguration = useCallback(() => {
    setError(null);
    setOidcConfiguration(null);
  }, [setOidcConfiguration]);
  
  return (
    <div className="App">
      <Header />
      <div className="container">
        {!confIsHidden && (
          <ConfigurationLoader loadConfiguration={loadConfiguration} unloadConfiguration={unloadConfiguration} />
        )}
        {Boolean(oidcConfiguration) && (
          <OidcModule
            configuration={oidcConfiguration}
            setConfIsHidden={setConfIsHidden}
            authority={oidcConfiguration.authority}
            clientid={oidcConfiguration.client_id}
          />
        )}
        {error && <span style={{ color: 'red' }}>{error}</span>}
      </div>
    </div>
  );
}

export default App;
