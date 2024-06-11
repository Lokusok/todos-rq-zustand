import { memo } from 'react';
import { Outlet } from 'react-router-dom';

import PageLayout from '@/components/page-layout';
import HeaderWrapper from '@/containers/header-wrapper';

function Main() {
  return (
    <PageLayout header={<HeaderWrapper />}>
      <Outlet />
    </PageLayout>
  );
}

export default memo(Main);
