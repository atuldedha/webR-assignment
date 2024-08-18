import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useUserInfo from "../hooks/useUserInfo";

const AuthLayout = () => {
  const { user, dispatch, REDUCER_ACTION } = useUserInfo();
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const userSessionAvailable = sessionStorage.getItem("user");
    if (!user?.isAuthenticated && !userSessionAvailable) {
      navigate("/register", { replace: true });
    } else if (!user?.isAuthenticated && userSessionAvailable) {
      const userEmail = JSON.parse(userSessionAvailable);
      dispatch({
        type: REDUCER_ACTION.LOGIN,
        payload: { userInfo: { email: userEmail }, isAuthenticated: true },
      });
    }
    setLoading(false);
  }, [user, dispatch, REDUCER_ACTION, navigate]);

  return <div>{loading ? <p>Loading</p> : <Outlet />}</div>;
};

export default AuthLayout;
