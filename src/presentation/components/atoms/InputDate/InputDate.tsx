import React, { ComponentProps, useCallback } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import isValid from 'date-fns/isValid';
import pipe from 'ramda/es/pipe';
import partial from 'ramda/es/partial';

import { MuiPickersUtilsProvider, KeyboardDatePicker } from '@material-ui/pickers';

// import styles from './InputDate.module.scss';

type TBaseProps = ComponentProps<typeof KeyboardDatePicker>;
type TExtendProps = {
  value: Date;
  onChange: (date: Date) => void;
  initialValue?: Date;
};
type TProps = Omit<TBaseProps, 'onChange' | 'value'> & TExtendProps;
type TChangeParam = Parameters<TBaseProps['onChange']>[0];

const getValidDate = (initialValue: Date, v: TChangeParam): Date => (!!v && isValid(v) ? v : initialValue);

const InputDate: React.FC<TProps> = (props) => {
  const { value, onChange, format = 'yyyy/MM/dd', initialValue = new Date() } = props;
  const onChangeDate = useCallback(pipe(partial(getValidDate, [initialValue]), onChange), [onChange, initialValue]);
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <KeyboardDatePicker
        {...props}
        id="mui-pickers-date"
        format={format}
        KeyboardButtonProps={{
          'aria-label': 'pickers-date-input',
        }}
        mask="____/__/__"
        onChange={onChangeDate}
        value={value}
      />
    </MuiPickersUtilsProvider>
  );
};

export default InputDate;
