import {
  baseUrl,
  headers,
  handleRes,
  handleError,
  headerWithAuth,
} from "./apiHelpers";

export function signUp({ name, avatar, email, password }) {
  return fetch(`${baseUrl}/signup`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      name,
      avatar,
      email,
      password,
    }),
  })
    .then(handleRes)
    .catch(handleError);
}

export function login({ email, password }) {
  return fetch(`${baseUrl}/signin`, {
    method: "POST",
    headers,
    body: JSON.stringify({
      email,
      password,
    }),
  })
    .then(handleRes)
    .then(({ token }) => {
      localStorage.setItem("jwt", token);
    })
    .catch(handleError);
}

export function getCurrentUser() {
  return fetch(`${baseUrl}/users/me`, {
    headers: headerWithAuth(),
  })
    .then(handleRes)
    .catch(handleError);
}
