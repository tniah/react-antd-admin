import type { ButtonProps as AntdButtonProps } from 'antd';
import { Button as AntdButton } from 'antd';
import type { FC } from 'react';

interface ButtonProps extends AntdButtonProps {
}

const BaseButton: FC<ButtonProps> = props => {
  return <AntdButton { ...props } />;
};

const Button = Object.assign(AntdButton, BaseButton);

export default Button;