import { Form, Icon, Tooltip } from "antd";
import { FormComponentProps } from "antd/es/form";
import React from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import TextInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextInputField";
import TextAreaInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextAreaInputField";

interface Props extends FormComponentProps {
  handleSubmit: (formData: Object) => void;
}

const AddPlaylistSectionForm: React.FC<Props> = (props: Props, ref) => {
  const formRef = React.useRef();
  const { getFieldDecorator } = props.form;

  React.useImperativeHandle(ref, () => ({}));

  return (
    <Form onSubmit={props.handleSubmit} ref={formRef}>
      <Form.Item
        label={
          <span>
            Section Title&nbsp;
            <Tooltip title="Make sure your title is specific and descriptive">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {getFieldDecorator("title", {
          rules: [
            {
              required: true,
              message: "Please input a title for this section",
              whitespace: true,
            },
          ],
        })(<TextInputField />)}
      </Form.Item>
      <Form.Item
        label={
          <span>
            Description&nbsp;
            <Tooltip title="Make sure to give a detailed description of what this section covers">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {getFieldDecorator("description", {
          rules: [
            {
              required: true,
              message: "Please write a description for this section",
              whitespace: true,
            },
          ],
        })(<TextAreaInputField />)}
      </Form.Item>
    </Form>
  );
};

export default AddPlaylistSectionForm;
