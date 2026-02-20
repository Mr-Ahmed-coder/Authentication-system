import axios from 'axios';

const API_BASE = '/api';

export async function registerUser(payload) {
  const res = await axios.post(`${API_BASE}/auth/register`, payload);
  return res.data;
}

export async function loginUser(payload) {
  const res = await axios.post(`${API_BASE}/auth/login`, payload);
  return res.data;
}

export async function getMe() {
  const res = await axios.get(`${API_BASE}/users/me`);
  return res.data;
}

