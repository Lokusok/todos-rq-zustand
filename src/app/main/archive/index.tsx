import { memo } from 'react';
import { Helmet } from 'react-helmet-async';

import ArchiveWrapper from '@/containers/archive-wrapper';

function ArchivePage() {
  return (
    <>
      <Helmet>
        <title>Архив</title>
      </Helmet>

      <ArchiveWrapper />
    </>
  );
}

export default memo(ArchivePage);
