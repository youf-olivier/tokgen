import { useEffect } from 'react';
import { AuthenticationProvider, oidcLog, useReactOidc } from '@axa-fr/react-oidc-context';
import { Alert, Button, notification, Space, Tooltip } from 'antd';
import copy from 'copy-to-clipboard';
import { CopyOutlined, SmileOutlined } from '@ant-design/icons';
import badgeJwt from 'shared/badgeJwt.svg';
import './style.scss';

const OidcModule = ({ setConfIsHidden, clientid, authority }) => {
  const { login, oidcUser, logout } = useReactOidc();

  const copyToClipBoard = token => () => {
    copy(token);
    notification.open({
      message: 'Copié !',
      icon: <SmileOutlined style={{ color: '#108ee9' }} />,
    });
  };
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
          Login
        </Button>
        <Button onClick={logout}>Logout </Button>
      </Space>
      {oidcUser?.access_token && (
        <>
          <div style={{ padding: '0 0 1em' }}>
            <div>
              <div className="token-header-container">
                <b>ID Token</b>
                <Tooltip title="Copier">
                  <Button
                    style={{ marginLeft: '1em' }}
                    shape="circle"
                    icon={<CopyOutlined />}
                    onClick={copyToClipBoard(oidcUser.id_token)}
                  />
                </Tooltip>
                <Tooltip title="Copier">
                  <a href={`https://jwt.io?id_token=${oidcUser.id_token}`} style={{ marginLeft: '1em' }}>
                    <img src={badgeJwt} alt="View in JWT.io" />
                  </a>
                </Tooltip>
              </div>
              {oidcUser.id_token}
            </div>
            <div>
              <div className="token-header-container">
                <b>Access Token</b>
                <Tooltip title="Copier">
                  <Button
                    style={{ marginLeft: '1em' }}
                    shape="circle"
                    icon={<CopyOutlined />}
                    onClick={copyToClipBoard(oidcUser.access_token)}
                  />
                </Tooltip>
                <Tooltip title="Copier">
                  <a href={`https://jwt.io?access_token=${oidcUser.access_token}`} style={{ marginLeft: '1em' }}>
                    <img src={badgeJwt} alt="View in JWT.io" />
                  </a>
                </Tooltip>
              </div>
              {oidcUser.access_token}
            </div>
            <div>
              <div className="token-header-container">
                <b>Refresh Token</b>
                <Tooltip title="Copier">
                  <Button
                    style={{ marginLeft: '1em' }}
                    shape="circle"
                    icon={<CopyOutlined />}
                    onClick={copyToClipBoard(oidcUser.refresh_token)}
                  />
                </Tooltip>
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

const OidcModuleContainer = ({ configuration, ...rest }) => {
  useEffect(() => {
    console.log('MOUNT');
    return () => {
      console.log('UNMOUNT');
    };
  }, [configuration]);
  return (
    <AuthenticationProvider style={{ margin: '2em' }} configuration={configuration} loggerLevel={oidcLog.DEBUG}>
      <OidcModule {...rest} />
    </AuthenticationProvider>
  );
};

export default OidcModuleContainer;
