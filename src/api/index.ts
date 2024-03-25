import axios from 'axios';

export const apiURL = import.meta.env.VITE_API_URL;
export const proxyURL = import.meta.env.VITE_PROXY_URL;
export const proxyPort = import.meta.env.VITE_PROXY_PORT;
export const baseURL = `${proxyURL}:${proxyPort}`;

export const api = axios.create({
  baseURL,
});
