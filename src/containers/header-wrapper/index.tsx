import { useTranslation } from 'react-i18next';

import Header from '@/components/header';
import Navigation from '@/components/navigation';
import ThemeToggler from '@/components/theme-toggler';
import Tooltip from '@/components/tooltip';

import OptionsToggler from '../options-toggler';

function HeaderWrapper() {
  const { t } = useTranslation();

  const navItems = [
    {
      key: 'list_todos',
      label: t('listTasksTitle'),
      path: '/',
    },
    {
      key: 'create_todo',
      label: t('createTaskTitle'),
      path: '/create_todo',
    },
    {
      key: 'archive',
      label: t('archiveTitle'),
      path: '/archive',
    },
  ];

  return (
    <Header
      additionalItem={
        <div style={{ display: 'flex', columnGap: '25px' }}>
          <Tooltip title={t('utils.tooltipSettings')}>
            <OptionsToggler />
          </Tooltip>

          <Tooltip title={t('utils.tooltipSwitchTheme')}>
            <ThemeToggler />
          </Tooltip>
        </div>
      }
    >
      <Navigation navItems={navItems} />
    </Header>
  );
}

export default HeaderWrapper;
