import React from "react";
import { Route, Switch } from "react-router-dom";
import { Location } from "history";
import CreatorsHubSearch from "./CreatorsHubSearch.react";

interface Props {
  location?: Location;
}

const CreatorsHubSearchRouteHandler: React.FC<Props> = props => {
  return (
    <div>
      <Switch>
        <Route
          exact
          path={"/search/:searchText"}
          render={props => <CreatorsHubSearch {...props} />}
        />
        <Route
          exact
          path={"/search"}
          render={props => <CreatorsHubSearch {...props} />}
        />
      </Switch>
    </div>
  );
};

export default CreatorsHubSearchRouteHandler;
