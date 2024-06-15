import { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import Section from '@/components/section';

import { default as NotFoundComponent } from '@/components/not-found';

function NotFound() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('notFound.title')}</title>
      </Helmet>

      <Section.Root>
        <Section.Title centered>{t('notFound.title')}</Section.Title>

        <Section.Content>
          <NotFoundComponent t={t} goToHref="/" />
        </Section.Content>
      </Section.Root>
    </>
  );
}

export default memo(NotFound);
