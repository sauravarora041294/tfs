import React from "react";
import { Input as AntdInput } from "antd";
import s from "./Input.module.scss";

interface Props {
  ref?: React.LegacyRef<AntdInput>;
  label?: string;
  placeholder?: string;
  autoComplete?: string;
}

const InputView: React.FC<Props> = React.forwardRef(
  (props: Props, ref: React.LegacyRef<AntdInput>) => (
    <React.Fragment>
      {props.label && <span className={s.inputLabel}>{props.label}</span>}
      <AntdInput ref={ref} className={s.inputBase} {...props} />
    </React.Fragment>
  ),
);

export default InputView;
