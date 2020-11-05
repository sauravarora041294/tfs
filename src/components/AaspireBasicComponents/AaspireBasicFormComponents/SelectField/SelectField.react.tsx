import React from "react";
import { Select as AntSelect } from "antd";
import SelectFieldView from "./SelectFieldView.react";

interface Props {
  label?: string;
  placeholder?: string;
  autoComplete?: string;
  onChange?: (values: any, info: any) => any;
  dropdownMatchSelectWidth?: boolean;
  showSearch?: boolean;
  optionFilterProp?: string;
  filterOption?: (input: string, option) => boolean;
  disabled?: boolean;
  ref?: React.MutableRefObject<AntSelect>;
  mode?:
  | "default"
  | "multiple"
  | "tags"
  | "combobox"
  | "SECRET_COMBOBOX_MODE_DO_NOT_USE";
  onSearch?: () => void;
}

const SelectField: React.FC<Props> = React.forwardRef(
  (props: Props, ref: React.MutableRefObject<AntSelect>) => (
    <SelectFieldView ref={ref} {...props} />
  ),
);

export default SelectField;
