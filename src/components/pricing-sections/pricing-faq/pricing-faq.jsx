import React from 'react';
import classnames from 'classnames/bind';
import { withStyles } from '@material-ui/core/styles';

import MuiAccordion from '@material-ui/core/Accordion';
import MuiAccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import { LayoutSectionContainer } from '../../layout';
import * as styles from './pricing-faq.module.scss';

const cx = classnames.bind(styles);

const Accordion = withStyles({
  root: {
    border: '1px solid rgba(0, 0, 0, .125)',
    boxShadow: 'none',
    '&:not(:last-child)': {
      borderBottom: 0,
    },
    '&:before': {
      display: 'none',
    },
    '&$expanded': {
      margin: 'auto',
    },
  },
  expanded: {},
})(MuiAccordion);

const AccordionSummary = withStyles({
  root: {
    backgroundColor: 'rgba(0, 0, 0, .03)',
    borderBottom: '1px solid rgba(0, 0, 0, .125)',
    marginBottom: -1,
    minHeight: 56,
    '&$expanded': {
      minHeight: 56,
    },
  },
  content: {
    '&$expanded': {
      margin: '12px 0',
    },
  },
  expanded: {},
})(MuiAccordionSummary);
const frequentlyAskedQuestions = [
  {
    question: 'How many licenses do I need?',
    answer:
      'Railflow pricing is based on the number of your TestRail Licenses and offered in increments of 20 users.',
  },
  {
    question: 'Does Railflow accept purchase orders?',
    answer:
      "Yes, besides accepting Master Card and VISA and wire transfers, you can also pay via your company's usual procurement process and send us an official purchaes order document. We typcially do NET 45 days to accomodate your purchase order payment terms.",
  },
  {
    question: 'Can I extened my evaluation license?',
    answer:
      'Absolutely. There is no pressure to buy and no sales person will ever call your phone or hide pricing details from your team. We want you to be 100% satisfied with your evaluation before you become a valued customer. If that means, you need to extend you evaluation, simply reach out to our sales team and we will gladly extend your license.',
  },
  {
    question: 'Do you work with software resellers?',
    answer:
      "We work with a host of software resellers across the globe to help work with company's designated resellers. We don't offer any reseller discounts.",
  },
  {
    question: 'What version of TestRail is Railflow comptable with?',
    answer:
      "Railflow works with all versions of TestRail 6.x and 7.x. As new new versions of TestRail are released, we test the full functionality in our testing labs through rigorous automated testings. If you run into any issues or believe you have encountered a bug, please contact our support team and we will get on it right away. ",
  },
  {
    question: "I registered online and haven't received my license?",
    answer:
      "Once you register online using your corporate email address, it takes about 6-12 hours for our team to send you a welcome email with an evaluation license. If you haven't received this email and have checked your spam folder, please contact our support team and we can sort this out.",
  },
];

const PricingFaq = () => {
  return (
    <section id="feature-list" className={cx('pricingFaq')}>
      <LayoutSectionContainer>
        <h1 className={cx('pricingFaq_topTitle')}>
          Frequently Asked Questions
        </h1>
        <div className={cx('pricingFaq_sectionContainer')}>
          {frequentlyAskedQuestions.map((faq, idx) => (
            <div
              key={idx}
              className={cx('pricingFaq', 'pricingFaq_section')}
            >
              <Accordion square={true}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <p className={cx('pricingFaq_question')}>
                    {faq.question}
                  </p>
                </AccordionSummary>
                <AccordionDetails>
                  <p className={cx('pricingFaq_answer')}>
                    {faq.answer}
                  </p>
                </AccordionDetails>
              </Accordion>
            </div>
          ))}
        </div>
      </LayoutSectionContainer>
    </section>
  );
};

export default PricingFaq;
