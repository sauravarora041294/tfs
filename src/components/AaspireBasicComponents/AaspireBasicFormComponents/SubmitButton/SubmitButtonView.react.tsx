import React from "react";
import { Button } from "antd";
import s from "./SubmitButton.module.scss";

interface Props {
  type: "primary";
  className?: string;
  loading?: boolean;
  children: React.ReactNode;
}

const SubmitButtonView: React.FC<Props> = (props: Props) => {
  return (
    <Button {...props} className={s.SubmitButton} htmlType="submit">
      {props.children}
    </Button>
  );
};

export default SubmitButtonView;
