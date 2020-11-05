import React from "react";
import { Input } from "antd";
import s from "./TextAreaInputField.module.scss";

interface Props {
  placeholder?: string;
  autosize?: { minRows: number; maxRows: number };
  rows?: number;
  onChange?: (e: any) => void;
  value?: string;
}

const TextAreaInputFieldView: React.FC<Props> = (props: Props) => {
  return <Input.TextArea {...props} className={s.TextAreaInputField} />;
};

export default TextAreaInputFieldView;
