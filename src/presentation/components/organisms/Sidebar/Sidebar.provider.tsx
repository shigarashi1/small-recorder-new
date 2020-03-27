import React, { createContext, useState, useCallback } from 'react';
import { Logger } from '@/library/models/logger';

type TState = {
  hasOpened: boolean;
  open: () => void;
  close: () => void;
};

const INITIAL_STATE: TState = {
  hasOpened: false,
  open: () => {
    Logger.log('never call this function');
  },
  close: () => {
    Logger.log('never call this function');
  },
};

const SidebarContext = createContext(INITIAL_STATE);
const SidebarProvider: React.FC = ({ children = null }) => {
  const [hasOpened, setHasOpened] = useState(false);
  const open = useCallback(() => {
    setHasOpened(true);
  }, []);
  const close = useCallback(() => {
    setHasOpened(false);
  }, []);
  return <SidebarContext.Provider value={{ hasOpened, open, close }}>{children}</SidebarContext.Provider>;
};

export { SidebarContext, SidebarProvider };
