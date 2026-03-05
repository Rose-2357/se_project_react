import { baseUrl, headers, handleRes, handleError } from "./apiHelpers";

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
    .catch(handleError);
}
