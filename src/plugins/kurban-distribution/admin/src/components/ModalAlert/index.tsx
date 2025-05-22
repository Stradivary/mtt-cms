import { Dialog, Button } from '@strapi/design-system';
import { WarningCircle, CheckCircle } from '@strapi/icons';
import React from 'react';

export interface AlertData {
  success?: boolean;
  title?: string;
  content?: string;
  actionText?: string;
  cancelText?: string;
  onConfirm?: () => void;
}

interface ModalAlertProps {
  showAlert: boolean;
  setShowAlert: (value: boolean) => void;
  alertData: AlertData;
}

const ModalAlertComponent: React.FC<ModalAlertProps> = ({ showAlert, setShowAlert, alertData }) => {
  const {
    success = true,
    title = '',
    content = '',
    actionText = 'OK',
    cancelText = '',
    onConfirm,
  } = alertData;

  const handleConfirm = () => {
    onConfirm?.();
    setShowAlert(false);
  };

  const handleCancel = () => {
    setShowAlert(false);
  };

  return (
    <Dialog.Root open={showAlert} onOpenChange={setShowAlert}>
      <Dialog.Content>
        <Dialog.Header>{title}</Dialog.Header>
        <Dialog.Body
          icon={success ? <CheckCircle fill="success600" /> : <WarningCircle fill="danger600" />}
        >
          {content}
        </Dialog.Body>
        <Dialog.Footer>
          {cancelText && <Dialog.Action>
            <Button fullWidth variant="secondary" onClick={handleCancel}>
              {cancelText}
            </Button>
          </Dialog.Action>}

          <Dialog.Action>
            <Button
              fullWidth
              variant={success ? 'success-light' : 'danger-light'}
              onClick={handleConfirm}
            >
              {actionText}
            </Button>
          </Dialog.Action>
        </Dialog.Footer>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default ModalAlertComponent;
