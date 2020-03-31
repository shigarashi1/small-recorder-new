import React, { ComponentProps } from 'react';
import LoadingSpinerP from './LoadingSpiner';
import { useSelector } from 'react-redux';
import { loadingSelector } from '@Selector/ui';

type TProps = Omit<ComponentProps<typeof LoadingSpinerP>, 'isLoading'>;
const LoadingSpiner: React.FC<TProps> = ({ children }) => {
  const isLoading = useSelector(loadingSelector.isLoading);
  return <LoadingSpinerP isLoading={isLoading}>{children}</LoadingSpinerP>;
};
export { LoadingSpiner };
