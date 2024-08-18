import { useState } from "react";
import Form from "../components/Form";
import useUserInfo from "../hooks/useUserInfo";
import { ENDPOINTS } from "../constants/api-constants";
import { makeApiCall } from "../services/ApiRequests";
import { Link, useNavigate } from "react-router-dom";
import { FormState } from "../types/types";

function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<FormState>({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisable, setButtonDisable] = useState<boolean>(false);
  const { REDUCER_ACTION, dispatch } = useUserInfo();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setButtonDisable(true);

    if (buttonDisable) return;

    if (
      formData.email.trim() &&
      formData.password.trim() &&
      formData.username.trim()
    ) {
      const { method, endpoint } = ENDPOINTS.SIGNUP;
      try {
        makeApiCall(
          method,
          endpoint,
          () => {
            dispatch({
              type: REDUCER_ACTION.LOGIN,
              payload: {
                userInfo: { email: formData.email },
                isAuthenticated: true,
              },
            });
            navigate("/dashboard");
          },
          (err) => {
            console.log(err);
          },
          { ...formData }
        );
      } catch (error) {
        console.error("Login failed", error);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen bg-gray-100">
      <Form
        handleSubmit={handleSubmit}
        formData={formData}
        setFormData={setFormData}
        buttonText="Sign Up"
        disableButton={buttonDisable}
      />

      <p className="font-normal text-gray-700">
        Go to{" "}
        <Link
          to={"/login"}
          replace
          className="underline text-blue-500 font-semibold"
        >
          Login
        </Link>
      </p>
    </div>
  );
}
export default Register;
