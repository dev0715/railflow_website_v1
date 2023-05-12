import React from 'react';
import { GatsbySeo } from 'gatsby-plugin-next-seo';
import { Router } from '@reach/router';

import Register from '../pages-client/auth/register';
import Index from '../pages-client/auth';
// import Layout from '../components/layout';
// import ComingSoon from '../components/coming-soon';

const AuthPage = () => {
  // return (
  //   <Layout>
  //     <ComingSoon />
  //   </Layout>
  // );

  return (

    <Router basepath="/">
      <Register path="/register" />
      {/* TODO: place other auth related page components */}

      {/* INFO: default auth route */}
      <Index path="/" />
    </Router>
    
  );
};

export default AuthPage;
