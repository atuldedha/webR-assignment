import React from "react";
import { useNavigate } from "react-router-dom";
import useUserInfo from "../hooks/useUserInfo";

const Dashboard: React.FC = () => {
  const { user, REDUCER_ACTION, dispatch } = useUserInfo();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch({
      type: REDUCER_ACTION.LOGOUT_USER,
    });
    navigate("/login");
  };

  return (
    <div className="p-8">
      <h1 className="text-3xl">Dashboard</h1>
      <h4>{user.userInfo?.email}</h4>
      <button
        onClick={handleLogout}
        className="bg-red-500 text-white p-2 mt-4 rounded"
      >
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
