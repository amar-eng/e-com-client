import { toast } from 'react-toastify';

export const notifySuccess = (message) => {
  toast.success(message, {
    autoClose: 5000,
    icon: true,
    theme: 'colored',
    progressClassName: 'toastify-progress-custom',
  });
};

export const notifyWarning = (message) => {
  toast.warn(message, {
    autoClose: 5000,
    icon: true,
    theme: 'colored',
    // progressClassName: 'toastify-progress-custom',
  });
};

export const notifyError = (message) =>
  toast.error(message, {
    autoClose: 5000,
    icon: true,
    theme: 'colored',
    // progressClassName: 'toastify-progress-custom',
  });
