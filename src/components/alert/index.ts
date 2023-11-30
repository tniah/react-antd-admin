import { notification } from 'antd';

const success = (message: string) => {
  notification.success({
    message,
    duration: 3,
    role: 'status',
  });
};

const error = (message: string) => {
  notification.error({
    message,
    duration: 3,
    role: 'status',
  });
};

export default {
  success,
  error,
};