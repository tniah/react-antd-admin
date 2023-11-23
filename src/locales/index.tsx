import vi_VN from '@/locales/vi-VN';
import React from 'react';
import type { MessageDescriptor } from 'react-intl';
import { FormattedMessage, useIntl } from 'react-intl';

type Id = keyof typeof vi_VN;

interface Props extends MessageDescriptor {
  id: Id;
}

export const LocaleFormatter: React.FC<Props> = ({ ...props }) => {
  const notChildProps = { ...props, children: undefined };

  return <FormattedMessage { ...notChildProps } id={ props.id }/>
};

type FormatMessageProps = (descriptor: Props) => string;

export const useLocale = () => {
  const { formatMessage: _formatMessage, ...rest } = useIntl();
  const formatMessage: FormatMessageProps = _formatMessage;
  return {
    ...rest,
    formatMessage,
  };
};