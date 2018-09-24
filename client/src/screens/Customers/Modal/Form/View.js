import React from "react";
import { Formik } from "formik";
import * as Yup from "yup";

import { extractDate } from "utils/date";
import Loading from "screens/Customers/Loading";
import Input from "screens/Customers/Modal/Input";
import {
  FormWrapper,
  FormGroup,
  Label,
  SelectWrapper,
  Select,
  ArrowDown,
  TextArea
} from "./styles";

const schema = {
  id: Yup.number().positive("Invalid"),
  name: Yup.string(),
  email: Yup.string().email(),
  status: Yup.string().matches(
    /^(prospective|current|non-active)$/,
    "Invalid status"
  ),
  createdAt: Yup.string().matches(
    /([12]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01]))/,
    "Invalid date"
  )
};

const View = ({ isLoading, isSearch, formValues, onSubmit, onReset }) => (
  <Formik
    initialValues={{
      id: formValues.id || "",
      name: formValues.name || "",
      email: formValues.email || "",
      status: formValues.status || "",
      createdAt:
        formValues.createdAt || extractDate(formValues.created_at) || "",
      ...(isSearch
        ? {}
        : (formValues.notes || []).reduce(
            (result, note) => {
              result[`note-${note.id}`] = note.body;
              return result;
            },
            { "note-new": "" }
          ))
    }}
    onSubmit={onSubmit}
    onReset={onReset}
    validationSchema={Yup.object().shape({
      ...schema,
      status: isSearch ? schema.status : schema.status.required("Required"),
      ...(isSearch
        ? {}
        : (formValues.notes || []).reduce(
            (result, note) => {
              result[`note-${note.id}`] = Yup.string().required("Required");
              return result;
            },
            { "note-new": Yup.string() }
          ))
    })}
  >
    {({
      values,
      touched,
      errors,
      handleChange,
      handleBlur,
      handleSubmit,
      handleReset
    }) => (
      <FormWrapper onSubmit={handleSubmit} onReset={handleReset}>
        {isLoading && <Loading full absolute />}
        <FormGroup>
          <Label htmlFor="id">Id</Label>
          <Input
            id="id"
            name="id"
            placeholder="Customer id"
            type="number"
            min="1"
            value={values.id}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!isSearch}
            error={!!errors.id && touched.id}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Jon Snow"
            type="text"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!isSearch}
            error={!!errors.name && touched.name}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            placeholder="jon.snow@winterfell.gov"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!isSearch}
            error={!!errors.email && touched.email}
          />
        </FormGroup>
        <FormGroup>
          <Label htmlFor="status">Status</Label>
          <SelectWrapper>
            <Select
              id="status"
              name="status"
              value={values.status}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.status && touched.status}
            >
              <option value="" />
              <option value="prospective">prospective</option>
              <option value="current">current</option>
              <option value="non-active">non-active</option>
            </Select>
            <ArrowDown />
          </SelectWrapper>
        </FormGroup>
        <FormGroup>
          <Label htmlFor="createdAt">Created at</Label>
          <Input
            id="createdAt"
            name="createdAt"
            type="date"
            value={values.createdAt}
            onChange={handleChange}
            onBlur={handleBlur}
            disabled={!isSearch}
            error={!!errors.createdAt && touched.createdAt}
          />
        </FormGroup>
        {!isSearch && (
          <FormGroup>
            <Label htmlFor="note-new">Notes</Label>
            <TextArea
              id="note-new"
              name="note-new"
              placeholder="New note"
              value={values["note-new"]}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors["note-new"] && touched["note-new"]}
            />
            {(formValues.notes || []).map((note) => (
              <TextArea
                key={String(note.id)}
                id={`note-${note.id}`}
                name={`note-${note.id}`}
                value={values[`note-${note.id}`]}
                onChange={handleChange}
                onBlur={handleBlur}
                error={
                  !!errors[`note-${note.id}`] && touched[`note-${note.id}`]
                }
              />
            ))}
          </FormGroup>
        )}
        <Input type="reset" value={isSearch ? "Reset" : "Cancel"} />
        <Input type="submit" value="Submit" />
      </FormWrapper>
    )}
  </Formik>
);

export default View;
