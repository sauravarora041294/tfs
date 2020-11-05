import React from "react";
import InfiniteScrollView from "./InfiniteScrollView.react";

interface Props {
  className?: string;
  height?: number;
  children: React.ReactNode;
  loadMore: () => void;
  hasMore: boolean;
  isScrollable: boolean;
  displayMultiplePerLine?: boolean;
  horizontalOnMobile?: boolean;
}

const InfiniteScroll = (props: Props) => {
  return (
    <InfiniteScrollView {...props} />
  );
}

export default InfiniteScroll;
