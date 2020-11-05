import { Button, Card, Form } from "antd";
import * as DataTypes from "data/types";
import React, { MutableRefObject } from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { History, Location } from "history";
import CreatorBasicDetailsSection from "./CreatorBasicDetailsSection.react";
import CreatorLinksSection from "./CreatorLinksSection.react";
import CreatorPayoutSection from "./CreatorPayoutSection.react";
import CreatorSkillsSection from "./CreatorSkillsSection.react";
import EditCreatorBasicDetailsSectionForm from "./EditCreatorBasicDetailsSectionForm.react";
import EditCreatorLinksSectionForm from "./EditCreatorLinksSectionForm.react";
import EditCreatorPayoutSectionForm from "./EditCreatorPayoutSectionForm.react";
import s from "./EditCreatorProfileForm.module.scss";
import {
  EditCreatorProfileFormStateActionTypes,
  editCreatorProfileFormReducer,
  editCreatorProfileFormStateInit,
} from "./EditCreatorProfileFormReducer";
import {
  saveBasicDetailsSectionData,
  saveLinksSectionData,
  savePayoutSectionData,
  saveSkillsSectionData,
} from "./EditCreatorProfileFormUtil";
import EditCreatorSkillsSectionForm from "./EditCreatorSkillsSectionForm.react";
import WhiteCard from "components/WhiteCard";
import { castFormToRefForwardingComponent } from "utilities/index";

interface Props {
  history?: History;
  location?: Location;
  currentUser: DataTypes.Creator;
}

