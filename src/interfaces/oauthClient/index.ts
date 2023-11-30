export interface CreateParams {
  clientName: string;
  clientUri: string;
  tokenEndpointAuthMethod: string;
  grantTypes: string[];
  logoUri: string;
  redirectUris: string[];
  tenantId: string;
  scopes: string[];
}

