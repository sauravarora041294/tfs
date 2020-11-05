enum MyAccountErrors {
  EMAIL_ERROR = "Request failed with status code 400",
  PASSWORD_ERROR = "The password is invalid or the user does not have a password.",
}
enum MyAccountErrorResponses {
  EMAIL_ERROR = "Please provide a valid email and retry",
  PASSWORD_ERROR = "The password you entered is incorrect.",
}
export { MyAccountErrors, MyAccountErrorResponses };
