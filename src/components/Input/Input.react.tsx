import React from "react";
import { Input as AntdInput } from "antd";
import InputView from "./InputView.react";

interface Props {
  ref?: React.LegacyRef<AntdInput>;
  label?: string;
  placeholder?: string;
  autoComplete?: string;
}

const Input: React.FC<Props> = React.forwardRef(
  (props: Props) => (
    <InputView {...props} />
  ),
);

export default Input;