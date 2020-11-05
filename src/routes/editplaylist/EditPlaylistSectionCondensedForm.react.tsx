import { Form } from "antd";
import { FormComponentProps } from "antd/es/form";
import { Playlist } from "data/types";
import React from "react";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import s from "./EditPlaylist.module.scss";
import TextInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextInputField";
import TextAreaInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextAreaInputField";

interface Props extends FormComponentProps {
  handleSubmit: (formData: Object) => void;
  initialFormData: Playlist;
}

const EditPlaylistSectionCondensedForm: React.FC<Props> = (
  props: Props,
  ref,
) => {
  const formRef = React.useRef();
  const { getFieldDecorator } = props.form;

  React.useImperativeHandle(ref, () => ({}));

  return (
    <Form
      onSubmit={props.handleSubmit}
      ref={formRef}
      layout={"vertical"}
      labelAlign={"left"}
    >
      <Form.Item label={<span>Title</span>} className={s.condensedFormItem}>
        {getFieldDecorator("title", {
          rules: [
            {
              whitespace: true,
            },
          ],
          initialValue: props.initialFormData.title,
        })(<TextInputField />)}
      </Form.Item>
      <Form.Item
        label={<span>Description</span>}
        className={s.condensedFormItem}
      >
        {getFieldDecorator("description", {
          rules: [
            {
              whitespace: true,
            },
          ],
          initialValue: props.initialFormData.description,
        })(<TextAreaInputField />)}
      </Form.Item>
    </Form>
  );
};

export default EditPlaylistSectionCondensedForm;
