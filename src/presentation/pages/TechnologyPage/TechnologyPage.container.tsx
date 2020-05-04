import React from 'react';
import InjectedPageComponent from './TechnologyPage';

import { DEPENDENCIES } from '@/presentation/lookups/dependency';

const TechnologyPage: React.FC<{}> = () => {
  return <InjectedPageComponent dependencies={DEPENDENCIES} />;
};
export default TechnologyPage;
