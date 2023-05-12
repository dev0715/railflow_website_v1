import React from 'react';
import classnames from 'classnames/bind';

import { LayoutSectionContainer } from '../../layout';
import Button from '../../button';
import { DownloadOutlined } from '@ant-design/icons';

import * as styles from './download-list-item.module.scss';

const cx = classnames.bind(styles);

const DownloadListItem = ({ download }) => {
  if (!download?.id) {
    return null;
  }

  return (
    <div className={cx('downloadListItem')}>
      <LayoutSectionContainer>
        <div className={cx('downloadListItem_sectionContainer')}>
          <img
            className={cx('downloadListItem_img')}
            src={download.image}
            alt={download.name}
          />
          <div className={cx('downloadListItem_section')}>
            <h1 className={cx('downloadListItem_title')}>
              {download.name}
            </h1>
            <ul className={cx('downloadListItem_desc')}>
              {download.features.map((feature, index) => (
                <li key={`download-feature-list-item-${index}`}>
                  {feature.text}
                </li>
              ))}
            </ul>
            <div className={cx('downloadListItem_buttons')}>
              {download.releaseNotesUrl && (
                <a
                  className={cx('downloadListItem_link')}
                  href={download.releaseNotesUrl}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Release notes
                </a>
              )}
              {download.hashes && (
                <a
                  className={cx('downloadListItem_link')}
                  href={download.downloadUrl + '.md5'}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  MD5
                </a>
              )}
              {download.hashes && (
                <a
                  className={cx('downloadListItem_link')}
                  href={download.downloadUrl + '.sha1'}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  SHA
                </a>
              )}
              <a
                href={download.downloadUrl}
                rel="noopener noreferrer"
                target="_blank"
              >
                <Button className={cx('downloadListItem_button')}>
                  <DownloadOutlined />
                  Download
                </Button>
              </a>
            </div>
          </div>
        </div>
      </LayoutSectionContainer>
    </div>
  );
};

export default DownloadListItem;
