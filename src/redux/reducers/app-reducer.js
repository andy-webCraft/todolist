const INITIALIZED_TOGGLE = "INITIALIZED-TOGGLE";
const LOADING_TOGGLE = "LOADING-TOGGLE";
const REQUESTING_TOGGLE = "REQUESTING-TOGGLE";
const NEW_ERROR = "NEW-ERROR";

let initialState = {
  isInitialized: false,
  isLoading: false,
  isRequesting: false,
  error: null,
};

let appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_TOGGLE: {
      return { ...state, isInitialized: action.status };
    }
    case LOADING_TOGGLE: {
      return { ...state, isLoading: action.status };
    }
    case REQUESTING_TOGGLE: {
      return { ...state, isRequesting: action.status };
    }
    case NEW_ERROR: {
      return { ...state, error: action.errorText };
    }
    default:
      return state;
  }
};

export const initializedToogle = (status) => {
  return { type: INITIALIZED_TOGGLE, status };
};

export const loadingToogle = (status) => {
  return { type: LOADING_TOGGLE, status };
};

export const requestingToogle = (status) => {
  return { type: REQUESTING_TOGGLE, status };
};

export const addNewError = (errorText) => {
  return { type: NEW_ERROR, errorText };
};

export default appReducer;
