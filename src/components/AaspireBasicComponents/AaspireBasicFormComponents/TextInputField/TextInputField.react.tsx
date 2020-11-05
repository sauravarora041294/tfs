import React from "react";
import { Input } from "antd";
import TextInputFieldView from "./TextInputFieldView.react";

interface Props {
  placeholder?: string;
  type?: string;
  autoComplete?: string;
  suffix?: React.ReactNode;
  addonBefore?: string;
  disabled?: boolean;
  ref?: React.MutableRefObject<Input>;
  onChange?: (e: any) => void;
  onBlur?: (e: any) => void;
  className?: any;
}

const TextInputField: React.FC<Props> = React.forwardRef(
  (props: Props, ref: React.MutableRefObject<Input>) => {
    return <TextInputFieldView {...props} ref={ref} />;
  },
);

export default TextInputField;