const EditCreatorProfileForm: React.FC<Props> = (props: Props) => {
  const [editCreatorProfileFormState, dispatch] = React.useReducer(
    editCreatorProfileFormReducer,
    {
      currentUser: props.currentUser,
      creatorDetails: props.currentUser.creatorDetails,
    },
    editCreatorProfileFormStateInit,
  );

  const didClickEditSkillsSection = React.useCallback(
    () =>
      dispatch({
        type: EditCreatorProfileFormStateActionTypes.BEGIN_EDITING_SKILLS,
      }),
    [],
  );

  const didClickCancelEditingSkillsSection = React.useCallback(
    () =>
      dispatch({
        type: EditCreatorProfileFormStateActionTypes.CANCEL_EDITING_SKILLS,
      }),
    [],
  );

  const didClickEditLinksSection = React.useCallback(
    () =>
      dispatch({
        type: EditCreatorProfileFormStateActionTypes.BEGIN_EDITING_LINKS,
      }),
    [],
  );

  const didClickCancelEditingLinksSection = React.useCallback(
    () =>
      dispatch({
        type: EditCreatorProfileFormStateActionTypes.CANCEL_EDITING_LINKS,
      }),
    [],
  );

  const didClickEditBasicDetailsSection = React.useCallback(
    () =>
      dispatch({
        type:
          EditCreatorProfileFormStateActionTypes.BEGIN_EDITING_BASIC_DETAILS,
      }),
    [],
  );

  const didClickCancelEditingBasicDetailsSection = React.useCallback(
    () =>
      dispatch({
        type:
          EditCreatorProfileFormStateActionTypes.CANCEL_EDITING_BASIC_DETAILS,
      }),
    [],
  );

  const didClickEditPayoutSection = React.useCallback(
    () =>
      dispatch({
        type: EditCreatorProfileFormStateActionTypes.BEGIN_EDITING_PAYOUT,
      }),
    [],
  );

  const didClickCancelEditingPayoutSection = React.useCallback(
    () =>
      dispatch({
        type: EditCreatorProfileFormStateActionTypes.CANCEL_EDITING_PAYOUT,
      }),
    [],
  );

  const editCreatorLinksSectionFormRef: MutableRefObject<any> = React.useRef();
  const EditCreatorLinksSectionFormEnhanced = Form.create({
    name: "edit_creator_links_section_form",
  })(React.forwardRef(castFormToRefForwardingComponent(EditCreatorLinksSectionForm)));

  const editCreatorBasicDetailsSectionFormRef: MutableRefObject<any> = React.useRef();
  const EditCreatorBasicDetailsSectionFormEnhanced = Form.create({
    name: "edit_creator_basic_details_section_form",
  })(React.forwardRef(castFormToRefForwardingComponent(EditCreatorBasicDetailsSectionForm)));

  const editCreatorSkillsSectionFormRef: MutableRefObject<any> = React.useRef();
  const EditCreatorSkillsSectionFormEnhanced = Form.create({
    name: "edit_creator_skills_section_form",
  })(React.forwardRef(castFormToRefForwardingComponent(EditCreatorSkillsSectionForm)));

  const editCreatorPayoutSectionFormRef: MutableRefObject<any> = React.useRef();
  const EditCreatorPayoutSectionFormEnhanced = Form.create({
    name: "edit_creator_payout_section_form",
  })(React.forwardRef(castFormToRefForwardingComponent(EditCreatorPayoutSectionForm)));

  const saveSkillsSection = async () => {
    editCreatorSkillsSectionFormRef.current.validateFieldsAndScroll(
      async (err, values) => {
        if (!err) {
          dispatch({
            type:
              EditCreatorProfileFormStateActionTypes.BEGIN_SKILLS_FORM_SUBMISSION,
          });
          const saveDataResponse = await saveSkillsSectionData(
            editCreatorProfileFormState.currentUser.objectID,
            values,
          );
          if (saveDataResponse.error) {
            dispatch({
              type:
                EditCreatorProfileFormStateActionTypes.FINISHED_SKILLS_FORM_SUBMISSION_WITH_ERROR,
              submissionError: saveDataResponse.error,
            });
          } else {
            const skillObjs = values.skillTitles.map((title: string, index: number) => {
              return {
                title: title,
                justification: values.justifications[index]
              }
            })
            dispatch({
              type: EditCreatorProfileFormStateActionTypes.UPDATE_USER_DETAILS,
              currentUser: {
                ...editCreatorProfileFormState.currentUser,
                creatorDetails: {
                  ...editCreatorProfileFormState.currentUser.creatorDetails,
                  skills: skillObjs
                },
              },
            });
            dispatch({
              type: EditCreatorProfileFormStateActionTypes.SET_SKILLS_FORM_DATA,
              skillsFormData: values,
            });
            dispatch({
              type:
                EditCreatorProfileFormStateActionTypes.FINISHED_SKILLS_FORM_SUBMISSION_SUCCESSFULLY,
            });
          }
        }
      },
    );
  };

  const saveLinksSection = async () => {
    editCreatorLinksSectionFormRef.current.validateFieldsAndScroll(
      async (err, values) => {
        if (!err) {
          dispatch({
            type:
              EditCreatorProfileFormStateActionTypes.BEGIN_LINKS_FORM_SUBMISSION,
          });
          dispatch({
            type: EditCreatorProfileFormStateActionTypes.SET_LINKS_FORM_DATA,
            linksFormData: values,
          });
          const saveDataResponse = await saveLinksSectionData(
            editCreatorProfileFormState.currentUser.objectID,
            values,
          );
          if (saveDataResponse.error) {
            dispatch({
              type:
                EditCreatorProfileFormStateActionTypes.FINISHED_LINKS_FORM_SUBMISSION_WITH_ERROR,
              submissionError: saveDataResponse.error,
            });
          } else {
            dispatch({
              type:
                EditCreatorProfileFormStateActionTypes.FINISHED_LINKS_FORM_SUBMISSION_SUCCESSFULLY,
            });
          }
        }
      },
    );
  };

  const saveBasicDetailsSection = async () => {
    editCreatorBasicDetailsSectionFormRef.current.validateFieldsAndScroll(
      async (err, values) => {
        if (!err) {
          dispatch({
            type:
              EditCreatorProfileFormStateActionTypes.BEGIN_BASIC_DETAILS_FORM_SUBMISSION,
          });
          dispatch({
            type:
              EditCreatorProfileFormStateActionTypes.SET_BASIC_DETAILS_FORM_DATA,
            basicDetailsFormData: values,
          });
          const saveDataResponse = await saveBasicDetailsSectionData(
            editCreatorProfileFormState.currentUser.objectID,
            values,
          );
          if (saveDataResponse.error) {
            dispatch({
              type:
                EditCreatorProfileFormStateActionTypes.FINISHED_BASIC_DETAILS_FORM_SUBMISSION_WITH_ERROR,
              submissionError: saveDataResponse.error,
            });
          } else {
            dispatch({
              type: EditCreatorProfileFormStateActionTypes.UPDATE_USER_DETAILS,
              currentUser: {
                ...editCreatorProfileFormState.currentUser,
                firstName: values.firstName,
                lastName: values.lastName,
                creatorDetails: {
                  ...editCreatorProfileFormState.currentUser.creatorDetails,
                  title: values.title,
                  company: values.company,
                },
              },
            });
            dispatch({
              type:
                EditCreatorProfileFormStateActionTypes.FINISHED_BASIC_DETAILS_FORM_SUBMISSION_SUCCESSFULLY,
            });
          }
        }
      },
    );
  };

  const savePayoutSection = async () => {
    editCreatorPayoutSectionFormRef.current.validateFieldsAndScroll(
      async (err, values) => {
        if (!err) {
          dispatch({
            type:
              EditCreatorProfileFormStateActionTypes.BEGIN_PAYOUT_FORM_SUBMISSION,
          });
          dispatch({
            type: EditCreatorProfileFormStateActionTypes.SET_PAYOUT_FORM_DATA,
            payoutFormData: values,
          });
          const saveDataResponse = await savePayoutSectionData(
            editCreatorProfileFormState.currentUser.objectID,
            values,
          );
          if (saveDataResponse.error) {
            dispatch({
              type:
                EditCreatorProfileFormStateActionTypes.FINISHED_PAYOUT_FORM_SUBMISSION_WITH_ERROR,
              submissionError: saveDataResponse.error,
            });
          } else {
            dispatch({
              type: EditCreatorProfileFormStateActionTypes.UPDATE_USER_DETAILS,
              currentUser: {
                ...editCreatorProfileFormState.currentUser,
                creatorDetails: {
                  ...editCreatorProfileFormState.currentUser.creatorDetails,
                  venmoHandle: values.venmoHandle
                },
              },
            });
            dispatch({
              type:
                EditCreatorProfileFormStateActionTypes.FINISHED_PAYOUT_FORM_SUBMISSION_SUCCESSFULLY,
            });
          }
        }
      },
    );
  };

  const skillsSection = editCreatorProfileFormState.isEditingSkillsSection ? (
    <EditCreatorSkillsSectionFormEnhanced
      {...{
        ref: editCreatorSkillsSectionFormRef,
        didClickCancelEditing: didClickCancelEditingSkillsSection,
        handleFormSubmission: saveSkillsSection,
        initialFormData: {
          skills: editCreatorProfileFormState.creatorDetails.skills,
        },
        isLoading: editCreatorProfileFormState.isSubmittingSkillsSectionForm,
      }}
    />
  ) : (
      <CreatorSkillsSection
        skills={editCreatorProfileFormState.currentUser.creatorDetails.skills}
        didClickEdit={didClickEditSkillsSection}
      />
    );

  const linksSection = editCreatorProfileFormState.isEditingLinksSection ? (
    <EditCreatorLinksSectionFormEnhanced
      {...{
        ref: editCreatorLinksSectionFormRef,
        didClickCancelEditing: didClickCancelEditingLinksSection,
        handleFormSubmission: saveLinksSection,
        initialFormData: {
          linkedinURL: editCreatorProfileFormState.creatorDetails.linkedinURL,
          resumeURL: editCreatorProfileFormState.creatorDetails.resumeURL,
        },
        isLoading: editCreatorProfileFormState.isSubmittingLinksSectionForm,
      }}
    />
  ) : (
      <CreatorLinksSection
        linkedinURL={
          editCreatorProfileFormState.currentUser.creatorDetails.linkedinURL
        }
        resumeURL={
          editCreatorProfileFormState.currentUser.creatorDetails.resumeURL
        }
        didClickEdit={didClickEditLinksSection}
      />
    );

  const basicDetailsSection = React.useMemo(() => {
    return editCreatorProfileFormState.isEditingBasicDetailsSection ? (
      <EditCreatorBasicDetailsSectionFormEnhanced
        {...{
          ref: editCreatorBasicDetailsSectionFormRef,
          handleFormSubmission: saveBasicDetailsSection,
          didClickCancelEditing: didClickCancelEditingBasicDetailsSection,
          initialFormData: {
            firstName:
              editCreatorProfileFormState.creatorDetails.firstName ||
              editCreatorProfileFormState.currentUser.firstName,
            lastName:
              editCreatorProfileFormState.creatorDetails.lastName ||
              editCreatorProfileFormState.currentUser.lastName,
            title: editCreatorProfileFormState.creatorDetails.title,
            company: editCreatorProfileFormState.creatorDetails.company,
            profilePictureURL:
              editCreatorProfileFormState.currentUser.profilePictureURL,
          },
          isLoading:
            editCreatorProfileFormState.isSubmittingBasicDetailsSectionForm,
        }}
      />
    ) : (
        <CreatorBasicDetailsSection
          currentUser={editCreatorProfileFormState.currentUser}
        />
      );
  }, [
    editCreatorProfileFormState.currentUser,
    editCreatorProfileFormState.isEditingBasicDetailsSection,
    editCreatorBasicDetailsSectionFormRef,
    saveBasicDetailsSection,
    didClickCancelEditingBasicDetailsSection,
    editCreatorProfileFormState.creatorDetails,
    editCreatorProfileFormState.isSubmittingBasicDetailsSectionForm,
  ]);

  const payoutSection = editCreatorProfileFormState.isEditingPayoutSection ? (
    <EditCreatorPayoutSectionFormEnhanced
      {...{
        ref: editCreatorPayoutSectionFormRef,
        handleFormSubmission: savePayoutSection,
        didClickCancelEditing: didClickCancelEditingPayoutSection,
        initialFormData: {
          venmoHandle: editCreatorProfileFormState.creatorDetails.venmoHandle,
        },
        isLoading: editCreatorProfileFormState.isSubmittingPayoutSectionForm,
      }}
    />
  ) : (
      <CreatorPayoutSection
        {...{
          currentUser: editCreatorProfileFormState.currentUser,
          didClickEdit: didClickEditPayoutSection,
          venmoHandle:
            editCreatorProfileFormState.currentUser.creatorDetails.venmoHandle,
        }}
      />
    );

  return (
    <WhiteCard className={s.profileContentCard} withDefaultBodyPadding>
      {/* Header action button */}
      {editCreatorProfileFormState.isEditingBasicDetailsSection ? null : (
        <Button
          icon={"edit"}
          onClick={didClickEditBasicDetailsSection}
          className={s.editProfileSectionHeaderButton}
        />
      )}

      {/* Header */}
      {basicDetailsSection}
      <div className="horizontalLine" style={{ margin: "2rem 0" }}></div>

      {/* Body */}
      {linksSection}
      {payoutSection}
      {skillsSection}
    </WhiteCard>
  );
};

export default compose<Props, Props>(withRouter)(EditCreatorProfileForm);
