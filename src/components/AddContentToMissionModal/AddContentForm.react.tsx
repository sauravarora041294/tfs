import { Form, Icon, Tooltip, Input } from "antd";
import { FormComponentProps } from "antd/lib/form";
import React from "react";
import SelectField from "components/AaspireBasicComponents/AaspireBasicFormComponents/SelectField";

interface Props extends FormComponentProps {
  handleSearch: (formData: Object) => void;
  initialFormData: Object;
}

const AddContentForm: React.FC<Props> = (props: Props, ref) => {
  const formRef = React.useRef();
  const { getFieldDecorator } = props.form;

  return (
    <Form ref={formRef}>
      <Form.Item
        label={
          <span>
            Select Content&nbsp;
            <Tooltip title="Search from any of your videos or playlists to add to this collection.">
              <Icon type="question-circle-o" />
            </Tooltip>
          </span>
        }
      >
        {getFieldDecorator("searchContent")(
          <Input.Search
            placeholder="Search for a video or playlist that you uploaded..."
            onSearch={(key: string) => props.handleSearch(key)}
          />,
        )}
      </Form.Item>
    </Form>
  );
};

export default AddContentForm;
