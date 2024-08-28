import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UserList from "./UserList";
import PinList from "./PinList";

const AdminDashboard = () => {
  return (
    <>
      <UserList />
      <PinList />
    </>
  );
};

export default AdminDashboard;
