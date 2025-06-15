import { deleteDevice } from "../services/api";

export default function DeleteDeviceButton({ deviceId, onDeleted }) {
  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this device?")) return;
    try {
      await deleteDevice(deviceId);
      onDeleted(deviceId);
    } catch (err) {
      console.error("Failed to delete device:", err.response?.data || err.message);
      alert("Failed to delete device. Try again?");
    }
  };


  return (
    <button
      onClick={handleDelete}
      className="bg-red-500 px-3 py-1 rounded text-white hover:bg-red-600"
    >
      Delete
    </button>
  );
}
