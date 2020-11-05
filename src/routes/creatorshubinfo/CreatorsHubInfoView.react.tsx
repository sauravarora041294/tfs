import * as DataTypes from "data/types";
import React from "react";
import { useMemo } from "react";
import { withRouter } from "react-router-dom";
import { compose } from "recompose";
import s from "./CreatorsHubInfo.module.scss";
import {
  creatorsHubInfoReducer,
  creatorsHubSInfoStateInit,
  CreatorsHubInfoStateActionTypes,
} from "./CreatorsHubInfoReducer";
import { PageHeader, Typography, Form, notification } from "antd";
import { Grid } from "semantic-ui-react";
import CreatorsHubInfoFAQCard from "./CreatorsHubInfoFAQCard.react";
import CreatorsHubInfoContactFormCard from "./CreatorsHubInfoContactFormCard.react";
import { Location, History } from "history";
import { ContactFormData } from "./CreatorsHubInfoContactFormCard.react";
import { submitContactForm } from "./CreatorsHubInfoUtil";
import WhiteCard from "components/WhiteCard";
import { castFormToRefForwardingComponent } from "utilities/index";

interface Props {
  currentUser: DataTypes.Creator;
  history?: History;
  location?: Location;
  error?: Error;
}

const CreatorsHubInfoView: React.FC<Props> = (props: Props) => {
  const [creatorsHubInfoState, dispatch] = React.useReducer(
    creatorsHubInfoReducer,
    {
      currentUser: props.currentUser,
    },
    creatorsHubSInfoStateInit,
  );

  const creatorsHubInfoContactFormRef: React.MutableRefObject<any> = React.useRef();
  const CreatorsHubInfoContactFormEnhanced = Form.create({
    name: "creatorsInfoContactForm",
  })(React.forwardRef(castFormToRefForwardingComponent(CreatorsHubInfoContactFormCard)));

  const handleContactFormSubmission = async () => {
    creatorsHubInfoContactFormRef.current.validateFieldsAndScroll(
      async (err: Error, values: ContactFormData) => {
        if (!err) {
          dispatch({
            type: CreatorsHubInfoStateActionTypes.BEGIN_FORM_SUBMISSION,
            contactFormData: values,
          });
          const submitContactFormResponse = await submitContactForm(
            creatorsHubInfoState.currentUser.objectID,
            values.message,
            values.inquiryType,
          );
          if (submitContactFormResponse.error) {
            dispatch({
              type:
                CreatorsHubInfoStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR,
              submissionError: submitContactFormResponse.error,
            });
          } else {
            notification.success({
              message: "Submitted!",
              description: `Your inquiry has been sent. We'll get back to you asap.`,
              placement: "bottomRight",
            });
            dispatch({
              type:
                CreatorsHubInfoStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY,
            });
          }
        }
      },
    );
  };

  const enhancedForm = useMemo(
    () => (
      <CreatorsHubInfoContactFormEnhanced
        {...{
          ref: creatorsHubInfoContactFormRef,
          handleFormSubmission: handleContactFormSubmission,
          formError: creatorsHubInfoState.formSubmissionError,
          isSubmittingForm: creatorsHubInfoState.isSubmittingForm,
          contactFormData: creatorsHubInfoState.contactFormData,
        }}
      />
    ),
    [
      creatorsHubInfoContactFormRef,
      handleContactFormSubmission,
      creatorsHubInfoState.formSubmissionError,
      creatorsHubInfoState.isSubmittingForm,
      creatorsHubInfoState.contactFormData,
    ],
  );

  return (
    <WhiteCard
      title="Help & FAQ"
      subTitle="All the information you need to be an effective creator at The Future School."
      className={s.creatorsHubInfoRoot}
    >
      <Grid className={s.editMissionRootGrid}>
        <Grid.Row className={s.infoCardsRow}></Grid.Row>
        <Grid.Column width={8} className={s.missionInfoSectionContainer}>
          <CreatorsHubInfoFAQCard />
        </Grid.Column>
        <Grid.Column width={8} className={s.missionSectionsContainer}>
          {enhancedForm}
        </Grid.Column>
      </Grid>
    </WhiteCard>
  );
};

export default compose<Props, Props>(withRouter)(CreatorsHubInfoView);
