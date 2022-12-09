import { FastField } from "formik";

export const withTextFastField = (Component) => {
  return (props) => (
    <FastField name={props.name}>{() => <Component {...props} />}</FastField>
  );
};
