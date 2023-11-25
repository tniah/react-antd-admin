import { Response } from '@/interfaces/apiResponse.interface';
import Mock from 'mockjs';

Mock.setup({
  timeout: 300,
});


export function interceptor<T>(data: T): Response<T>;

export function interceptor(data: any) {
  return {
    code: 'ADMIN_0',
    message: 'OK',
    data: data,
  };
}


export const mock = Mock;