import React from "react";
import { useFormik } from "formik";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import FormHelperText from "@material-ui/core/FormHelperText";
import Button from "@material-ui/core/Button";
import locales from "../locales";
import { useRouter } from "next/router";

const { buildYup } = require("json-schema-to-yup");

const Form = ({ schema }) => {
  const router = useRouter();
  const { locale: activeLocale, defaultLocale } = router;
  const t = activeLocale ? locales[activeLocale] : locales[defaultLocale];

  const yupSchema = buildYup(schema, { errMessages: schema.errMessages });
  const formik = useFormik({
    initialValues: {},
    validationSchema: yupSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <div className="form-lay">
      <h3>{schema.title}</h3>
      <h5>{schema.description}</h5>
      <form onSubmit={formik.handleSubmit}>
        <div>
          {!!Object.keys(schema.properties).length &&
            Object.keys(schema.properties).map((key) => (
              <>
                <FormControl key={key}>
                  <InputLabel htmlFor={key}>{key}</InputLabel>
                  <Input
                    id={key}
                    name={key}
                    type="text"
                    onChange={formik.handleChange}
                  />
                  {formik.errors[key] ? (
                    <FormHelperText error id={key}>``
                      {formik.errors[key]}
                    </FormHelperText>
                  ) : null}
                </FormControl>
                <br />
              </>
            ))}
        </div>
        <br />
        <Button type="submit" variant="contained" color="primary">
          {t.submit}
        </Button>
      </form>
    </div>
  );
};

export default Form;
