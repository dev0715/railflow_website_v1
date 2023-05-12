import React from 'react';
import { Link } from '@reach/router';
import classnames from 'classnames/bind';

import logoImage from '../../assets/images/logo.png';
// import LocationIcon from '../../assets/icons/location.svg';
// import EmailIcon from '../../assets/icons/email.svg';
// import PhoneIcon from '../../assets/icons/phone.svg';
import * as styles from './layout.module.scss';

const cx = classnames.bind(styles);

// // TODO: move to constant
// const footerLinkSections = [
//   {
//     id: 'about-railflow',
//     title: 'About Railflow',
//     links: [
//       { id: 'navigation_intro', label: 'Home', to: '/' },

//       { id: 'navigation_pricing', label: 'Pricing', to: '/pricing' },
//       {
//         id: 'navigation_about',
//         label: 'About',
//         to: '/about/company',
//       },
//       {
//         id: 'navigation_blog',
//         label: 'Blog',
//         to: 'https://blog.railflow.io/ ',
//         isExternal: true,
//       },
//     ],
//   },
//   {
//     id: 'useful-links',
//     title: 'Useful Links',
//     links: [
//       {
//         id: 'navigation_about',
//         label: 'Careers',
//         to: '/about/careers',
//       },
//       {
//         id: 'navigation_documentation',
//         label: 'Docs',
//         to: 'https://docs.railflow.io',
//         isExternal: true,
//       },
//       // {
//       //   id: 'navigation_forums',
//       //   label: 'Forums',
//       //   to: 'https://forums.railflow.io/ ',
//       //   isExternal: true,
//       // },
//       {
//         id: 'navigation_contact',
//         label: 'Contact Us',
//         to:
//           'https://railflow.atlassian.net/servicedesk/customer/portal/1 ',
//         isExternal: true,
//       },
//     ],
//   },
// ];

// // TODO: move to constant
// const footerAddressInfos = [
//   {
//     id: 'street',
//     icon: LocationIcon,
//     text: '3880 Braxton Street Chicago, il 60606 United States',
//   },
//   {
//     id: 'email',
//     icon: EmailIcon,
//     text: 'info@railflow.io',
//   },
//   {
//     id: 'phone',
//     icon: PhoneIcon,
//     text: '800-000-0000',
//   },
// ];

const LayoutFooter = () => {
  return (
    <footer className={cx('layoutFooter')}>
      <div className={cx('layoutFooterBody')}>
        <section className={cx('layoutFooterBody_section')}>
          <div className={cx('layoutFooterBodyBrand')}>
            <Link to="/" className={cx('layoutFooterBodyBrandLogo')}>
              <img
                src={logoImage}
                alt="logo"
                className={cx('layoutFooterBodyBrandLogo_image')}
              />
            </Link>
            {/*  <p className={cx('layoutFooterBodyBrand_text')}>
              We are a SaaS startup that's focused on simplifying user
              analytics.
            </p> */}
          </div>
        </section>
        {/*   {footerLinkSections.map((footerLinkSection) => (
          <section
            key={footerLinkSection.id}
            className={cx('layoutFooterBody_section')}
          >
            <div className={cx('layoutFooterBody_title')}>
              {footerLinkSection.title}
            </div>
            {footerLinkSection.links.map((link) => {
              return link.isExternal ? (
                <a
                  href={link.to}
                  rel="noopener noreferrer"
                  target="_blank"
                  className={cx('layoutFooterBody_link')}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  to={link.to}
                  className={cx('layoutFooterBody_link')}
                >
                  {link.label}
                </Link>
              );
            })}
          </section>
        ))}
        <section className={cx('layoutFooterBody_section')}>
          {footerAddressInfos.map(
            ({ icon: Icon, ...footerAddressInfo }) => (
              <div
                key={footerAddressInfo.id}
                className={cx('layoutFooterBodyAddressInfo')}
              >
                <Icon
                  className={cx('layoutFooterBodyAddressInfo_icon')}
                />
                <p className={cx('layoutFooterBodyAddressInfo_text')}>
                  {footerAddressInfo.text}
                </p>
              </div>
            ),
          )}
        </section>
      */}{' '}
      </div>
    </footer>
  );
};

export default LayoutFooter;
