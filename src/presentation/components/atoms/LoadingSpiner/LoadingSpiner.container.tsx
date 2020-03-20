import React, { ComponentProps } from 'react';
import LoadingSpinerP from './LoadingSpiner';

type TProps = Omit<ComponentProps<typeof LoadingSpinerP>, 'isLoading'>;
const LoadingSpiner: React.FC<TProps> = ({ children }) => {
  // TODO: useSelector
  const isLoading = false;
  return <LoadingSpinerP isLoading={isLoading}>{children}</LoadingSpinerP>;
};
export { LoadingSpiner };
