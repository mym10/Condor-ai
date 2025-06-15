import React from "react";
import { FaTrash } from "react-icons/fa";
import { updateDeviceStatus, deleteDevice } from "../services/api";

export default function DeviceList({ devices, setDevices }) {
  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === "Online" ? "Offline" : "Online";
    try {
      await updateDeviceStatus(id, newStatus);
      const updatedDevices = devices.map((device) =>
        device.id === id ? { ...device, status: newStatus } : device
      );
      setDevices(updatedDevices);
    } catch (err) {
      console.error("Failed to update status:", err.response?.data || err.message);
      alert("Couldn't update device status.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteDevice(id);
      const updatedDevices = devices.filter((device) => device.id !== id);
      setDevices(updatedDevices);
    } catch (err) {
      console.error("Failed to delete device:", err.response?.data || err.message);
      alert("Couldn't delete device.");
    }
  };

  return (
    <table className="device-table">
      <thead>
        <tr>
          <th>Device ID</th>
          <th>Device Name</th>
          <th>Location</th>
          <th>IP Address</th>
          <th>Status</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {devices.map((device) => (
          <tr key={device.id}>
            <td>{device.id}</td>
            <td>{device.name}</td>
            <td>{device.location}</td>
            <td>{device.ip_address}</td>
            <td
              onClick={() => handleStatusToggle(device.id, device.status)}
              style={{ color: device.status === "Online" ? "green" : "red", cursor: "pointer" }}
            >
              {device.status}
            </td>
            <td>
              <button onClick={() => handleDelete(device.id)}>
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
