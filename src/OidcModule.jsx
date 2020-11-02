import React, { useEffect } from 'react';
import { AuthenticationProvider, oidcLog, useReactOidc } from '@axa-fr/react-oidc-context';
import { Alert, Button, Space } from 'antd';

const OidcModule = ({ setConfIsHidden, clientid, authority }) => {
  const { login, oidcUser, logout } = useReactOidc();
  useEffect(() => {
    setConfIsHidden(Boolean(oidcUser));
    return () => {
      setConfIsHidden(false);
    };
  }, [oidcUser, setConfIsHidden]);
  const Desc = (
    <>
      <ul style={{ textAlign: 'left' }}>
        <li>
          <b>ClientId :</b> {clientid}
        </li>
        <li>
          <b>Authority :</b> {authority}
        </li>
      </ul>
    </>
  );

  return (
    <div style={{ padding: '1em' }}>
      <Alert message="Configuration chargée" type="info" showIcon description={Desc} />
      <Space align="center" style={{ margin: '1em' }}>
        <Button type="primary" onClick={login}>
          Login{' '}
        </Button>
        <Button onClick={logout}>Logout </Button>
      </Space>
      {oidcUser?.access_token && (
        <>
          <div style={{ padding: '0 0 1em' }}>
            <div>
              <div>
                <b>ID Token</b>
              </div>
              {oidcUser.id_token}
            </div>
            <div>
              <div>
                <b>Access Token</b>
              </div>
              {oidcUser.access_token}
            </div>
            <div>
              <div>
                <b>Refresh Token</b>
              </div>
              {oidcUser.refresh_token}
            </div>
          </div>
          <Alert message="Déconnectez vous pour charger une nouvelle configuration" type="warning" />
        </>
      )}
    </div>
  );
};

const OidcModuleContainer = ({ configuration, ...rest }) => (
  <AuthenticationProvider style={{ margin: '2em' }} configuration={configuration} loggerLevel={oidcLog.DEBUG}>
    <OidcModule {...rest} />
  </AuthenticationProvider>
);

export default OidcModuleContainer;
