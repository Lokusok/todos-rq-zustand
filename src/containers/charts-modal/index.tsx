import { memo } from 'react';

import Modal from '@/components/modal';

import useTodos from '@/api/hooks/use-todos';

type TProps = {
  onClose?: () => void;
};

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import getTodoStatus from '@/utils/get-todo-status';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

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

  if (todosQuery.isFetching) return null;

  const data = [
    {
      name: 'Оставшиеся',
      value: Object.values(todosQuery.data?.list || []).filter(
        (todo) => getTodoStatus(todo) === 'in_process' && !(todo.id in todosQuery.data!.archive)
      ).length,
    },
    {
      name: 'Выполненные',
      value: Object.values(todosQuery.data?.list || []).filter(
        (todo) => getTodoStatus(todo) === 'completed'
      ).length,
    },
    {
      name: 'Истёкшие',
      value: Object.values(todosQuery.data!.list).filter(
        (todo) => getTodoStatus(todo) === 'expired'
      ).length,
    },
    { name: 'В архиве', value: Object.values(todosQuery.data?.archive || []).length },
  ];
  const updatedData = data.filter((stat) => stat.value > 0);

  return (
    <Modal title="Графики" onClose={onClose}>
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
              {updatedData.map((_, index) => (
                <>
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                </>
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </Modal>
  );
}

export default memo(ChartsModal);
