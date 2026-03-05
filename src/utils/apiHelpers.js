export const baseUrl = "http://localhost:3001";

export const headers = {
  "Content-Type": "application/json",
};

export function handleRes(res) {
  return res.ok ? res.json() : Promise.reject(res.status);
}

export function handleError(err) {
  return Promise.reject(err);
}
