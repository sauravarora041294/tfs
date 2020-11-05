import React from "react";
import { Select as AntdSelect } from "antd";
import s from "./Select.module.scss";

interface Props {
  ref?: React.LegacyRef<AntdSelect>;
  label?: string;
  placeholder?: string;
  autoComplete?: string;
  onChange?: (e: string) => void;
  dropdownMatchSelectWidth?: boolean;
  showSearch?: boolean;
  optionFilterProp?: string;
  filterOption?: (input: string, option) => boolean;
}

const SelectView: React.FC<Props> = React.forwardRef(
  (props: Props, ref: React.LegacyRef<AntdSelect>) => (
    <React.Fragment>
      {props.label && <span className={s.selectLabel}>{props.label}</span>}
      <AntdSelect ref={ref} className={s.selectBase} {...props} />
    </React.Fragment>
  ),
);

export default SelectView;
