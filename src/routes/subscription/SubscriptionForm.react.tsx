import React, { useState } from "react";
import {
  Alert,
  Card,
  Col,
  Form,
  Row,
  Steps,
  Select as AntdSelect,
  Typography,
} from "antd";
import { LabeledValue } from "antd/lib/select";
import { Image } from "semantic-ui-react";
import Input from "components/Input";
import AaspireButton, {
  AaspireButtonType,
} from "components/AaspireBasicComponents/AaspireButton";
import subscriptionFormGraphic from "assets/images/subscription-form-graphic.png";
import SubscriptionPlanSelect from "./SubscriptionPlanSelect.react";
import { countryCodesArray } from "data/CountryCodes";
import { FormComponentProps } from "antd/es/form";
import { getMonthsArray, getYearsArray } from "./SubscriptionUtil";
import s from "./Subscription.module.scss";
import { transformCardNumberInput } from "utilities/payment";
import TextInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextInputField";
import SelectField from "components/AaspireBasicComponents/AaspireBasicFormComponents/SelectField";
import SubmitButton from "components/AaspireBasicComponents/AaspireBasicFormComponents/SubmitButton";

const { Step } = Steps;

interface FormData {
  planCode: string;
  cardNumber: string;
  securityCode: string;
  expiryMonth: string;
  expiryYear: string;
  firstNamePayment: string;
  lastNamePayment: string;
  country: string;
  address: string;
  city: string;
  state: string;
  zip: string;
}

interface Props extends FormComponentProps {
  handleSubmit: (event: Object) => Promise<void>;
  handlePageChange: (nextPage: number) => void;
  currentPage: number;
  isLoading?: boolean;
  formData?: FormData;
  formSubmissionError?: Error;
}

