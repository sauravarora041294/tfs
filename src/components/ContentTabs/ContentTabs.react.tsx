import React, { ReactNode, CSSProperties } from "react";
import ContentTabsView from "./ContentTabsView.react";
import { ContentTabsSizeType } from ".";

interface Props {
  tabContents: Array<{
    key: string;
    tabName: string;
    children: any;
    disabled?: boolean;
  }>;
  defaultActiveKey: string;
  extraContent?: ReactNode | HTMLElement;
  style?: CSSProperties;
  size?: ContentTabsSizeType;
  onTabChange?: (activeKey: string) => void;
  activeKey?: string;
  centered?: boolean;
}

const ContentTabs: React.FC<Props> = (props: Props) => {
  return <ContentTabsView {...props} />;
};

export default ContentTabs;
