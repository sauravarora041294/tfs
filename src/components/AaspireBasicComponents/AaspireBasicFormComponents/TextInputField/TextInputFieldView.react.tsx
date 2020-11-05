import React from "react";
import { Input } from "antd";
import s from "./TextInputField.module.scss";

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
}

const TextInputFieldView: React.FC<Props> = React.forwardRef(
  (props: Props, ref: React.MutableRefObject<Input>) => {
    return <Input ref={ref} {...props} className={s.TextInputField} />;
  },
);

export default TextInputFieldView;
