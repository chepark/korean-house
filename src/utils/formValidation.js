export const validateSignupForm = (values, setErrors) => {
  let errors = {};
  const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  // validate username
  if (!values.username) {
    errors.username = "User Name is required.";
  } else if (values.username.length < 2) {
    errors.username = "User name is too short.";
  }

  // validate email
  if (!values.email) {
    errors.email = "Email is required.";
  } else if (!emailRegEx.test(values.email)) {
    errors.email = "Email address is invalid.";
  }

  // validate password
  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 6) {
    errors.password = "Password should be 6 characters.";
  }

  // validate confirmpassword
  if (values.password !== values.confirmPassword) {
    errors.confirmPassword = "Passwords do not match.";
  }

  if (Object.keys(errors).length === 0) {
    setErrors(false);
  } else {
    setErrors(errors);
  }
};

export const validateLoginForm = (values, setErrors) => {
  let errors = {};
  const emailRegEx = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  // validate email
  if (!values.email) {
    errors.email = "Email is required.";
  } else if (!emailRegEx.test(values.email)) {
    errors.email = "Email address is invalid.";
  }

  // validate password
  if (!values.password) {
    errors.password = "Password is required.";
  } else if (values.password.length < 6) {
    errors.password = "Password should be 6 characters.";
  }

  if (Object.keys(errors).length === 0) {
    setErrors(false);
  } else {
    console.log("m");
    setErrors(errors);
  }
};
