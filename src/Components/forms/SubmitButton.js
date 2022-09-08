import React from 'react';
import AppButton from '../AppButton';
import {useFormikContext} from 'formik';
const sleep = ms => new Promise(r => setTimeout(r, ms));

const SubmitButton = ({
  title,
  style = {},
  textStyle = {},
  isGradient = true,
  onSubmit = () => {},
  withSleep = false,
  setLoading = () => {},
}) => {
  const {handleSubmit} = useFormikContext();
  return (
    <AppButton
      title={title}
      onPress={async () => {
        onSubmit(), withSleep && (await sleep(10)), handleSubmit();
      }}
      style={style}
      textStyle={textStyle}
      isGradient={isGradient}
    />
  );
};

export default SubmitButton;
