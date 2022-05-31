import React from 'react';
import AppButton from '../AppButton';
import {useFormikContext} from 'formik';
const SubmitButton = ({
  title,
  style = {},
  textStyle = {},
  onSubmit = () => {},
}) => {
  const {handleSubmit} = useFormikContext();
  return (
    <AppButton
      title={title}
      onPress={() => {
        handleSubmit(), onSubmit();
      }}
      style={style}
      textStyle={textStyle}
    />
  );
};

export default SubmitButton;
