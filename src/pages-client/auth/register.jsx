import React from 'react';
import { GatsbySeo } from 'gatsby-plugin-next-seo';

import Layout from '../../components/layout';
import FormContainer from '../../components/form-container';
import SignUpForm from '../../components/sign-up-form';
import SignUpHero from '../../components/sign-up-hero';
import classnames from 'classnames/bind';
import * as styles from './auth.module.scss';

const cx = classnames.bind(styles);

const Register = () => {
  return (
    <Layout isHeaderPresent={false} isFooterPresent={false}>
      <GatsbySeo
        title='Try Railflow for Free'
        description='Try Railflow free for 14 days. No credit card required. Get access to free enterprise support and improve your engineering and CICD efficiency. Register now!'
      />
      <div className={cx('signUpWrapper')}>
        <SignUpHero />
        <FormContainer>
          <SignUpForm />
        </FormContainer>
      </div>
    </Layout>
  );
};

export default Register;
