import { Button, Form, Icon, message, Select } from "antd";
import * as DataTypes from "data/types";
import React from "react";
import s from "./CreatorSkillsDynamicFormItemSet.module.scss";
import SelectField from "components/AaspireBasicComponents/AaspireBasicFormComponents/SelectField";
import TextAreaInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextAreaInputField";

const possibleSkills = [
  {
    key: "interview",
    title: "Programming Interview Prep",
  },
  {
    key: "dsa",
    title: "Data Structures & Algorithms",
  },
  {
    key: "webdev",
    title: "Web Development",
  },
  {
    key: "pmprep",
    title: "Program Manager Interview Prep",
  },
];

interface Props {
  initialFormData?: DataTypes.CreatorDetails;
  getFieldDecorator: Function;
  getFieldValue: Function;
  setFieldsValue: Function;
}

const CreatorSkillsDynamicFormItemSet = (props: Props) => {
  const { getFieldDecorator, getFieldValue } = props;

  const remove = k => {
    const keys = getFieldValue("keys");
    const skillTitles = getFieldValue("skillTitles");
    const justifications = getFieldValue("justification");

    if (keys.length === 1) {
      message.error("Must choose at least 1 skill to teach.");
      return;
    }
    props.setFieldsValue({
      keys: keys.filter(key => key !== k).map(key => (key > k ? key - 1 : key)),
      skillTitles: skillTitles ? skillTitles.filter((_s, idx) => idx != k) : [],
      justifications: justifications
        ? justifications.filter((_j, idx) => idx != k)
        : [],
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
    initialValue:
      props.initialFormData &&
        props.initialFormData.skills &&
        props.initialFormData.skills.length > 0
        ? props.initialFormData.skills.map((_, index) => index)
        : [0],
  });
  const keys = getFieldValue("keys");
  const formItems = keys.map((k, index) => (
    <div key={k}>
      <Form.Item className={s.skillFormItem}>
        <div className={s.selectSkillRow}>
          <div className={s.selectDropdownContainer}>
            {getFieldDecorator(`skillTitles[${k}]`, {
              rules: [
                {
                  required: true,
                  message: "Please select a skill or delete this field.",
                },
              ],
              initialValue:
                props.initialFormData && props.initialFormData.skills[k]
                  ? props.initialFormData.skills[k].title
                  : undefined,
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
                  <Select.Option key={skill.key} value={skill.title}>
                    {skill.title}
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
      <Form.Item>
        {getFieldDecorator(`justifications[${k}]`, {
          rules: [
            {
              required: true,
              message: "Please provide a justification or delete this field.",
            },
          ],
          initialValue:
            props.initialFormData && props.initialFormData.skills[k]
              ? props.initialFormData.skills[k].justification
              : null,
        })(
          <TextAreaInputField
            placeholder="What makes you qualified for this skill?"
            autosize={{ minRows: 3, maxRows: 5 }}
          />,
        )}
      </Form.Item>
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

export default CreatorSkillsDynamicFormItemSet;
