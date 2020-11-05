import { Button, Form, Icon, Tooltip, Upload } from "antd";
import { FormComponentProps } from "antd/es/form";
import { Resource } from "data/types";
import React from "react";
import { Image } from "semantic-ui-react";
import s from "./EditVideoModal.module.scss";
import TextInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextInputField";
import TextAreaInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextAreaInputField";
import AaspireButton from "components/AaspireBasicComponents/AaspireButton";

interface Props extends FormComponentProps {
  handleSubmit: (formData: Object) => void;
  initialFormData: Resource;
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

  const [showOriginalThumbail, setShowOriginalThumbail] = React.useState<
    boolean
  >(props.initialFormData.thumbnailUrl ? true : false);

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
              message: "Please input a title for your video",
              whitespace: true,
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
              message: "Please write a description for your video",
              whitespace: true,
            },
          ],
          initialValue: props.initialFormData.description,
        })(<TextAreaInputField />)}
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
            name="logo"
            listType="picture"
            accept={".png,.jpg,.jpeg"}
            customRequest={(option: any) => {
              setShowOriginalThumbail(false);
              option.onSuccess({});
            }}
          >
            <AaspireButton>
              <Icon type="upload" /> Change Thumbnail
            </AaspireButton>
            {showOriginalThumbail ? (
              <Image
                src={props.initialFormData.thumbnailUrl}
                alt="Current Thumbnail"
                style={{ width: "100%" }}
                className={s.thumbnailPreview}
              />
            ) : null}
          </Upload>,
        )}
      </Form.Item>
    </Form>
  );
};

export default EditVideoDetailsForm;
