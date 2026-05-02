'use client';

import { useRef, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import type { ComponentProps } from 'react';

type ButtonProps = ComponentProps<typeof Button>;

interface ConfirmButtonProps extends Omit<ButtonProps, 'type' | 'onClick'> {
  confirmTitle: string;
  confirmMessage: string;
  confirmLabel?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formAction?: (formData: FormData) => Promise<any>;
}

export default function ConfirmButton({
  confirmTitle,
  confirmMessage,
  confirmLabel = 'Confirm',
  formAction,
  children,
  variant,
  ...rest
}: ConfirmButtonProps) {
  const [show, setShow] = useState(false);
  const submitRef = useRef<HTMLButtonElement>(null);

  const handleConfirm = () => {
    setShow(false);
    const btn = submitRef.current;
    if (!btn) return;
    const form = btn.closest('form') as HTMLFormElement | null;
    form?.requestSubmit(btn);
  };

  return (
    <>
      <Button {...rest} variant={variant} type="button" onClick={() => setShow(true)}>
        {children}
      </Button>

      <button
        ref={submitRef}
        type="submit"
        style={{ display: 'none' }}
        formAction={formAction}
      />

      <Modal show={show} onHide={() => setShow(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>{confirmTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{confirmMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShow(false)}>
            Cancel
          </Button>
          <Button variant={variant ?? 'primary'} onClick={handleConfirm}>
            {confirmLabel}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
