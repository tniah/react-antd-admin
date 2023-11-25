import { Form, Button } from '@/components';
import type { FormProps } from '@/components/form';
import { useLocale } from '@/locales';
import { SearchOutlined, UndoOutlined } from '@ant-design/icons';
import './index.less'


interface SearchProps<T> extends FormProps<T> {
  onSearch: (values: T) => void;
}

const BaseSearch = <T extends object>(props: SearchProps<T>) => {
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
    <div className="custom-form">
      <Form { ...rest } form={ form } layout="inline">
        { children }
        <Form.Item>
          <Button type="primary" onClick={ onSubmit } icon={ <SearchOutlined/> }>
            { formatMessage({ id: 'component.search.button.search' }) }
          </Button>
          <Button onClick={ () => form.resetFields() } icon={ <UndoOutlined/> }>
            { formatMessage({ id: 'component.search.button.reset' }) }
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

const SearchForm = Object.assign(BaseSearch, {});

export default SearchForm;