import React from 'react';
import classnames from 'classnames/bind';

import { LayoutSectionContainer } from '../../layout';
import dashboardImage from '../../../assets/images/dashboard.png';
import * as styles from './hero.module.scss';

const cx = classnames.bind(styles);

const FeatureHero = ({ feature }) => {
  const { heroTitle, heroText } = feature;
  return (
    <section id="feature-hero" className={cx('featureHero')}>
      <LayoutSectionContainer>
        <div className={cx('featureHero_sectionContainer')}>
          <div className={cx('featureHero_section')}>
            <img
              className={cx('featureHero_image')}
              src={dashboardImage}
              alt="dashboard"
            />
          </div>
          <div className={cx('featureHero_section')}>
            <h1 className={cx('featureHero_title')}>{heroTitle}</h1>
            <p className={cx('featureHero_text')}>{heroText}</p>
          </div>
        </div>
      </LayoutSectionContainer>
    </section>
  );
};

export default FeatureHero;
