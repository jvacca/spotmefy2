import * as Action from '../actions';

const initialState = {
  error: null,
  response: {},
  isLoading: false,
}

const fetchedData = (state = initialState, action) => {
  switch(action.type) {
    
    case Action.DATA_LOADED:
      //console.log("******** data loaded", action)
      return {
        ...state,
        response: action.payload,
        [action.which]: action.payload
      }
    default:
      return state;
  }
}




export default fetchedData;