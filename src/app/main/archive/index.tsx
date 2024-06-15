import { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import ArchiveWrapper from '@/containers/archive-wrapper';

function ArchivePage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('archiveTitle')}</title>
      </Helmet>

      <ArchiveWrapper />
    </>
  );
}

export default memo(ArchivePage);
