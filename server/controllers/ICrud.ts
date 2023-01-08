

export interface ICrudDao<T, O> {
  create: (data: O) => Promise<boolean>,
  read: (id: number) => Promise<T>,
  update: (id: number, obj: O) => Promise<T>,
  delete: (id: number) => Promise<boolean>
};

