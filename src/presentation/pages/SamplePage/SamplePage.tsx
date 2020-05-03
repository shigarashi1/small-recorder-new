import React, { ComponentProps, useState, useCallback } from 'react';
import Grid from '@material-ui/core/Grid';
import SampleCard from '@Components/molecules/SampleCard/SampleCard';
import Typography from '@material-ui/core/Typography';

import styles from './SamplePage.module.scss';
import { Logger } from '@/library/models/logger';
import { ApiError } from '@/library/models/error';
import { ActionFunction } from '@/library/redux-observable';
import { infoDialogActions } from '@Events/ui/info-dialog';
import { okCancelDialogActions } from '@Events/ui/ok-cancel-dialog';
import { yesNoDialogActions } from '@Events/ui/yes-no-dialog';
import ContentDialog from '@Components/organisms/dialogs/ContentDialog/ContentDialog';
import EditableTable from '@Components/organisms/EditableTable/EditableTable';
import { Target } from '@DomainModels/target';
import { getTargetTableConfig } from '@/presentation/lookups/table';
import { CATEGORIES, TARGETS } from '@/presentation/mockups';
import { object2LookupObject } from '@/presentation/helpers';
import { Category } from '@DomainModels/category';
import { TLangCode } from '@/presentation/types';

type TProps = {
  langCode: TLangCode;
  throwError: (error: ApiError) => void;
  showInfoDialog: ActionFunction<typeof infoDialogActions.show>;
  showOkCancelDialog: ActionFunction<typeof okCancelDialogActions.show>;
  showYesNoDialog: ActionFunction<typeof yesNoDialogActions.show>;
};
type SampleProps = ComponentProps<typeof SampleCard>;

type TStateFn = {
  showEditableTable: () => void;
};

const getComponent = (props: TProps & TStateFn): SampleProps[] => [
  {
    title: 'Sample Card Sample',
    contexts: 'Sample Card Sample',
    onAction: () => {
      Logger.log('Action');
    },
    children: <p>Sample Card</p>,
  },
  {
    title: 'ErrorDialog',
    contexts: 'Show ErrorDialog',
    onAction: () => {
      props.throwError(new ApiError('E0000'));
    },
  },
  {
    title: 'InfoDialog',
    contexts: 'Show InfoDialog',
    onAction: () => {
      props.showInfoDialog({
        title: { jp: 'sample' },
        contexts: [{ jp: 'sample1' }, { jp: 'sample2sample2' }, { jp: 'sample3sample3sample3' }],
        ok: () => {
          window.alert('ok');
        },
      });
    },
  },
  {
    title: 'OkCancelDialog',
    contexts: 'Show OkCancelDialog',
    onAction: () => {
      props.showOkCancelDialog({
        title: { jp: 'sample' },
        contexts: [{ jp: 'sample1' }, { jp: 'sample2sample2' }, { jp: 'sample3sample3sample3' }],
        ok: () => {
          window.alert('ok');
        },
        cancel: () => {
          window.alert('cancel');
        },
      });
    },
  },
  {
    title: 'YesNoDialog',
    contexts: 'Show YesNoDialog',
    onAction: () => {
      props.showYesNoDialog({
        title: { jp: 'sample' },
        contexts: [{ jp: 'sample1' }, { jp: 'sample2sample2' }, { jp: 'sample3sample3sample3' }],
        yes: () => {
          window.alert('yes');
        },
        no: () => {
          window.alert('no');
        },
      });
    },
  },
  {
    title: 'EditableTable',
    contexts: 'Show EditableTable',
    onAction: () => {
      props.showEditableTable();
    },
  },
];

const SamplePage: React.FC<TProps> = (props) => {
  const [hasShownEditableTable, setShownEditableTable] = useState(false);
  const showEditableTable = useCallback(() => {
    setShownEditableTable(true);
  }, []);
  const closeEditableTable = useCallback(() => {
    setShownEditableTable(false);
  }, []);

  const renderSample = (component: SampleProps, key: number) => {
    return (
      <Grid key={`sample-card-gird-${key}`} item={true} xs={12} sm={6} md={4} lg={3} xl={3}>
        <SampleCard {...component} />
      </Grid>
    );
  };

  return (
    <div id={styles.container}>
      <div className={styles.contents}>
        <Typography variant="h5">Samples</Typography>
        <Grid container={true} spacing={2}>
          {getComponent({ ...props, showEditableTable }).map(renderSample)}
        </Grid>
      </div>
      <React.Fragment>
        <ContentDialog
          title={{ jp: '編集可能なテーブル', en: 'Editable Table' }}
          hasOpened={hasShownEditableTable}
          close={closeEditableTable}
        >
          <EditableTable<Target>
            title={{ jp: '目標', en: 'Target' }}
            data={TARGETS}
            columnConfig={getTargetTableConfig(props.langCode, [
              {
                field: 'categoryId',
                lookups: CATEGORIES,
                converter: object2LookupObject<Category>('id', 'name'),
              },
            ])}
          />
        </ContentDialog>
      </React.Fragment>
    </div>
  );
};

export default SamplePage;
