import { Layout } from "antd";
import { AppContext } from "App";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import s from "./CreatorPendingApprovalAppLayout.module.scss";
import {
  creatorPendingApprovalAppLayoutReducer,
  creatorPendingApprovalAppLayoutStateInit,
} from "./CreatorPendingApprovalAppLayoutReducer";
import CreatorPendingApprovalAppTopbar from "./CreatorPendingApprovalAppTopbar.react";

interface Props {
  children: React.ReactNode;
}

const CreatorPendingApprovalAppLayout: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  React.useReducer(
    creatorPendingApprovalAppLayoutReducer,
    {},
    creatorPendingApprovalAppLayoutStateInit,
  );

  return (
    <Layout className={s.creatorLayout}>
      <CreatorPendingApprovalAppTopbar currentUser={appState.currentCreator} />
      <Layout.Header />
      <Layout>
        <Layout className={s.contentLayout}>{props.children}</Layout>
      </Layout>
    </Layout>
  );
};

export default compose<Props, Props>(withRouter)(
  CreatorPendingApprovalAppLayout,
);
