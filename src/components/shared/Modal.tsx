import clsx from 'clsx';
import React, { forwardRef, useImperativeHandle, useRef } from 'react';

import type { ModalProps, ModalRef } from '@/types/ui.types';

const Modal = forwardRef<ModalRef, ModalProps>((props, ref) => {
  const { title, content, footer, backdrop = false, onClose, className = '' } = props;

  const dialogRef = useRef<HTMLDialogElement>(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      dialogRef.current?.showModal();
    },
    close: () => {
      dialogRef.current?.close();
      onClose?.();
    },
    toggle: () => {
      if (dialogRef.current?.open) {
        dialogRef.current.close();
        onClose?.();
      } else {
        dialogRef.current?.showModal();
      }
    },
  }));

  const modalClass = clsx(['modal', 'modal-bottom', 'sm:modal-middle', className]);

  return (
    <dialog ref={dialogRef} className={modalClass}>
      <div className="modal-box">
        <form method="dialog">
          {/* if there is a button in form, it will close the modal */}
          <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">✕</button>
        </form>
        {/* Title Section */}
        {title &&
          (typeof title === 'string' ? <h3 className="text-lg font-bold">{title}</h3> : title)}

        {/* Content Section */}
        {content && (typeof content === 'string' ? <p className="py-4">{content}</p> : content)}

        {/* Footer Section */}
        <div className="modal-action">
          {footer || (
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          )}
        </div>
      </div>

      {backdrop && (
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      )}
    </dialog>
  );
});

Modal.displayName = 'Modal';

export default Modal;
