type TTodo = {
  id: string;
  title: string;
  descr: string;
  startTime: string;
  endTime: string;
  status: 'in_process' | 'completed' | 'expired';
  order: number;
};
