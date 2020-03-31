/* eslint-disable @typescript-eslint/no-explicit-any */
import { NestedRecord } from '../types';
import { path, prop } from '../ramda';

type KeyParamerters<P> = keyof P | string[];
type KeyAndConverter<P> = {
  key: KeyParamerters<P>;
  converter?: (v: any) => any;
};
type Key2AndConverter<P> = {
  keys: [KeyParamerters<P>, KeyParamerters<P>];
  converter: (key1: any, key2: any) => any;
};
type Key3AndConverter<P> = {
  keys: [KeyParamerters<P>, KeyParamerters<P>, KeyParamerters<P>];
  converter: (key1: any, key2: any, key3: any) => any;
};
type Key4AndConverter<P> = {
  keys: [KeyParamerters<P>, KeyParamerters<P>, KeyParamerters<P>, KeyParamerters<P>];
  converter: (key1: any, key2: any, key3: any, key4: any) => any;
};
type Key5AndConverter<P> = {
  keys: [KeyParamerters<P>, KeyParamerters<P>, KeyParamerters<P>, KeyParamerters<P>];
  converter: (key1: any, key2: any, key3: any, key4: any, key5: any) => any;
};

type TConfig<P> =
  | keyof P
  | KeyAndConverter<P>
  | Key2AndConverter<P>
  | Key3AndConverter<P>
  | Key4AndConverter<P>
  | Key5AndConverter<P>;

const isConfig = <P>(v: any): v is TConfig<P> =>
  typeof v === 'object' &&
  (typeof v['key'] !== 'undefined' || (typeof v['keys'] !== 'undefined' && typeof v['converter'] === 'function'));
const isKey = <P>(v: any): v is keyof P => typeof v !== 'object';
const isKeyAndConverter = <P>(v: any): v is KeyAndConverter<P> =>
  typeof v === 'object' && typeof v['key'] !== 'undefined';
const isKey2AndConverter = <P>(v: any): v is Key2AndConverter<P> =>
  typeof v === 'object' && typeof v['keys'] !== 'undefined' && Array.isArray(v['keys']) && v['keys'].length === 2;
const isKey3AndConverter = <P>(v: any): v is Key3AndConverter<P> =>
  typeof v === 'object' && typeof v['keys'] !== 'undefined' && Array.isArray(v['keys']) && v['keys'].length === 3;
const isKey4AndConverter = <P>(v: any): v is Key4AndConverter<P> =>
  typeof v === 'object' && typeof v['keys'] !== 'undefined' && Array.isArray(v['keys']) && v['keys'].length === 4;
const isKey5AndConverter = <P>(v: any): v is Key5AndConverter<P> =>
  typeof v === 'object' && typeof v['keys'] !== 'undefined' && Array.isArray(v['keys']) && v['keys'].length === 5;
const isKeysArray = <P>(v: KeyParamerters<P>): v is string[] => Array.isArray(v);
const getValue = <P>(obj: P, v: KeyParamerters<P>): any => (isKeysArray<P>(v) ? path([...v], obj) : prop(v, obj));
const getValues = <P>(obj: P, v: KeyParamerters<P>[]): any[] =>
  v.reduce((pre, cur) => [...pre, getValue(obj, cur)], [] as any[]);

const _objectMapper = <P, R>(config: NestedRecord<R, TConfig<P>>) => (previousObj: P): R =>
  // eslint-disable-next-line complexity
  Object.entries(config).reduce((pre, [k, conf]) => {
    const returnKey = k as keyof R;
    if (!isConfig<P>(conf)) {
      const nestedConf = conf as NestedRecord<R[typeof returnKey], TConfig<P>>;
      const o = _objectMapper(nestedConf)(previousObj);
      return { ...pre, [returnKey]: o };
    }
    if (isKey<P>(conf)) {
      return { ...pre, [returnKey]: previousObj[conf] };
    }
    if (isKeyAndConverter<P>(conf)) {
      const { key, converter } = conf;
      const v1 = getValue(previousObj, key);
      return { ...pre, [returnKey]: converter ? converter(v1) : v1 };
    }
    if (isKey2AndConverter<P>(conf)) {
      const { keys, converter } = conf;
      const values = getValues(previousObj, keys);
      return { ...pre, [returnKey]: converter(values[0], values[1]) };
    }
    if (isKey3AndConverter<P>(conf)) {
      const { keys, converter } = conf;
      const values = getValues(previousObj, keys);
      return { ...pre, [returnKey]: converter(values[0], values[1], values[2]) };
    }
    if (isKey4AndConverter<P>(conf)) {
      const { keys, converter } = conf;
      const values = getValues(previousObj, keys);
      return { ...pre, [returnKey]: converter(values[0], values[1], values[2], values[3]) };
    }
    if (isKey5AndConverter<P>(conf)) {
      const { keys, converter } = conf;
      const values = getValues(previousObj, keys);
      return { ...pre, [returnKey]: converter(values[0], values[1], values[2], values[3], values[4]) };
    }
    return { ...pre };
  }, {} as R);

/**
 * ObjectMappingする関数を作成する
 * @param config mapping定義
 */
export function objectMapper<P, R>(config: NestedRecord<R, TConfig<P>>): (previousObj: P) => R;
export function objectMapper<P, R>(config: NestedRecord<R, TConfig<P>>, previousObj: P): R;
export function objectMapper<P, R>(config: NestedRecord<R, TConfig<P>>, previousObj?: P) {
  if (typeof previousObj === 'undefined') {
    return _objectMapper(config);
  }
  return _objectMapper(config)(previousObj);
}
