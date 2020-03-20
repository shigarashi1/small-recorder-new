import { TBase } from './base';
import { NestedPartial } from '@/library/types';

export const ETargetTerm = { Day: 'day', Week: 'week', Month: 'month' } as const;
export type TTargetTerm = typeof ETargetTerm[keyof typeof ETargetTerm];

type TTarget = TBase & {
  userId: string;
  categoryId: string;
  count: number;
  term: TTargetTerm;
};

export type Target = Readonly<TTarget>;
export type PartialTarget = NestedPartial<Target>;
