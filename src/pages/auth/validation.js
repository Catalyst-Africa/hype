export const validation = (formData, key, value) => {
  let error;

  if (key !== null && value.length === 0) {
    const error = `The ${key.split(" ")[0]} field is required!`;
    return error;
  } else if (key === "email") {
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,6}$/i.test(value)) {
      error = "Invalid email address!";
      return error;
    }
  } else if (key === "password") {
    if (
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/.test(
        value,
      )
    ) {
      error =
        "Password must be between 8-20 characters long and must contain one uppercase, lowercase, number and special character.";
      return error;
    }
  } else if (key === "confirm_password") {
    if (value !== formData.password) {
      error = "Passwords do not match";
      return error;
    }
  }
};
