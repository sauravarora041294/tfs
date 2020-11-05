import { Alert, Button, Form } from "antd";
import { FormComponentProps } from "antd/lib/form";
import CreatorSkillsDynamicFormItemSet from "components/CreatorSkillsDynamicFormItemSet";
import { CreatorDetails } from "data/types";
import React from "react";
import s from "./EditCreatorProfileForm.module.scss";
import ProfileContentCardSection from "./ProfileContentCardSection.react";
import AaspireButton from "components/AaspireBasicComponents/AaspireButton";

interface Props extends FormComponentProps {
  handleFormSubmission: () => void;
  didClickCancelEditing: () => void;
  initialFormData: CreatorDetails;
  skillsFormError: string;
  isLoading: boolean;
}

const EditCreatorSkillsSectionForm: React.FC<Props> = (props, ref) => {
  const formRef = React.useRef();
  React.useImperativeHandle(ref, () => ({}));

  const handleSubmit = e => {
    e.preventDefault();
    props.handleFormSubmission();
  };

  return (
    <ProfileContentCardSection
      didClickEdit={() => { }}
      hideEditButton={true}
      sectionTitle={"MY SKILLS"}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <CreatorSkillsDynamicFormItemSet
          getFieldDecorator={props.form.getFieldDecorator}
          getFieldValue={props.form.getFieldValue}
          setFieldsValue={props.form.setFieldsValue}
          initialFormData={props.initialFormData}
        />
        <Form.Item>
          <AaspireButton
            className={s.sectionFormCancelButton}
            type="danger"
            onClick={props.didClickCancelEditing}
          >
            {"Cancel"}
          </AaspireButton>
          <AaspireButton
            className={s.sectionFormSaveButton}
            type="primary"
            htmlType="submit"
            loading={props.isLoading}
          >
            {"Save"}
          </AaspireButton>
        </Form.Item>
        {props.skillsFormError ? (
          <Alert
            className={s.alertMessage}
            message={"Submission Failed"}
            description={
              "Something went wrong on our end. Please try again later."
            }
            type="error"
          />
        ) : null}
      </Form>
    </ProfileContentCardSection>
  );
};

export default EditCreatorSkillsSectionForm;
