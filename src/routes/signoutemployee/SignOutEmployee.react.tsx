import React from "react";
import { AppContext } from "App";
import { AppStateActionTypes } from "AppReducer";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { doSignOut } from "FirebaseClient";

const SignOutEmployee: React.FC = () => {
  const [_, dispatch] = React.useContext(AppContext);
  React.useEffect(() => {
    dispatch({
      type: AppStateActionTypes.SET_INVALID_AUTH_TOKEN_ERROR,
      invalidAuthTokenError: null,
    });
    doSignOut();
    window.location.href = "/login-employee";
  });

  return <span />;
};

export default compose(withRouter)(SignOutEmployee);
