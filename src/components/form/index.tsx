import type { ControlTypes, FormItemProps } from '@/components/form/formItem';
import FormItem from '@/components/form/formItem';
import { Form as AntdForm } from 'antd';
import type { FormProps as AntdFormProps } from 'antd/es/form/Form';

export interface FormOptions extends Array<FormItemProps<ControlTypes>> {
}

export interface FormProps<T> extends AntdFormProps<T> {
  options?: FormOptions;
}


const BaseForm = <Values extends object>(props: FormProps<Values>) => {
  const { options, children, ...rest } = props;

  return (
    <AntdForm<Values> { ...rest }>
      { options?.map(option => {
        return <FormItem { ...option } />;
      }) }
      { children }
    </AntdForm>
  );
};

const Form = Object.assign(BaseForm, AntdForm, { Item: FormItem });

export default Form;