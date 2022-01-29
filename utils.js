// Funtion to return error messages ["oneOf", "enum", "required", "notRequired", "minDate", "min", "maxDate", "max", "trim", "lowercase", "uppercase", "email", "url", "minLength", "maxLength", "pattern", "matches", "regex", "integer", "positive", "minimum", "maximum"]
export const errorMessages = (type) => {
  switch (type) {
    case "required":
      return "campo requerido";
    case "minimum":
      return ({ minimum }) => `debe ser mayor o igual que ${minimum}`;
    case "maximum":
      return ({ maximum }) => `debe ser menor o igual que ${maximum}`;
    case "maxLength":
      return ({ maxLength }) =>
        `debe ser tener menos de ${maxLength} caracteres`;
    default:
      return null;
  }
};

// function to retun errormessages object like this:
// {
//   age: {
//     required: "A person must have an age"
//   },
//   email: {
//     required: "You must enter an email address",
//     format: "Not a valid email address"
//   }
// }
export const getErrorMessages = (jsonSchema) => {
  const errMessages = {};
  Object.keys(jsonSchema.properties).forEach((property) => {
    errMessages[property] = {};
    Object.keys(jsonSchema.properties[property]).forEach((key) => {
      errMessages[property][key] = errorMessages(key);
      if (Object.keys(jsonSchema).includes(key)) {
        errMessages[property].required = errorMessages("required");
      }
    });
  });
  return errMessages;
};
