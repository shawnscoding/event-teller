export const createReducer = (initialState, fnMap) => {
  return (state = initialState, { type, payload }) => {
    const handler = fnMap[type];

    return handler ? handler(state, payload) : state;
  };
};

// fnMap contains the object that the dispatch method sent from the event action file.
