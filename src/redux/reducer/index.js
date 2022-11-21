import {
  SHOW_DOGS,
  SHOW_DETAIL,
  SHOW_TEMPS,
  SHOW_BREEDS,
  POST_DOG,
  SET_ERROR,
  GET_CREATED,
  DOG_UPDATE,
  DOG_DELETE,
  GET_FILTERED,
  CLEAR_DETAIL,
  CLEAR_FILTER,
  SET_LANGUAGE,
} from "../actions/index";

const initialState = {
  showDogs: [],
  filteredDogs: [],
  dogDetail: {},
  showTemperaments: [],
  showBreeds: [],
  created: [],
  error: {},
  language: "English",
};

function rootReducer(state = initialState, action) {
  switch (action.type) {
    case SHOW_DOGS:
      return {
        ...state,
        showDogs: action.payload,
      };
    case SHOW_DETAIL:
      return {
        ...state,
        dogDetail: action.payload,
      };
    case SHOW_BREEDS:
      return {
        ...state,
        showBreeds: action.payload,
      };
    case SET_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    case SHOW_TEMPS:
      return {
        ...state,
        showTemperaments: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: "error",
      };
    case GET_FILTERED:
      return {
        ...state,
        filteredDogs: action.payload,
      };

    case GET_CREATED:
      return {
        ...state,
        created: action.payload,
      };

    case POST_DOG:
      return {
        ...state,
        showDogs: [...state.showDogs, action.payload],
      };

    case CLEAR_DETAIL:
      return {
        ...state,
        dogDetail: [],
      };
    case CLEAR_FILTER:
      return {
        ...state,
        filteredDogs: [],
      };
    case DOG_UPDATE:
      return {
        ...state,
        showDogs: [...state.showDogs, action.payload],
      };
    case DOG_DELETE:
      return {
        ...state,
        showDogs: [state.showDogs],
      };
    default:
      return state;
  }
}

export default rootReducer;
