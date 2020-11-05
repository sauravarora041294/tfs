import { Alert, Button, Card, Form, Typography } from "antd";
import { FormComponentProps } from "antd/es/form";
import React from "react";
import s from "./ResetPassword.module.scss";
import TextInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextInputField";
import AaspireButton from "components/AaspireBasicComponents/AaspireButton";
import WhiteCard from "components/WhiteCard";

interface FormData {
  password: string;
  confirmPassword: string;
}

interface Props extends FormComponentProps {
  resetPassword: () => void;
  isSubmittingForm: boolean;
  formError: Error;
  formData: FormData;
  currentUserEmail: string;
}

const ResetPasswordForm: React.FC<Props> = (props: Props, ref) => {
  const formRef = React.useRef();
  React.useImperativeHandle(ref, () => ({}));

  const handleSubmit = e => {
    e.preventDefault();
    props.resetPassword();
  };

  return (
    <WhiteCard
      title="Reset Passowrd"
      subTitle={`To reset the password for ${props.currentUserEmail}, please enter and confirm a new, valid password below.`}
      customBodyPaddingValues={{
        left: "2rem",
        right: "1rem",
        top: "0rem",
        bottom: "0rem",
      }}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Form.Item>
          {props.form.getFieldDecorator("password", {
            initialValue: props.formData.password,
            rules: [
              {
                required: true,
                message: "Please provide a password of at least 6 characters.",
                whitespace: true,
                min: 6,
              },
            ],
          })(
            <TextInputField
              placeholder="New Password"
              type="password"
              autoComplete="new-password"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {props.form.getFieldDecorator("confirmPassword", {
            initialValue: props.formData.confirmPassword,
            rules: [
              {
                required: true,
                message: "Please provide a password of at least 6 characters.",
                whitespace: true,
                min: 6,
              },
            ],
          })(
            <TextInputField
              placeholder="Confirm Password"
              type="password"
              autoComplete="new-password"
            />,
          )}
        </Form.Item>
        <Form.Item className={s.sendResetLinkFormItemSubmitButton}>
          <AaspireButton
            type="primary"
            htmlType="submit"
            className={s.resetPasswordFormSubmitButton}
            loading={props.isSubmittingForm}
          >
            {"Reset Password"}
          </AaspireButton>
          {props.formError ? (
            <Alert
              className={s.sendResetLinkCardFormAlert}
              message="Password Reset Failed"
              description={props.formError.message}
              type="error"
            />
          ) : null}
        </Form.Item>
      </Form>
    </WhiteCard>
    // <Card className={s.sendResetLinkFormCard}>
    //   <Typography.Title className={s.sendResetLinkFormTitle}>
    //     {`Reset Password`}
    //   </Typography.Title>
    //   <Typography.Text className={s.sendResetLinkFormSubheading1}>
    //     {`To reset the password for ${props.currentUserEmail}, please enter and confirm a new, valid password below.`}
    //   </Typography.Text>
    //   <Form ref={formRef} onSubmit={handleSubmit}>
    //     <Form.Item>
    //       {props.form.getFieldDecorator("password", {
    //         initialValue: props.formData.password,
    //         rules: [
    //           {
    //             required: true,
    //             message: "Please provide a password of at least 6 characters.",
    //             whitespace: true,
    //             min: 6,
    //           },
    //         ],
    //       })(
    //         <TextInputField
    //           placeholder="New Password"
    //           type="password"
    //           autoComplete="new-password"
    //         />,
    //       )}
    //     </Form.Item>
    //     <Form.Item>
    //       {props.form.getFieldDecorator("confirmPassword", {
    //         initialValue: props.formData.confirmPassword,
    //         rules: [
    //           {
    //             required: true,
    //             message: "Please provide a password of at least 6 characters.",
    //             whitespace: true,
    //             min: 6,
    //           },
    //         ],
    //       })(
    //         <TextInputField
    //           placeholder="Confirm Password"
    //           type="password"
    //           autoComplete="new-password"
    //         />,
    //       )}
    //     </Form.Item>
    //     <Form.Item className={s.sendResetLinkFormItemSubmitButton}>
    //       <AaspireButton
    //         type="primary"
    //         htmlType="submit"
    //         className={s.resetPasswordFormSubmitButton}
    //         loading={props.isSubmittingForm}
    //       >
    //         {"Reset Password"}
    //       </AaspireButton>
    //       {props.formError ? (
    //         <Alert
    //           className={s.sendResetLinkCardFormAlert}
    //           message="Password Reset Failed"
    //           description={props.formError.message}
    //           type="error"
    //         />
    //       ) : null}
    //     </Form.Item>
    //   </Form>
    // </Card>
  );
};

export default ResetPasswordForm;
