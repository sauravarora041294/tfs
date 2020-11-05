import React, { ReactNode, CSSProperties } from "react";
import { Tabs } from "antd";
import { ContentTabsSizeType } from ".";
import classnames from "classnames";
import s from "./ContentTabs.module.scss";

interface Props {
  tabContents: Array<{
    key: string;
    tabName: string;
    children: any;
    disabled?: boolean;
  }>;
  defaultActiveKey: string;
  extraContent?: ReactNode | HTMLElement; //use this to provide a searchbar
  style?: CSSProperties;
  size?: ContentTabsSizeType;
  onTabChange?: (activeKey: string) => void;
  activeKey?: string;
  centered?: boolean;
}

const commonTabStyles = {};

const ContentTabsView: React.FC<Props> = (props: Props) => {
  // Do not specify active tab property if no tabchange logic is present
  const tabChangeLogicProperties = props.onTabChange
    ? { onChange: props.onTabChange, activeKey: props.activeKey }
    : {};

  return (
    <div className={s.ContentTabs}>
      <Tabs
        style={{ ...commonTabStyles, ...props.style }}
        defaultActiveKey={props.defaultActiveKey}
        tabBarExtraContent={props.extraContent}
        size={props.size || ContentTabsSizeType.LARGE}
        className={classnames({ [s.centered]: props.centered })}
        {...tabChangeLogicProperties}
      >
        {props.tabContents &&
          props.tabContents.map(tabContent => {
            return (
              <Tabs.TabPane
                tab={tabContent.tabName}
                key={tabContent.key}
                disabled={tabContent.disabled}
                style={{ fontSize: "20px !important" }}
              >
                {tabContent.children}
              </Tabs.TabPane>
            );
          })}
      </Tabs>
    </div>
  );
};

export default ContentTabsView;
