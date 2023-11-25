import { Form, Input, InputNumber, Switch, DatePicker, Checkbox, Radio, Select } from 'antd';
import type { FormItemProps as AntdFormItemProps } from 'antd/es/form';
import type { FC } from 'react';
import React, { useMemo } from 'react';

export type ControlTypes = 'input' | 'inputNumber' | 'switch' | 'datePicker' | 'checkbox' | 'radio' | 'select';

type GetRCPropsType<T> = T extends (props: infer R) => any ? R : T extends React.ComponentClass<infer R> ? R : any;

type InnerProps = {
  input: GetRCPropsType<typeof Input>;
  inputNumber: GetRCPropsType<typeof InputNumber>;
  switch: GetRCPropsType<typeof Switch>;
  datePicker: GetRCPropsType<typeof DatePicker>;
  checkbox: GetRCPropsType<typeof Checkbox>;
  radio: GetRCPropsType<typeof Radio>;
  select: GetRCPropsType<typeof Select>;
}

export interface FormItemProps<T extends ControlTypes = ControlTypes> extends Omit<AntdFormItemProps, 'required'> {
  type?: T;
  options?: {
    label: string;
    value: any;
    disabled?: boolean;
  }[];
  innerProps?: InnerProps[T];
  required?: string | boolean;
}

export class ControlMap {
  props: FormItemProps;

  constructor(props: FormItemProps) {
    this.props = props;
  }

  get innerProps() {
    return this.props.innerProps as object;
  }

  input() {
    return <Input { ...this.innerProps } />;
  }

  inputNumber() {
    return <InputNumber { ...this.innerProps } />
  }

  switch() {
    return <Switch { ...this.innerProps } />;
  }

  datePicker() {
    return <DatePicker { ...this.innerProps } />;
  }

  checkbox() {
    // highlight-next-line
    return <Checkbox.Group children={this.props.children} options={this.props.options} {...this.innerProps} />;
  }

  radio() {
    // highlight-next-line
    return <Radio.Group children={this.props.children} options={this.props.options} {...this.innerProps} />;
  }

  select() {
    // highlight-next-line
    return <Select children={this.props.children} options={this.props.options} {...this.innerProps} />;
  }
}

const FormItem: FC<FormItemProps> = props => {
  const { type, required, rules: userRules, ...rest } = props;

  const rules = useMemo(() => {
    if (userRules) return userRules;

    if (required) {
      if (typeof required === 'boolean') {
        return [ { required: true, message: `${ props.label }` } ];
      } else {
        return [ { required: true, message: required } ];
      }
    }
  }, [ required, userRules, props.label ]);

  const controlMap = new ControlMap(props);

  return (
    <Form.Item { ...rest } rules={ rules }>
      { type ? controlMap[type]() : props.children }
    </Form.Item>
  );
};

export default FormItem;