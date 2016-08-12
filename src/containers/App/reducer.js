import * as con from './constants.js';

const initialState = {
  language: ''
}

export default function globalState (state = initialState, action) {
  switch (action.type) {
    case con.CHANGE_LANGUAGE:
      return { ...state, language: action.payload.language }
    default :
      return state;
  }
}