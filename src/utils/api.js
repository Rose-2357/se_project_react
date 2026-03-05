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
  return fetch(`${baseUrl}/${id}`, {
    method: "DELETE",
    headers: headerWithAuth(),
  })
    .then(handleRes)
    .catch(handleError);
}
