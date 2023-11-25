import { axiosClient } from '@/services/client';


export const apiLogin = async () => {
  const resp = await axiosClient.get('/api/v1/login');
  return resp?.data;
};