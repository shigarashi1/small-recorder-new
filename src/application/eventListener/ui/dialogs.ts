import { AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { map, tap } from 'rxjs/operators';
import { AppState } from '@/store';
import { errorActions } from '@/root/error-actions';
import { errorDialogModule } from '@/store/ui/error-dialog';
import { WrapAction } from '@/library/redux-observable';
import { Logger } from '@/library/models/logger';
import { infoDialogModule } from '@/store/ui/info-dialog';
import { infoDialogActions } from '@Events/ui/info-dialog';

// error dialog Epics
const throwError: Epic<AnyAction, WrapAction<typeof errorDialogModule.actions.show>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(errorActions.throwError),
    tap(({ payload }) => Logger.warn(payload)),
    map(({ payload }) => {
      const { code, errorCode, message } = payload;
      return errorDialogModule.actions.show({ code, errorCode, message });
    }),
  );

const clearError: Epic<AnyAction, WrapAction<typeof errorDialogModule.actions.dismiss>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(errorActions.clearError),
    map(({ payload }) => errorDialogModule.actions.dismiss()),
  );

const errorDialogEpics = combineEpics(throwError, clearError);

const showInfoDialog: Epic<AnyAction, WrapAction<typeof infoDialogModule.actions.show>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(infoDialogActions.show),
    map(({ payload }) => infoDialogModule.actions.show({ ...payload })),
  );

const dismissInfoDialog: Epic<AnyAction, WrapAction<typeof infoDialogModule.actions.dismiss>, AppState> = (
  action$,
  store,
) =>
  action$.pipe(
    ofAction(infoDialogActions.dismiss),
    map(({ payload }) => infoDialogModule.actions.dismiss()),
  );

const infoDialogEpics = combineEpics(showInfoDialog, dismissInfoDialog);

// combine
export const dialogsEpics = combineEpics(errorDialogEpics, infoDialogEpics);
