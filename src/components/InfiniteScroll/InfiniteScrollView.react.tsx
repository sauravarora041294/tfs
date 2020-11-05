import React from "react";
import s from "./InfiniteScroll.module.scss";
import classNames from "classnames";

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

const InfiniteScrollView = (props: Props) => {
  const [element, setElement] = React.useState(null);

  const loader = React.useRef(props.loadMore);

  React.useEffect(() => {
    loader.current = props.loadMore;
  }, [props.loadMore]);

  const observer = React.useRef(
    new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loader.current();
        }
      },
      { threshold: 0.1 },
    ),
  );

  React.useEffect(() => {
    const currentElement = element;
    const currentObserver = observer.current;
    if (currentElement) {
      currentObserver.observe(currentElement);
    }

    return () => {
      if (currentElement) {
        currentObserver.unobserve(currentElement);
      }
    };
  }, [element, props.displayMultiplePerLine && props.children]);

  const loadingIndicator = React.useMemo(
    () =>
      props.hasMore ? (
        <span ref={setElement} className={s.listItemLoader}>
          Loading...
        </span>
      ) : null,
    [props.hasMore],
  );

  return (
    <ul
      id="listContainer"
      style={{
        height: props.height,
        overflowY: props.isScrollable ? "scroll" : "hidden",
        padding: "0",
      }}
      className={classNames(
        { [s.list]: props.horizontalOnMobile },
        { [props.className]: true },
      )}
    >
      {props.children}
      {loadingIndicator}
    </ul>
  );
};

export default InfiniteScrollView;
