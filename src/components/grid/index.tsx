import style from './style.module.scss';

import React, { memo } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

type TProps<T> = {
  data: T[];
  renderItem: (data: T) => React.ReactNode;
  keyExtractor?: (data: T) => any;
};

function Grid<T>({ data, renderItem, keyExtractor }: TProps<T>) {
  return (
    <div className={style.grid}>
      <AnimatePresence initial={false} mode={'popLayout'}>
        {data.map((item, index) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={keyExtractor?.(item) || index}
          >
            {renderItem(item)}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// memo - функция высшего порядка. TS ломается при её использовании, на место дженерика ставит unknown.
export default memo(Grid) as typeof Grid;
