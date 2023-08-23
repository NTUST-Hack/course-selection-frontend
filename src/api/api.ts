const API_URL = import.meta.env.VITE_API_URL;

const fetchAPI = async (method: string, path: string, payload: unknown) => {
  return await fetch(API_URL + path, {
    method: method,
    body: typeof payload !== "undefined" ? JSON.stringify(payload) : undefined,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });
};

export default fetchAPI;
