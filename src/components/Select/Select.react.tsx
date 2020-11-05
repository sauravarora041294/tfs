import React from "react";
import { Select as AntdSelect } from "antd";
import SelectView from "./SelectView.react";

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

const Select: React.FC<Props> = (props: Props) => {
  return <SelectView {...props} />
}

export default Select;
