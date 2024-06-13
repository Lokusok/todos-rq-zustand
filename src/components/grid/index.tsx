import style from './style.module.scss';
import { AnimatePresence, motion } from 'framer-motion';

import React, { memo } from 'react';

type TProps<T> = {
  data: T[];
  renderItem: (data: T) => React.ReactNode;
  keyExtractor?: (data: T) => any;
};

function Grid<T>({ data, renderItem, keyExtractor }: TProps<T>) {
  return (
    <div className={style.root}>
      <AnimatePresence initial={false}>
        {data.map((item, index) => (
          <React.Fragment key={keyExtractor?.(item) || index}>
            <motion.div
              key={keyExtractor?.(item)}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {renderItem(item)}
            </motion.div>
          </React.Fragment>
        ))}
      </AnimatePresence>
    </div>
  );
}

// memo - функция высшего порядка. TS ломается при её использовании, на место дженерика ставит unknown.
export default memo(Grid) as typeof Grid;
