import React from "react";
import { Modal } from "antd";
import * as DataTypes from "data/types";
import MyAccountPlanSelectForm from "./MyAccountPlanSelect.react";
import { Form } from "antd";
import s from "routes/subscription/Subscription.module.scss";
import {
  PlanCodeActionTypes,
  planCodeInit,
  planCodeReducer,
} from "./MyAccountPlanReducer";
import { onUpdateSubscriptionPlan } from "../MyAccountUtil";
import { castFormToRefForwardingComponent } from "utilities/index";

interface Props {
  planCode: string;
  showUpdatePlanModal: boolean;
  onClose: () => void;
  currentSubscription: DataTypes.SubscriptionAccount;
}

const MyAccountUpdatePlan = (props: Props) => {
  const MyAccountPlanSelectFormEnhanced = Form.create({
    name: "updatePlanForm",
  })(React.forwardRef(castFormToRefForwardingComponent(MyAccountPlanSelectForm)));

  const myAccountUpdatePlanFormRef: React.MutableRefObject<any> = React.useRef();
  const [planCodeState, dispatch] = React.useReducer(
    planCodeReducer,
    {
      planCode: props.planCode,
      isSubmittingUpdatePlancodeForm: false,
      successfullySubmittedUpdatePlanCodeForm: false,
      updatePlanCodeSubmissionErrors: null,
      selectedPlanCode: props.planCode,
    },
    planCodeInit,
  );
  const onSuccess = () => {
    window.location.reload();
  };

  const updateSelectedPlanCode = React.useCallback(
    (selectedPlanCode: string) => {
      return dispatch({
        type: PlanCodeActionTypes.UPDATE_SELECTED_PLAN,
        selectedPlanCode: selectedPlanCode,
      });
    },
    [dispatch],
  );

  const updatePlanHandler = (e: Event) => {
    e.preventDefault();
    myAccountUpdatePlanFormRef.current.validateFieldsAndScroll(async () => {
      dispatch({
        type: PlanCodeActionTypes.BEGIN_PLAN_CODE_FORM_SUBMISSION,
      });
      const saveDataResponse = await onUpdateSubscriptionPlan(
        props.currentSubscription.uuid,
        planCodeState.selectedPlanCode,
      );

      if (saveDataResponse.errors) {
        dispatch({
          type: PlanCodeActionTypes.FINISHED_PLAN_CODE_UPDATION_WITH_ERROR,
          submissionErrors: saveDataResponse.errors,
        });
      } else {
        dispatch({
          type:
            PlanCodeActionTypes.FINISHED_UPDATE_PLAN_CODE_FORM_SUBMISSION_SUCCESSFULLY,
        });
        onSuccess();
      }
    });
  };

  const myAccountPlanSelectFormEnhanced = React.useMemo(
    () => (
      <MyAccountPlanSelectFormEnhanced
        {...{
          ref: myAccountUpdatePlanFormRef,
          onSubmit: updatePlanHandler,
          planCode: planCodeState.planCode,
          selectedPlanCode: planCodeState.selectedPlanCode,
          isLoading: planCodeState.isSubmittingUpdatePlancodeForm,
          formSubmissionErrors: planCodeState.updatePlanCodeSubmissionErrors,
          currentSubscription: props.currentSubscription,
          onChange: updateSelectedPlanCode,
        }}
      />
    ),
    [
      planCodeState.selectedPlanCode,
      planCodeState.isSubmittingUpdatePlancodeForm,
      planCodeState.updatePlanCodeSubmissionErrors,
    ],
  );
  return (
    <Modal
      footer={null}
      width={550}
      style={{ maxWidth: "95vw !important" }}
      title="Update Plan"
      visible={props.showUpdatePlanModal}
      onCancel={props.onClose}
      className={s.myAccountUpdatePlanModal}
    >
      {myAccountPlanSelectFormEnhanced}
    </Modal>
  );
};

export default MyAccountUpdatePlan;
