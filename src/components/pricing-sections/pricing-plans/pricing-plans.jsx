/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState } from 'react';
import classnames from 'classnames/bind';

import { LayoutSectionContainer } from '../../layout';
import Button from '../../button';
import CheckIcon from '../../../assets/icons/check_blue.svg';
import CrossIcon from '../../../assets/icons/cross_grey.svg';
import * as styles from './pricing-plans.module.scss';
import PricingUserSelect from '../pricing-user-select';
import { basePricingPlans } from '../../quote-form/constants';
import { requestPricing } from '../../../api';
import { useEffect } from 'react';

const cx = classnames.bind(styles);

const PricingPlans = () => {
  const [userIndex, setUserIndex] = useState(0);

  const [pricingPlans, setPricingPlans] = useState(basePricingPlans);

  const [userTiers, setUserTiers] = useState([]);
  useEffect(() => {
    const updatePricingSettings = async () => {
    const pricingResponse = await requestPricing();
    const newPricingPlans = pricingPlans.map((plan) => {
      return {
        ...plan,
        payment: {
          ...plan.payment,
          basePrice: pricingResponse.data?.pricing?.[plan.id]?.base,
        },
      };
    });
    setUserTiers(pricingResponse.data.users.tiers);
    setPricingPlans(newPricingPlans);
  }
  
  updatePricingSettings();
  }, []);

  return (
    <section id="pricing" className={cx('pricing')}>
      <LayoutSectionContainer>
        <h1 className={cx('pricing_title')}>Plans & Pricing</h1>
        <p className={cx('pricing_subtitle')}>
          Simple, affordable and transparent pricing. Don't ever talk
          to a sales guy{' '}
          <span
            className={cx('pricing_emoji')}
            role="img"
            aria-label="party-emoji"
          >
            🥳
          </span>
        </p>

        <div className={cx('pricing_planSection')}>
          <div className={cx('pricing_userSelect')}>
            <PricingUserSelect
              userIndex={userIndex}
              userTiers={userTiers}
              setUserIndex={setUserIndex}
            />
          </div>
        </div>
        <div className={cx('pricing_planContainer')}>
          {pricingPlans.map((plan) => (
            <div
              key={plan.id}
              className={cx('pricingPlan', {
                pricingPlan__popular: !!plan.isPopular,
              })}
            >
              <h2 className={cx('pricingPlan_title')}>
                {plan.title}
              </h2>

              <div className={cx('pricingPlanPayment')}>
                {plan.isCustom ? (
                  <div className={cx('pricingPlanPayment_price')}>
                    Contact us for detailed discussion
                  </div>
                ) : (
                  <div>
                    <div className={cx('pricingPlanPayment_price')}>
                      <sup
                        className={cx('pricingPlanPayment_currency')}
                      ></sup>
                      <span
                        className={cx('pricingPlanPayment_amount')}
                      >
                        {plan.payment.basePrice ? (
                          '$' +
                          (
                            plan.payment.basePrice +
                            plan.payment.per20Users * userIndex
                          ).toLocaleString() +
                          '/ Year'
                        ) : (
                          <div className={'spinner'}></div>
                        )}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <ul className={cx('pricingPlan_featureContainer')}>
                {plan.features.map((planFeature, i) => (
                  <li
                    key={planFeature.id + i}
                    className={cx('pricingPlanFeature', {
                      pricingPlanFeature__unavailable: !planFeature.isAvailable,
                    })}
                  >
                    {planFeature.isAvailable ? (
                      <CheckIcon
                        className={cx('pricingPlanFeature_icon')}
                      />
                    ) : (
                      <CrossIcon
                        className={cx('pricingPlanFeature_icon')}
                      />
                    )}

                    {planFeature.label}
                  </li>
                ))}
              </ul>

              {plan.isCustom && (
                <div className={cx('pricingPlanQuoteButton')}>
                  <a href="https://railflow.io/contact">
                    <Button
                      className={cx('pricingPlanButton')}
                      inverse
                    >
                      Contact Support
                    </Button>
                  </a>
                </div>
              )}
              {!plan.isCustom && (
                <div className={cx('pricingPlanQuoteButton')}>
                  <Button
                    to={`/purchase?price-index=${userIndex}&license-type=${plan.id}`}
                    className={cx('pricingPlanButton')}
                    inverse={!plan.isPopular}
                  >
                    Instant Quote
                  </Button>
                </div>
              )}
            </div>
          ))}
        </div>
      </LayoutSectionContainer>
    </section>
  );
};

export default PricingPlans;
