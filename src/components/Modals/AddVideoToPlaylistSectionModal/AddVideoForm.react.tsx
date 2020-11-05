import { Form, Icon, Tooltip, Input } from "antd";
import { FormComponentProps } from "antd/es/form";
import React from "react";
import s from "./AddVideoToPlaylistSectionModal.module.scss";

interface Props extends FormComponentProps {
  handleSearch: (searchString: string) => void;
}

const AddVideoForm: React.FC<Props> = (props: Props, ref) => {
  const formRef = React.useRef();
  const { getFieldDecorator } = props.form;

  React.useImperativeHandle(ref, () => ({}));

  return (
    <div>
      <Form ref={formRef}>
        <Form.Item
          label={
            <span>
              Search for Videos&nbsp;
              <Tooltip title="Search for the name of a video you uploaded">
                <Icon type="question-circle-o" />
              </Tooltip>
            </span>
          }
        >
          {getFieldDecorator("resourceSearchString")(
            <Input.Search
              placeholder="Search your videos"
              onSearch={props.handleSearch}
              onChange={e => props.handleSearch(e.target.value)}
              enterButton
              size="large"
              allowClear
              className={s.searchBarInput}
            />,
          )}
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddVideoForm;
