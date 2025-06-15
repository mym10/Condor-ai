import axios from "axios";

const API_URL = "http://localhost:8000";

// GET all devices
export const getDevices = () => {
  return axios.get(`${API_URL}/devices`);
};

// POST: Add a new device
export const addDevice = (device) => {
  return axios.post(`${API_URL}/devices`, device);
};

// DELETE: Remove a device
export const deleteDevice = (id) => {
  return axios.delete(`${API_URL}/devices/${id}`);
};

// PUT: Update a device
export const updateDevice = (id, updatedDevice) => {
  return axios.put(`${API_URL}/devices/${id}`, updatedDevice);
};

// PATCH: Update device status
export const updateDeviceStatus = (id, status) => {
  return axios.patch(`${API_URL}/devices/${id}`, { status });
};
