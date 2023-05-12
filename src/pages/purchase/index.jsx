import React from 'react';
import classnames from 'classnames/bind';

import FormContainer from '../../components/form-container';

import Layout from '../../components/layout';
import QuoteFrom from '../../components/quote-form';
import QuoteHero from '../../components/quote-hero';
// import ComingSoon from '../components/coming-soon';
import * as styles from './purchase.module.scss';

const cx = classnames.bind(styles);
const GetQuotePage = () => {
  return (
    <Layout isHeaderPresent={false} isFooterPresent={false}>
      <div className={cx('purchaseWrapper')}>
        <QuoteHero />
        <FormContainer>
          <QuoteFrom />
        </FormContainer>
      </div>
    </Layout>
  );
};

export default GetQuotePage;
