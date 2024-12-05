'use client';

import { useRef } from 'react';

import Button from '@/components/shared/Button';
import Modal from '@/components/shared/Modal';
import type { ModalRef } from '@/types/ui.types';

import BearCounter from './BearCounter';

const BearCounterModal = () => {
  const modalRef = useRef<ModalRef>(null);

  return (
    <>
      <Button onClick={() => modalRef?.current?.toggle()}>open modal</Button>
      <Modal ref={modalRef} title="Bear Counter" content={<BearCounter />} backdrop />
    </>
  );
};

export default BearCounterModal;
