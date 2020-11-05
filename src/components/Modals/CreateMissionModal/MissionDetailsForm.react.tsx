import { Form, Icon, Tooltip } from "antd";
import { FormComponentProps } from "antd/es/form";
import React from "react";
import TextInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextInputField";
import TextAreaInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextAreaInputField";

interface Props extends FormComponentProps {
  handleSubmit: (formData: Object) => void;
}

const MissionDetailsForm: React.FC<Props> = (props, ref) => {
  const formRef = React.useRef();
  const { getFieldDecorator } = props.form;

  React.useImperativeHandle(ref, () => ({}));

  return (
    <Form onSubmit={props.handleSubmit} ref={formRef}>
      <Form.Item
        label={
          <span>
            Title&nbsp;
            <Tooltip title="Make sure your collection title is specific and descriptive">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {getFieldDecorator("title", {
          rules: [
            {
              required: true,
              message: "Please input a title for your collection",
              whitespace: true,
            },
          ],
        })(<TextInputField />)}
      </Form.Item>
      <Form.Item
        label={
          <span>
            Purpose&nbsp;
            <Tooltip title="Make sure you write a purpose that is both concise and specific.">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {getFieldDecorator("purpose", {
          rules: [
            {
              required: true,
              message: "Please write a purpose for your collection",
              whitespace: true,
            },
          ],
        })(<TextAreaInputField />)}
      </Form.Item>
    </Form>
  );
};

export default MissionDetailsForm;
