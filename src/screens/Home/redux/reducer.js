const initialState = {
  _choosenUser: {},
};

export const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_CHOOSENUSER':
      return {
        ...state,
        _choosenUser: action.payload,
      };

    default:
      return state;
  }
};
