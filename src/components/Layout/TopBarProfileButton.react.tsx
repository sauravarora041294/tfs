import { User } from "data/types";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { Dropdown, Header } from "semantic-ui-react";
import { History } from "history";
import s from "./Layout.module.scss";

interface Props {
  history?: History;
  currentUser: User;
}

const TopBarProfileButton: React.FC<Props> = (props: Props) => {
  const accountChar = React.useMemo(
    () =>
      props.currentUser ? props.currentUser.firstName.substring(0, 1) : "",
    [props.currentUser],
  );

  const options = [
    {
      key: 1,
      text: "myAccount",
      value: 1,
      content: (
        <Header
          icon="user"
          content="My Account"
          onClick={() => props.history.push("/myaccount")}
        />
      ),
    },
  ];

  return (
    <div className={s.account}>
      <Dropdown
        trigger={
          <div className={s.accountIcon}>
            <span>{accountChar}</span>
          </div>
        }
        options={options}
        pointing="top left"
        icon={null}
        direction="left"
      />
    </div>
  );
};

export default compose<Props, Props>(withRouter)(TopBarProfileButton);
