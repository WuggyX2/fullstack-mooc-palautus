const initialState = "";

export const createSetFilter = (content) => {
  return {
    type: "SET_FILTER",
    data: content,
  };
};

const reducer = (state = initialState,  action) => {
  switch (action.type) {
    case "SET_FILTER": {
      return action.data;
    }
    default:
      return state;
  }

}

export default reducer;
