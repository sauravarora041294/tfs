import { Alert, Button, Form, Icon, Upload, Tooltip } from "antd";
import { FormComponentProps } from "antd/es/form";
import * as DataTypes from "data/types";
import React from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import s from "./EditVideo.module.scss";
import TextAreaInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextAreaInputField";
import TextInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextInputField";
import AaspireButton from "components/AaspireBasicComponents/AaspireButton";

interface Props extends FormComponentProps {
  handleSubmit: (formData: Object) => void;
  onClose: () => void;
  initialFormData: DataTypes.Mission;
  isLoading: boolean;
}

const EditVideoDetailsForm: React.FC<Props> = (props: Props, ref) => {
  const formRef = React.useRef();
  const { getFieldDecorator } = props.form;
  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };
  React.useImperativeHandle(ref, () => ({}));

  return (
    <Form onSubmit={props.handleSubmit} ref={formRef}>
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
        {getFieldDecorator("title", {
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please input a title for your video",
            },
          ],
          initialValue: props.initialFormData.title,
        })(<TextInputField />)}
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
        {getFieldDecorator("description", {
          rules: [
            {
              required: true,
              whitespace: true,
              message: "Please input a description for your video",
            },
          ],
          initialValue: props.initialFormData.description,
        })(<TextAreaInputField rows={4} />)}
      </Form.Item>
      <Form.Item
        label={
          <span>
            Thumbnail&nbsp;
            <Tooltip title="Select a thumbnail to be displayed for your video. PNG or JPEG formats supported.">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {getFieldDecorator("thumbnail", {
          valuePropName: "fileList",
          getValueFromEvent: normFile,
        })(
          <Upload
            name="thumbnail"
            listType="picture"
            accept={".png,.jpg,.jpeg"}
            customRequest={(option: any) => option.onSuccess({})}
          >
            <AaspireButton>
              <Icon type="upload" /> Change Thumbnail
            </AaspireButton>
          </Upload>,
        )}
      </Form.Item>
      <Form.Item className={s.editVideoDetailsFormButtonGroup}>
        <AaspireButton onClick={props.onClose}>Cancel</AaspireButton>
        <AaspireButton
          className={s.editVideoDetailsFormSubmitButton}
          type="primary"
          htmlType="submit"
          loading={props.isLoading}
        >
          Submit
        </AaspireButton>
      </Form.Item>
    </Form>
  );
};

export default EditVideoDetailsForm;
