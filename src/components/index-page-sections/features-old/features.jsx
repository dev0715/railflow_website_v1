import React from 'react';
import classnames from 'classnames/bind';

import { LayoutSectionContainer } from '../../layout';
import ResponsiveIcon from '../../../assets/icons/feature_responsive.svg';
import CodeIcon from '../../../assets/icons/feature_code.svg';
import DesignIcon from '../../../assets/icons/feature_design.svg';
import BrowserIcon from '../../../assets/icons/feature_browser.svg';
import InteractionIcon from '../../../assets/icons/feature_interaction.svg';
import CustomizeIcon from '../../../assets/icons/feature_customize.svg';
import * as styles from './features.module.scss';

const cx = classnames.bind(styles);

// TODO: move to constant
const features = [
  {
    id: 'responsive',
    title: 'Fully Responsive',
    icon: ResponsiveIcon,
    description:
      'All our themes are fully responsive. So, your website looks good on any device',
  },
  {
    id: 'code',
    title: 'Clean Code',
    icon: CodeIcon,
    description:
      'All our themes are fully responsive. So, your website looks good on any device',
  },
  {
    id: 'design',
    title: 'Professional Design',
    icon: DesignIcon,
    description:
      'All our themes are fully responsive. So, your website looks good on any device',
  },
  {
    id: 'browser',
    title: 'Browser compatibility',
    icon: BrowserIcon,
    description:
      'All our themes are fully responsive. So, your website looks good on any device',
  },
  {
    id: 'interaction',
    title: 'Smooth interactions',
    icon: InteractionIcon,
    description:
      'All our themes are fully responsive. So, your website looks good on any device',
  },
  {
    id: 'customize',
    title: 'Easy To Customize',
    icon: CustomizeIcon,
    description:
      'All our themes are fully responsive. So, your website looks good on any device',
  },
];

const Features = () => {
  return (
    <section id="features" className={cx('features')}>
      <h1 className={cx('features_title')}>
        The only analytics tool you'll ever need
      </h1>

      <LayoutSectionContainer>
        <div className={cx('featuresGrid')}>
          {features.map(({ icon: Icon, ...feature }) => (
            <div
              key={feature.id}
              className={cx('featuresGridFeature')}
            >
              <Icon className={cx('featuresGridFeature_icon')} />
              <h2 className={cx('featuresGridFeature_title')}>
                {feature.title}
              </h2>
              <p className={cx('featuresGridFeature_description')}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </LayoutSectionContainer>
    </section>
  );
};

export default Features;
