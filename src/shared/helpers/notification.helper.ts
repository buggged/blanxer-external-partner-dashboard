import { showNotification } from '@mantine/notifications';
import { decodeErrorMessage } from './axios.helper';

const notify = {
  succces: (title: string, message: string) => {
    showNotification({
      title,
      message,
      color: 'green',
    });
  },
  info: (title: string, message: string) => {
    showNotification({
      title,
      message,
      color: 'blue',
    });
  },
  error: (title: string, message: string) => {
    showNotification({
      title,
      message,
      color: 'red',
    });
  },
  genericError: (title: string, error: any) => {
    const message = decodeErrorMessage(error);
    if (!!message) {
      showNotification({
        title,
        message,
        color: 'red',
      });
    }
  },
};

export default notify;
