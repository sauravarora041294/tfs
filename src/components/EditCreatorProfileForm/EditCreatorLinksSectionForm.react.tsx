import { Alert, Button, Form, Icon, Upload } from "antd";
import { FormComponentProps } from "antd/es/form";
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

const EditCreatorLinksSectionForm: React.FC<Props> = (props: Props, ref) => {
  const formRef = React.useRef();
  React.useImperativeHandle(ref, () => ({}));

  const uploadRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const normFile = e => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList.slice(-1);
  };

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
        <Form.Item label={"LinkedIn"} className={s.sectionFormItem}>
          {props.form.getFieldDecorator("linkedinURL", {
            rules: [
              {
                required: true,
                message: "Please provide a link to your LinkedIn profile.",
                whitespace: true,
              },
            ],
            initialValue: props.initialFormData.linkedinURL,
          })(
            <TextInputField
              addonBefore="linkedin.com/in/"
              placeholder="username"
            />,
          )}
        </Form.Item>
        <Form.Item
          className={`${s.signupFormField} ${s.sectionFormItem}`}
          label={"Resume"}
        >
          <div className={s.divResumeUpload}>
            {props.form.getFieldDecorator("resume", {
              valuePropName: "fileList",
              getValueFromEvent: normFile,
              rules: [
                {
                  required: true,
                  message: "Please upload your resume.",
                },
              ],
              initialValue: props.initialFormData.resumeURL
                ? [
                  {
                    uid: "1",
                    name: "Previously Uploaded Resume",
                    status: "previously_uploaded",
                    response: "",
                    url: props.initialFormData.resumeURL,
                  },
                ]
                : [],
            })(
              <Upload
                accept={".pdf"}
                name={"file"}
                customRequest={uploadRequest}
                multiple={false}
              >
                <Button type="default" className={s.uploadButton}>
                  <Icon type="upload" />
                  {"Upload New Resume"}
                </Button>
              </Upload>,
            )}
          </div>
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

export default EditCreatorLinksSectionForm;