const SubscriptionForm: React.FC<Props> = (props: Props, ref) => {
  const formRef = React.useRef();
  React.useImperativeHandle(ref, () => ({}));
  const [
    securityCodeValidateTrigger,
    setSecurityCodeValidateTrigger,
  ] = useState("onBlur");

  const errorMessage = React.useMemo(
    () =>
      props.formSubmissionError ? (
        <Alert
          className={s.formCardError}
          type="error"
          message={props.formSubmissionError.message}
          banner
        />
      ) : null,
    [props.formSubmissionError],
  );

  const expiryYearFieldRef = React.useRef();
  const zipFieldRef = React.useRef();
  const cardNumberFieldRef = React.useRef();
  const nextFieldRef = {
    expiryMonth: expiryYearFieldRef,
    country: zipFieldRef,
    planCode: cardNumberFieldRef,
  };
  enum InputFieldType {
    ExpiryMonth = "ExpiryMonth",
    Country = "Country",
    PlanCode = "PlanCode",
  }

  const shiftFocusToNextField = React.useCallback(
    (
      e: string | string[] | number | number[] | LabeledValue | LabeledValue[],
      inputFieldType: string,
    ): void => {
      const inputFieldKey =
        inputFieldType.charAt(0).toLowerCase() + inputFieldType.slice(1);
      nextFieldRef[inputFieldKey].current.focus();
    },
    [nextFieldRef],
  );

  const monthsArray = getMonthsArray();
  const yearsArray = getYearsArray();

  const cardInfoForm = React.useMemo(
    () =>
      props.currentPage === 0 && (
        <React.Fragment>
          <Form.Item>
            {props.form.getFieldDecorator("planCode", {
              rules: [
                {
                  required: true,
                  message: "Please select a plan.",
                },
              ],
              initialValue: props.formData.planCode,
            })(
              <SubscriptionPlanSelect
                shiftFocusToCardfield={shiftFocusToNextField}
              />,
            )}
          </Form.Item>
          <Row>
            <Typography.Paragraph className={s.formCardSectionHeading}>
              Enter card details below
            </Typography.Paragraph>
          </Row>
          <Row>
            <Col sm={14} xs={24}>
              <Form.Item className={s.formCardItem} label="Card Number">
                {props.form.getFieldDecorator("cardNumber", {
                  getValueFromEvent: transformCardNumberInput,
                  rules: [
                    {
                      required: true,
                      message: "Please provide your card number.",
                      whitespace: true,
                    },
                  ],
                  initialValue: props.formData.cardNumber,
                })(
                  <TextInputField
                    ref={cardNumberFieldRef}
                    placeholder="**** **** **** ****"
                    autoComplete="cc-number"
                  />,
                )}
              </Form.Item>
            </Col>
            <Col sm={{ span: 9, offset: 1 }} xs={24}>
              <Form.Item className={s.formCardItem} label="Security Code">
                {props.form.getFieldDecorator("securityCode", {
                  validateTrigger: securityCodeValidateTrigger,
                  rules: [
                    {
                      required: true,
                      message: "Please provide your CVV.",
                      whitespace: true,
                    },
                    {
                      message: "Please provide valid CVV.",
                      pattern: new RegExp("^[0-9]{3,4}$"),
                    },
                  ],
                  initialValue: props.formData.securityCode,
                })(
                  <TextInputField
                    autoComplete="cc-csc"
                    placeholder="CVV"
                    onBlur={() => setSecurityCodeValidateTrigger("onChange")}
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row className={s.formCardItemRow}>
            <Col span={11}>
              <Form.Item className={s.formCardItem} label="Expiry Month">
                {props.form.getFieldDecorator("expiryMonth", {
                  rules: [
                    {
                      required: true,
                      message: "Please provide your card's expiry month.",
                      whitespace: true,
                      pattern: new RegExp("^1[0-2]$|^[1-9]$"),
                    },
                  ],
                  ...(props.formData.expiryMonth && {
                    initialValue: props.formData.expiryMonth,
                  }),
                })(
                  <SelectField
                    onChange={e =>
                      shiftFocusToNextField(e, InputFieldType.ExpiryMonth)
                    }
                    placeholder="MM"
                    dropdownMatchSelectWidth
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      String(option.props.children)
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {monthsArray.map(month => (
                      <AntdSelect.Option key={month} value={month}>
                        {month}
                      </AntdSelect.Option>
                    ))}
                  </SelectField>,
                )}
              </Form.Item>
            </Col>
            <Col span={12} offset={1}>
              <Form.Item className={s.formCardItem} label="Expiry Year">
                {props.form.getFieldDecorator("expiryYear", {
                  rules: [
                    {
                      required: true,
                      message: "Please provide your card's expiry year.",
                      whitespace: true,
                      pattern: new RegExp("^20[1-4][0-9]$"),
                    },
                  ],
                  ...(props.formData.expiryYear && {
                    initialValue: props.formData.expiryYear,
                  }),
                })(
                  <SelectField
                    ref={expiryYearFieldRef}
                    placeholder="YYYY"
                    dropdownMatchSelectWidth
                    showSearch
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      String(option.props.children)
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {yearsArray.map(year => (
                      <AntdSelect.Option key={year} value={year}>
                        {year}
                      </AntdSelect.Option>
                    ))}
                  </SelectField>,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row className={s.formCardItemRow}>
            <Form.Item>
              <AaspireButton
                type="primary"
                onClick={() => props.handlePageChange(1)}
                subType={AaspireButtonType.FULL_WIDTH}
              >
                Continue
              </AaspireButton>
            </Form.Item>
          </Row>
        </React.Fragment>
      ),
    [
      props.form,
      monthsArray,
      yearsArray,
      InputFieldType.ExpiryMonth,
      shiftFocusToNextField,
    ],
  );

  const billingInfoForm = React.useMemo(
    () =>
      props.currentPage === 1 && (
        <React.Fragment>
          <Row className={s.formCardSectionHeadingRow}>
            <Typography.Paragraph className={s.formCardSectionHeading}>
              Enter your billing information below
            </Typography.Paragraph>
          </Row>
          <Row>
            <Col sm={{ span: 11 }} xs={24}>
              <Form.Item className={s.formCardItem} label="First Name">
                {props.form.getFieldDecorator("firstNamePayment", {
                  rules: [
                    {
                      required: true,
                      message: "Please provide your first name.",
                      whitespace: true,
                      max: 255,
                    },
                  ],
                  initialValue: props.formData.firstNamePayment,
                })(<TextInputField autoComplete="cc-given-name" />)}
              </Form.Item>
            </Col>
            <Col sm={{ span: 12, offset: 1 }} xs={24}>
              <Form.Item className={s.formCardItem} label="Last Name">
                {props.form.getFieldDecorator("lastNamePayment", {
                  rules: [
                    {
                      required: true,
                      message: "Please provide your last name.",
                      whitespace: true,
                      max: 255,
                    },
                  ],
                  initialValue: props.formData.lastNamePayment,
                })(<TextInputField autoComplete="cc-family-name" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row className={s.formCardItemRow}>
            <Col span={24}>
              <Form.Item className={s.formCardItem} label="Address">
                {props.form.getFieldDecorator("address", {
                  rules: [
                    {
                      required: true,
                      message: "Please provide your address.",
                      whitespace: true,
                      max: 255,
                    },
                  ],
                  initialValue: props.formData.address,
                })(<TextInputField autoComplete="street-address" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row className={s.formCardItemRow}>
            <Col span={24}>
              <Form.Item className={s.formCardItem} label="City">
                {props.form.getFieldDecorator("city", {
                  rules: [
                    {
                      required: true,
                      message: "Please provide your city.",
                      whitespace: true,
                      max: 255,
                    },
                  ],
                  initialValue: props.formData.city,
                })(<TextInputField autoComplete="address-level2" />)}
              </Form.Item>
            </Col>
          </Row>
          <Row className={s.formCardItemRow}>
            <Col sm={{ span: 8 }} xs={24}>
              <Form.Item className={s.formCardItem} label="State">
                {props.form.getFieldDecorator("state", {
                  rules: [
                    {
                      required: true,
                      message: "Please provide your state.",
                      whitespace: true,
                      max: 255,
                    },
                  ],
                  initialValue: props.formData.state,
                })(<TextInputField autoComplete="address-level1" />)}
              </Form.Item>
            </Col>
            <Col sm={{ span: 7, offset: 1 }} xs={24}>
              <Form.Item className={s.formCardItem} label="Country">
                {props.form.getFieldDecorator("country", {
                  rules: [
                    {
                      required: true,
                      message: "Please provide your country.",
                      whitespace: true,
                    },
                  ],
                  ...(props.formData.country && {
                    initialValue: props.formData.country,
                  }),
                })(
                  <SelectField
                    onChange={e =>
                      shiftFocusToNextField(e, InputFieldType.Country)
                    }
                    showSearch
                    dropdownMatchSelectWidth
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      String(option.props.children)
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {countryCodesArray.map(country => (
                      <AntdSelect.Option key={country.key} value={country.key}>
                        {country.value}
                      </AntdSelect.Option>
                    ))}
                  </SelectField>,
                )}
              </Form.Item>
            </Col>
            <Col sm={{ span: 7, offset: 1 }} xs={24}>
              <Form.Item className={s.formCardItem} label="Zip Code">
                {props.form.getFieldDecorator("zip", {
                  rules: [
                    {
                      required: true,
                      message: "Please provide your zip code.",
                      whitespace: true,
                      max: 255,
                    },
                  ],
                  initialValue: props.formData.zip,
                })(
                  <TextInputField
                    ref={zipFieldRef}
                    autoComplete="postal-code"
                  />,
                )}
              </Form.Item>
            </Col>
          </Row>
          <Row className={s.formCardItemRow}>
            <Form.Item>
              <SubmitButton loading={props.isLoading} type="primary">
                Subscribe
              </SubmitButton>
            </Form.Item>
          </Row>
        </React.Fragment>
      ),
    [
      props.form,
      props.isLoading,
      props.currentPage,
      props.formData.address,
      props.formData.city,
      props.formData.country,
      props.formData.firstNamePayment,
      props.formData.lastNamePayment,
      props.formData.state,
      props.formData.zip,
      InputFieldType.Country,
      shiftFocusToNextField,
    ],
  );

  return (
    <Card className={s.subscriptionFormCard}>
      <Image
        className={s.subscriptionFormGraphic}
        src={subscriptionFormGraphic}
        height={129}
        width={106}
      />
      <Typography.Title className={s.formCardTitle}>
        {props.currentPage === 0 && "Choose the plan that works for you"}
        {props.currentPage === 1 && "Billing Information"}
      </Typography.Title>
      <Typography.Paragraph className={s.formCardSubtitle}>
        Thanks for signing up! You’re almost there. Choose a plan and enter your
        billing details. Then you’ll be all set.
      </Typography.Paragraph>
      <Steps
        className={s.formCardSteps}
        type="navigation"
        size="small"
        current={props.currentPage}
        onChange={props.handlePageChange}
      >
        <Step title="Card Details" />
        <Step title="Billing Info" />
      </Steps>
      <Form ref={formRef} onSubmit={props.handleSubmit}>
        {cardInfoForm}
        {billingInfoForm}
      </Form>
      {errorMessage}
    </Card>
  );
};

export default SubscriptionForm;
