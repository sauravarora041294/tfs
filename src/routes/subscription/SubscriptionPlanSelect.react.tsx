import React from "react";
import { Radio, Typography } from "antd";
import { Image } from "semantic-ui-react";
import checkedIcon from "assets/images/circularCheck.png";
import s from "./Subscription.module.scss";

interface Props {
  value?: string;
  onChange?: (event: Object) => void;
  shiftFocusToCardfield?: Function;
}

const SubscriptionPlanSelect: React.FC<Props> = (props: Props) => {
  const { shiftFocusToCardfield } = props;
  enum InputFieldType {
    ExpiryMonth = "ExpiryMonth",
    Country = "Country",
    PlanCode = "PlanCode",
  }

  const isMonthlyPlanButtonChecked = props.value === "tfs_monthly";
  const isAnnualPlanButtonChecked = props.value === "tfs_yearly";

  const monthlyPlanButton = (
    <Radio.Button
      className={s.planSelectCard}
      value="tfs_monthly"
      checked={isMonthlyPlanButtonChecked}
      onClick={e => shiftFocusToCardfield(e, InputFieldType.PlanCode)}
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

  const annualPlanButton = (
    <Radio.Button
      className={s.planSelectCard}
      value="aaspire_yearly"
      checked={isAnnualPlanButtonChecked}
      onClick={e => shiftFocusToCardfield(e, "planCode")}
    >
      {isAnnualPlanButtonChecked && (
        <Image className={s.planSelectCardCheckIcon} src={checkedIcon} />
      )}
      <Typography.Title className={s.planSelectPrice}>$180</Typography.Title>
      <Typography.Paragraph className={s.planSelectTitle}>
        Per year
      </Typography.Paragraph>
      <Typography.Paragraph className={s.planSelectSubtitle}>
        Pay less with our annual plan
      </Typography.Paragraph>
    </Radio.Button>
  );

  return (
    <Radio.Group
      className={s.planSelectGroup}
      onChange={props.onChange}
      size="large"
    >
      {monthlyPlanButton}
      {annualPlanButton}
    </Radio.Group>
  );
};

export default SubscriptionPlanSelect;
