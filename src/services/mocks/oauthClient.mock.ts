import { mock, interceptor } from '@/services/mocks/config';

interface LoginResult {
  username: string;
  tenantId: string;
  avatarUrl?: string;
}

mock.mock('/api/v1/oauthClients', 'post', (config: any) => {
  const body: LoginResult = JSON.parse(config?.body);

  return interceptor<LoginResult>({
    username: body?.username || 'makai',
    tenantId: 'master',
    avatarUrl: 'https://avatarfiles.alphacoders.com/929/92999.jpg',
  });
});