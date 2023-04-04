import axios from "axios";
export let API = axios.create({
  baseURL: `https://nearby-charging-station.onrender.com/api/v1`,
});

export async function getApi(endPoint, headers = null, query = null) {
  const response = await API.get(`${endPoint}`, {
    headers: headers,
    params: query,
  });
  return response;
}
export async function postApi(endPoint, body = null, headers = null) {
  const response = await API.post(`${endPoint}`, body, {
    headers: headers,
  });

  return response;
}
export async function deleteApi(
  endPoint,
  body = null,
  headers = {},
  query = {}
) {
  const response = await API.delete(`${endPoint}`, body, {
    headers: headers,
    params: query,
  });
  return response;
}
export async function putApi(endPoint, body = {}, headers = {}, query = {}) {
  const response = await API.put(`${endPoint}`, body, {
    headers: headers,
    params: query,
  });
  return response;
}
