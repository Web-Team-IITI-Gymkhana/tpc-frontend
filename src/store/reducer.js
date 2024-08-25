import Actions from "./actions";

const initState = {
  auth: "",
};

const reducer = (state = initState, action) => {
  switch (action.type) {
    case Actions.SET_AUTH:
      return {
        ...state,
        auth: action.auth,
      };
    default:
      return state;
  }
};

export default reducer;
