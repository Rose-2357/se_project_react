const baseUrl = "http://localhost:3001/items";

const headers = {
  "Content-Type": "application/json",
};

export function getItems() {
  return fetch(baseUrl)
    .then((res) => (res.ok ? res.json() : Promise.reject(res.status)))
    .catch((err) => Promise.reject(err));
}

export function postItem(data) {
  return fetch(baseUrl, {
    method: "Post",
    headers,
    body: JSON.stringify({
      ...data,
    }),
  }).then((res) => (res.ok ? res.json() : Promise.reject(res.status)));
}
