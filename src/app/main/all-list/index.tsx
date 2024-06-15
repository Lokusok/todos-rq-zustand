import { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import TodosAllList from '@/containers/todos-all-list';

function AllListPage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('listTasksTitle')}</title>
      </Helmet>

      <TodosAllList />
    </>
  );
}

export default memo(AllListPage);
