import { memo } from 'react';

import ChartsModal from '../charts-modal';

import { useModalsStore } from '@/store/modals';
import { TModal } from '@/store/modals/types';

import { AnimatePresence, motion } from 'framer-motion';

function AllModals() {
  const modalsStore = useModalsStore();

  const modalResolver = (modal: TModal) => {
    switch (modal.type) {
      case 'charts':
        return <ChartsModal onClose={modal.close} />;
    }
  };

  return (
    <>
      <AnimatePresence>
        {modalsStore.list.map((modal) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={modal.id}
          >
            {modalResolver(modal)}
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}

export default memo(AllModals);
