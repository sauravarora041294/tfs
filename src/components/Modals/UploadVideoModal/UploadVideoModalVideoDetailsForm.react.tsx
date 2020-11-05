import React from "react";
import {
  Form,
  Input,
  Icon,
  Tooltip,
} from "antd";
import { FormComponentProps } from "antd/es/form";

interface Props extends FormComponentProps { }

const UploadVideoModalVideoDetailsForm: React.FC<Props> = (props: Props) => {
  const formRef = React.useRef();
  return (
    <Form ref={formRef}>
      <Form.Item
        label={
          <span>
            Video Title&nbsp;
            <Tooltip title="Make sure your title is specific and descriptive">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {props.form.getFieldDecorator("videoTitle", {
          // initialValue: props.formData.firstName,
          rules: [
            {
              required: true,
              message: "Please provide a title for your video",
              whitespace: true,
            },
          ],
        })(
          <Input />,
        )}
      </Form.Item>
      <Form.Item
        label={
          <span>
            Description&nbsp;
            <Tooltip title="Make sure to give a detailed description of what the video teaches">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {props.form.getFieldDecorator("videoDescription", {
          // initialValue: props.formData.lastName,
          rules: [
            {
              required: true,
              message: "Please provide a description for your video",
              whitespace: true,
            },
          ],
        })(
          <Input.TextArea rows={1} />,
        )}
      </Form.Item>
    </Form>
  )
};

export default UploadVideoModalVideoDetailsForm;
