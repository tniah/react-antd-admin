import store from '@/stores';
import { setGlobalState } from '@/stores/global.store';
import axios from 'axios';

const axiosClient = axios.create({
  timeout: 1000 * 5,
});

axiosClient.interceptors.request.use(
  config => {
    console.log('axiosClient.interceptors.request.use:', 'OK')
    store.dispatch(
      setGlobalState({
        loading: true,
      }),
    );
    return config;
  },
  error => {
    store.dispatch(
      setGlobalState({
        loading: false,
      }),
    );
    Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  config => {
    store.dispatch(
      setGlobalState({
        loading: false,
      }),
    );

    return config?.data;
  },
  error => {
    store.dispatch(
      setGlobalState({
        loading: false,
      }),
    );

    return error;
  },
);

export default axiosClient;
