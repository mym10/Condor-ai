import { useState } from "react";
import { addDevice } from "../services/api";
import "./AddDeviceForm.css"; // for styling the modal

export default function AddDeviceForm({ onDeviceAdded }) {
  const [device, setDevice] = useState({
    id: "",
    name: "",
    status: "Offline",
    location: "",
    ip_address: ""
  });

  const [showForm, setShowForm] = useState(false);

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
      onDeviceAdded(res.data.device);
      setDevice({
        id: "",
        name: "",
        status: "Offline",
        location: "",
        ip_address: ""
      });
      setShowForm(false);
    } catch (err) {
      console.error("Error adding device:", err.response?.data || err.message);
    }
  };

  return (
    <>
      <button className="open-form-btn" onClick={() => setShowForm(true)}>Add a Device</button>

      {showForm && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add New Device</h2>
            <form onSubmit={handleAdd}>
              <input name="id" value={device.id} onChange={handleChange} placeholder="Device ID" />
              <input name="name" value={device.name} onChange={handleChange} placeholder="Device Name" />
              <input name="location" value={device.location} onChange={handleChange} placeholder="Location" />
              <input name="ip_address" value={device.ip_address} onChange={handleChange} placeholder="IP Address" />
              <select name="status" value={device.status} onChange={handleChange}>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
              </select>
              <div className="form-buttons">
                <button type="submit" className="submit-btn">Add</button>
                <button type="button" className="cancel-btn" onClick={() => setShowForm(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
