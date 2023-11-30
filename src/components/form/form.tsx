import type { FormProps as AntdFormProps } from 'antd';
import { Form as AntdForm } from 'antd';
import type { ReactNode } from 'react';

export interface FormProps<T> extends AntdFormProps<T> {
  children?: ReactNode;
}

const BaseForm = <T extends object>(props: FormProps<T>) => {
  const { children, ...rest } = props;
  return (
    <AntdForm
      layout="vertical"
      style={ { padding: 20 } }
      { ...rest }
    >
      { children }
    </AntdForm>
  );
};

const Form = Object.assign(BaseForm, AntdForm);

export default Form;