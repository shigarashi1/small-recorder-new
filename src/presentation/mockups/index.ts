import nanoid from 'nanoid';
import { User } from '@DomainModels/user';
import { Category } from '@DomainModels/category';
import { Target, ETargetTerm } from '@DomainModels/target';
import { Record } from '@DomainModels/record';
import { TBaseDomainModel } from '@DomainModels/base';
import { repeat, times } from '@/library/ramda';
import { Logger } from '@/library/models/logger';

const getRandomNumber = (max: number): number => +(Math.random() * max).toFixed();
const getRandomData = <T>(list: T[]): T => list[getRandomNumber(list.length - 1)];
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const addBase = <T extends TBaseDomainModel>() => (data: any): T =>
  ({
    ...data,
    id: nanoid(),
    createdAt: new Date(),
    updatedAt: new Date(),
  } as T);

const USERNAMES = [
  'Inamura Asuna',
  'Sagawa Amna',
  'Ezaki Ayana',
  'Kikuchi Fuuka',
  'Mimura Nagisa',
  'Kitazawa Yukiho',
  'Osaya Riko',
];

export const USERS: User[] = USERNAMES.map((username) => ({
  username,
  uid: nanoid(),
})).map(addBase<User>());

export const CATEGORIES: Category[] = repeat('Category', 10)
  .map((v, i) => `${v} ${i + 1}`)
  .map((name) => ({
    name,
    userId: getRandomData(USERS).id,
    hasDeleted: getRandomData([true, false]),
  }))
  .map(addBase<Category>());

export const TARGETS: Target[] = times((i) => getRandomNumber(5), 20)
  .map((count) => ({
    count,
    userId: getRandomData(USERS).id,
    categoryId: getRandomData(CATEGORIES).id,
    term: getRandomData([ETargetTerm.Day, ETargetTerm.Week, ETargetTerm.Month]),
  }))
  .map(addBase<Target>());

export const RECORDS: Record[] = repeat('Record', 200)
  .map((v, i) => `${v} ${i + 1}`)
  .map((record) => ({
    record,
    userId: getRandomData(USERS).id,
    date: getRandomData(['2019-12-30', '2019-12-31', '2020-01-01', '2020-01-02', '2020-01-03']),
    categoryId: getRandomData(CATEGORIES).id,
  }))
  .map(addBase<Record>());

export const showMockdata = () => {
  Logger.log({ USERS, CATEGORIES, TARGETS, RECORDS });
};
