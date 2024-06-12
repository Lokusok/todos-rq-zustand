import style from './style.module.scss';

import React, { memo } from 'react';

type TProps<T> = {
  data: T[];
  renderItem: (data: T) => React.ReactNode;
  keyExtractor?: (data: T) => any;
};

function Grid<T>({ data, renderItem, keyExtractor }: TProps<T>) {
  return (
    <div className={style.root}>
      {data.map((item, index) => (
        <React.Fragment key={keyExtractor?.(item) || index}>{renderItem(item)}</React.Fragment>
      ))}
    </div>
  );
}

// memo - функция высшего порядка. TS ломается при её использовании, на место дженерика ставит unknown.
export default memo(Grid) as typeof Grid;
