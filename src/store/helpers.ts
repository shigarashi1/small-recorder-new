import { TEntityData } from './types';

export const addEntityMeta = <T>(data: T[]): TEntityData<T>[] =>
  data.map((v) => ({ data: v, meta: { updatedAt: new Date() } }));
