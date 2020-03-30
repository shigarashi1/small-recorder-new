/* eslint-disable @typescript-eslint/no-explicit-any */
import { NestedRecord } from '../types';

type KeyAndConverter<P, R> = {
  key: keyof P;
  converter: (v: any) => any;
};
type KeyOnly<P, R> = Pick<KeyAndConverter<P, R>, 'key'>;
type Key2AndConverter<P, R> = {
  keys: [keyof P, keyof P];
  converter: (key1: any, key2: any) => any;
};
type Key3AndConverter<P, R> = {
  keys: [keyof P, keyof P, keyof P];
  converter: (key1: any, key2: any, key3: any) => any;
};
type Key4AndConverter<P, R> = {
  keys: [keyof P, keyof P, keyof P, keyof P];
  converter: (key1: any, key2: any, key3: any, key4: any) => any;
};

type TConfig<P, R> =
  | KeyOnly<P, R>
  | KeyAndConverter<P, R>
  | Key2AndConverter<P, R>
  | Key3AndConverter<P, R>
  | Key4AndConverter<P, R>;

/**
 * ObjectMappingする関数を作成する
 * @param config mapping定義
 */
export const objectMapper = <P, R>(config: NestedRecord<R, TConfig<P, R>>) => (previousObj: P): R => {
  return {} as R;
};
