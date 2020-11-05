import React from "react";
import { Collapse } from "antd";
import s from "./CollapsePanel.module.scss";

const CollapsePanelView: React.FC<any> = props => {
  return (
    <Collapse.Panel expandIconPosition="right" {...props} className={s.root}>
      {props.children}
    </Collapse.Panel>
  );
};

export default CollapsePanelView;
