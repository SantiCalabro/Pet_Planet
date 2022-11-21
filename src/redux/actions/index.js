import axios from "axios";

export const SHOW_DOGS = "SHOW_DOGS";
export const SHOW_DETAIL = "SHOW_DETAIL";
export const SHOW_TEMPS = "SHOW_TEMPS";
export const SHOW_BREEDS = "SHOW_BREEDS";
export const POST_DOG = "POST_DOG";
export const SET_ERROR = "SET_ERROR";
export const GET_CREATED = "GET_CREATED";
export const DOG_UPDATE = "DOG_UPDATE";
export const DOG_DELETE = "DOG_DELETE";
export const GET_FILTERED = "GET_FILTERED";
export const CLEAR_DETAIL = "CLEAR_DETAIL";
export const CLEAR_FILTER = "CLEAR_FILTER";
export const SET_LANGUAGE = "SET_LANGUAGE";

export const showDogs = () => dispatch => {
  return fetch("/dogs")
    .then(res => res.json())
    .then(res => {
      dispatch({ type: SHOW_DOGS, payload: res });
    })
    .catch(() => dispatch({ type: SET_ERROR }));
};
export const showDetail = id => dispatch => {
  return fetch(`/dogs/${id}`)
    .then(res => res.json())
    .then(res => {
      dispatch({ type: SHOW_DETAIL, payload: res });
    })
    .catch(() => dispatch({ type: SET_ERROR }));
};
export const showTemperaments = () => dispatch => {
  return fetch("/temperaments")
    .then(res => res.json())
    .then(res => {
      dispatch({ type: SHOW_TEMPS, payload: res });
    })
    .catch(() => dispatch({ type: SET_ERROR }));
};

export const showBreeds = () => dispatch => {
  return fetch("/breeds")
    .then(res => res.json())
    .then(res => {
      dispatch({ type: SHOW_BREEDS, payload: res });
    })
    .catch(() => dispatch({ type: SET_ERROR }));
};

export const getCreated = () => dispatch => {
  return fetch("/dogs/created")
    .then(res => res.json())
    .then(res => {
      dispatch({ type: GET_CREATED, payload: res });
    })
    .catch(() => dispatch({ type: SET_ERROR }));
};

export const postDog = payload => async dispatch => {
  try {
    const res = await axios.post("/dogs", payload);
    return dispatch({ type: POST_DOG, payload: res.data });
  } catch (e) {
    console.log(e);
    return dispatch({ type: SET_ERROR });
  }
};

export const dogUpdate = (id, payload) => async dispatch => {
  try {
    const res = await axios.put(`/dogs?id=${id}`, payload);
    return dispatch({ type: DOG_UPDATE, payload: res.data });
  } catch {
    return dispatch({ type: SET_ERROR });
  }
};

export const dogDelete = id => async dispatch => {
  try {
    await axios.delete(`/dogs?id=${id}`);
    return dispatch({ type: DOG_DELETE });
  } catch (e) {
    console.log(e);
  }
};

export const getFiltered = payload => {
  return { type: GET_FILTERED, payload };
};

export const clearDetail = () => {
  return { type: CLEAR_DETAIL };
};

export const clearFilter = () => {
  return { type: CLEAR_FILTER };
};

export const setLanguage = payload => {
  return { type: SET_LANGUAGE, payload };
};
