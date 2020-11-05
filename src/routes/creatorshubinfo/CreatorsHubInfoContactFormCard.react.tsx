import { Alert, Button, Card, Form, Typography, Select } from "antd";
import { FormComponentProps } from "antd/es/form";
import React from "react";
import s from "./CreatorsHubInfo.module.scss";
import CustomSelect from "components/AaspireBasicComponents/AaspireBasicFormComponents/SelectField";
import TextAreaInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextAreaInputField";
import AaspireButton from "components/AaspireBasicComponents/AaspireButton";

interface Props extends FormComponentProps {
  handleFormSubmission: () => void;
  isSubmittingForm: boolean;
  formError: string;
  contactFormData: ContactFormData;
}

export interface ContactFormData {
  inquiryType: InquiryType;
  message: string;
}

export enum InquiryType {
  TECHNICAL_ISSUE = `I'm experiencing a technical issue`,
  FEATURE_REQUEST = `I'd like to request a feature`,
  PAYMENT_QUESTION = "I have a question about the points or payment system",
  OTHER = "Other",
}

const CreatorsHubInfoContactFormCard: React.FC<Props> = (props: Props, ref) => {
  const formRef = React.useRef();
  React.useImperativeHandle(ref, () => ({}));

  const handleSubmit = e => {
    e.preventDefault();
    props.handleFormSubmission();
  };

  const formError = props.formError ? (
    <Alert
      className={s.alertMessage}
      message="Submission Failed"
      description={"Something went wrong on our end. Please try again later."}
      type="error"
    />
  ) : null;

  const inquiryTypeSelectOptions = Object.entries(InquiryType).map(
    ([inquiryType, inquiryTypeText]) => (
      <Select.Option key={inquiryType} value={inquiryTypeText}>
        {inquiryTypeText}
      </Select.Option>
    ),
  );

  return (
    <Card title={"Contact Us"}>
      <Typography.Paragraph className={s.formCardSubtitle}>
        {`Still have questions? Reach out to us and we'll get back to you asap :)`}
      </Typography.Paragraph>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Form.Item className={s.formCardItem} label={"Inquiry Type"}>
          {props.form.getFieldDecorator("inquiryType", {
            rules: [
              {
                required: true,
                message: "Please select a category for your inquiry.",
                whitespace: true,
              },
            ],
            initialValue:
              (props.contactFormData && props.contactFormData.inquiryType) ||
              null,
          })(
            <CustomSelect
              placeholder="Choose one..."
              dropdownMatchSelectWidth
              showSearch
              optionFilterProp="children"
              filterOption={(input, option) =>
                String(option.props.children)
                  .toLowerCase()
                  .indexOf(input.toLowerCase()) >= 0
              }
            >
              {inquiryTypeSelectOptions}
            </CustomSelect>,
          )}
        </Form.Item>
        <Form.Item label={"Message"} className={s.formCardInputItem}>
          {props.form.getFieldDecorator("message", {
            rules: [
              {
                required: true,
                message: "Please tell us why you wanted to reach out.",
              },
            ],
            initialValue:
              (props.contactFormData && props.contactFormData.message) || null,
          })(
            <TextAreaInputField
              placeholder="How can we help you?"
              autosize={{ minRows: 3, maxRows: 5 }}
            />,
          )}
        </Form.Item>
        <Form.Item className={s.formCardButtonItem}>
          <AaspireButton
            className={s.contactFromFinishButton}
            type="primary"
            htmlType="submit"
            loading={props.isSubmittingForm}
          >
            {"Finish"}
          </AaspireButton>
        </Form.Item>
      </Form>
      {formError}
    </Card>
  );
};

export default CreatorsHubInfoContactFormCard;
