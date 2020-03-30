/* eslint-disable @typescript-eslint/no-explicit-any */
import { objectMapper } from './object-mapper';
import { EDateFormat, toDate } from '.';

const PARAM = {
  str1: 'sssss',
  date: new Date('2019-01-01'),
  pmax: 100,
  pmin: 1,
  dateHour: 11,
  dateMinite: 22,
  dateYear: '2019',
  dateMonth: '02',
  dateDay: '05',
  nested: {
    nested: {
      nested: {
        key1: 'nested',
        key2: 99,
        key3: false,
        key4: new Date('2019-01-01'),
      },
    },
  },
  strArr: ['3', '2', '1'],
  objArr: [
    { objKey1: '111', objKey2: 222 },
    { objKey1: '333', objKey2: 444 },
    { objKey1: '555', objKey2: 666 },
  ],
};
type TParamObj = typeof PARAM;

const RESULT = {
  string1: 'sssss',
  dateStr: '2019-01-01',
  nestedPrice: {
    min: 100,
    max: 1,
  },
  combine2KeyTime: '11:22',
  combine3KeyDate: new Date('2019-02-05'),
  nested: {
    nested: {
      nested: {
        combine: 'false99nested2019-01-01',
      },
    },
  },
  nestedKey2: '99',
};
type TResultObj = typeof RESULT;

describe('createObjectMapper', () => {
  const mapToResultObj = objectMapper<TParamObj, TResultObj>({
    string1: { key: 'str1' },
    dateStr: { key: 'date', converter: (v: any) => toDate(v, EDateFormat.Day) },
    nestedPrice: {
      max: {
        key: 'pmax',
      },
      min: {
        key: 'pmin',
      },
    },
    combine2KeyTime: {
      keys: ['dateHour', 'dateMinite'],
      converter: (v1: any, v2: any) => [v1, v2].map((v) => String(v)).join(':'),
    },
    combine3KeyDate: {
      keys: ['dateYear', 'dateMonth', 'dateDay'],
      converter: (v1: any, v2: any, v3: any) => `${v1}-${v2}`,
    },
    nested: {
      nested: {
        nested: {
          combine: {
            key: 'nested',
          },
        },
      },
    },
    nestedKey2: {
      key: 'nested',
    },
  })(PARAM);
  it('keyで1対1でmappingして返却', () => {
    expect(mapToResultObj.string1).toEqual(RESULT.string1);
  });
  it('dateを変換してstringで返却', () => {
    expect(mapToResultObj.dateStr).toEqual(RESULT.dateStr);
  });
  it('objectをnestして返却', () => {
    expect(mapToResultObj.nestedPrice).toEqual(RESULT.nestedPrice);
  });
  it('2のkeyを1つにして返却', () => {
    expect(mapToResultObj.combine2KeyTime).toEqual(RESULT.combine2KeyTime);
  });
  it('3のkeyを1つにして、変換して返却', () => {
    expect(mapToResultObj.combine2KeyTime).toEqual(RESULT.combine3KeyDate);
  });
  it('nestされた値を変換して返却', () => {
    expect(mapToResultObj.nestedKey2).toEqual(RESULT.nestedKey2);
  });
  it('4のkeyを1つにして、変換して返却', () => {
    expect(mapToResultObj.nested.nested.nested.combine).toEqual(RESULT.nested.nested.nested.combine);
  });
});
