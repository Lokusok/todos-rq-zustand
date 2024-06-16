import { memo } from 'react';
import Skeleton from 'react-loading-skeleton';

import Grid from '..';

type TProps = {
  elemsCount: number;
};

function GridSkeleton({ elemsCount }: TProps) {
  return (
    <Grid
      data={new Array(elemsCount).fill(null)}
      renderItem={() => <Skeleton style={{ zIndex: -1 }} height={250} />}
    />
  );
}

export default memo(GridSkeleton);
