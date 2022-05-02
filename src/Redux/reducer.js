const init = {
  isLoggedIn: false,
  user: {},
};

export const loginReducer = (store = init, { type, payload }) => {
  switch (type) {
    case "LOGIN":
      return { isLoggedIn: true, user: payload };
    case "LOGOUT":
      return { isLoggedIn: false, user: {} };
    default:
      return store;
  }
};
