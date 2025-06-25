from fastapi import FastAPI, HTTPException, Body
from pydantic import BaseModel, Field
from typing import Dict
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

devices: Dict[str, dict] = {}

class Device(BaseModel):
    id: str = Field(..., example="device001")
    name: str = Field(..., example="Edge Node 1")
    status: str = Field(..., example="Online")
    location: str = Field(..., example="Building A")
    ip_address: str = Field(..., example="192.168.0.101")

@app.get("/devices")
def get_devices():
    return list(devices.values())


@app.post("/devices")
def create_device(device: Device):
    if device in devices.values():
        raise HTTPException(status_code=400, detail="Device already exists.")
    devices[device.id] = device.dict()
    return {"message": "Device created", "device":devices[device.id]}

@app.put("/devices/{id}")
def update_device(id: str, updated_device: Device):
    if id not in devices:
        raise HTTPException(status_code=404, detail="Device not found.")
    devices[id] = updated_device.dict()
    return {"message": f"Device {id} updated successfully", "device": updated_device}

@app.delete("/devices/{id}")
def delete_device(id: str):
    if id not in devices:
        raise HTTPException(status_code=404, detail="Device not found.")
    del devices[id]
    return {"message": f"Device {id} deleted successfully"}

@app.patch("/devices/{id}")
def patch_device_status(id: str, status: str = Body(..., embed=True)):
    if id not in devices:
        raise HTTPException(status_code=404, detail="Device not found.")
    devices[id]["status"] = status
    return {"message": f"Device {id} status updated to {status}"}