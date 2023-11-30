import { GoBackButton, SaveButton } from '@/components/button';
import type { FormProps } from 'antd';
import { Col, Row } from 'antd';
import type { ReactNode } from 'react';
import Form from './form';

interface CreateFormProps<T> extends FormProps<T> {
  onSubmit: (values: T) => void;
  children: ReactNode;
}

const BaseCreateForm = <T extends object>(props: CreateFormProps<T>) => {
  const { onSubmit, children, ...rest } = props;
  const [ form ] = Form.useForm<T>();

  const onClick = async () => {
    const values = await form.validateFields();
    if (values) {
      onSubmit(values);
    }
  };

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
            <SaveButton onClick={ onClick } />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

const CreateForm = Object.assign(BaseCreateForm, Form);

export default CreateForm;