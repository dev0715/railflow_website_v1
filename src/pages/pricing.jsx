import React from 'react';
import { GatsbySeo } from 'gatsby-plugin-next-seo';
import Layout from '../components/layout';
// import ComingSoon from '../components/coming-soon';
import {
  PricingPlans,
  PricingFaq,
  // TODO: import remaining sections
} from '../components/pricing-sections';

const PricingPage = () => {
  return (
    <Layout>
      <GatsbySeo
        title='Railflow License Pricing'
        description='Railflow pricing is tied to your TestRail user license in increments of 20 users. Railflow license offers multi-year and perpetual license discounts and offers a variety of license options for your organization.'
      />
      <PricingPlans />
      <PricingFaq />
    </Layout>
  );
};

export default PricingPage;
