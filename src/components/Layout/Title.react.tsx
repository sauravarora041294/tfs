import logoSmall from "assets/images/fbrocketlogo.png";
import logoRegular from "assets/images/futureschoollogo.png";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Icon, Responsive } from "semantic-ui-react";
import s from "./Layout.module.scss";
import { History } from "history";

interface Props {
  history?: History;
  showHamburgerIcon: boolean;
}

const Title: React.FC<Props> = (props: Props) => {
  return (
    <div className={s.title}>
      {props.showHamburgerIcon && (
        <Icon
          name="bars"
          size="large"
          className={s.hamburger}
          onClick={() => {}}
        />
      )}
      <Responsive maxWidth={749}>
        <img
          alt="TFS_Logo"
          src={logoSmall}
          className={s.logoMobile}
          onClick={() => props.history.push("/mydashboard")}
        />
      </Responsive>
      <Responsive minWidth={750}>
        <img
          alt="TFS_Logo"
          src={logoRegular}
          className={s.logo}
          onClick={() => props.history.push("/mydashboard")}
        />
      </Responsive>
    </div>
  );
};

export default compose<Props, Props>(withRouter)(Title);
