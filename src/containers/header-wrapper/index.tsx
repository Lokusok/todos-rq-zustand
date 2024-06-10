import Header from '@/components/header';
import Navigation from '@/components/navigation';
import ThemeToggler from '@/components/theme-toggler';

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
    <Header additionalItem={<ThemeToggler />}>
      <Navigation navItems={navItems} />
    </Header>
  );
}

export default HeaderWrapper;
