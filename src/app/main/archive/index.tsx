import { memo } from 'react';
import { Helmet } from 'react-helmet-async';

import Section from '@/components/section';

function ArchivePage() {
  return (
    <>
      <Helmet>
        <title>Архив</title>
      </Helmet>

      <Section.Root>
        <Section.Title>Архив</Section.Title>
      </Section.Root>
    </>
  );
}

export default memo(ArchivePage);
