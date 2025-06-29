const isEmail = (email: String) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

const isMobile = (mobile: String) => {
  return String(mobile)
    .split("#")[1]
    .match(/^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/);
};

const isValidPassword = (password: String) => {
  return String(password).match(
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/
  );
};

export default {
  isEmail,
  isMobile,
  isValidPassword,
};
