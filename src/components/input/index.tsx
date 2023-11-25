import { Input as AntdInput } from 'antd';
import type { FC } from 'react';

const BaseInput: FC = props => {
  return <AntdInput { ...props } />;
};

const Input = Object.assign(AntdInput, BaseInput);

export default Input;