import logo from './logo.svg';
import React, { useCallback, useState } from 'react';
import OidcModule from './OidcModule';
import './App.scss';
import 'antd/dist/antd.css';
import { Button, Card, Input } from 'antd';

const { TextArea } = Input;
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
  const [strConfig, setStrConfig] = useState('');
  const [oidcConfiguration, setOidcConfiguration] = useSessionStorage('oidcConfig', null);
  const [confIsHidden, setConfIsHidden] = useState(false);
  const location = window.location.href;

  const parseJson = useCallback(() => {
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
  }, [location, setOidcConfiguration, strConfig]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <div className="container">
        {!confIsHidden && (
          <Card title="Configuration" style={{ width: 600 }}>
            <TextArea
              id="oidcconf"
              name="oidcconf"
              rows="15"
              placeholder="Veuillez copier votre configuration"
              value={strConfig}
              onChange={e => {
                console.log(e);
                setStrConfig(e.target.value);
              }}
            />
            <Button onClick={parseJson} style={{ margin: '1em' }}>
              Importer Config
            </Button>
          </Card>
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
