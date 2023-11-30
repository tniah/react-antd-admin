import notification from '@/components/alert';
import { CreateForm } from '@/components/form';
import { oauthClientPageConstants } from '@/constants/page';
import type { CreateParams } from '@/interfaces/oauthClient';
import { useLocale } from '@/locales';
import { oauthClientApi } from '@/services/apis';
import { LinkOutlined, DeleteOutlined } from '@ant-design/icons';
import { Row, Col, Input, Select, Button } from 'antd';
import type { FC } from 'react';


const CreateOAuthClientPage: FC = () => {
  const { formatMessage } = useLocale();

  const onSubmit = async (values: CreateParams) => {
    Object.keys(values).forEach(key => {
      values[key as keyof typeof values] === undefined
      && delete values[key as keyof typeof values];
    });
    if (values.redirectUris !== undefined) {
      const redirectUris = values.redirectUris.filter(value => value.trim() !== '');
      Object.assign(values, { redirectUris });
    }
    oauthClientApi.create(values).then(data => {
      console.log(data);
      notification.success('OAuth Client created successfully!');
    });
  };

  return (
    <CreateForm<CreateParams>
      onFinish={ onSubmit }
    >
      <Row gutter={ 16 }>
        <Col span={ 12 }>
          <CreateForm.Item
            name="clientName"
            label={ formatMessage({ id: 'page.oauthClient.label.name' }) }
            rules={ [
              { required: true, message: formatMessage({ id: 'page.oauthClient.rule.name.required' }) },
              { whitespace: true, message: formatMessage({ id: 'page.oauthClient.rule.name.onlyWhitespace' }) },
            ] }
          >
            <Input allowClear />
          </CreateForm.Item>
        </Col>
        <Col span={ 12 }>
          <CreateForm.Item
            name="clientUri"
            label={ formatMessage({ id: 'page.oauthClient.label.uri' }) }
            rules={ [
              { type: 'url', message: formatMessage({ id: 'page.oauthClient.rule.uri.notValid' }) },
            ] }
          >
            <Input allowClear />
          </CreateForm.Item>
        </Col>
      </Row>
      <Row gutter={ 16 }>
        <Col span={ 12 }>
          <CreateForm.Item
            name="tokenEndpointAuthMethod"
            label={ formatMessage({ id: 'page.oauthClient.label.tokenEndpointAuthMethod' }) }
            rules={ [ {
              required: true,
              message: formatMessage({ id: 'page.oauthClient.rule.tokenEndpointAuthMethod.required' }),
            } ] }
          >
            <Select options={ oauthClientPageConstants.TOKEN_ENDPOINT_AUTH_METHODS } />
          </CreateForm.Item>
        </Col>
        <Col span={ 12 }>
          <CreateForm.Item
            name="grantTypes"
            label={ formatMessage({ id: 'page.oauthClient.label.grantTypes' }) }
          >
            <Select mode="multiple" options={ oauthClientPageConstants.GRANT_TYPES } />
          </CreateForm.Item>
        </Col>
      </Row>
      <Row gutter={ 16 }>
        <Col span={ 12 }>
          <CreateForm.Item
            name="logoUri"
            label={ formatMessage({ id: 'page.oauthClient.label.logoUri' }) }
            rules={ [
              { type: 'url', message: formatMessage({ id: 'page.oauthClient.rule.logoUri.notValid' }) },
            ] }
          >
            <Input allowClear />
          </CreateForm.Item>
        </Col>
        <Col span={ 12 }>
          <CreateForm.List
            name="redirectUris"
            initialValue={ [ '' ] }
          >
            { (fields, { add, remove }, { errors }) => (
              <>
                { fields.map((field, index) => (
                  <CreateForm.Item
                    label={ index === 0 ? formatMessage({ id: 'page.oauthClient.label.redirectUris' }) : '' }
                    key={ field.key }
                  >
                    <CreateForm.Item
                      { ...field }
                      rules={ [
                        { type: 'url', message: formatMessage({ id: 'page.oauthClient.rule.redirectUri.notValid' }) },
                      ] }
                      validateTrigger={ [ 'onChange', 'onBlur' ] }
                      noStyle
                    >
                      <Input
                        prefix={ <LinkOutlined /> }
                        addonAfter={
                          fields.length > 1 ? <DeleteOutlined onClick={ () => remove(field.name) } /> : null
                        }
                        style={ { width: '100%' } } />
                    </CreateForm.Item>
                  </CreateForm.Item>
                )) }
                <CreateForm.Item>
                  <Button
                    type="dashed"
                    onClick={ () => {
                      add('', -1);
                    } }
                    style={ { width: '100%' } }
                  >
                    { formatMessage({ id: 'page.oauthClient.button.redirectUri.add' }) }
                  </Button>
                </CreateForm.Item>
                <CreateForm.ErrorList errors={ errors } />
              </>
            ) }
          </CreateForm.List>
        </Col>
      </Row>
      <Row gutter={ 16 }>
        <Col span={ 12 }>
          <CreateForm.Item
            name="tenantId"
            label={ formatMessage({ id: 'page.oauthClient.label.tenant' }) }
          >
            <Input disabled />
          </CreateForm.Item>
        </Col>
        <Col span={ 12 }>
          <CreateForm.Item
            name="scopes"
            label={ formatMessage({ id: 'page.oauthClient.label.scopes' }) }
          >
            <Input disabled />
          </CreateForm.Item>
        </Col>
      </Row>
    </CreateForm>
  );
};

export default CreateOAuthClientPage;