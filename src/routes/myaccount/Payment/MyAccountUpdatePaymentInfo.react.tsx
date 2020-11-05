import React from "react";
import { Modal, Form } from "antd";
import s from "../MyAccount.module.scss";
import * as DataTypes from "data/types";
import MyAccountUpdatePaymentForm from "./MyAccountUpdatePaymentForm";
import {
  paymentFormInit,
  paymentFormReducer,
  PaymentActionTypes,
} from "./MyAccountPaymentReducer";
import { onUpdatePayment } from "../MyAccountUtil";
import { castFormToRefForwardingComponent } from "utilities/index";

interface Props {
  showUpdatePaymentModal: boolean;
  onClose: () => void;
  currentBillingInfo?: DataTypes.BillingInfo;
  currentUser: DataTypes.User;
}

const MyAccountUpdatePaymentInfo: React.FC<Props> = (props: Props) => {
  const [profileInfoState, dispatch] = React.useReducer(
    paymentFormReducer,
    {
      cardNumber: "",
      securityCode: "",
      expiryMonth: props.currentBillingInfo.month,
      expiryYear: props.currentBillingInfo.year,
      address: props.currentBillingInfo.address1,
      city: props.currentBillingInfo.city,
      state: props.currentBillingInfo.state,
      zip: props.currentBillingInfo.zip,
      country: props.currentBillingInfo.country,
      firstNamePayment: props.currentBillingInfo.first_name,
      lastNamePayment: props.currentBillingInfo.last_name,
      isSubmittingUpdatePaymentForm: false,
      successfullySubmittedUpdatePaymentForm: false,
      updatePaymentFormSubmissionErrors: null,
    },
    paymentFormInit,
  );
  const onSuccess = () => {
    window.location.reload();
  };
  const myAccountUpdatePaymentFormRef: React.MutableRefObject<any> = React.useRef();

  const MyAccountUpdatePaymentFormEnhanced = Form.create({
    name: "updatePaymentForm",
  })(React.forwardRef(castFormToRefForwardingComponent(MyAccountUpdatePaymentForm)));

  const updatePaymentInfoHandler = async (e: Event): Promise<void> => {
    e.preventDefault();
    myAccountUpdatePaymentFormRef.current.validateFieldsAndScroll(
      async (err, values) => {
        if (!err) {
          dispatch({
            type: PaymentActionTypes.BEGIN_PAYMENT_FORM_SUBMISSION,
          });
          const saveDataResponse = await onUpdatePayment(
            props.currentUser,
            values,
          );
          if (saveDataResponse.errors) {
            dispatch({
              type:
                PaymentActionTypes.FINISHED_PAYMENT_INFO_UPDATION_WITH_ERROR,
              submissionErrors: saveDataResponse.errors,
            });
          } else {
            dispatch({
              type:
                PaymentActionTypes.FINISHED_UPDATE_PAYMENT_FORM_SUBMISSION_SUCCESSFULLY,
            });
            onSuccess();
          }
        }
      },
    );
  };
  console.log(
    "----------PAYMENT ERRORS :",
    profileInfoState.updatePaymentFormSubmissionErrors,
  );

  const myAccountUpdatePaymentFormEnhanced = React.useMemo(
    () => (
      <MyAccountUpdatePaymentFormEnhanced
        {...{
          ref: myAccountUpdatePaymentFormRef,
          handleSubmit: updatePaymentInfoHandler,
          formData: profileInfoState,
          isLoading: profileInfoState.isSubmittingUpdatePaymentForm,
          formSubmissionErrors:
            profileInfoState.updatePaymentFormSubmissionErrors,
        }}
      />
    ),
    [
      profileInfoState.isSubmittingUpdatePaymentForm,
      profileInfoState.updatePaymentFormSubmissionErrors,
    ],
  );
  return (
    <Modal
      footer={null}
      title="Update Billing Info"
      visible={props.showUpdatePaymentModal}
      onCancel={props.onClose}
      className={s.myAccountUpdateBillingInfoModal}
      style={{ marginBottom: 25 }}
      bodyStyle={{ marginBottom: 25 }}
    >
      {myAccountUpdatePaymentFormEnhanced}
    </Modal>
  );
};

export default MyAccountUpdatePaymentInfo;
