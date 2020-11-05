import { Alert, Button, Form, Icon, Upload } from "antd";
import { FormComponentProps } from "antd/es/form";
import { CreatorDetails, User } from "data/types";
import React from "react";
import { Image } from "semantic-ui-react";
import s from "./EditCreatorProfileForm.module.scss";
import ProfileContentCardSection from "./ProfileContentCardSection.react";
import TextInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextInputField";
import AaspireButton from "components/AaspireBasicComponents/AaspireButton";

interface Props extends FormComponentProps {
  handleFormSubmission: () => void;
  didClickCancelEditing: () => void;
  initialFormData: User & CreatorDetails;
  skillsFormError: string;
  isLoading: boolean;
}

const EditCreatorBasicDetailsSectionForm: React.FC<Props> = (
  props: Props,
  ref,
) => {
  const formRef = React.useRef();
  React.useImperativeHandle(ref, () => ({}));

  const [
    showOriginalProfilePicture,
    setShowOriginalProfilePicture,
  ] = React.useState<boolean>(
    props.initialFormData.profilePictureURL ? true : false,
  );

  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList.slice(-1);
  };

  const profilePicturePreview = showOriginalProfilePicture ? (
    <div className={s.profilePictureContainer}>
      <Image
        src={props.initialFormData.profilePictureURL}
        alt={"Current Profile Picture"}
        style={{ width: "100%", borderRadius: "5px" }}
        className={s.profilePicturePreview}
      />
    </div>
  ) : (
      <div className={s.profilePictureMissingIconContainer}>
        <Icon type={"user"} className={s.profilePictureMissingIcon} />
      </div>
    );

  const handleSubmit = e => {
    e.preventDefault();
    props.handleFormSubmission();
  };

  return (
    <ProfileContentCardSection
      didClickEdit={() => { }}
      hideEditButton={true}
      sectionTitle={"BASIC PROFILE INFO"}
    >
      <Form ref={formRef} layout={"horizontal"} onSubmit={handleSubmit}>
        <Form.Item className={s.sectionFormItem} label={"Profile Picture"}>
          {props.form.getFieldDecorator("profilePicture", {
            valuePropName: "fileList",
            getValueFromEvent: normFile,
          })(
            <Upload
              name="profilepicture"
              listType="picture"
              accept={".png,.jpg,.jpeg"}
              customRequest={(option: any) => {
                setShowOriginalProfilePicture(false);
                option.onSuccess({});
              }}
            >
              {profilePicturePreview}
              <Button icon={"upload"} className={s.profilePictureUploadButton}>
                {"Change Profile Picture"}
              </Button>
            </Upload>,
          )}
        </Form.Item>
        <Form.Item label={"First Name"} className={s.sectionFormItem}>
          {props.form.getFieldDecorator("firstName", {
            rules: [
              {
                required: true,
                message: "Please provide your first name",
                whitespace: true,
              },
            ],
            initialValue: props.initialFormData.firstName,
          })(
            <TextInputField
              autoComplete="given-name"
              placeholder={"Tony, Bruce, Peter, etc..."}
            />,
          )}
        </Form.Item>
        <Form.Item label={"Last Name"} className={s.sectionFormItem}>
          {props.form.getFieldDecorator("lastName", {
            rules: [
              {
                required: true,
                message: "Please provide your last name",
                whitespace: true,
              },
            ],
            initialValue: props.initialFormData.lastName,
          })(
            <TextInputField
              autoComplete="family-name"
              placeholder={"Stark, Wayne, Parker, etc..."}
            />,
          )}
        </Form.Item>
        <Form.Item label={"Role Title"} className={s.sectionFormItem}>
          {props.form.getFieldDecorator("title", {
            rules: [
              {
                required: true,
                message: "Please provide the role title for your current job.",
                whitespace: true,
              },
            ],
            initialValue: props.initialFormData.title,
          })(
            <TextInputField
              autoComplete="organization-title"
              placeholder={"Software Engineer, Product Manager...etc"}
            />,
          )}
        </Form.Item>
        <Form.Item label={"Company"} className={s.sectionFormItem}>
          {props.form.getFieldDecorator("company", {
            rules: [
              {
                required: true,
                message:
                  "Please provide the name of the current company or institution you work for.",
                whitespace: true,
              },
            ],
            initialValue: props.initialFormData.company,
          })(
            <TextInputField
              autoComplete="organization"
              placeholder={"Google, McKinsey, etc"}
            />,
          )}
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

export default EditCreatorBasicDetailsSectionForm;
