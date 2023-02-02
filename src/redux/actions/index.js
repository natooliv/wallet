export const USER = 'USER';
// export const user = (value) => ({ type: USER, value });
export const user = (email) => ({
  type: USER,
  payload: email,
});
