export const createReducer = (initialState, fnMap) => {
  return (state = initialState, { type, payload }) => {
    // console.log(type);
    const handler = fnMap[type];
    // console.log(fnMap);

    return handler ? handler(state, payload) : state;
  };
};

// fnMap contains the object that the dispatch method sent from the event action file.
