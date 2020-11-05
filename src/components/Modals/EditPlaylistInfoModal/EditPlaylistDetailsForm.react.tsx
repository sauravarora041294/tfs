import { Button, Form, Icon, Tooltip, Upload, Checkbox } from "antd";
import { FormComponentProps } from "antd/es/form";
import { Playlist } from "data/types";
import React from "react";
import { Image } from "semantic-ui-react";
import s from "./EditPlaylistInfoModal.module.scss";
import TextInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextInputField";
import TextAreaInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextAreaInputField";
import AaspireButton from "components/AaspireBasicComponents/AaspireButton";

interface Props extends FormComponentProps {
  handleSubmit: (formData: Object) => void;
  initialFormData: Playlist;
}

const EditPlaylistDetailsForm: React.FC<Props> = (props: Props, ref) => {
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
              message: "Please input a title for your playlist",
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
            <Tooltip title="Make sure to give a detailed description of what the playlist teaches">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {getFieldDecorator("description", {
          rules: [
            {
              required: true,
              message: "Please write a description for your playlist",
              whitespace: true,
            },
          ],
          initialValue: props.initialFormData.description,
        })(<TextAreaInputField />)}
      </Form.Item>
      <Form.Item
        label={
          <span>
            Collaboration&nbsp;
            <Tooltip title="Once you make this playlist collaborative, you cannot undo the action. You would have to delete the playlist and make a new one.">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {getFieldDecorator("isCollaborative", {
          valuePropName: "checked",
          initialValue: props.initialFormData.isCollaborative,
        })(
          <Checkbox disabled={props.initialFormData.isCollaborative}>
            Make this a collaborative playlist?
          </Checkbox>,
        )}
      </Form.Item>
      <div className={s.warningText}>
        *Once you make this playlist collaborative, you cannot undo the action.
      </div>
      <Form.Item
        label={
          <span>
            Thumbnail&nbsp;
            <Tooltip title="Select a thumbnail to be displayed for your playlist. PNG or JPEG formats supported.">
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

export default EditPlaylistDetailsForm;
