import { AnyAction } from 'typescript-fsa';
import { Epic, combineEpics } from 'redux-observable';
import { ofAction } from 'typescript-fsa-redux-observable-of-action';
import { map } from 'rxjs/operators';
import { AppState } from '@/store';
import { errorActions } from '@/root/error-actions';
import { errorDialogModule } from '@/store/ui/error-dialog';
import { WrapAction } from '@/library/redux-observable';

// error dialog Epics
const throwError: Epic<AnyAction, WrapAction<typeof errorDialogModule.actions.show>, AppState> = (action$, store) =>
  action$.pipe(
    ofAction(errorActions.throwError),
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

// combine
export const dialogsEpics = combineEpics(errorDialogEpics);
