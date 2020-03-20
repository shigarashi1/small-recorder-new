import { firebaseConfig } from './private/firebase';
import { sentryConfig } from './private/sentry';

const isProduction = process.env.NODE_ENV === 'production';
const isStaging = process.env.REACT_APP_STAGING_FLAG === '1';
const isTest = process.env.NODE_ENV === 'test';

const config = {
  isProduction: isProduction && !isStaging,
  isStaging,
  isTest,
  isDev: !isProduction && !isStaging,
  firebase: isProduction ? (!isStaging ? firebaseConfig.production : firebaseConfig.staging) : firebaseConfig.develop,
  sentry: isProduction ? (!isStaging ? sentryConfig.production : sentryConfig.staging) : sentryConfig.develop,
};

export default config;
