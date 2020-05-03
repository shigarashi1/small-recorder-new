import { TBaseDomainModel, Domain } from './base';
import { NestedPartial } from '@/library/types';

export const ETargetTerm = { Day: 'day', Week: 'week', Month: 'month' } as const;
export type TTargetTerm = typeof ETargetTerm[keyof typeof ETargetTerm];

type TTarget = TBaseDomainModel & {
  userId: string;
  categoryId: string;
  count: number;
  term: TTargetTerm;
};

export type Target = Domain<TTarget>;
export type PartialTarget = NestedPartial<Target>;
