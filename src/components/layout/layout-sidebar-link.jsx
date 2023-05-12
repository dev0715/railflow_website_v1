import React, { useState, useCallback, useMemo } from 'react';
import { Link } from 'gatsby';
import classnames from 'classnames/bind';

import onEnterKeyDown from '../../utils/on-enter-key-down';
import SortIcon from '../../assets/icons/sort.svg';
import * as styles from './layout.module.scss';

const cx = classnames.bind(styles);

const LayoutSidebarLink = (props) => {
  const {
    label,
    to,
    isExternal,
    dropdownLinks,
    closeSidebar,
    onClick,
  } = props;

  const hasDropdown = useMemo(
    () => !!(dropdownLinks && dropdownLinks.length),
    [dropdownLinks],
  );

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleClick = useCallback(() => {
    // INFO: invoke `onClick` funciton received from props.
    if (typeof onClick === 'function') {
      onClick();
    }

    // INFO: if has dropdown, then toggle dropdown.
    if (hasDropdown) {
      setIsDropdownOpen(
        (currentIsDropdownOpen) => !currentIsDropdownOpen,
      );

      return;
    }

    if (typeof closeSidebar === 'function') {
      closeSidebar();
    }
  }, [onClick, hasDropdown, closeSidebar]);

  return (
    <div
      onClick={handleClick}
      onKeyDown={onEnterKeyDown(handleClick)}
      role="button"
      tabIndex="-1"
      className={cx('layoutSidebarLink')}
    >
      {to ? (
        isExternal ? (
          <a
            href={to}
            rel="noopener noreferrer"
            target="_blank"
            className={cx('layoutSidebarLink_label')}
          >
            {label}
          </a>
        ) : (
          <Link to={to} className={cx('layoutSidebarLink_label')}>
            {label}
          </Link>
        )
      ) : (
        <span className={cx('layoutSidebarLink_label')}>
          {label}
          {hasDropdown && (
            <SortIcon className={cx('layoutSidebarLink_icon')} />
          )}
        </span>
      )}

      {hasDropdown && (
        <div
          className={cx('layoutSidebarLinkDropdown', {
            layoutSidebarLinkDropdown__close: !isDropdownOpen,
          })}
        >
          {dropdownLinks.map((dropdownLink) => (
            <Link
              key={dropdownLink.id}
              to={dropdownLink.to}
              className={cx('layoutSidebarLinkDropdown_link')}
            >
              {dropdownLink.label}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

LayoutSidebarLink.defaultProps = {
  to: null,
  dropdown: [],
};

export default LayoutSidebarLink;
