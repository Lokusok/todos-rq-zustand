import React, { memo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useTranslation } from 'react-i18next';
import { BrowserRouter } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import Section from '@/components/section';
import PageLayout from '@/components/page-layout';
import HeaderWrapper from '@/containers/header-wrapper';

import ErrorAnimReset from '@/components/error-anim-reset';

type TErrorComponentProps = {
  resetErrorBoundary: () => void;
};

function ErrorComponent({ resetErrorBoundary }: TErrorComponentProps) {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('errorPage.title')}</title>
      </Helmet>

      <PageLayout
        header={
          <BrowserRouter>
            <HeaderWrapper />
          </BrowserRouter>
        }
      >
        <Section.Root>
          <Section.Title centered>{t('errorPage.title')}</Section.Title>

          <Section.Content>
            <ErrorAnimReset t={t} onErrorReset={resetErrorBoundary} />
          </Section.Content>
        </Section.Root>
      </PageLayout>
    </>
  );
}

type TErrorLayoutProps = {
  children: React.ReactNode;
};

function ErrorLayout({ children }: TErrorLayoutProps) {
  return <ErrorBoundary FallbackComponent={ErrorComponent}>{children}</ErrorBoundary>;
}

export default memo(ErrorLayout);
