import React, { memo } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import Toast from '@/components/toast';

import { useToastsStore } from '@/store';
import { TToast } from '@/store/toasts/types';

function AllToasts() {
  const toastsStore = useToastsStore();

  const toastsResolver = (toast: TToast) => {
    switch (toast.type) {
      case 'error': {
        return (
          <Toast
            status="error"
            title={toast.title}
            descr={toast.descr}
            timeout={toast.timeout}
            closeCb={toast.close}
          />
        );
      }
      case 'info': {
        return (
          <Toast
            status="info"
            title={toast.title}
            descr={toast.descr}
            timeout={toast.timeout}
            closeCb={toast.close}
          />
        );
      }
      case 'success': {
        return (
          <Toast
            status="success"
            title={toast.title}
            descr={toast.descr}
            timeout={toast.timeout}
            closeCb={toast.close}
          />
        );
      }
    }
  };

  return (
    <>
      <div
        style={{
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          rowGap: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: '20px',
        }}
      >
        <AnimatePresence>
          {toastsStore.list.map((toast) => (
            <React.Fragment key={toast.id}>
              <motion.div
                key={toast.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
              >
                {toastsResolver(toast)}
              </motion.div>
            </React.Fragment>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
}

export default memo(AllToasts);
