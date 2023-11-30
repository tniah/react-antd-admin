import { useLocale } from '@/locales';
import { SearchOutlined, UndoOutlined } from '@ant-design/icons';
import type { FormProps } from 'antd';
import { Form, Button } from 'antd';
import type { ReactNode } from 'react';
// import './index.less';

export interface SearchFormProps<T> extends FormProps<T> {
  onSearch: (values: T) => void;
  children?: ReactNode;
}

const BaseSearchForm = <T extends object>(props: SearchFormProps<T>) => {
  const { onSearch, children, ...rest } = props;
  const [ form ] = Form.useForm<T>();
  const { formatMessage } = useLocale();

  const onSubmit = async () => {
    const values = await form.validateFields();
    if (values) {
      onSearch(values);
    }
  };

  return (
    <Form { ...rest } form={ form }>
      { children }
      <Form.Item>
        <Button type="primary" onClick={ onSubmit } icon={ <SearchOutlined /> }>
          { formatMessage({ id: 'component.search.button.search' }) }
        </Button>
        <Button onClick={ () => form.resetFields() } icon={ <UndoOutlined /> }>
          { formatMessage({ id: 'component.search.button.reset' }) }
        </Button>
      </Form.Item>
    </Form>
  );
};

const SearchForm = Object.assign(BaseSearchForm, Form);

export default SearchForm;




