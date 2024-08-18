import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import AuthLayout from "./layout/AuthLayout";
import Dashboard from "./pages/dashboard";
import Login from "./pages/login";
import Register from "./pages/register";
import AppLayout from "./layout/AppLayout";
import { useEffect } from "react";
import useUserInfo from "./hooks/useUserInfo";

function App() {
  const { user, dispatch, REDUCER_ACTION } = useUserInfo();
  useEffect(() => {
    const userSessionAvailable = sessionStorage.getItem("user");
    if (!user?.isAuthenticated && userSessionAvailable) {
      const userEmail = JSON.parse(userSessionAvailable);
      dispatch({
        type: REDUCER_ACTION.LOGIN,
        payload: { userInfo: { email: userEmail }, isAuthenticated: true },
      });
    }
  }, [user, dispatch, REDUCER_ACTION]);

  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Home />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="dashboard" element={<AuthLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;
