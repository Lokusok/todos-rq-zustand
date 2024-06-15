import { memo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';

import PageLayout from '@/components/page-layout';
import HeaderWrapper from '@/containers/header-wrapper';

import { motion } from 'framer-motion';

function Main() {
  const location = useLocation();

  return (
    <PageLayout header={<HeaderWrapper />}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ ease: 'easeOut', duration: 0.6 }}
        key={location.pathname}
      >
        <Outlet />
      </motion.div>
    </PageLayout>
  );
}

export default memo(Main);
