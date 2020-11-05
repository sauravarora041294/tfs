import React from "react";
import { Alert, Button, Col, Form, Row, Select } from "antd";
import { LabeledValue } from "antd/lib/select";
import { countryCodesArray } from "data/CountryCodes";
import { FormComponentProps } from "antd/es/form";
import {
  getMonthsArray,
  getYearsArray,
} from "routes/subscription/SubscriptionUtil";
import s from "../MyAccount.module.scss";
import { transformCardNumberInput } from "utilities/payment";
import TextInputField from "components/AaspireBasicComponents/AaspireBasicFormComponents/TextInputField";
import SelectField from "components/AaspireBasicComponents/AaspireBasicFormComponents/SelectField";
import AaspireButton from "components/AaspireBasicComponents/AaspireButton";
import { isArray } from "util";

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
  isLoading?: boolean;
  formData?: FormData;
  formSubmissionErrors?: Array<string>;
}

const MyAccountUpdatePaymentForm = (props: Props, ref) => {
  const formRef = React.useRef();
  React.useImperativeHandle(ref, () => ({}));

  const errorMessage = React.useMemo(() => {
    if (props.formSubmissionErrors && isArray(props.formSubmissionErrors)) {
      return (
        props.formSubmissionErrors.length &&
        props.formSubmissionErrors.map(error => (
          <Alert
            className={s.formCardError}
            type="error"
            message={error}
            banner
          />
        ))
      );
    } else {
      return (
        props.formSubmissionErrors && [
          <Alert
            className={s.formCardError}
            type="error"
            message={props.formSubmissionErrors}
            banner
          />,
        ]
      );
    }
  }, [props.formSubmissionErrors]);

  const expiryYearFieldRef = React.useRef();
  const zipFieldRef = React.useRef();
  const nextFieldRef = {
    expiryMonth: expiryYearFieldRef,
    country: zipFieldRef,
  };
  enum InputFieldType {
    ExpiryMonth = "ExpiryMonth",
    Country = "Country",
  }

  const shiftFocusToNextField = (
    e: string | string[] | number | number[] | LabeledValue | LabeledValue[],
    inputFieldType: string,
  ): void => {
    const inputFieldKey =
      inputFieldType.charAt(0).toLowerCase() + inputFieldType.slice(1);
    nextFieldRef[inputFieldKey].current.focus();
  };

  const monthsArray = getMonthsArray();
  const yearsArray = getYearsArray();

  const cardInfoForm = React.useMemo(
    () => (
      <React.Fragment>
        <Row>
          <Col span={17}>
            <Form.Item className={s.formCardItem}>
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
                  disabled={props.isLoading}
                  placeholder="Card number"
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={6} offset={1}>
            <Form.Item className={s.formCardItem}>
              {props.form.getFieldDecorator("securityCode", {
                rules: [
                  {
                    required: true,
                    message: "Please provide your CVV.",
                    whitespace: true,
                    pattern: new RegExp("^[0-9]{3,4}$"),
                  },
                ],
                initialValue: props.formData.securityCode,
              })(
                <TextInputField disabled={props.isLoading} placeholder="CVV" />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={11}>
            <Form.Item className={s.formCardItem}>
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
                  disabled={props.isLoading}
                  onChange={e =>
                    shiftFocusToNextField(e, InputFieldType.ExpiryMonth)
                  }
                  placeholder="MM : Expiry Month"
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
                    <Select.Option key={month} value={month}>
                      {month}
                    </Select.Option>
                  ))}
                </SelectField>,
              )}
            </Form.Item>
          </Col>
          <Col span={12} offset={1}>
            <Form.Item className={s.formCardItem}>
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
                  disabled={props.isLoading}
                  ref={expiryYearFieldRef}
                  placeholder="YYYY : Expiry Year"
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
                    <Select.Option key={year} value={year}>
                      {year}
                    </Select.Option>
                  ))}
                </SelectField>,
              )}
            </Form.Item>
          </Col>
        </Row>
      </React.Fragment>
    ),
    [props.form],
  );

  const billingInfoForm = React.useMemo(
    () => (
      <React.Fragment>
        <Row>
          <Col span={11}>
            <Form.Item className={s.formCardItem} label={"First Name"}>
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
              })(
                <TextInputField
                  disabled={props.isLoading}
                  placeholder="First Name"
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={12} offset={1}>
            <Form.Item className={s.formCardItem} label={"Last Name"}>
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
              })(
                <TextInputField
                  disabled={props.isLoading}
                  placeholder="Last Name"
                />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item className={s.formCardItem} label={"Address"}>
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
              })(
                <TextInputField
                  disabled={props.isLoading}
                  placeholder="Address"
                />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={24}>
            <Form.Item className={s.formCardItem} label={"City"}>
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
              })(
                <TextInputField
                  disabled={props.isLoading}
                  placeholder="City"
                />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={8}>
            <Form.Item className={s.formCardItem} label={"State"}>
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
              })(
                <TextInputField
                  disabled={props.isLoading}
                  placeholder="State"
                />,
              )}
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item className={s.formCardItem} label={"Country"}>
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
                  disabled={props.isLoading}
                  onChange={e =>
                    shiftFocusToNextField(e, InputFieldType.Country)
                  }
                  showSearch
                  dropdownMatchSelectWidth
                  placeholder="Country"
                  optionFilterProp="children"
                  filterOption={(input, option) =>
                    String(option.props.children)
                      .toLowerCase()
                      .indexOf(input.toLowerCase()) >= 0
                  }
                >
                  {countryCodesArray.map(country => (
                    <Select.Option key={country.key} value={country.key}>
                      {country.value}
                    </Select.Option>
                  ))}
                </SelectField>,
              )}
            </Form.Item>
          </Col>
          <Col span={7} offset={1}>
            <Form.Item className={s.formCardItem} label={"Zip"}>
              {props.form.getFieldDecorator("zip", {
                rules: [
                  {
                    required: true,
                    message: "Please provide your zip code.",
                  },
                ],
                initialValue: props.formData.zip,
              })(
                <TextInputField
                  disabled={props.isLoading}
                  ref={zipFieldRef}
                  placeholder="Zip"
                />,
              )}
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <AaspireButton
            className={s.formCardButton}
            type="primary"
            htmlType="submit"
            loading={props.isLoading}
          >
            {"Update"}
          </AaspireButton>
        </Form.Item>
      </React.Fragment>
    ),
    [props.form, props.isLoading],
  );

  return (
    <React.Fragment>
      <Form ref={formRef} onSubmit={props.handleSubmit}>
        {cardInfoForm}
        {billingInfoForm}
      </Form>
      {errorMessage && errorMessage.map(error => <div>{error}</div>)}
    </React.Fragment>
  );
};

export default MyAccountUpdatePaymentForm;
