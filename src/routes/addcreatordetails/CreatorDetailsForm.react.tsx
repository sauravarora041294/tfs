import {
  Alert,
  Button,
  Card,
  Divider,
  Form,
  Icon,
  Typography,
  Upload,
  notification,
} from "antd";
import { FormComponentProps } from "antd/es/form";
import CreatorSkillsDynamicFormItemSet from "components/CreatorSkillsDynamicFormItemSet";
import React from "react";
import s from "./AddCreatorDetails.module.scss";
import TextInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextInputField";
import TextAreaInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextAreaInputField";
import AaspireButton from "components/AaspireBasicComponents/AaspireButton";

interface FormData {
  title: string;
  company: string;
  linkedin: string;
  venmoHandle: string;
  bio: string;
  profilePicture: File;
  resume: File;
  skillTitles: Array<string>;
  justifications: Array<string>;
}

interface Props extends FormComponentProps {
  handleFormSubmission: () => void;
  isSubmittingForm: boolean;
  skillsFormError: string;
  formData: FormData;
}
enum AllowedFileTypes {
  PICTURE = "PICTURE",
  PDF = "PDF",
}

const allowedFileExtensions = {
  [AllowedFileTypes.PICTURE]: ["png", "jpg", "jpeg"],
  [AllowedFileTypes.PDF]: ["pdf"],
};
const CreatorDetailsForm: React.FC<Props> = (props: Props, ref) => {
  const formRef = React.useRef();
  React.useImperativeHandle(ref, () => ({}));

  const uploadRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 0);
  };

  const normFile = (e, type: AllowedFileTypes) => {
    if (Array.isArray(e)) {
      return e;
    }
    const file = e.fileList.slice(-1)[0];
    const fileExtension = file.name ? file.name.split(".").pop() : null;
    if (allowedFileExtensions[type].indexOf(fileExtension) >= 0)
      return e && e.fileList.slice(-1);
    notification.error({
      message: "Unsupported file type uploaded",
      description: "Please reupload with in of the supported file types",
      placement: "bottomRight",
    });
    return null;
  };

  const handleSubmit = e => {
    e.preventDefault();
    props.handleFormSubmission();
  };

  const { skillTitles } = props.formData;
  const skills = skillTitles
    ? skillTitles.map((skillTitle, i) => ({
      title: skillTitle,
      justification: props.formData.justifications[i]
        ? props.formData.justifications[i]
        : "",
    }))
    : [];

  const formSubmissionErrorMessage = React.useMemo(() => {
    return props.skillsFormError &&
      <Alert
        className={s.alertMessage}
        message="Submission Failed"
        description={props.skillsFormError}
        type="error"
      />
  }, [props.skillsFormError])

  return (
    <Card className={s.registerCreatorCard}>
      {/* Header */}
      <Typography.Title className={s.formCardTitle}>
        {`Tell us a little bit about yourself`}
      </Typography.Title>
      <Typography.Paragraph className={s.formCardMainSubtitle}>
        {`This information will help us verify that you're qualified to teach for specific topics on our platform. Once you're approved, you'll be able to upload educational videos and help students & professionals around the world.`}
      </Typography.Paragraph>

      {/* Form */}
      <Form ref={formRef} onSubmit={handleSubmit}>
        {/* Basic Information */}
        <Typography.Title level={4} className={s.basicInfoHeader}>
          Basic Information
        </Typography.Title>
        <Typography.Paragraph className={s.formCardSubtitle}>
          {`These basic profile details will be visible to creators and users on our platform.`}
        </Typography.Paragraph>
        <Form.Item>
          {props.form.getFieldDecorator("title", {
            rules: [
              {
                required: true,
                message: "Please provide your current title.",
                whitespace: true,
              },
            ],
            initialValue: props.formData.title,
          })(
            <TextInputField
              autoComplete="organization-title"
              placeholder="Title ie. Software Engineer, UX Designer, ... "
            />,
          )}
        </Form.Item>
        <Form.Item>
          {props.form.getFieldDecorator("company", {
            rules: [
              {
                required: true,
                message: "Please provide your current company / institution.",
                whitespace: true,
              },
            ],
            initialValue: props.formData.company,
          })(
            <TextInputField
              autoComplete="organization"
              placeholder="Company / Institution"
            />,
          )}
        </Form.Item>
        <Form.Item>
          {props.form.getFieldDecorator("profilePicture", {
            valuePropName: "fileList",
            getValueFromEvent: e => normFile(e, AllowedFileTypes.PICTURE),
            initialValue: props.formData.profilePicture,
            rules: [
              {
                required: true,
                message:
                  "Please upload a profile picture in one of the specified types.",
              },
            ],
          })(
            <Upload
              name={"profilepicture"}
              listType={"picture"}
              customRequest={uploadRequest}
              multiple={false}
              className="uploadBtnContainer"
              accept={".pdf, .jpg, .png"}
            >
              <div className={s.uploadButtonField}>
                <div className={"header"}>
                  <Typography.Title>Profile Picture</Typography.Title>
                  <Typography.Paragraph className={s.subHeading}>
                    PDF, JPG, PNG {"  "}
                    (Less than 5mb)
                  </Typography.Paragraph>
                </div>
                <AaspireButton className={s.uploadFileButton}>
                  <Icon type="upload" />
                  Upload
                </AaspireButton>
              </div>
            </Upload>,
          )}
        </Form.Item>
        <Divider className={s.creatorDetailsFormSectionDivider}></Divider>

        {/* Experience */}
        <Typography.Title level={4}>Experience</Typography.Title>
        <Typography.Paragraph className={s.formCardSubtitle}>
          {`Make sure all your information is up to date. And don't worry, we won't share your resume with anyone.`}
        </Typography.Paragraph>
        <Form.Item label={"LinkedIn"}>
          {props.form.getFieldDecorator("linkedin", {
            rules: [
              {
                required: true,
                message: "Please provide your LinkedIn URL.",
                whitespace: true,
              },
            ],
            initialValue: props.formData.linkedin,
          })(
            <TextInputField
              className={s.linkedinField}
              addonBefore="linkedin.com/in/"
              placeholder="Your LinkedIn Username ..."
            />,
          )}
        </Form.Item>
        <Form.Item>
          {props.form.getFieldDecorator("resume", {
            valuePropName: "fileList",
            getValueFromEvent: e => normFile(e, AllowedFileTypes.PDF),
            initialValue: props.formData.resume,
            rules: [
              {
                required: true,
                message: "Please upload your resume in pdf format.",
              },
            ],
          })(
            <Upload
              name={"file"}
              listType={"picture"}
              customRequest={uploadRequest}
              multiple={false}
              className="uploadBtnContainer"
              accept={".pdf"}
            >
              <div className={s.uploadButtonField}>
                <div className={"header"}>
                  <Typography.Title>Resume</Typography.Title>
                  <Typography.Paragraph className={s.subHeading}>
                    PDF ( Less than 5mb )
                  </Typography.Paragraph>
                </div>
                <AaspireButton className={s.uploadFileButton}>
                  <Icon type="upload" />
                  Upload
                </AaspireButton>
              </div>
            </Upload>,
          )}
        </Form.Item>
        <Divider className={s.creatorDetailsFormSectionDivider}></Divider>

        {/* Payouts */}
        <Typography.Title level={4}>Payouts</Typography.Title>
        <Typography.Paragraph className={s.formCardSubtitle}>
          {`When your videos do a great job in educating our users, we'll send you payouts! Please provide us with a Venmo handle that we can send payouts to.`}
        </Typography.Paragraph>
        <Form.Item>
          {props.form.getFieldDecorator("venmoHandle", {
            rules: [
              {
                required: true,
                message:
                  "Please provide a Venmo handle we can send payouts to.",
                whitespace: true,
              },
            ],
            initialValue: props.formData.venmoHandle,
          })(<TextInputField placeholder="@MyVenmoHandle" />)}
        </Form.Item>
        <Divider className={s.creatorDetailsFormSectionDivider}></Divider>

        {/* Skills */}
        <Typography.Title level={4}>Skills</Typography.Title>
        <Typography.Paragraph className={s.formCardSubtitle}>
          {`What are the top skills (up to 5) that you'd like to teach on our platform? What experiences qualify you to teach them?`}
        </Typography.Paragraph>
        <Form.Item>
          <CreatorSkillsDynamicFormItemSet
            getFieldDecorator={props.form.getFieldDecorator}
            getFieldValue={props.form.getFieldValue}
            setFieldsValue={props.form.setFieldsValue}
            initialFormData={{ skills }}
          />
        </Form.Item>
        <Divider className={s.creatorDetailsFormSectionDivider}></Divider>

        {/* Bio */}
        <Typography.Title level={4}>Bio</Typography.Title>
        <Typography.Paragraph className={s.formCardSubtitle}>
          {`Write a short bio highlighting your biggest accomplishments relevant to the skills you wish to teach.`}
        </Typography.Paragraph>
        <Form.Item>
          {props.form.getFieldDecorator("bio", {
            rules: [
              {
                required: true,
                message: "Please provide a bio.",
              },
            ],
            initialValue: props.formData.bio,
          })(
            <TextAreaInputField
              placeholder="This will help your viewers trust that you're qualified to teach the content you put out."
              autosize={{ minRows: 3, maxRows: 10 }}
            />,
          )}
        </Form.Item>
        <Form.Item>
          <AaspireButton
            className={s.submitSignupFormButton}
            type="primary"
            htmlType="submit"
            loading={props.isSubmittingForm}
          >
            {"Finish"}
          </AaspireButton>
        </Form.Item>
      </Form>
      {formSubmissionErrorMessage}
    </Card>
  );
};

export default CreatorDetailsForm;
