import { memo } from 'react';

import Modal from '@/components/modal';

type TProps = {
  onClose?: () => void;
};

function ChartsModal({ onClose }: TProps) {
  return (
    <Modal title="Графики" onClose={onClose}>
      <p>Charts content will be here</p>
    </Modal>
  );
}

export default memo(ChartsModal);
