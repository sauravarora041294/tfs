import React from "react";
import { AppContext } from "App";
import { AppStateActionTypes } from "AppReducer";
import { withRouter } from "react-router";
import { Redirect } from "react-router-dom";
import { compose } from "recompose";
import { doSignOut } from "FirebaseClient";

const SignOut: React.FC = () => {
  const [_, dispatch] = React.useContext(AppContext);
  React.useEffect(() => {
    dispatch({
      type: AppStateActionTypes.SET_INVALID_AUTH_TOKEN_ERROR,
      invalidAuthTokenError: null,
    });
    const asyncSignout = async () => {
      await doSignOut();

      window.location.href = "/login";
    };
    asyncSignout();
  }, []);

  return <span />;
};

export default compose(withRouter)(SignOut);
