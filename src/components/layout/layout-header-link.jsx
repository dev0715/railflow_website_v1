import React, {
  useLayoutEffect,
  useState,
  useCallback,
  useMemo,
  useRef,
} from 'react';
import { Link } from 'gatsby';
import classnames from 'classnames/bind';

import onEnterKeyDown from '../../utils/on-enter-key-down';
import SortIcon from '../../assets/icons/sort.svg';
import * as styles from './layout.module.scss';

const cx = classnames.bind(styles);

const LayoutHeaderLink = (props) => {
  const {
    id,
    label,
    to,
    isExternal,
    dropdownLinks,
    headerPadding,
    isActive,
    isDropdownOpen,
    onClick,
    onMouseEnter,
    onMouseLeave,
  } = props;

  const dropdownRef = useRef();

  const [overlapping, setOverlapping] = useState({
    left: 0,
    right: 0,
  });

  useLayoutEffect(() => {
    const { current: dropdownElement } = dropdownRef;

    if (typeof document === 'undefined' || !dropdownElement) {
      return;
    }

    const { left, right } = dropdownElement.getBoundingClientRect();
    const {
      documentElement: { clientWidth },
    } = document;

    // INFO: if the dropdown overlaps the screen from left.
    if (left < 0) {
      setOverlapping((currentOverlapping) => ({
        ...currentOverlapping,
        left,
      }));
    }

    // INFO: if the dropdown overlaps the screen from right.
    if (right >= clientWidth) {
      setOverlapping((currentOverlapping) => ({
        ...currentOverlapping,
        right: right - clientWidth,
      }));
    }
  }, [dropdownRef]);

  useLayoutEffect(() => {
    const { current: dropdownElement } = dropdownRef;

    if (typeof document === 'undefined' || !dropdownElement) {
      return;
    }

    // TODO: handle dropdown element position adjustment
    // for the case of overlapping the screen from the left side

    if (overlapping.right) {
      // INFO: translate the dropdown element on x origin by the sum of overlap size and header padding.
      dropdownElement.style.transform = `translate(${-(
        overlapping.right +
        headerPadding * 2
      )}px, 100%)`;
    }
  }, [dropdownRef, overlapping, headerPadding]);

  const hasDropdown = useMemo(
    () => !!(dropdownLinks && dropdownLinks.length),
    [dropdownLinks],
  );

  const handleMouseEnter = useCallback(
    (event) => {
      onMouseEnter(id, event);
    },
    [id, onMouseEnter],
  );

  return (
    <div
      onClick={onClick}
      role="link"
      tabIndex={id}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={onMouseLeave}
      onKeyDown={onEnterKeyDown}
      className={cx('layoutHeaderLink', {
        layoutHeaderLink__inactive: isActive === false,
      })}
    >
      {to ? (
        isExternal ? (
          <a
            href={to}
            rel="noopener noreferrer"
            target="_blank"
            className={cx('layoutHeaderLink_label')}
          >
            {label}
          </a>
        ) : (
          <Link to={to} className={cx('layoutHeaderLink_label')}>
            {label}
          </Link>
        )
      ) : (
        <span className={cx('layoutHeaderLink_label')}>{label}</span>
      )}

      {hasDropdown && (
        <>
          <SortIcon className={cx('layoutHeaderLink_icon')} />

          <div
            ref={dropdownRef}
            className={cx('layoutHeaderLinkDropdown', {
              layoutHeaderLinkDropdown__hidden: !isDropdownOpen,
            })}
          >
            {dropdownLinks.map((dropdownLink) => {
              return dropdownLink.isExternal ? (
                <a
                  rel="noopener noreferrer"
                  target="_blank"
                  key={dropdownLink.id}
                  href={dropdownLink.to}
                  className={cx('layoutHeaderLinkDropdown_link')}
                >
                  {dropdownLink.label}
                </a>
              ) : (
                <Link
                  key={dropdownLink.id}
                  to={dropdownLink.to}
                  className={cx('layoutHeaderLinkDropdown_link')}
                >
                  {dropdownLink.label}
                </Link>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

LayoutHeaderLink.defaultProps = {
  to: null,
  dropdown: [],
  headerPadding: 0,
};

export default LayoutHeaderLink;
