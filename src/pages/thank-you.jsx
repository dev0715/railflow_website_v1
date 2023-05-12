import React from 'react';
import { GatsbySeo } from 'gatsby-plugin-next-seo';

import Layout from '../components/layout';
// import ComingSoon from '../components/coming-soon';
import {
  ThankYou,
  // TODO: import remaining sections
} from '../components/thank-you-sections';

const ThankYouPage = () => {
  return (
    <Layout>
      <ThankYou />
      {/* <GetStarted /> */}
      {/* <Steps /> */}
    </Layout>
  );
};

export default ThankYouPage;
