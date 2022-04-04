import React from 'react';
import {useFormikContext} from 'formik';
import TextInput from '../PaperInput';
import ErrorMessage from './ErrorMessage';
const AppFormField = ({name, width, placeholder, ...otherProps}) => {
  const {handleChange, setFieldTouched, errors, touched} = useFormikContext();
  return (
    <>
      <TextInput
        onChangeText={handleChange(name)}
        onBlur={() => setFieldTouched(name)}
        width={width}
        placeholder={placeholder}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

export default AppFormField;
