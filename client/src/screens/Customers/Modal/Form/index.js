import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

const Form = ({ isSearch }) => (
  <Formik
    initialValues={{ id: "", name: "", email: "", status: "", createdAt: "" }}
    validationSchema={Yup.object().shape({
      id: Yup.number().positive("Invalid"),
      name: Yup.string(),
      email: Yup.string().email(),
      status: Yup.string().matches(
        /^(prospective|current|non\-active)$/,
        "Invalid status"
      ),
      createdAt: Yup.string().matches(
        /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
        "Invalid date"
      ),
      note: Yup.string()
    })}
  >
    {({
      values,
      touched,
      errors,
      dirty,
      isSubmitting,
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset
    }) => (
      <form onSubmit={handleSubmit}>
        <label htmlFor="id">Id</label>
        <input
          id="id"
          name="id"
          placeholder="Customer id"
          type="number"
          min="1"
          value={values.id}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.id && touched.id}
        />
        <label htmlFor="name">Name</label>
        <input
          id="name"
          name="name"
          placeholder="John Snow"
          type="text"
          value={values.name}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.name && touched.name}
        />
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          placeholder="john.snow@winterfell.gov"
          type="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.email && touched.email}
        />
        <label htmlFor="status">Status</label>
        <select id="status" name="status">
          <option value="" />
          <option value="prospective">prospective</option>
          <option value="current">current</option>
          <option value="non-active">non-active</option>
        </select>
        <label htmlFor="createdAt">Created at</label>
        <input
          id="createdAt"
          name="createdAt"
          type="date"
          value={values.createdAt}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.createdAt && touched.createdAt}
        />
        <label htmlFor="note">Created at</label>
        <textarea
          id="note"
          name="note"
          value={values.note}
          onChange={handleChange}
          onBlur={handleBlur}
          error={!!errors.note && touched.note}
        />
        <input type="reset" value="Reset" />
        <input type="submit" value="Submit" />
      </form>
    )}
  </Formik>
);

export default Form;
