import { decodeErrorMessage } from './axios.helper';
import { toast } from 'sonner';

const duration = 5000;

const notify = {
  succces: (title: string, message: string) => {
    toast.success(title, {
      className: 'bx-toast-success',
      description: message,
      richColors: true,
      duration,
    });
  },
  info: (title: string, message: string) => {
    toast.info(title, {
      className: 'bx-toast-info',
      description: message,
      richColors: true,
      duration,
    });
  },
  error: (title: string, message: string) => {
    toast.error(title, {
      className: 'bx-toast-error',
      description: message,
      richColors: true,
      duration,
    });
  },
  genericError: (title: string, error: any) => {
    const message = decodeErrorMessage(error);
    if (!!message) {
      toast.error(title, {
        className: 'bx-toast-error',
        description: message,
        richColors: true,
        duration,
      });
    }
  },
};

export default notify;
