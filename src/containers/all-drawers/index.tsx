import React, { memo } from 'react';

import { useDrawersStore } from '@/store';
import { TDrawer } from '@/store/drawers/types';

import SettingsDrawer from '../settings-drawer';

import { AnimatePresence, motion } from 'framer-motion';

function AllDrawers() {
  const drawersStore = useDrawersStore();

  const drawerResolver = (drawer: TDrawer) => {
    switch (drawer.type) {
      case 'settings_right':
        return <SettingsDrawer onClose={drawer.close} />;
    }
  };

  return (
    <>
      <AnimatePresence>
        {drawersStore.list.map((drawer) => (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            key={drawer.id}
          >
            {drawerResolver(drawer)}
          </motion.div>
        ))}
      </AnimatePresence>
    </>
  );
}

export default memo(AllDrawers);
