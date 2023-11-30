import Table from '@/components/table';
import { useLocale } from '@/locales';
import { SearchOutlined, UndoOutlined } from '@ant-design/icons';
import { Row, Col, Input, Form, Button, Card } from 'antd';
import type { FC } from 'react';
import { Fragment } from 'react';

const OauthClientPage: FC = () => {
  const [ form ] = Form.useForm();
  const { formatMessage } = useLocale();

  const dataSource = [
    {
      key: '1',
      name: 'Mike',
      age: 32,
      address: '10 Downing Street',
    },
    {
      key: '2',
      name: 'John',
      age: 42,
      address: '10 Downing Street',
    },


  ];

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
  ];

  const onSubmit = async () => {
    const values = await form.validateFields();
    console.log(values);
  };

  return (
    <Card title="Test" >
      <Form form={ form }>
        <Row gutter={ 16 }>
          <Col span={ 8 }>
            <Form.Item
              name="clientId"
              label={ formatMessage({ id: 'page.oauthClient.clientId' }) }
            >
              <Input autoFocus allowClear />
            </Form.Item>
          </Col>
          <Col span={ 8 }>
            <Form.Item
              name="name"
              label={ formatMessage({ id: 'page.oauthClient.name' }) }
            >
              <Input autoFocus allowClear />
            </Form.Item>
          </Col>
          <Col span={ 8 }>
            <Button type="primary" onClick={ onSubmit } icon={ <SearchOutlined /> }>
              { formatMessage({ id: 'component.search.button.search' }) }
            </Button>
            <Button onClick={ () => form.resetFields() } icon={ <UndoOutlined /> }>
              { formatMessage({ id: 'component.search.button.reset' }) }
            </Button>
          </Col>
        </Row>
      </Form>

      <Table
        bordered
        rowKey="id"
        columns={ columns }
        pagination={ {
          current: 2,
          pageSize: 20,
          total: 10,
        } }
        dataSource={ dataSource }
        // loading={ fetching }
        // dataSource={ brands }
        // pagination={ pagination }
        // onChange={ handleTableChange }
      />
    </Card>
  );
};

export default OauthClientPage;