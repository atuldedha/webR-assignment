const BASE_URL = "https://reqres.in/api";

export const REQUEST_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  DELETE: "DELETE",
};

export const ENDPOINTS = {
  LOGIN: {
    method: REQUEST_METHODS.POST,
    endpoint: `${BASE_URL}/users/`,
  },
  SIGNUP: {
    method: REQUEST_METHODS.POST,
    endpoint: `${BASE_URL}/users/`,
  },
};
