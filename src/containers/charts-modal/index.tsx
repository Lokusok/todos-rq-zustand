import { memo } from 'react';
import { useTranslation } from 'react-i18next';

import Modal from '@/components/modal';

import useTodos from '@/api/hooks/use-todos';

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import getTodoStatus from '@/utils/get-todo-status';

type TProps = {
  onClose?: () => void;
};

type TColorsKeys = 'expired' | 'archived' | 'completed' | 'in_process';

type TDataRow = {
  type: TColorsKeys;
  name: string;
  value: number;
};

const COLORS: Record<TColorsKeys, string> = {
  expired: '#FFBB28',
  archived: '#c42a00',
  completed: '#00C49F',
  in_process: '#b400c4',
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: Record<string, number>) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

function ChartsModal({ onClose }: TProps) {
  const todosQuery = useTodos();
  const { t } = useTranslation();

  if (todosQuery.isFetching) return null;

  const data: TDataRow[] = [
    {
      type: 'in_process',
      name: t('taskItemStatusesMultiple.inProcess'),
      value: Object.values(todosQuery.data?.list || []).filter(
        (todo) => getTodoStatus(todo) === 'in_process' && !(todo.id in todosQuery.data!.archive)
      ).length,
    },
    {
      type: 'completed',
      name: t('taskItemStatusesMultiple.completed'),
      value: Object.values(todosQuery.data?.list || []).filter(
        (todo) => getTodoStatus(todo) === 'completed'
      ).length,
    },
    {
      type: 'expired',
      name: t('taskItemStatusesMultiple.expired'),
      value: Object.values(todosQuery.data!.list).filter(
        (todo) => getTodoStatus(todo) === 'expired'
      ).length,
    },
    {
      type: 'archived',
      name: t('taskItemStatusesMultiple.archived'),
      value: Object.values(todosQuery.data?.archive || []).length,
    },
  ];
  const updatedData = data.filter((stat) => stat.value > 0);

  return (
    <Modal title={`${t('modals.chart.title')}:`} onClose={onClose}>
      <div style={{ height: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart width={400} height={400}>
            <RechartsTooltip content={({ payload }) => <div>{payload![0]?.name}</div>} />
            <Pie
              data={updatedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              isAnimationActive={false}
            >
              {updatedData.map((payload) => (
                <Cell key={`cell-${payload.name}`} fill={COLORS[payload.type]} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Modal>
  );
}

export default memo(ChartsModal);
