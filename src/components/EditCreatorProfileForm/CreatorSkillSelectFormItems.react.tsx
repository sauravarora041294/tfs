import { Button, Form, Icon, message, Select } from "antd";
import { CreatorDetails } from "data/types";
import React from "react";
import s from "./EditCreatorProfileForm.module.scss";
import SelectField from "components/AaspireBasicComponents/AaspireBasicFormComponents/SelectField";
import TextAreaInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextAreaInputField";

const possibleSkills = [
  {
    id: "1a",
    name: "Programming Interview Prep",
  },
  {
    id: "2b",
    name: "Data Structures & Algorithms",
  },
  {
    id: "3c",
    name: "Web Development",
  },
  {
    id: "4d",
    name: "Program Manager Interview Prep",
  },
];

interface Props {
  initialFormData: CreatorDetails;
  getFieldDecorator: Function;
  getFieldValue: Function;
  setFieldsValue: Function;
}

const CreatorSkillSelectFormItems: React.FC<Props> = (props: Props) => {
  const { getFieldDecorator, getFieldValue } = props;

  const remove = k => {
    const keys = getFieldValue("keys");
    if (keys.length === 1) {
      message.error("Must choose at least 1 skill to teach.");
      return;
    }
    props.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  };

  const add = () => {
    const keys = getFieldValue("keys");

    if (keys.length === 5) {
      message.error("Can only choose up to 5 skills to teach.");
      return;
    }
    const updatedKeys = keys.concat(keys.length);

    props.setFieldsValue({
      keys: updatedKeys,
    });
  };

  getFieldDecorator("keys", {
    initialValue: props.initialFormData.skills
      ? props.initialFormData.skills.map((_, index) => index)
      : [0],
  });
  const keys = getFieldValue("keys");

  const formItems = keys.map((k, index) => (
    <div key={k}>
      <Form.Item
        className={s.skillFormItem}
        label={`Skill #${index + 1} Title`}
      >
        <div className={s.selectSkillRow}>
          <div className={s.selectDropdownContainer}>
            {getFieldDecorator(`skills[${k}]`, {
              rules: [
                {
                  required: true,
                  message: "Please select a skill or delete this field.",
                },
              ],
              initialValue: props.initialFormData.skills[k]
                ? props.initialFormData.skills[k].id
                : null,
            })(
              <SelectField
                showSearch
                placeholder="Select a skill you would like to teach ... "
                optionFilterProp="children"
                filterOption={(input, option) =>
                  String(option.props.children)
                    .toLowerCase()
                    .indexOf(input.toLowerCase()) >= 0
                }
              >
                {possibleSkills.map((skill, index) => (
                  <Select.Option key={index} value={skill.id}>
                    {skill.name}
                  </Select.Option>
                ))}
              </SelectField>,
            )}
          </div>
          <Button type="danger" onClick={() => remove(k)}>
            Delete
          </Button>
        </div>
      </Form.Item>
      <Form.Item label={`Skill #${index + 1} Justification`}>
        {getFieldDecorator(`justifications[${k}]`, {
          rules: [
            {
              required: true,
              message: "Please provide a justification or delete this field.",
            },
          ],
          initialValue: props.initialFormData.skills[k]
            ? props.initialFormData.skills[k].justification
            : null,
        })(
          <TextAreaInputField
            placeholder="What makes you qualified to teach this skill?"
            autosize={{ minRows: 3, maxRows: 5 }}
          />,
        )}
      </Form.Item>
      <hr className={s.hr} />
    </div>
  ));
  return (
    <div>
      {formItems}
      <Form.Item style={{ margin: "0" }}>
        <Button type="dashed" onClick={add} style={{ width: "100%" }}>
          <Icon type="plus" /> Add field
        </Button>
      </Form.Item>
    </div>
  );
};

export default CreatorSkillSelectFormItems;
