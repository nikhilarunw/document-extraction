import React from 'react';
import {Field, FieldArray, Form, Formik} from "formik";

const CreateExtractRequest = () => {
  return (
    <div>
      <Formik
        initialValues={{ email: 'nikhil@kredx.com', files: []}}
        onSubmit={(values, actions) => {
        /*
          CallMyApi(user.id, values).then(
            updatedUser => {
              actions.setSubmitting(false);
              updateUser(updatedUser), onClose();
            },
            error => {
              actions.setSubmitting(false);
              actions.setErrors(transformMyAPIErrorToAnObject(error));
            }
          );*/
        }}
        render={({ values, errors, touched, isSubmitting }) => (
          <Form>
            <Field type="email" name="email" />
            {errors.email && touched.email && <div>{errors.email}</div>}
            <FieldArray
            name="files"
            render={arrayHelpers => (
              <div>
                {values.files && values.files.length > 0 ? (
                  values.files.map((file, index) => (
                    <div key={index}>
                      <Field name={`files.${index}`} />
                      <button
                        type="button"
                        onClick={() => arrayHelpers.remove(index)} // remove a file from the list
                      >
                        -
                      </button>
                    </div>
                  ))
                ) : "There are no files."}
                <button type="button" onClick={() => arrayHelpers.push('')}>
                  {/* show this when user has removed all files from the list */}
                  Add a file
                </button>
              </div>
            )}
          />
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      />
    </div>
  );
};

CreateExtractRequest.propTypes = {
};

export default CreateExtractRequest;


