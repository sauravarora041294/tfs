import { Form } from "antd";
import * as DataTypes from "data/types";
import React, { MutableRefObject } from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { History } from "history";
import {
  AddCreatorDetailsStateActionTypes,
  addCreatorDetailsReducer,
  addCreatorDetailsInit,
} from "./AddCreatorDetailsReducer";
import { addCreatorProfileDetails } from "./AddCreatorDetailsUtil";
import CreatorDetailsForm from "./CreatorDetailsForm.react";
import { castFormToRefForwardingComponent } from "utilities/index";

interface Props {
  currentUser?: DataTypes.Creator;
  windowLocation: Object;
  history?: History;
  error?: Error;
}

const AddCreatorDetailsView: React.FC<Props> = (props: Props) => {
  const [addCreatorDetailsState, dispatch] = React.useReducer(
    addCreatorDetailsReducer,
    {
      currentUser: props.currentUser,
      windowLocation: props.windowLocation,
      isSubmittingForm: false,
    },
    addCreatorDetailsInit,
  );

  const creatorDetailsFormRef: MutableRefObject<any> = React.useRef();
  const CreatorDetailsFormEnhanced = Form.create({
    name: "creatorDetailsForm",
  })(React.forwardRef(castFormToRefForwardingComponent(CreatorDetailsForm)));

  const handleCreatorDetailsFormSubmission = async () => {
    creatorDetailsFormRef.current.validateFieldsAndScroll(
      async (err, values) => {
        if (!err) {
          dispatch({
            type: AddCreatorDetailsStateActionTypes.SET_FORM_DATA,
            formData: values,
          });
          const selectedSkillTitleList = values.skillTitles;
          const selectedSkillTitleSet = new Set(selectedSkillTitleList)
          if (selectedSkillTitleList.length !== selectedSkillTitleSet.size) {
            dispatch({
              type: AddCreatorDetailsStateActionTypes.SET_FORM_SUBMISSION_ERROR_MESSAGE,
              formSubmissionError: "You cannot select the same skill to teach more than once.",
            });
          } else {
            dispatch({
              type: AddCreatorDetailsStateActionTypes.BEGIN_FORM_SUBMISSION,
            });
            const saveCreatorDetailsResponse = await addCreatorProfileDetails(
              props.currentUser.objectID,
              values,
            );
            if (saveCreatorDetailsResponse.error) {
              dispatch({
                type:
                  AddCreatorDetailsStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR,
                formSubmissionError: "Something went wrong on our end. Please try again later.",
              });
            } else {
              props.history.push(`/`);
            }
          }
        }
      },
    );
  };

  return (
    <React.Fragment>
      <CreatorDetailsFormEnhanced
        {...{
          ref: creatorDetailsFormRef,
          handleFormSubmission: handleCreatorDetailsFormSubmission,
          skillsFormError: addCreatorDetailsState.formSubmissionError,
          isSubmittingForm: addCreatorDetailsState.isSubmittingForm,
          formData: addCreatorDetailsState.formData,
        }}
      />
    </React.Fragment>
  );
};

export default compose<Props, Props>(withRouter)(AddCreatorDetailsView);
