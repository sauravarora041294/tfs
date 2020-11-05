import React from "react";
import { Route, Switch } from "react-router-dom";
import { Location } from "history";
import UserSideSearch from "./UserSideSearch.react";

interface Props {
  location?: Location;
}

const UserSideSearchRouteHandler: React.FC<Props> = props => {
  return (
    <div>
      <Switch>
        <Route
          exact
          path="/search/:searchText"
          render={props => <UserSideSearch {...props} />}
        />
        <Route
          exact
          path="/search/"
          render={props => <UserSideSearch {...props} />}
        />
      </Switch>
    </div>
  );
};

export default UserSideSearchRouteHandler;
