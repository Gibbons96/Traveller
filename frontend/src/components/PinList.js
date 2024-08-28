import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PinList.css"; 

const PinList = () => {
  const [pins, setPins] = useState([]);

  useEffect(() => {
    const fetchPins = async () => {
      const res = await axios.get("/pins");
      setPins(res.data);
    };
    fetchPins();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/pins/${id}`);
      setPins(pins.filter((pin) => pin._id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="pin-list-container">
      <h2 className="pin-list-title">Pins</h2>
      <table className="pin-list-table">
        <thead>
          <tr>
            <th>Username</th>
            <th>Title</th>
            <th>Description</th>
            <th>Rating</th>
            <th>Longitude</th>
            <th>Latitude</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {pins.map((pin) => (
            <tr key={pin._id}>
              <td>{pin.username}</td>
              <td>{pin.title}</td>
              <td>{pin.desc}</td>
              <td>{pin.rating}</td>
              <td>{pin.long}</td>
              <td>{pin.lat}</td>
              <td>
                <button className="action-button delete" onClick={() => handleDelete(pin._id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PinList;
