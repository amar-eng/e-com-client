import { toast } from 'react-toastify';

export const notifySuccess = (message) => {
  toast.success(message, {
    position: 'top-center',
    autoClose: 5000,
    // icon: false,
    style: { fontSize: '0.9em' },
    theme: 'colored',
  });
};

export const notifyWarning = (message) => {
  toast.warn(message, {
    position: 'top-center',
    autoClose: 5000,
    icon: false,
    theme: 'colored',
    style: { fontSize: '0.9em' },
  });
};

export const notifyError = (message) =>
  toast.error(message, {
    position: 'top-center',
    autoClose: 5000,
    icon: false,
    style: { fontSize: '0.9em' },
    theme: 'colored',
  });
