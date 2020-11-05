import React from "react";
import { Modal, Form } from "antd";
import s from "routes/subscription/Subscription.module.scss";
import MyAccountProfileInfoForm from "./MyAccountProfileInfoForm.react";
import {
  profileInfoInit,
  profileInfoReducer,
  ProfileInfoActionTypes,
} from "./MyAccountProfileInfoReducer";
import {
  onCancelSubscription,
  onUpdatePayment,
  onUpdateProfileInfo,
  onUpdateSubscriptionPlan,
  BillingInfo,
} from "../MyAccountUtil";
import { castFormToRefForwardingComponent } from "utilities/index";

const MyAccountUpdateProfileInfo = props => {
  const myAccountUpdateProfileFormRef: React.MutableRefObject<any> = React.useRef();

  const MyAccountProfileInfoFormEnhanced = Form.create({
    name: "updateProfileInfoForm",
  })(React.forwardRef(castFormToRefForwardingComponent(MyAccountProfileInfoForm)));

  const [profileInfoState, dispatch] = React.useReducer(
    profileInfoReducer,
    {
      email: props.currentUser.email,
      isSubmittingProfileInfoForm: false,
      updateProfileInfoFormSubmissionErrors: null,
      successfullySubmittedUpdateProfileInfoForm: false,
    },
    profileInfoInit,
  );
  const onSuccess = () => {
    window.location.reload();
  };
  const updateProfileHandler = async (
    e: React.FormEvent<HTMLFormElement>,
  ): Promise<void> => {
    e.preventDefault();
    myAccountUpdateProfileFormRef.current.validateFieldsAndScroll(
      async (err, values) => {
        if (!err) {
          dispatch({
            type: ProfileInfoActionTypes.BEGIN_PROFILE_INFO_FORM_SUBMISSION,
          });
          const saveDataResponse = await onUpdateProfileInfo(
            props.currentUser,
            values.email,
            values.password,
          );
          if (saveDataResponse.errors) {
            dispatch({
              type:
                ProfileInfoActionTypes.FINISHED_PROFILE_INFO_UPDATION_WITH_ERROR,
              submissionErrors: saveDataResponse.errors,
            });
          } else {
            dispatch({
              type:
                ProfileInfoActionTypes.FINISHED_UPDATE_PROFILE_INFO_FORM_SUBMISSION_SUCCESSFULLY,
            });
            onSuccess();
          }
        }
      },
    );
  };
  const onChangeEmailField = (email: string) => {
    dispatch({
      type: ProfileInfoActionTypes.UPDATE_DEFAULT_EMAIL,
      defaultEmail: email,
    });
  };
  console.log("-------------ERRORS-----------------");
  console.log(profileInfoState.updateProfileInfoFormSubmissionErrors);

  const myAccountProfileInfoFormEnhanced = React.useMemo(() => {
    return (
      <MyAccountProfileInfoFormEnhanced
        {...{
          ref: myAccountUpdateProfileFormRef,
          handleSubmit: updateProfileHandler,
          formData: {
            email: profileInfoState.defaultEmail || props.currentUser.email,
          },
          currentUser: props.currentUser,
          isLoading: profileInfoState.isSubmittingProfileInfoForm,
          formSubmissionErrors:
            profileInfoState.updateProfileInfoFormSubmissionErrors,
          onChangeEmailField: onChangeEmailField,
        }}
      />
    );
  }, [
    profileInfoState.isSubmittingProfileInfoForm,
    profileInfoState.updateProfileInfoFormSubmissionErrors,
    // profileInfoState.defaultEmail, -> important, do not de-comment
  ]);
  return (
    <Modal
      footer={null}
      title="Update Profile"
      visible={props.showUpdateProfileModal}
      onCancel={props.onClose}
      className={s.myAccountUpdateProfileModal}
    >
      {myAccountProfileInfoFormEnhanced}
    </Modal>
  );
};

export default MyAccountUpdateProfileInfo;
