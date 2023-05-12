import React from 'react';
import { GatsbySeo } from 'gatsby-plugin-next-seo';

import Layout from '../../components/layout';
// import ComingSoon from '../components/coming-soon';
import {
  DownloadPosts,
  // TODO: import remaining sections
} from '../../components/downloads-sections';
import seoConfig from '../../../seo.config';

const DownloadsPage = () => {
  return (
    <Layout>
      <GatsbySeo
        title='Railflow Downloads'
        description='Railflow Downloads for Jenkins, TeamCity, NPM, Docker, ReadyAPI, Katalon, TestProject, Postman, and Test Framework extensions for TestNG, Pytest, Nunit, xUnit, and MSTest'
      />
      <DownloadPosts />
    </Layout>
  );
};

export default DownloadsPage;
