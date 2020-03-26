/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Component, ErrorInfo } from 'react';
import * as Sentry from '@sentry/browser';
import { config } from '@/configuration/config';

type TProps = {
  isRoot?: boolean;
  error?: Error;
};

type TState = {
  hasError: boolean;
  errorInfo: ErrorInfo;
  eventId?: string;
};

class ErrorBoundary extends Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      hasError: false,
      errorInfo: { componentStack: '' },
      eventId: undefined,
    };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    Sentry.withScope((scope) => {
      scope.setExtras(info);
      const eventId = Sentry.captureException(error);
      this.setState({ eventId });
    });
  }

  render() {
    if (this.state.hasError) {
      if (!config.isDev && this.props.isRoot) {
        //render fallback UI
        const onClickReport = () => {
          Sentry.showReportDialog({ eventId: this.state.eventId });
        };
        return (
          <React.Fragment>
            <h3>回復不能なエラーが発生しました.</h3>
            <button onClick={onClickReport}>Report feedback</button>
          </React.Fragment>
        );
      }
      return <h3>Something went wrong.</h3>;
    }

    //when there's not an error, render children untouched
    return this.props.children;
  }
}
export default ErrorBoundary;
