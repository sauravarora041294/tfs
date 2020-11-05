import { Form, Icon, Tooltip, Select } from "antd";
import { FormComponentProps } from "antd/es/form";
import React from "react";
import * as DataTypes from "data/types";
import TextAreaInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextAreaInputField";
import SelectField from "components/AaspireBasicComponents/AaspireBasicFormComponents/SelectField";

interface Props extends FormComponentProps {
  handleSubmit: (formData: Object) => void;
  missionPlaylists: Array<DataTypes.Playlist>;
  missionResources: Array<DataTypes.Resource>;
  formData?: any;
}

const ResolveMissionContentRequestForm = (props: Props, ref) => {
  const { Option } = Select;
  const contentResourceOptions = props.missionResources.map(resource => (
    <Option value={resource.objectID}>{resource.title}</Option>
  ));
  const contentPlaylistOptions = props.missionPlaylists.map(playlist => (
    <Option value={playlist.objectID}>{playlist.title}</Option>
  ));
  const contentOptions = contentResourceOptions.concat(contentPlaylistOptions);

  const formRef = React.useRef();
  React.useImperativeHandle(ref, () => ({}));
  return (
    <Form ref={formRef}>
      <Form.Item
        label="Please select the content relevant to this request"
        required
      >
        {props.form.getFieldDecorator("contentIds", {
          initialValue: props.formData.contentIds,
          rules: [
            {
              required: true,
              message: "Please select content that resolves this request",
            },
          ],
        })(
          <SelectField
            mode="multiple"
            placeholder="Ex. Binary Search Trees Pt. 1"
          >
            {contentOptions}
          </SelectField>,
        )}
      </Form.Item>
      <Form.Item
        label="Please explain why you're resolving the request with this content"
        required
      >
        {props.form.getFieldDecorator("reviewDetails", {
          initialValue: props.formData.reviewDetails,
          rules: [
            {
              required: true,
              message:
                "Please enter your explanation for resolving this request",
            },
          ],
        })(
          <TextAreaInputField
            rows={3}
            placeholder="Ex. This video continues the series on algorithm & data structures interview questions"
          />,
        )}
      </Form.Item>
    </Form>
  );
};

export default ResolveMissionContentRequestForm;
