export type TEntityMeta = { updatedAt: Date };
export type TEntityData<T> = {
  data: T;
  meta: TEntityMeta;
};

export type TApplicationListMeta = {};
export type TApplicationListData = {
  ids: string[];
  meta: TApplicationListMeta;
};

export type TApplicationDetailMeta = {};
export type TApplicationDetailData = {
  id: string;
  meta: TApplicationDetailMeta;
};

export type TApplicationEditMeta = {};
export type TApplicationEditData = {
  id: string;
  meta: TApplicationListMeta;
};
