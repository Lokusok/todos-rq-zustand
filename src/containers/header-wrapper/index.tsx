import Header from '@/components/header';
import Navigation from '@/components/navigation';
import ThemeToggler from '@/components/theme-toggler';
import Tooltip from '@/components/tooltip';

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
        <Tooltip title="Переключить тему">
          <ThemeToggler />
        </Tooltip>
      }
    >
      <Navigation navItems={navItems} />
    </Header>
  );
}

export default HeaderWrapper;
