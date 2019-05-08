import React from 'react';
import { withRouter } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const EditProfile = ({
  history,
  user: { firstName, age, email, gender },
  handleEditProfile,
  handleDeleteProfile,
}) => {
  const initialValues = {
    firstName,
    age,
    gender,
    email,
    password: '',
  };

  const editProfileSchema = Yup.object().shape({
    firstName: Yup
      .string()
      .typeError('Only normal characters allowed')
      .required('Required'),
    age: Yup
      .number()
      .positive()
      .integer()
      .typeError('Only normal characters allowed')
      .required('Required'),
    gender: Yup
      .string()
      .typeError('Only normal characters allowed'),
    email: Yup
      .string()
      .email()
      .min(2, 'Too short!')
      .typeError('Only normal characters allowed')
      .required('Required'),
    password: Yup
      .string()
      .min(2, 'Too short!')
      .typeError('Only normal characters allowed'),
  });
  return (
    <div className="edit">
      <h1>Edit Profile</h1>
      <Formik
        initialValues={initialValues}
        validationSchema={editProfileSchema}
        onSubmit={(values, { resetForm, setSubmitting }) => {
          let updates = {};
          const valKeys = Object.keys(values);
          valKeys.forEach(v => {
            if (values[v] !== '') updates[v] = values[v];
          });
          handleEditProfile(updates)
            .then(r => history.push('/profile'));
          setSubmitting(false);
        }}
      >
        {({ isSubmitting }) => (
          <Form autoComplete="off" className="form">
            <div className="form-inner-container">
              <div className="field">
                <Field
                  type="text"
                  name="firstName"
                  component="input"
                  className="form-input"
                  placeholder="First Name"
                />
                <ErrorMessage name="firstName" component="div" className="error-message" />
              </div>
              <div className="field">
                <Field
                  type="age"
                  name="age"
                  component="input"
                  className="form-input"
                  placeholder="Age"
                />
                <ErrorMessage name="age" component="div" className="error-message" />
              </div>
              <div className="field">
                <Field
                  type="gender"
                  name="gender"
                  component="input"
                  className="form-input"
                  placeholder="Gender"
                />
                <ErrorMessage name="gender" component="div" className="error-message" />
              </div>
              <div className="field">
                <Field
                  type="email"
                  name="email"
                  component="input"
                  className="form-input"
                  placeholder="Email"
                />
                <ErrorMessage name="email" component="div" className="error-message" />
              </div>
              <div className="field">
                <Field
                  type="password"
                  name="password"
                  component="input"
                  className="form-input"
                  placeholder="New Password (optional)"
                />
                <ErrorMessage name="password" component="div" className="error-message" />
              </div>
              <button type="submit" className="black">
                {isSubmitting ? 'Loading' : 'Save'}
              </button>
            </div>
          </Form>
        )}
      </Formik>
      <button
        className="ghost"
        onClick={() => handleDeleteProfile()}
      >
        Delete Profile
      </button>
    </div>
  );
}

export default withRouter(EditProfile);
