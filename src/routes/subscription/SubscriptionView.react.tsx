import { AppContext } from "App";
import { User } from "data/types";
import React from "react";
import { withRouter } from "react-router";
import { compose } from "recompose";
import { History } from "history";
import { Form } from "antd";
import SubscriptionForm from "./SubscriptionForm.react";
import { generateRedirectTargetAfterAuth } from "utilities";
import {
  SubscriptionStateActionTypes,
  subscriptionStateInit,
  subscriptionReducer,
} from "./SubscriptionReducer";
import { onSubscriptionRequest } from "./SubscriptionUtil";
import { castFormToRefForwardingComponent } from "utilities/index";

interface Props {
  currentUser: User;
  history?: History;
}

const SubscriptionView: React.FC<Props> = (props: Props) => {
  const [appState] = React.useContext(AppContext);
  const [subscriptionState, dispatch] = React.useReducer(
    subscriptionReducer,
    { ...props },
    subscriptionStateInit,
  );

  const onSuccess = () => {
    const redirectTarget = generateRedirectTargetAfterAuth("/mydashboard");
    props.history.push(redirectTarget);
  };

  const subscriptionFormRef: React.MutableRefObject<any> = React.useRef();
  const SubscriptionFormEnhanced = Form.create({
    name: "subscriptionForm",
  })(React.forwardRef(castFormToRefForwardingComponent(SubscriptionForm)));

  const handlePageChange = (page: number): void => {
    if (page > subscriptionState.currentPage) {
      subscriptionFormRef.current.validateFieldsAndScroll(
        async (err, values) => {
          if (!err) {
            dispatch({
              type: SubscriptionStateActionTypes.SET_FORM_DATA,
              formData: values,
            });
            dispatch({
              type: SubscriptionStateActionTypes.SET_CURRENT_PAGE,
              currentPage: page,
            });
          }
        },
      );
    } else {
      const values = subscriptionFormRef.current.getFieldsValue();
      dispatch({
        type: SubscriptionStateActionTypes.SET_FORM_DATA,
        formData: values,
      });
      dispatch({
        type: SubscriptionStateActionTypes.SET_CURRENT_PAGE,
        currentPage: page,
      });
    }
  };

  const handleSubmit = async (e): Promise<void> => {
    e.preventDefault();
    subscriptionFormRef.current.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        dispatch({ type: SubscriptionStateActionTypes.BEGIN_FORM_SUBMISSION });
        dispatch({
          type: SubscriptionStateActionTypes.SET_FORM_DATA,
          formData: values,
        });
        const saveDataResponse = await onSubscriptionRequest(
          {
            ...subscriptionState.formData,
            ...values,
          },
          props.currentUser,
        );
        if (saveDataResponse.errors) {
          dispatch({
            type:
              SubscriptionStateActionTypes.FINISHED_FORM_SUBMISSION_WITH_ERROR,
            submissionError: saveDataResponse.errors,
          });
        } else {
          dispatch({
            type:
              SubscriptionStateActionTypes.FINISHED_FORM_SUBMISSION_SUCCESSFULLY,
          });
          onSuccess();
        }
      }
    });
  };

  return (
    <div>
      <SubscriptionFormEnhanced
        {...{
          ref: subscriptionFormRef,
          handleSubmit: handleSubmit,
          isLoading: subscriptionState.isSubmittingForm,
          formData: subscriptionState.formData,
          formSubmissionError: subscriptionState.formSubmissionError,
          handlePageChange: handlePageChange,
          currentPage: subscriptionState.currentPage,
        }}
      />
    </div>
  );
};

export default compose<Props, Props>(withRouter)(SubscriptionView);
