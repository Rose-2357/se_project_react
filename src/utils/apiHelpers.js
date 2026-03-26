export const baseUrl =
  process.env.NODE_ENV === "production"
    ? "https://api.rose-ghaffari-wtwr.privatedns.org"
    : "http://localhost:3001";

export const headers = {
  "Content-Type": "application/json",
};

export const headerWithAuth = () => ({
  ...headers,
  Authorization: authorization(),
});

const authorization = () => {
  const token = localStorage.getItem("jwt");
  return `Bearer ${token}`;
};

export function handleRes(res) {
  return res.ok ? res.json() : Promise.reject(res.status);
}

export function handleError(err) {
  return Promise.reject(err);
}
