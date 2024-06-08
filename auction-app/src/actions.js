export const loginUser = (user) => ({
  type: "LOGIN",
  payload: user,
});

export const logoutUser = () => ({
  type: "LOGOUT",
  payload: null,
});

export const updateUser = (name) => ({
  type: "UPDATE_USER",
  payload: name,
});
