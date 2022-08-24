
export const AUTH_START = 'AUTH_START';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_FAIL = 'AUTH_FAIL';
export const LOGOUT_START = 'LOGOUT_START';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const LOGOUT_FAIL = 'LOGOUT_FAIL';
export const ADD_ITEM = 'ADD_ITEM';
export const REMOVE_ITEM = 'REMOVE_ITEM';
export const DELETE_ITEM = 'DELETE_ITEM';
export const TOGGLE_CART = 'TOGGLE_CART';




export const authStart = (payload) => ({
  type: AUTH_START,
  payload,
});

export const authSuccess = (payload) => ({
  type: AUTH_SUCCESS,
  payload,
});

export const authFail = (payload) => ({
  type: AUTH_FAIL,
  payload,
});

export const logoutStart = () => ({
  type: LOGOUT_START,
});

export const logoutFail = () => ({
  type: LOGOUT_FAIL,
});

export const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});

// =================== cart =================
export const addItem = (payload) => {
  return {
    type: ADD_ITEM,
    payload
  }
};
export const removeItem = (payload) => {
  return {
    type: REMOVE_ITEM,
    payload
  }
};
export const deleteItem = (payload) => {
  return {
    type: DELETE_ITEM,
    payload
  }
};
// ===== toggle bar ========
export const toggleCart = () => {
  return {
    type: TOGGLE_CART,
  }
};