import React from 'react';
import AppButton from '../AppButton';
import {useFormikContext} from 'formik';
const SubmitButton = ({
  title,
  style = {},
  textStyle = {},
  isGradient = true,
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
      isGradient={isGradient}
    />
  );
};

export default SubmitButton;
