function errorHandler(error, req, res, next) {
  let status = 500;
  let message = "Internal Server Error";
  console.log(error, "this is in error handler");

  switch (error.name) {
    case "unauthenticated":
    case "JsonWebTokenError":
      status = 401;
      message = "Invalid Token";
      break;
    case "unverified":
      status = 401;
      message = "Email isn't verified, please check your email message for the verification link";
      break;
    case "not_valid":
      status = 401;
      message = "Invalid email or password";
      break;
    case "email_verification_not_valid":
      status = 400;
      message = "Email Verification Link is not valid";
      break;
    case "invalid_email_or_password":
      status = 400;
      message = "Email or Password is required";
      break;
    case "invalid_password":
      status = 400;
      message = "Invalid password";
      break;
    case "Password doesn't match":
      status = 400;
      message = "Password doesn't match";
      break;
    case "notStrongPassword":
      status = 400;
      message = "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character";
      break;
    case "verification_not_valid":
      status = 400;
      message = error.name;
      break;
    case "invalid_data":
      status = 400;
      message = "Invalid data";
      break;
    case "SequelizeUniqueConstraintError":
    case "SequelizeValidationError":
    case "ValidationErrorItem":
      status = 400;
      message = error.errors[0].message;
      break;
    case "empty_input":
      status = 400;
      message = "Please fill all the fields";
      break;
  }

  res.status(status).json({ message });
}

module.exports = errorHandler;
