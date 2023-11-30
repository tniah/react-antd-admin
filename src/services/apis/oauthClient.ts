import type { CreateParams } from '@/interfaces/oauthClient';
import { axiosClient } from '@/services/client';

export const create = async (params: CreateParams) => {
  const resp = await axiosClient.post('/api/v1/oauthClients', params);
  return resp?.data;
};