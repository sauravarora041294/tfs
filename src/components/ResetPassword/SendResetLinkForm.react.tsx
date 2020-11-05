import { Alert, Button, Card, Form, Typography } from "antd";
import { FormComponentProps } from "antd/es/form";
import React from "react";
import s from "./ResetPassword.module.scss";
import TextInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextInputField";
import AaspireButton, {
  AaspireButtonType,
} from "components/AaspireBasicComponents/AaspireButton";
import SubmitButton from "components/AaspireBasicComponents/AaspireBasicFormComponents/SubmitButton";
import WhiteCard from "components/WhiteCard";
import TypographyDescription, {
  TypographyDescriptionType,
} from "components/AaspireBasicComponents/Typography/TypographyDescription";

interface FormData {
  email: string;
}
interface Props extends FormComponentProps {
  sendPasswordResetEmail: () => void;
  isSubmittingForm: boolean;
  formError: Error;
  formData: FormData;
}

const SendResetPasswordLinkForm: React.FC<Props> = (props: Props, ref) => {
  const formRef = React.useRef();
  React.useImperativeHandle(ref, () => ({}));

  const handleSubmit = e => {
    e.preventDefault();
    props.sendPasswordResetEmail();
  };

  return (
    <WhiteCard
      title="Forgot Password?"
      subTitle={`
      Enter the email address you used when you joined and we’ll send you instructions to reset your password. For security reasons, we do NOT store your password. So rest assured that we will never send your password via email.`}
      customBodyPaddingValues={{
        left: "2rem",
        right: "1rem",
        top: "0rem",
        bottom: "1rem",
      }}
    >
      {/* <TypographyDescription
        type={TypographyDescriptionType.PRIMARY_DESCRIPTION}
      >
        {
          "For security reasons, we do NOT store your password. So rest assured that we will never send your password via email."
        }
      </TypographyDescription> */}
      <div style={{ marginTop: "15px" }}>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Form.Item>
            {props.form.getFieldDecorator("email", {
              initialValue: props.formData.email,
              rules: [
                {
                  required: true,
                  message: "Please provide your email address.",
                  whitespace: true,
                },
              ],
            })(
              <TextInputField
                placeholder="Email"
                type="email"
                autoComplete="username"
              />,
            )}
          </Form.Item>
          <Form.Item className={s.sendResetLinkFormItemSubmitButton}>
            <SubmitButton type="primary" loading={props.isSubmittingForm}>
              {"Send Reset Instructions"}
            </SubmitButton>
            {props.formError ? (
              <Alert
                className={s.sendResetLinkCardFormAlert}
                message="Submission Failed"
                description={props.formError.message}
                type="error"
              />
            ) : null}
          </Form.Item>
        </Form>
      </div>
    </WhiteCard>

    // <Card className={s.sendResetLinkFormCard}>
    //   <Typography.Title className={s.sendResetLinkFormTitle}>
    //     {"Forgot Password?"}
    //   </Typography.Title>
    //   <Typography.Text className={s.sendResetLinkFormSubheading1}>
    //     {
    //       "Enter the email address you used when you joined and we’ll send you instructions to reset your password."
    //     }
    //   </Typography.Text>
    //   <Typography.Text className={s.sendResetLinkFormSubheading1}>
    //     {
    //       "For security reasons, we do NOT store your password. So rest assured that we will never send your password via email."
    //     }
    //   </Typography.Text>
    //   <Form ref={formRef} onSubmit={handleSubmit}>
    //     <Form.Item>
    //       {props.form.getFieldDecorator("email", {
    //         initialValue: props.formData.email,
    //         rules: [
    //           {
    //             required: true,
    //             message: "Please provide your email address.",
    //             whitespace: true,
    //           },
    //         ],
    //       })(
    //         <TextInputField
    //           placeholder="Email"
    //           type="email"
    //           autoComplete="username"
    //         />,
    //       )}
    //     </Form.Item>
    //     <Form.Item className={s.sendResetLinkFormItemSubmitButton}>
    //       <SubmitButton type="primary" loading={props.isSubmittingForm}>
    //         {"Send Reset Instructions"}
    //       </SubmitButton>
    //       {props.formError ? (
    //         <Alert
    //           className={s.sendResetLinkCardFormAlert}
    //           message="Submission Failed"
    //           description={props.formError.message}
    //           type="error"
    //         />
    //       ) : null}
    //     </Form.Item>
    //   </Form>
    // </Card>
  );
};

export default SendResetPasswordLinkForm;
