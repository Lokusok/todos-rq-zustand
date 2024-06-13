import Header from '@/components/header';
import Navigation from '@/components/navigation';
import ThemeToggler from '@/components/theme-toggler';
import Tooltip from '@/components/tooltip';

import OptionsToggler from '../options-toggler';

const navItems = [
  {
    key: 'list_todos',
    label: 'Список дел',
    path: '/',
  },
  {
    key: 'create_todo',
    label: 'Создать задачу',
    path: '/create_todo',
  },
  {
    key: 'archive',
    label: 'Архив',
    path: '/archive',
  },
];

function HeaderWrapper() {
  return (
    <Header
      additionalItem={
        <div style={{ display: 'flex', columnGap: '25px' }}>
          <Tooltip title="Настройки">
            <OptionsToggler />
          </Tooltip>

          <Tooltip title="Переключить тему">
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
