import style from './style.module.scss';
import { memo, useId, useMemo, useState } from 'react';

import clsx from 'clsx';
import { ChevronDown } from 'lucide-react';

export type TOption = {
  value: string;
  label: string;
};

type TProps = {
  options: TOption[];
  value: string;
  onChange: (value: string) => void;
};

function Select({ options, value, onChange }: TProps) {
  const [isOpen, setIsOpen] = useState(false);

  const activeOption = useMemo(
    () => options.find((option) => option.value === value),
    [value, options],
  );

  const dropdownId = useId();

  const callbacks = {
    toggleDropdown: () => setIsOpen(!isOpen),
    onValueChange: (value: string) => {
      onChange(value);
      setIsOpen(false);
    },
  };

  return (
    <div className={style.selectWrapper}>
      <button
        aria-expanded={isOpen}
        aria-controls={dropdownId}
        onClick={callbacks.toggleDropdown}
        className={style.selectHeader}
        data-testid="dropdown-header-btn"
      >
        <span className={style.selectActiveVal}>{activeOption?.label}</span>

        <ChevronDown size={16} className={style.selectIcon} />
      </button>

      <div
        id={dropdownId}
        className={clsx(style.selectDropdown, { [style.selectDropdownActive]: isOpen })}
        data-testid="dropdown-list"
      >
        <div className={style.selectList}>
          {options.map((option, index) => (
            <button
              onClick={() => callbacks.onValueChange(option.value)}
              key={option.value}
              className={clsx(style.selectListItem, {
                [style.active]: value === option!.value,
              })}
              data-testid={`dropdown-item-${index}`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(Select);
