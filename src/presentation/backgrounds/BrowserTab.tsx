import { useEffect, useCallback } from 'react';
import { useLocation } from 'react-router';
import { useSelector } from 'react-redux';
import { partial } from '@/library/ramda';

import { ROUTER_CONFIG_ARRAY, BROWSER_TITLE } from '../lookups/router';
import { languageSelector } from '@/application/selector/ui';
import { getBrowserTitle } from '../helpers';

const DEFAULT_TITLE = 'Small Recorder';
const BrowserTab: React.FC<{}> = () => {
  const langCode = useSelector(languageSelector.langCode);
  const { pathname } = useLocation();
  const getTitle = useCallback(partial(getBrowserTitle, [DEFAULT_TITLE, ROUTER_CONFIG_ARRAY, BROWSER_TITLE]), [
    DEFAULT_TITLE,
    ROUTER_CONFIG_ARRAY,
    BROWSER_TITLE,
  ]);
  useEffect(() => {
    window.document.title = getTitle(langCode, pathname);
  }, [getTitle, langCode, pathname]);

  return null;
};

export default BrowserTab;
