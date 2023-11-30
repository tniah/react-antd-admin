import { history } from '@/constants/history';
import { useLocale } from '@/locales';
import { LeftOutlined, FileAddOutlined } from '@ant-design/icons';
import type { ButtonProps } from 'antd';
import { Button } from 'antd';
import type { FC } from 'react';


export const GoBackButton: FC<ButtonProps> = props => {
  const { formatMessage } = useLocale();

  return (
    <Button
      type="default"
      icon={ <LeftOutlined /> }
      onClick={ () => history.back() }
      { ...props }
    >
      { formatMessage({ id: 'component.button.goBack' }) }
    </Button>
  );
};


export const SaveButton: FC<ButtonProps> = props => {
  const { formatMessage } = useLocale();

  return (
    <Button
      type="primary"
      icon={ <FileAddOutlined /> }
      htmlType="submit"
      { ...props }
    >
      { formatMessage({ id: 'component.button.save' }) }
    </Button>
  );
};

