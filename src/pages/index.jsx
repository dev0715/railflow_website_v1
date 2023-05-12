import React from 'react';
import { GatsbySeo } from 'gatsby-plugin-next-seo';

import Layout from '../components/layout';
// import ComingSoon from '../components/coming-soon';
import {
  Hero,
  Features,
  Platforms,
  // TODO: import remaining sections
} from '../components/index-page-sections';
import CookieConsent from 'react-cookie-consent';

import seoConfig from '../../seo.config';

const IndexPage = () => {
  // return (
  //   <Layout>
  //     <ComingSoon />
  //   </Layout>
  // );

  return (
    <Layout>
      <GatsbySeo
        title={seoConfig.index_page.title}
        description={seoConfig.index_page.description}
      />
      <Hero />
      <Features />
      <Platforms />
      {/* <Testimonials /> */}
      <CookieConsent
        location="bottom"
        buttonText="Got it"
        cookieName="privacy-accepted"
        style={{
          background: '#20222b',
          maxWidth: 700,
          fontFamily: 'Space Grotesk',
          display: 'flex',
          alignItems: 'center',
          padding: 20,
          lineHeight: 1.8,
          margin: 8,
        }}
        buttonStyle={{
          color: 'white',
          background: '#303fe1',
          fontSize: 16,
          paddingLeft: 16,
          paddingRight: 16,
          paddingTop: 10,
          paddingBottom: 10,
          borderRadius: 4,
          fontWeight: 'bold',
        }}
        expires={150}
      >
        We use cookies to give you the best experience possible. By
        continuing browsing our website, you agree with our{' '}
        <a
          rel="noopener noreferrer"
          target="_blank"
          href="/privacy"
          style={{ color: 'white' }}
        >
          Privacy Policy
        </a>
        .
      </CookieConsent>
    </Layout>
  );
};

export default IndexPage;
