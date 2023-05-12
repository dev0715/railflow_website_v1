import React from 'react';
import classnames from 'classnames/bind';

import LayoutSidebarLink from './layout-sidebar-link';
import CalendlyButton from '../calendly-button';
import Button from '../button';
import navigationLinks from '../../constants/navigation-links';
import scrollToSection from '../../utils/scroll-to-section';
import ArrowRightIcon from '../../assets/icons/arrow_right.svg';
import * as styles from './layout.module.scss';

const cx = classnames.bind(styles);

const LayoutSidebar = (props) => {
  const { isOpen, closeSidebar } = props;

  return (
    <aside
      className={cx('layoutSidebar', {
        layoutSidebar__close: !isOpen,
      })}
    >
      <section className={cx('layoutSidebar_section')}>
        {/* INFO: close sidebar button */}
        <button
          onClick={closeSidebar}
          type="button"
          className={cx('layoutSidebarClose')}
        >
          <ArrowRightIcon className={cx('layoutSidebarClose_icon')} />
        </button>
      </section>

      <section className={cx('layoutSidebar_section')}>
        {navigationLinks.map((navigationLink) => {
          const onClick = () =>
            scrollToSection(navigationLink.sectionElementId);

          return (
            <LayoutSidebarLink
              key={navigationLink.id}
              {...navigationLink}
              onClick={onClick}
              closeSidebar={closeSidebar}
            />
          );
        })}
      </section>

      <section className={cx('layoutSidebar_section')}>
        {/* <Button to="/auth/sign-in" inverse className={cx('layoutSidebarButton')}>
          sign in
        </Button> */}
        <Button to="/register" className={cx('layoutSidebarButton')}>
          sign up
        </Button>
      </section>
      <section className={cx('layoutSidebar_section')}>
        <CalendlyButton />
      </section>
    </aside>
  );
};

export default LayoutSidebar;
