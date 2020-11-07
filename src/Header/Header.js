import { oidcLink } from "constant";
import GitHubCorner from "./GithubCorner";
import logo from 'shared/logo.png';

const Header = () => (
  <>
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <GitHubCorner />
    </header>
    <section className="banner-introduction">
      <div className="container">
        <p>
          Tokgen est un petit utilitaire permettant de générer vos token application à partir d'une configuration de
          type OIDC
        </p>
        <p>Entrez votre configuration OIDC et récupérez vos token</p>
        <p>L'application utilise React OIDC Context pour simuler l'authentification</p>

        <a className="link link-button link-oidc" href={oidcLink}>
          En savoir plus sur React OIDC
        </a>
      </div>
    </section>
  </>
);

export default Header;
