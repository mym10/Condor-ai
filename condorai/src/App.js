import './App.css';
import React, { useEffect, useState } from "react";
import AddDeviceForm from "./components/AddDeviceForm";
import DeviceList from "./components/DeviceList";
import { getDevices, addDevice, deleteDevice, updateDevice } from "./services/api";

function App() {
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch devices from backend on mount
  useEffect(() => {
    const fetchDevices = async () => {
      try {
        const response = await getDevices();
        setDevices(response.data);
      } catch (err) {
        console.error("Error fetching devices:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDevices();
  }, []);

  // Handle adding a new device
  const handleAddDevice = async (newDevice) => {
    try {
      const response = await addDevice(newDevice);
      setDevices((prev) => [...prev, response.data.device]); // fastapi returns inside `device`
    } catch (err) {
      console.error("Failed to add device:", err);
    }
  };

  // Handle updating device status
  const handleStatusChange = (updatedDevice) => {
    const updated = devices.map((d) =>
      d.id === updatedDevice.id ? updatedDevice : d
    );
    setDevices(updated);
  };

  // Handle deleting a device
  const handleDeleteDevice = async (id) => {
    try {
      await deleteDevice(id);
      setDevices((prev) => prev.filter((d) => d.id !== id));
    } catch (err) {
      console.error("Failed to delete device:", err);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">Device Management</header>
      <main className="main-section">
        <AddDeviceForm onDeviceAdded={handleAddDevice} />
        {loading ? (
          <p>Loading devices...</p>
        ) : (
          <DeviceList
            devices={devices}
            setDevices={setDevices}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteDevice}
          />
        )}
      </main>
    </div>
  );
}

export default App;
