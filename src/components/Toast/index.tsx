import { useEffect, useState } from 'react';
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';
import { MdOutlineError } from 'react-icons/md';

import { ToastMessage, useToast } from 'hooks/toast';

interface IToastContainerProps {
  message: ToastMessage;
}

const PlacementExample = ({ message }: IToastContainerProps) => {
  const [open, setOpen] = useState(false);

  const { removeToast } = useToast();

  useEffect(() => {
    message.visible && setOpen(true);
  }, [message.visible]);

  const closedToast = () => {
    setOpen(false);
    removeToast();
  };

  return (
    <ToastContainer className="p-3" position={'bottom-center'}>
      <Toast bg={message.type} show={open} onClose={() => closedToast()} delay={3000} autohide>
        <Toast.Header closeButton={false} style={message.type === 'danger' ? { color: '#f00' } : { color: '#4CD62B' }}>
          <MdOutlineError size={24} />
          <strong className="me-auto">{message.title}</strong>
        </Toast.Header>
        <Toast.Body style={{ color: '#fff' }}> {message.description && message.description}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default PlacementExample;
