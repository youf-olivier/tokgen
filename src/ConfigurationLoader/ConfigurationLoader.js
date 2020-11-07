import { useCallback, useState } from 'react';
import { Button, Card, Input, Popover } from 'antd';
import { InfoCircleTwoTone } from "@ant-design/icons";
import defaultConf from './defaultConf.json';
import './style.scss';

const { TextArea } = Input;

const Content = () => (
  <>
    <span>Votre configuration OIDC doit etre sous format JSON et doit contenir</span>
    <ul>
      <li>authority (string): L'url du provider OIDC</li>
      <li>client_id (string): Identifiant client auprès du provider</li>
      <li>scope (string): Les scopes qui vont etre deùandé auprès du provider</li>
      </ul>
      A noter : 
      <ul>
      <li>les urls et le code sont automatiquement rensignés</li>
      <li><b>Pensez à déclarer l'url de TokGen auprès de votre provider !</b></li>
    </ul>
  </>
);

const Title = () => (
  <div className="popover-title">
    Configuration
    <Popover content={Content} title="Configuration OIDC" trigger="click">
    <InfoCircleTwoTone style={{padding:"1em", fontSize:"1.3em"}}/>
    </Popover>
  </div>
);

const ConfigurationLoader = ({ loadConfiguration, unloadConfiguration }) => {
  const [strConfig, setStrConfig] = useState(() => JSON.stringify(defaultConf, null, '\t'));
  const loadConfigurationCb = useCallback(() => {
    loadConfiguration(strConfig);
  }, [loadConfiguration, strConfig]);
  const onChangeCb = useCallback(e => setStrConfig(e.target.value), []);
  return (
    <Card title={<Title />} style={{ width: 600 }}>
      <TextArea
        id="oidcconf"
        name="oidcconf"
        rows="15"
        placeholder="Veuillez copier votre configuration"
        value={strConfig}
        onChange={onChangeCb}
      />
      <div className="button-container">
        <Button onClick={loadConfigurationCb} type="primary">
          Charger
        </Button>
        <Button onClick={unloadConfiguration}>Décharger</Button>
      </div>
    </Card>
  );
};

export default ConfigurationLoader;
