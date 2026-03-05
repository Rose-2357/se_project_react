import {
  baseUrl,
  headers,
  handleRes,
  handleError,
  headerWithAuth,
} from "./apiHelpers";

let itemsUrl = baseUrl + "/items";

export function getItems() {
  return fetch(itemsUrl).then(handleRes).catch(handleError);
}

export function postItem(data) {
  return fetch(itemsUrl, {
    method: "POST",
    headers: headerWithAuth(),
    body: JSON.stringify({
      ...data,
    }),
  })
    .then(handleRes)
    .catch(handleError);
}

export function deleteItem(id) {
  return fetch(`${itemsUrl}/${id}`, {
    method: "DELETE",
    headers: headerWithAuth(),
  })
    .then(handleRes)
    .catch(handleError);
}

export function editProfile({ name, avatar }) {
  return fetch(`${baseUrl}/users/me`, {
    method: "PATCH",
    headers: headerWithAuth(),
    body: JSON.stringify({
      name,
      avatar,
    }),
  })
    .then(handleRes)
    .catch(handleError);
}
