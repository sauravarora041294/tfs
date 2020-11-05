import React from "react";
import * as DataTypes from "data/types";
import { Radio, Typography, Alert } from "antd";
import { Image } from "semantic-ui-react";
import s from "../MyAccount.module.scss";
import checkedIcon from "assets/images/circularCheck.png";
import { Form, Button } from "antd";
import moment from "moment";
import AaspireButton from "components/AaspireBasicComponents/AaspireButton";

interface Props {
  value?: string;
  onChange?: (planCode: string) => void;
  planCode?: string;
  selectedPlanCode?: string;
  formSubmissionErrors?: Array<string>;
  isLoading?: boolean;
  currentSubscription: DataTypes.SubscriptionAccount;
}

const MyAccountPlanSelect: React.FC<Props> = (props: Props) => {
  const monthlyPlanButton = React.useMemo(() => {
    const isMonthlyPlanButtonChecked = props.selectedPlanCode === "tfs_monthly";
    return (
      <Radio.Button
        className={s.planSelectCard}
        value="tfs_monthly"
        checked={isMonthlyPlanButtonChecked}
      >
        {isMonthlyPlanButtonChecked && (
          <Image className={s.planSelectCardCheckIcon} src={checkedIcon} />
        )}
        <Typography.Title className={s.planSelectPrice}>$18</Typography.Title>
        <Typography.Paragraph className={s.planSelectTitle}>
          Per month
        </Typography.Paragraph>
        <Typography.Paragraph className={s.planSelectSubtitle}>
          Pay monthly, cancel anytime
        </Typography.Paragraph>
      </Radio.Button>
    );
  }, [props.selectedPlanCode]);

  const annualPlanButton = React.useMemo(() => {
    const isAnnualPlanButtonChecked = props.selectedPlanCode === "tfs_yearly";
    return (
      <Radio.Button
        className={s.planSelectCard}
        value="aaspire_yearly"
        checked={isAnnualPlanButtonChecked}
      >
        {isAnnualPlanButtonChecked && (
          <Image className={s.planSelectCardCheckIcon} src={checkedIcon} />
        )}
        <Typography.Title className={s.planSelectPrice}> $180</Typography.Title>
        <Typography.Paragraph className={s.planSelectTitle}>
          Per year
        </Typography.Paragraph>
        <Typography.Paragraph className={s.planSelectSubtitle}>
          Pay less with our annual plan
        </Typography.Paragraph>
      </Radio.Button>
    );
  }, [props.selectedPlanCode]);

  return (
    <div className={s.planSelectWrapper}>
      <Radio.Group
        className={s.planSelectGroup}
        onChange={e => props.onChange(e.target.value)}
        size="large"
        disabled={props.isLoading}
        defaultValue={props.selectedPlanCode}
        value={props.selectedPlanCode}
      >
        {monthlyPlanButton}
        {annualPlanButton}
      </Radio.Group>
    </div>
  );
};

const MyAccountPlanSelectForm = (props, ref) => {
  const errorMessage = React.useMemo(
    () =>
      props.formSubmissionErrors &&
      props.formSubmissionErrors.length &&
      props.formSubmissionErrors.map(error => (
        <Alert
          className={s.formCardError}
          type="error"
          message={error}
          banner
        />
      )),
    [props.formSubmissionErrors],
  );

  return (
    <Form ref={ref} onSubmit={props.onSubmit}>
      <Typography.Text>
        {`The change you make to your plan will take effect on your current subscription's next bill date on ${moment(
          props.currentSubscription.current_term_ends_at,
        ).format("MM/DD/YYYY")}.`}
      </Typography.Text>
      <Form.Item>
        {props.form.getFieldDecorator("planCode", {
          rules: [
            {
              required: true,
              message: "Please select a plan.",
            },
          ],
        })(
          <MyAccountPlanSelect
            onChange={props.onChange}
            planCode={props.planCode}
            isLoading={props.isLoading}
            currentSubscription={props.currentSubscription}
            selectedPlanCode={props.selectedPlanCode}
          />,
        )}
      </Form.Item>
      <Form.Item style={{ marginBottom: "0" }}>
        <AaspireButton
          className={s.formCardButton}
          type="primary"
          htmlType="submit"
          loading={props.isLoading}
        >
          {"Update Plan"}
        </AaspireButton>
      </Form.Item>
      {errorMessage}
    </Form>
  );
};
export default MyAccountPlanSelectForm;
