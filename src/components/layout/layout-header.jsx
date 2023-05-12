import React, {
  useLayoutEffect,
  useState,
  useCallback,
  useRef,
} from 'react';
import { Link } from 'gatsby';
import classnames from 'classnames/bind';
import { useLocation, navigate } from '@reach/router';

import LayoutSectionContainer from './layout-section-container';
import LayoutHeaderLink from './layout-header-link';
import navigationLinks from '../../constants/navigation-links';
import scrollToSection from '../../utils/scroll-to-section';
import Button from '../button';
import CalendlyButton from '../calendly-button';

import logoImage from '../../assets/images/logo.png';
import BarsIcon from '../../assets/icons/bars.svg';
import * as styles from './layout.module.scss';

const cx = classnames.bind(styles);

const LayoutHeader = (props) => {
  const { openSidebar } = props;
  const location = useLocation();

  const headerRef = useRef();

  const [horizontalPadding, setHorizontalPadding] = useState(0);

  useLayoutEffect(() => {
    const { current: headerElement } = headerRef;

    if (typeof window === 'undefined' || !headerElement) {
      return;
    }

    const { paddingRight: padding } = window.getComputedStyle(
      headerElement,
    );
    const paddingSize = Number(padding.split('px')[0]);

    setHorizontalPadding(paddingSize);
  }, [headerRef]);

  const [activeHeaderLinkId, setActiveHeaderLinkId] = useState(null);

  // TODO: handle via pure css
  const handleMouseEnterHeaderLink = useCallback((id, event) => {
    setActiveHeaderLinkId(id);
  }, []);

  const handleMouseLeaveHeaderLink = useCallback(() => {
    setActiveHeaderLinkId(null);
  }, []);

  return (
    <header ref={headerRef} className={cx('layoutHeader')}>
      <LayoutSectionContainer>
        <div className={cx('layoutHeader_sectionContainer')}>
          <section className={cx('layoutHeader_section')}>
            <Link to="/" className={cx('layoutHeaderLogo')}>
              <img
                src={logoImage}
                alt="logo"
                className={cx('layoutHeaderLogo_image')}
              />
            </Link>
          </section>

          <section
            className={cx(
              'layoutHeader_section',
              'layoutHeader_left',
            )}
          >
            {navigationLinks.map((navigationLink) => {
              const onClick = () => {
                if (
                  navigationLink.mainRoute &&
                  navigationLink.mainRoute !== location.pathname
                )
                  navigate(navigationLink.mainRoute);
                else scrollToSection(navigationLink.sectionElementId);
              };
              const isActive =
                activeHeaderLinkId === null ||
                activeHeaderLinkId === navigationLink.id;
              const isDropdownOpen =
                activeHeaderLinkId === navigationLink.id;

              return (
                <LayoutHeaderLink
                  key={navigationLink.id}
                  {...navigationLink}
                  onClick={onClick}
                  onMouseEnter={handleMouseEnterHeaderLink}
                  onMouseLeave={handleMouseLeaveHeaderLink}
                  isActive={isActive}
                  isDropdownOpen={isDropdownOpen}
                  headerPadding={horizontalPadding}
                />
              );
            })}

            {/* <Button to="/auth/sign-in" inverse className={cx('layoutHeader_authButton')}>
              sign in
            </Button> */}
            <Button
              to="/register"
              className={cx('layoutHeaderButton')}
            >
              sign up
            </Button>
            <div className={cx('layoutHeaderButton')}>
              <CalendlyButton />
            </div>
            {/* INFO: open sidebar button */}
            <button
              onClick={openSidebar}
              type="button"
              className={cx('layoutHeaderOpenSidebar')}
            >
              <BarsIcon
                className={cx('layoutHeaderOpenSidebar_icon')}
              />
            </button>
          </section>
        </div>
      </LayoutSectionContainer>
    </header>
  );
};

export default LayoutHeader;
