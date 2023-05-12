import React from 'react';
import { GatsbySeo } from 'gatsby-plugin-next-seo';
import { DuplicateEvaluation } from '../components/duplicate-evaluation-sections';

import Layout from '../components/layout';
// import ComingSoon from '../components/coming-soon';

const DuplicateEvaluationPage = () => {
  return (
    <Layout>
      <DuplicateEvaluation />
    </Layout>
  );
};

export default DuplicateEvaluationPage;
