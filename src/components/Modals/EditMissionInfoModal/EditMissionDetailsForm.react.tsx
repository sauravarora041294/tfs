import { Button, Form, Icon, Tooltip, Upload } from "antd";
import { FormComponentProps } from "antd/es/form";
import { Mission } from "data/types";
import React from "react";
import { Image } from "semantic-ui-react";
import s from "./EditMissionInfoModal.module.scss";
import TextAreaInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextAreaInputField";
import TextInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextInputField";
import AaspireButton from "components/AaspireBasicComponents/AaspireButton";

interface Props extends FormComponentProps {
  handleSubmit: (formData: Object) => void;
  initialFormData: Mission;
}

const EditMissionDetailsForm: React.FC<Props> = (props: Props, ref) => {
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
            Title&nbsp;
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
              message: "Please input a title for your collection",
              whitespace: true,
            },
          ],
          initialValue: props.initialFormData.title,
        })(<TextInputField />)}
      </Form.Item>
      <Form.Item
        label={
          <span>
            Purpose&nbsp;
            <Tooltip title="Make sure to write a concise yet specific purpose for your collection.">
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
          initialValue: props.initialFormData.purpose,
        })(<TextAreaInputField />)}
      </Form.Item>
      <Form.Item
        label={
          <span>
            Description&nbsp;
            <Tooltip title="Make sure to give a detailed description of what the collection teaches">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {getFieldDecorator("description", {
          rules: [
            {
              required: true,
              message: "Please write a description for your collection",
              whitespace: true,
            },
          ],
          initialValue: props.initialFormData.description,
        })(<TextAreaInputField />)}
      </Form.Item>
      <Form.Item
        label={
          <span>
            Content Format&nbsp;
            <Tooltip title="Tell us about the format of the content. Be as detailed as possible!">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {getFieldDecorator("formatInformation", {
          rules: [
            {
              required: true,
              message: "Please explain the content format for your collection",
              whitespace: true,
            },
          ],
          initialValue: props.initialFormData.formatInformation,
        })(<TextAreaInputField />)}
      </Form.Item>
      <Form.Item
        label={
          <span>
            Creator Qualifications&nbsp;
            <Tooltip title="What qualifications must a creator have to contribute content to this collection?">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {getFieldDecorator("creatorQualifications", {
          rules: [
            {
              required: true,
              message:
                "Please include creator qualifications for your collection",
              whitespace: true,
            },
          ],
          initialValue: props.initialFormData.creatorQualifications,
        })(<TextAreaInputField />)}
      </Form.Item>
      <Form.Item
        label={
          <span>
            Thumbnail&nbsp;
            <Tooltip title="Select a thumbnail to be displayed for your collection. PNG or JPEG formats supported.">
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

export default EditMissionDetailsForm;
