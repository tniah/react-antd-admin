export default {
  TOKEN_ENDPOINT_AUTH_METHODS: [
    {
      value: 'none',
      label: 'None',
    },
    {
      value: 'client_secret_post',
      label: 'Client secret post',
    },
    {
      value: 'client_secret_basic',
      label: 'Client secret basic',
    },
  ],
  GRANT_TYPES: [
    {
      value: 'authorization_code',
      label: 'Authorization Code',
    },
    {
      value: 'client_credentials',
      label: 'Client Credentials',
    },
  ],
};