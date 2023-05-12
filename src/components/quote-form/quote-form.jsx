/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
} from 'react';
import { navigate } from '@reach/router';
import ReCAPTCHA from 'react-google-recaptcha';
import classnames from 'classnames/bind';
// import { ReactMultiEmail, isEmail } from 'react-multi-email';

import {
  requestSignUp,
  requestAccount,
  requestHiveage,
  requestPricing,
} from '../../api';

import { TextField, PhoneField, SelectField } from '../form';
import Button from '../button';
import { initialFieldData, basePricingPlans } from './constants';
import {
  validateField,
  formatFieldValue,
  getRequestData,
} from './utils';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Step,
  StepLabel,
  Stepper,
  Select,
  MenuItem,
} from '@material-ui/core';
import {
  ProfileOutlined,
  ShoppingCartOutlined,
} from '@ant-design/icons';

import PricingUserSelect from '../pricing-sections/pricing-user-select';
import { useLocation } from '@reach/router';
import queryString from 'query-string';
import * as styles from './quote-form.module.scss';
import 'react-multi-email/style.css';

const cx = classnames.bind(styles);

const QuoteFrom = () => {
  const [fieldData, setFieldData] = useState(initialFieldData);
  const [contactResponse, setContactResponse] = useState({});
  const [_accountResponse, setAccountResponse] = useState({});
  const [hiveageResponse, setHiveageResponse] = useState({});

  const [_emailsTo, _setEmailsTo] = useState([]);
  const [activeStep, setActiveStep] = React.useState(0);
  const stepLabels = [
    'About You',
    'Company Info',
    'Quote Summary',
    'Quote, Purchase',
  ];
  const location = useLocation();
  const query = queryString.parse(location.search);
  const licenseType = query['license-type'] ?? 0;
  const initialUserIndex = Number(query['price-index']) ?? 0;

  const [userIndex, setUserIndex] = useState(initialUserIndex);

  const [years, setYears] = React.useState('1');

  const [pricingPlans, setPricingPlans] = useState(basePricingPlans);
  const [selectedPlan, setSelectedPlan] = useState({
    id: licenseType,
  });
  const [userTiers, setUserTiers] = useState([]);
  const [pricingResponse, setPricingResponse] = useState({
    base: 0,
    base_price: 0,
    total_price: 0,
    discount_amt: 0,
    final_price: 0,
  });

  useEffect(() => {
    const updatePricingSettings = async () => {
      const response = await requestPricing();
      const newPricingPlans = pricingPlans.map((plan) => {
        return {
          ...plan,
          payment: {
            ...plan.payment,
            basePrice: response.data?.pricing?.[plan.id]?.base,
          },
        };
      });
      setUserTiers(response.data.users.tiers);
      setPricingPlans(newPricingPlans);
  
      const initialSelectedPlan = newPricingPlans.find(
        (plan) => plan.id === licenseType,
      );
  
      setSelectedPlan(initialSelectedPlan);
    }

    updatePricingSettings();
  }, []);

  useEffect(async () => {
    const data = {
      num_users: userIndex,
      license_years: years,
      license_type: selectedPlan.id,
    };
    const response = await requestPricing(data);

    setPricingResponse(response.data.pricing);
  }, [userIndex, years, selectedPlan.id]);

  if (!licenseType || !selectedPlan) {
    navigate('/pricing');
  }

  const handleYearChannge = (event) => {
    if (event.target.value === years) {
      setYears('1');
    } else {
      setYears(event.target.value);
    }
  };

  const [isRequestPending, setIsRequestPending] = useState(false);
  const [isResponseSuccessful, setIsResponseSuccessful] =
    useState(null);
  const [responseMessage, setResponseMessage] = useState(null);

  const [isRecaptchaVerified, setIsRecaptchaVerified] =
    useState(false);

  const handleVerifyRecaptcha = useCallback((value) => {
    setIsRecaptchaVerified(value);
  }, []);

  const sendGTMEvent = (type) => {
    const shortLicenseType = selectedPlan.id.slice(0, 3);
    window.dataLayer = window.dataLayer || [];
    if (type) {
      window.dataLayer.push({
        event: `${shortLicenseType}_quote_step_${
          activeStep + 1
        }_${type}`,
      });
    } else {
      window.dataLayer.push({
        event: `${shortLicenseType}_quote_step_${activeStep + 1}_OK`,
      });
    }
  };

  const handleChangeField = useCallback((name, value) => {
    setFieldData((currentFieldData) => ({
      ...currentFieldData,
      [name]: {
        ...currentFieldData[name],
        value: formatFieldValue(
          name,
          value,
          currentFieldData[name].value,
        ),
        ...validateField(name, value),
      },
    }));
  }, []);

  const isCustomerFieldDataValid = useMemo(() => {
    const { firstName, lastName, phone, email, jobTitle } = fieldData;
    return Object.values({
      firstName,
      lastName,
      phone,
      email,
      jobTitle,
    }).every((fieldDatum) => !!fieldDatum.isValid);
  }, [fieldData]);

  const isCompanyFieldDataValid = useMemo(() => {
    const {
      companyName,
      companyAddress,
      companyCity,
      companyCountry,
      companyZipCode,
      companyState,
    } = fieldData;
    return Object.values({
      companyName,
      companyAddress,
      companyCity,
      companyZipCode,
      companyCountry,
      companyState,
    }).every((fieldDatum) => !!fieldDatum.isValid);
    //  && emailsTo.length
  }, [fieldData]);

  const handleCustomerSubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!isCustomerFieldDataValid || !isRecaptchaVerified) {
        return;
      }
      const requestData = getRequestData(fieldData);

      const requestBody = {
        firstName: requestData.firstName,
        lastName: requestData.lastName,
        jobTitle: requestData.jobTitle,
        company: requestData.companyName,
        email: requestData.email,
        phone: `+${requestData.phone}`,
        notify: false,
        license: "disable",
      };
      try {
        setIsRequestPending(true);

        const result = await requestSignUp(requestBody);

        sendGTMEvent();
        setContactResponse(result.data);
        setIsResponseSuccessful(true);
        setActiveStep(1);
      } catch (error) {
        console.log(error.response);

        if(error.response.status === 409){
          sendGTMEvent();
          setContactResponse(error.response.data);
          setIsResponseSuccessful(true);
          setActiveStep(1);
        }

        setIsResponseSuccessful(false);
        error.response &&
          setResponseMessage(error.response.data.message);
        if (error.response.data?.data?.phone) {
          setFieldData((currentFieldData) => ({
            ...currentFieldData,
            phone: {
              ...currentFieldData.phone,
              lookType: 'error',
              message: {
                text: 'Our records show that you have already registered and evaluated Railflow.',
              },
            },
          }));
        }
      } finally {
        setIsRequestPending(false);
        setIsResponseSuccessful(null);
      }
    },
    [fieldData, isCustomerFieldDataValid, isRecaptchaVerified],
  );

  const handleCompanySubmit = useCallback(
    async (event) => {
      event.preventDefault();

      if (!isCompanyFieldDataValid || !isRecaptchaVerified) {
        return;
      }

      const requestData = getRequestData(fieldData);
      const requestBody = {
        account_id: contactResponse.data.account_id,
        company_name: requestData.companyName,
        address: requestData.companyAddress,
        city: requestData.companyCity,
        state: requestData.companyState,
        zipcode: requestData.companyZipCode,
        country: requestData.companyCountry,
        hiveage_contact_email: requestData.email,
        hiveage_fname: requestData.firstName,
        hivage_lname: requestData.lastName,
        //  hiveage_notification_emails: emailsTo,
      };
      try {
        setIsRequestPending(true);

        // TODO implemented company sign up step
        const result = await requestAccount(requestBody);

        sendGTMEvent();
        setAccountResponse(result.data);
        setIsResponseSuccessful(true);
        setActiveStep(2);
      } catch (error) {
        console.log(error);

        setIsResponseSuccessful(false);
        setResponseMessage(error.response.data.message);
      } finally {
        setIsRequestPending(false);
        setIsResponseSuccessful(null);
      }
    },
    [fieldData, isCompanyFieldDataValid, isRecaptchaVerified],
  );

  const handleSummarySubmit = useCallback(
    async (event) => {
      event.preventDefault();

      const requestBody = {
        account_id: contactResponse.data.account_id,
        contact_id: contactResponse.data.contact_id,
        num_users: userIndex,
        license_type: selectedPlan.id,
        license_years: years,
      };
      try {
        setIsRequestPending(true);

        const hiveageResult = await requestHiveage(requestBody);

        sendGTMEvent();
        setHiveageResponse(hiveageResult.data);
        setIsResponseSuccessful(true);
        setActiveStep(3);
      } catch (error) {
        console.log(error);

        setIsResponseSuccessful(false);
        error.response &&
          setResponseMessage(error.response.data.message);
      } finally {
        setIsRequestPending(false);
        setIsResponseSuccessful(null);
      }
    },
    [fieldData, contactResponse, years, userIndex],
  );
  const renderCustomerFields = () => {
    const showRecaptcha = process.env.GATSBY_RECAPTCHA_SITE_KEY;

    return (
      <form onSubmit={handleCustomerSubmit} autoComplete="off">
        <section className={cx('quoteForm_fieldContainer')}>
          {/* TODO: place form fields by mapping through array */}
          <div className={cx('quoteFormFieldGroup')}>
            <TextField
              type="text"
              name="firstName"
              label="First Name"
              placeholder="First Name"
              {...fieldData.firstName}
              onChange={handleChangeField}
              className={cx('quoteFormFieldGroup_item')}
            />
            <TextField
              type="text"
              name="lastName"
              label="Last Name"
              placeholder="Last Name"
              {...fieldData.lastName}
              onChange={handleChangeField}
              className={cx('quoteFormFieldGroup_item')}
            />
          </div>

          <TextField
            type="email"
            name="email"
            label="Email"
            placeholder="Email"
            {...fieldData.email}
            onChange={handleChangeField}
          />
          <div className={cx('quoteFormFieldGroup')}>
            <PhoneField
              name="phone"
              label="Phone"
              placeholder="Phone"
              {...fieldData.phone}
              onChange={handleChangeField}
              className={cx('quoteFormFieldGroup_item')}
            />
            <TextField
              type="text"
              name="jobTitle"
              label="Job Title"
              placeholder="Job Title"
              {...fieldData.jobTitle}
              onChange={handleChangeField}
              className={cx('quoteFormFieldGroup_item')}
            />
          </div>
          <TextField
            type="text"
            name="companyName"
            label="Company Name"
            placeholder="Company Name"
            {...fieldData.companyName}
            onChange={handleChangeField}
          />
          {showRecaptcha && (
            <section className={cx('signUpForm_recaptchaContainer')}>
              <ReCAPTCHA
                sitekey={process.env.GATSBY_RECAPTCHA_SITE_KEY}
                onChange={handleVerifyRecaptcha}
                theme="dark"
              />
            </section>
          )}
        </section>
        <section className={cx('quoteForm_buttonContainer')}>
          <div />
          <Button
            type="submit"
            className={cx('quoteForm_submit')}
            isDisabled={
              !isCustomerFieldDataValid || !isRecaptchaVerified
            }
          >
            Next
          </Button>
        </section>
      </form>
    );
  };

  const renderCompanyFields = () => {
    return (
      <form onSubmit={handleCompanySubmit} autoComplete="off">
        <section className={cx('quoteForm_fieldContainer')}>
          <TextField
            type="text"
            name="companyName"
            label="Company Name"
            placeholder="Name"
            {...fieldData.companyName}
            inputProps={{ disabled: true }}
          />
          <TextField
            type="text"
            name="companyAddress"
            label="Address"
            placeholder="Address"
            {...fieldData.companyAddress}
            onChange={handleChangeField}
          />
          <div className={cx('quoteFormFieldGroup')}>
            <TextField
              type="text"
              name="companyCity"
              label="City"
              placeholder="City"
              {...fieldData.companyCity}
              onChange={handleChangeField}
              className={cx('quoteFormFieldGroup_item')}
            />

            <TextField
              type="text"
              name="companyState"
              label="State / Province"
              placeholder="State / Province"
              {...fieldData.companyState}
              onChange={handleChangeField}
              className={cx('quoteFormFieldGroup_item')}
            />
          </div>
          <div className={cx('quoteFormFieldGroup')}>
            <TextField
              type="text"
              name="companyZipCode"
              label="Postal / Zip Code"
              placeholder="Postal / Zip Code"
              {...fieldData.companyZipCode}
              onChange={handleChangeField}
              className={cx('quoteFormFieldGroup_item')}
            />
            <SelectField
              name="companyCountry"
              label="Country"
              placeholder="Country"
              {...fieldData.companyCountry}
              onChange={handleChangeField}
              className={cx('quoteFormFieldGroup_item')}
            />
          </div>
          <div className={cx('quoteForm_license')}>
            <PricingUserSelect
              userIndex={userIndex}
              userTiers={userTiers}
              setUserIndex={setUserIndex}
            />
          </div>
          {/* <label className={cx('quoteForm_label')}>
            Email Quote PDF to:
          </label>
          <ReactMultiEmail
            className={cx('quoteForm_reactMultiEmail')}
            placeholder=""
            emails={emailsTo}
            onChange={(_emailsTo) => {
              setEmailsTo(_emailsTo);
            }}
            validateEmail={(email) => {
              return isEmail(email); // return boolean
            }}
            getLabel={(email, index, removeEmail) => {
              return (
                <div data-tag key={index}>
                  {email}
                  <span
                    data-tag-handle
                    onClick={() => removeEmail(index)}
                  >
                    ×
                  </span>
                </div>
              );
            }}
          /> */}
        </section>
        <section className={cx('quoteForm_buttonContainer')}>
          <Button
            onClick={() => setActiveStep(0)}
            className={cx('quoteForm_back')}
            inverse
          >
            Back
          </Button>
          <Button
            type="submit"
            className={cx('quoteForm_submit')}
            isDisabled={!isCompanyFieldDataValid}
          >
            Next
          </Button>
        </section>
      </form>
    );
  };

  const handleLicenseTypeChange = (e) => {
    const planId = e.target.value;
    const newSelectedPlan = pricingPlans.find(
      (plan) => plan.title === planId,
    );
    setSelectedPlan(newSelectedPlan);
  };

  const renderSummaryPage = () => {
    const renderYearsText = () => (
      <span>
        {years} Year{years > 1 && 's'}
      </span>
    );

    const isPerpetual = years === '0';
    const selectablePlans = pricingPlans.filter(
      (plan) => plan.showBuyNow,
    );

    return (
      <div className={cx('quoteForm_summary')}>
        <div className={cx('quoteForm_summaryRow')}>
          <span className={cx('quoteForm_summaryRow_title')}>
            License Type
          </span>
          <FormControl style={{ minWidth: 180 }}>
            <Select
              value={selectedPlan.title}
              defaultValue={selectedPlan.title}
              onChange={handleLicenseTypeChange}
            >
              {selectablePlans.map((plan) => (
                <MenuItem key={plan.id} value={plan.title}>
                  {plan.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={cx('quoteForm_summaryRow')}>
          <PricingUserSelect
            userIndex={userIndex}
            userTiers={userTiers}
            setUserIndex={setUserIndex}
            small
          />
        </div>

        <div
          className={cx(
            'quoteForm_summaryRow',
            'quoteForm_summaryRow_discountGroup',
          )}
        >
          <FormControl component="fieldset">
            <FormLabel>
              <span className={cx('quoteForm_summaryRow_title')}>
                Multi-Year Discount (Optional)
              </span>
            </FormLabel>
            <FormGroup
              className={cx('quoteForm_summaryRow_discountOptions')}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    checked={years === '2'}
                    onChange={handleYearChannge}
                    name="2"
                  />
                }
                label="2 Year License - 10% Discount"
                value={'2'}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={years === '3'}
                    onChange={handleYearChannge}
                    name="3"
                  />
                }
                label="3 Year License - 20% Discount"
                value={'3'}
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={years === '0'}
                    onChange={handleYearChannge}
                    name="0"
                  />
                }
                label="Perpetual License (never expiring)"
                value={'0'}
              />
            </FormGroup>
          </FormControl>
        </div>
        <div className={cx('quoteForm_summaryRow')}>
          <span className={cx('quoteForm_summaryRow_title')}>
            License Price{' '}
            {!isPerpetual && (
              <span>
                ($
                {pricingResponse.base_price} x {renderYearsText()})
              </span>
            )}
          </span>

          <span
            className={cx(
              'quoteForm_summaryRow_value',
              'quoteForm_summaryRow_basePrice',
            )}
          >
            {!isPerpetual ? (
              <span>
                {pricingResponse.total_price.toLocaleString()}{' '}
                {selectedPlan.payment.currency}
              </span>
            ) : (
              <span>N/A</span>
            )}
          </span>
        </div>
        <div className={cx('quoteForm_summaryRow')}>
          <span className={cx('quoteForm_summaryRow_title')}>
            Multi-Year Discount
          </span>
          <span
            className={cx(
              'quoteForm_summaryRow_value',
              'quoteForm_summaryRow_discountPrice',
            )}
          >
            {!isPerpetual ? (
              <span>
                -{' '}
                {pricingResponse.discount_amt?.toLocaleString() || 0}{' '}
                {selectedPlan.payment.currency}
              </span>
            ) : (
              <span>N/A</span>
            )}
          </span>
        </div>
        <div className={cx('quoteForm_summaryRow')}>
          <span className={cx('quoteForm_summaryRow_title')}>
            Total Price{' '}
            {!isPerpetual && <span>for {renderYearsText()}</span>}
          </span>
          <span
            className={cx(
              'quoteForm_summaryRow_value',
              'quoteForm_summaryRow_totalPrice',
            )}
          >
            {pricingResponse.final_price.toLocaleString()}{' '}
            {selectedPlan.payment.currency}
          </span>
        </div>
        <section className={cx('quoteForm_buttonContainer')}>
          <Button
            onClick={() => setActiveStep(1)}
            className={cx('quoteForm_back')}
            inverse
          >
            Back
          </Button>
          <Button
            type="submit"
            className={cx('quoteForm_submit')}
            onClick={handleSummarySubmit}
          >
            Submit
          </Button>
        </section>
      </div>
    );
  };

  const renderDownloadStep = () => {
    return (
      <div>
        <p className={cx('quoteForm_text')}>
          Thanks for your interest in purchasing Railflow. To make
          your buying process a breeze, we have generated a{' '}
          <a
            className={cx('quoteForm_link')}
            href={hiveageResponse?.quoteLink}
            rel="noopener noreferrer"
            target="_blank"
          >
            secure quote
          </a>{' '}
          and a{' '}
          <a
            className={cx('quoteForm_link')}
            href={hiveageResponse?.invoiceLink}
            rel="noopener noreferrer"
            target="_blank"
          >
            secure instant buy
          </a>{' '}
          links. These links have also been emailed to you.
        </p>
        <div className={cx('quoteForm_submitButtons')}>
          <a
            href={hiveageResponse?.quoteLink}
            rel="noopener noreferrer"
            target="_blank"
            className={cx('quoteForm_submitLink')}
          >
            <Button
              className={cx(
                'quoteForm_submit',
                'quoteForm_viewQuote',
              )}
              onClick={() => sendGTMEvent('quote')}
              inverse
            >
              <ProfileOutlined />
              View quote
            </Button>
          </a>
          <a
            href={hiveageResponse?.invoiceLink}
            rel="noopener noreferrer"
            target="_blank"
            className={cx('quoteForm_submitLink')}
          >
            <Button
              className={cx(
                'quoteForm_submit',
                'quoteForm_viewQuote',
              )}
              onClick={() => sendGTMEvent('invoice')}
            >
              <ShoppingCartOutlined />
              Buy now
            </Button>
          </a>
        </div>
      </div>
    );
  };
  return (
    // TODO: replace with common form component
    <div className={cx('quoteForm')}>
      <h2 className={cx('quoteForm_title')}>
        {'Railflow Quote & Purchase'}
      </h2>

      <Stepper
        activeStep={activeStep}
        alternativeLabel
        className={cx('quoteForm_stepper')}
      >
        {stepLabels.map((label, idx) => (
          <Step
            className={cx('quoteForm_step')}
            key={label}
            completed={activeStep > idx || activeStep === 3}
          >
            <StepLabel className={cx('quoteForm_stepperLabel')}>
              {label}
            </StepLabel>
          </Step>
        ))}
      </Stepper>
      <div className={cx('quoteForm_container')}>
        {!isRequestPending && isResponseSuccessful !== null && (
          <div
            className={cx('quoteForm_messageContainer', {
              [`quoteForm_messageContainer__${
                isResponseSuccessful ? 'success' : 'failure'
              }`]: true,
            })}
          >
            {responseMessage}
          </div>
        )}
        {isRequestPending && (
          <div className={cx('quoteForm_loadingContainer')}>
            <div className={cx('quoteForm_spinner')} />
            <div>Processing, please wait...</div>
          </div>
        )}

        {!isRequestPending &&
          isResponseSuccessful === null &&
          selectedPlan?.payment && (
            <>
              {activeStep === 0 && renderCustomerFields()}
              {activeStep === 1 && renderCompanyFields()}
              {activeStep === 2 && renderSummaryPage()}
              {activeStep === 3 && renderDownloadStep()}
            </>
          )}
      </div>
    </div>
  );
};

export default QuoteFrom;
