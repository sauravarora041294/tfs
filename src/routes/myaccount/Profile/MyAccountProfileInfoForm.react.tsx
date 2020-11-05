import { Form, Button, Alert, Row, Col } from "antd";
import React from "react";
import { FormComponentProps } from "antd/es/form";
import s from "../MyAccount.module.scss";
import TextInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextInputField";
import AaspireButton from "components/AaspireBasicComponents/AaspireButton";

interface FormData {
  email: string;
}
interface Props extends FormComponentProps {
  handleSubmit: (event: Object) => Promise<void>;
  isLoading?: boolean;
  formData?: FormData;
  formSubmissionErrors?: Array<string>;
  currentUser?: any;
  onChangeEmailField?: (email: string) => {};
}

const MyAccountProfileInfoForm = (props: Props, ref) => {
  const errorMessage = React.useMemo(
    () =>
      props.formSubmissionErrors &&
      props.formSubmissionErrors.length &&
      props.formSubmissionErrors.map(error => (
        <Alert
          className={s.formCardError}
          type="error"
          message={error}
          banner
        />
      )),
    [props.formSubmissionErrors],
  );

  return (
    <Form ref={ref} onSubmit={props.handleSubmit}>
      <Form.Item className={s.formCardItem}>
        {props.form.getFieldDecorator("email", {
          initialValue: props.formData.email,
        })(
          <TextInputField
            disabled={props.isLoading}
            autoComplete="username"
            placeholder="Email"
            onChange={e => {
              e.preventDefault();
              props.onChangeEmailField(e.target.value);
            }}
          />,
        )}
      </Form.Item>
      <Form.Item className={s.formCardItem}>
        {props.form.getFieldDecorator("password", {
          rules: [
            {
              required: true,
              message: "You must provide your password to update your email.",
            },
          ],
        })(
          <TextInputField
            disabled={props.isLoading}
            type="password"
            placeholder="Please enter your password to verify your identiy."
          />,
        )}
      </Form.Item>
      <Form.Item className={s.formCardItem}>
        <AaspireButton
          type="primary"
          htmlType="submit"
          loading={props.isLoading}
        >
          {"Update Email"}
        </AaspireButton>
      </Form.Item>
      {errorMessage}
    </Form>
  );
};

export default MyAccountProfileInfoForm;
