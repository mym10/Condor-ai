import { useState } from "react";
import { addDevice } from "../services/api";

export default function AddDeviceForm({ onDeviceAdded }) {
  const [device, setDevice] = useState({
    id: "",
    name: "",
    status: "Offline",
    location: "",
    ip_address: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDevice((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!device.id || !device.name || !device.location || !device.ip_address) return;
    try {
      const res = await addDevice(device);
      onDeviceAdded(res.data.device); // FastAPI response wraps it
      setDevice({
        id: "",
        name: "",
        status: "Offline",
        location: "",
        ip_address: ""
      });
    } catch (err) {
      console.error("Error adding device:", err.response?.data || err.message);
    }
  };

  return (
    <form className="add-form" onSubmit={handleAdd}>
      <input name="id" value={device.id} onChange={handleChange} placeholder="Device ID" />
      <input name="name" value={device.name} onChange={handleChange} placeholder="Device Name" />
      <input name="location" value={device.location} onChange={handleChange} placeholder="Location" />
      <input name="ip_address" value={device.ip_address} onChange={handleChange} placeholder="IP Address" />
      <select name="status" value={device.status} onChange={handleChange}>
        <option value="Online">Online</option>
        <option value="Offline">Offline</option>
      </select>
      <button type="submit" className="add-btn">Add Device</button>
    </form>
  );
}
