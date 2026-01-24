const baseUrl = "http://localhost:3001/items";

const headers = {
  "Content-Type": "application/json",
};

function handleRes(res) {
  return res.ok ? res.json() : Promise.reject(res.status);
}

function handleError(err) {
  return Promise.reject(err);
}

export function getItems() {
  return fetch(baseUrl).then(handleRes).catch(handleError);
}

export function postItem(data) {
  return fetch(baseUrl, {
    method: "Post",
    headers,
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
    headers,
  })
    .then(handleRes)
    .catch(handleError);
}
