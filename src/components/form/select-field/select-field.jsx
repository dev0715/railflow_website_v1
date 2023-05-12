import React, { useCallback, useMemo } from 'react';
import classnames from 'classnames/bind';

import generateUniqueIdentifier from '../../../utils/generate-unique-identifer';
import * as styles from './select-field.module.scss';

const cx = classnames.bind(styles);

const SelectField = (props) => {
  const {
    name,
    value,
    options,
    onChange,
    lookType,
    message,
    label,
    className,
  } = props;

  // INFO: for passing to label element's 'htmlFor' attribute
  const selectElementId = useMemo(
    () => generateUniqueIdentifier(),
    [],
  );

  const handleChange = useCallback(
    (event) => {
      event.persist();

      onChange(name, event.target.value);
    },
    [name, onChange],
  );

  return (
    <div
      className={cx('selectField', {
        [`selectField__${lookType}`]: true,
        [className]: true,
      })}
    >
      <label
        htmlFor={selectElementId}
        className={cx('selectField_label')}
      >
        {label}
      </label>

      <select
        value={value}
        onChange={handleChange}
        id={selectElementId}
        className={cx('selectFieldSelect', {
          [`selectField__${lookType}Select`]: true,
        })}
      >
        {options.map((option) => (
          <option
            key={option.id}
            value={option.value}
            className={cx('selectFieldSelect_item', {
              [`selectField__${lookType}Select_item`]: true,
            })}
          >
            {option.label}
          </option>
        ))}
      </select>

      <div
        className={cx('selectFieldMessage', {
          [`selectField__${lookType}Message`]: true,
        })}
      >
        <div
          className={cx('selectFieldMessage_text', {
            [`selectField__${lookType}Message_text`]: true,
          })}
        >
          {message.text}
        </div>
      </div>
    </div>
  );
};

SelectField.defaultProps = {
  label: '',
  placeholder: '',
};

export default SelectField;
