import { config } from '@/configuration/config';

// MEMO: LoggerなのでOK
/* eslint-disable @typescript-eslint/no-explicit-any, no-console */
class MockConsole {
  static log(...v: any[]): void {
    //
  }
  static info(...v: any[]): void {
    //
  }
  static warn(...v: any[]): void {
    //
  }
  static error(...v: any[]): void {
    console.error(v);
  }
  static debug(...v: any[]): void {
    //
  }
  static group(...v: any[]): void {
    //
  }
  static groupEnd(...v: any[]): void {
    //
  }
  static table(...v: any[]): void {
    //
  }
  static dir(...v: any[]): void {
    //
  }
  static time(...v: any[]): void {
    //
  }
  static timeEnd(...v: any[]): void {
    //
  }
  static assert(...v: any[]): void {
    //
  }
  static trace(...v: any[]): void {
    //
  }
}

const canLog = config.isDev || config.isTest;
export const Logger = canLog ? console : MockConsole;
