import React, { memo } from 'react';
import MaterialTable, { Column } from 'material-table';

import styles from './EditableTable.module.scss';

import I18nText from '@Components/atoms/I18nText/I18nText.container';
import { TI18nObj } from '../../../types';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const toPromise = <T, Fn extends (...args: any) => void>(fn: Fn) => (v1: T, v2?: T) =>
  typeof v2 === 'undefined'
    ? new Promise<void>((resolve, reject) => resolve(fn(v1)))
    : new Promise<void>((resolve, reject) => resolve(fn(v1, v2)));

type TProps<T extends object> = {
  title: TI18nObj;
  data: T[];
  columnConfig: Column<T>[];
  onRowAdd?: (newData: T) => void;
  onRowUpdate?: (newData: T, oldData: T) => void;
  onRowDelete?: (oldData: T) => void;
};

const Component = <T extends object>(props: React.PropsWithChildren<TProps<T>>) => {
  const { title, data, columnConfig, onRowAdd, onRowUpdate, onRowDelete } = props;
  return (
    <div id={styles.root}>
      <MaterialTable
        title={<I18nText i18nObj={title} />}
        data={data}
        columns={columnConfig}
        editable={{
          onRowAdd: onRowAdd ? toPromise<T, typeof onRowAdd>(onRowAdd) : undefined,
          onRowUpdate: onRowUpdate ? toPromise<T, typeof onRowUpdate>(onRowUpdate) : undefined,
          onRowDelete: onRowDelete ? toPromise<T, typeof onRowDelete>(onRowDelete) : undefined,
        }}
      />
    </div>
  );
};
const EditableTable = memo(Component) as typeof Component;
export default EditableTable;
