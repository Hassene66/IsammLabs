import React from 'react';
import {Formik} from 'formik';
const AppForm = ({
  initialValues,
  onSubmit,
  validationSchema,
  children,
  innerRef = null,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
      innerRef={innerRef}>
      {() => <>{children}</>}
    </Formik>
  );
};

export default AppForm;
