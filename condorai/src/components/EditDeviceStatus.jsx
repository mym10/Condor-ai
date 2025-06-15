import { useState } from "react";
import { updateDeviceStatus } from "../services/api";

export default function EditStatusButton({ device, onStatusChange }) {
  const [loading, setLoading] = useState(false);

  const handleToggle = async () => {
    try {
      setLoading(true);
      const newStatus = device.status === "Online" ? "Offline" : "Online";
      await updateDeviceStatus(device.id, newStatus);
      onStatusChange({ ...device, status: newStatus });
    } catch (err) {
      console.error("Failed to update device status:", err);
    } finally {
      setLoading(false);
    }
  };

  const buttonClasses = `
    px-3 py-1 rounded text-white transition-colors duration-200
    ${device.status === "Online" ? "bg-yellow-600 hover:bg-yellow-700" : "bg-green-600 hover:bg-green-700"}
    ${loading ? "opacity-50 cursor-not-allowed" : ""}
  `;

 return (
  <button onClick={handleToggle} disabled={loading} className={buttonClasses}>
    {loading
      ? "Updating..."
      : device.status === "Online"
        ? "Set Offline"
        : "Set Online"}
  </button>
);
}