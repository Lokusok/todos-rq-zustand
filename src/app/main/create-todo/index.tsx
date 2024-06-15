import { memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';

import CreateTodoWrapper from '@/containers/create-todo-wrapper';

function CreateTodoPage() {
  const { t } = useTranslation();

  return (
    <>
      <Helmet>
        <title>{t('createTaskTitle')}</title>
      </Helmet>
      <CreateTodoWrapper />
    </>
  );
}

export default memo(CreateTodoPage);
