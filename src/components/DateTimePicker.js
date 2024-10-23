import React from 'react';
import DatePicker from 'react-native-date-picker';
import {colors} from '../utils';

const DateTimePicker = props => {
  const {isDatePickerVisible, handleConfirm, hideDatePicker} = props;

  return (
    <>
      <DatePicker
        // minimumDate={new Date()}
        modal
        open={isDatePickerVisible}
        date={new Date()}
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={new Date()}
        theme="light"
        // fadeToColor="red"
        textColor={colors.primary}
        {...props}
      />
    </>
  );
};

export default DateTimePicker;
