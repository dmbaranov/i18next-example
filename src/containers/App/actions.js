import * as con from './constants.js';

export function changeLanguage(langFunction) {
  return dispatch => {
    dispatch({
      type: con.CHANGE_LANGUAGE,
      payload: {
        language: langFunction
      }
    });
  }
}