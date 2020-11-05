import { MarginType } from "data/styleTypes";

export const getStyleWithMargin = ({
  withMargin,
  size,
}: {
  withMargin: MarginType;
  size: {
    top: string;
    left: string;
    right: string;
    bottom: string;
  };
}): React.CSSProperties => {
  const style: React.CSSProperties = {};
  const { top = "0", left = "0", right = "0", bottom = "0" } = size;

  // withMargin handling
  switch (withMargin) {
    case MarginType.ALL:
      style.margin = `${top} ${right} ${bottom} ${left} `;
      break;
    case MarginType.LEFT_AND_RIGHT:
      style.marginLeft = left;
      style.marginRight = right;
      break;
    case MarginType.TOP_AND_BOTTOM:
      style.marginTop = top;
      style.marginBottom = bottom;
      break;
    case MarginType.TOP:
      style.marginTop = top;
      break;
    case MarginType.BOTTOM:
      style.marginBottom = bottom;
      break;
    case MarginType.LEFT:
      style.marginLeft = left;
      break;
    case MarginType.RIGHT:
      style.marginRight = right;
      break;
  }

  return style;
};
