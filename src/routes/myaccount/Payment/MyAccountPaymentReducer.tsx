interface PaymentAction {
  type: string;
  submissionErrors?: any;
}
enum PaymentActionTypes {
  FINISHED_UPDATE_PAYMENT_FORM_SUBMISSION_SUCCESSFULLY = "FINISHED_UPDATE_PAYMENT_FORM_SUBMISSION_SUCCESSFULLY",
  FINISHED_PAYMENT_INFO_UPDATION_WITH_ERROR = "FINISHED_PAYMENT_INFO_UPDATION_WITH_ERROR",
  BEGIN_PAYMENT_FORM_SUBMISSION = "BEGIN_PAYMENT_FORM_SUBMISSION",
}
interface PaymentFormState {
  cardNumber: string;
  securityCode: string;
  expiryMonth: string;
  expiryYear: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  firstNamePayment: string;
  lastNamePayment: string;
  successfullySubmittedUpdatePaymentForm: boolean;
  updatePaymentFormSubmissionErrors?: Array<string>;
  isSubmittingUpdatePaymentForm?: boolean;
}
const paymentFormInitialState: PaymentFormState = {
  cardNumber: "",
  securityCode: "",
  expiryMonth: "",
  expiryYear: "",
  address: "",
  city: "",
  state: "",
  zip: "",
  country: "",
  firstNamePayment: "",
  lastNamePayment: "",
  isSubmittingUpdatePaymentForm: false,
  successfullySubmittedUpdatePaymentForm: false,
  updatePaymentFormSubmissionErrors: null,
};
const paymentFormInit = (initialState: PaymentFormState): PaymentFormState => {
  return { ...paymentFormInitialState, ...initialState };
};
const paymentFormReducer = (
  state: PaymentFormState,
  action: PaymentAction,
): PaymentFormState => {
  switch (action.type) {
    case PaymentActionTypes.BEGIN_PAYMENT_FORM_SUBMISSION:
      return {
        ...state,
        isSubmittingUpdatePaymentForm: true,
        updatePaymentFormSubmissionErrors: null,
      };
    case PaymentActionTypes.FINISHED_PAYMENT_INFO_UPDATION_WITH_ERROR:
      return {
        ...state,
        updatePaymentFormSubmissionErrors: action.submissionErrors,
        isSubmittingUpdatePaymentForm: false,
        successfullySubmittedUpdatePaymentForm: false,
      };
    case PaymentActionTypes.FINISHED_UPDATE_PAYMENT_FORM_SUBMISSION_SUCCESSFULLY:
      return {
        ...state,
        isSubmittingUpdatePaymentForm: false,
        successfullySubmittedUpdatePaymentForm: true,
      };
  }
};
export { paymentFormInit, paymentFormReducer, PaymentActionTypes };
