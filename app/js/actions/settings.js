export const SET_URL = 'SET_URL'
export const SET_TOKEN = 'SET_TOKEN'

export function setUrl() {
  return {
    type: SET_URL
  }
}

export function setToken() {
  return {
    type: SET_TOKEN
  }
}

// export function incrementIfOdd() {
//   return (dispatch, getState) => {
//     const { counter } = getState();
//
//     if (counter % 2 === 0) {
//       return;
//     }
//
//     dispatch(increment());
//   };
// }
//
// export function incrementAsync(delay = 1000) {
//   return dispatch => {
//     setTimeout(() => {
//       dispatch(increment());
//     }, delay);
//   };
// }
