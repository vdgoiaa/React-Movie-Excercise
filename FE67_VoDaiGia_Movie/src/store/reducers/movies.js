import actionType from "../actions/type";
const initialState = {
  movieList:[],
  movieDetails:[],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionType.GET_MOVIE_LIST:
      state.movieList = action.payload;
      return { ...state };
    case actionType.GET_MOVIE_DETAILS:
      state.movieDetails=action.payload;
      return {...state};
    default:
      return state;
  }
};
export default reducer;
