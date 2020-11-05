import { Form, Icon, Tooltip, Upload, Button, Checkbox } from "antd";
import { FormComponentProps } from "antd/es/form";
import React from "react";
import s from "./CreatePlaylistModal.module.scss";
import TextInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextInputField";
import TextAreaInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextAreaInputField";
import AaspireButton from "components/AaspireBasicComponents/AaspireButton";

interface Props extends FormComponentProps {
  handleSubmit: (formData: Object) => void;
}

const PlaylistDetailsForm: React.FC<Props> = (props: Props, ref) => {
  const formRef = React.useRef();
  const { getFieldDecorator } = props.form;

  React.useImperativeHandle(ref, () => ({}));

  const handleChange = info => {
    const transformedFileList = info.fileList.slice(-1);
    return transformedFileList;
  };
  return (
    <Form onSubmit={props.handleSubmit} ref={formRef}>
      <Form.Item
        label={
          <span>
            Title&nbsp;
            <Tooltip title="Make sure your playlist title is specific and descriptive">
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
        })(<TextAreaInputField />)}
      </Form.Item>
      <Form.Item
        label={
          <span>
            Collaboration&nbsp;
            <Tooltip title="Check the box if you want to make this a collaborative playlist. If you do so, other creators can request permission to contribute to the playlist.">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {getFieldDecorator("isCollaborative", {
          valuePropName: "checked",
        })(<Checkbox>Make this a collaborative playlist</Checkbox>)}
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
          getValueFromEvent: handleChange,
          rules: [
            {
              required: false,
            },
          ],
        })(
          <Upload
            name="logo"
            listType="picture"
            accept={".png,.jpg,.jpeg"}
            customRequest={(option: any) => {
              option.onSuccess({});
            }}
          >
            <AaspireButton>
              <Icon type="upload" /> Upload Thumbnail
            </AaspireButton>
          </Upload>,
        )}
      </Form.Item>
    </Form>
  );
};

export default PlaylistDetailsForm;
