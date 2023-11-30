import { GoBackButton, SaveButton } from '@/components/button';
import { Form } from '@/components/form';
import type { FormProps } from 'antd';
import { Col, Row } from 'antd';
import type { ReactNode } from 'react';

interface CreateFormProps<T> extends FormProps<T> {
  children: ReactNode;
}

const BaseCreateForm = <T extends object>(props: CreateFormProps<T>) => {
  const { children, ...rest } = props;
  const [ form ] = Form.useForm<T>();

  return (
    <Form
      form={ form }
      { ...rest }
    >
      { children }
      <Row gutter={ 16 } style={ { marginTop: 10 } }>
        <Col span={ 12 } offset={ 0 }>
          <Form.Item>
            <GoBackButton />
            <SaveButton />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

const CreateForm = Object.assign(BaseCreateForm, Form);

export default CreateForm;