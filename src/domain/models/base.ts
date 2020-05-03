export type TBaseDomainModel = {
  id: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Domain<T extends TBaseDomainModel> = Readonly<T>;
