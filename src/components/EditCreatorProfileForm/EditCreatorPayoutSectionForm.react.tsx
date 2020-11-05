import { Alert, Button, Form } from "antd";
import { FormComponentProps } from "antd/lib/form";
import { CreatorDetails } from "data/types";
import React from "react";
import s from "./EditCreatorProfileForm.module.scss";
import ProfileContentCardSection from "./ProfileContentCardSection.react";
import TextInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextInputField";
import AaspireButton from "components/AaspireBasicComponents/AaspireButton";

interface Props extends FormComponentProps {
  handleFormSubmission: () => void;
  didClickCancelEditing: () => void;
  initialFormData: CreatorDetails;
  skillsFormError: string;
  isLoading: boolean;
}

const EditCreatorPayoutSectionForm: React.FC<Props> = (props: Props, ref) => {
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
      sectionTitle={"MY LINKS"}
    >
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Form.Item label={"Venmo handle"} className={s.sectionFormItem}>
          {props.form.getFieldDecorator("venmoHandle", {
            rules: [
              {
                required: true,
                message:
                  "Please provide a Venmo handle we can send payouts to.",
                whitespace: true,
              },
            ],
            initialValue: props.initialFormData.venmoHandle,
          })(<TextInputField placeholder={"@MyVenmoHandle"} />)}
        </Form.Item>
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

export default EditCreatorPayoutSectionForm;
