////Example using Axios for APIs
import axios from "axios";
import { fetchUserDashboard } from "./userActionCreators";
const authAxios = axios.create({
  baseURL: "https://incit-exam.flixy.online/auth",
});

export const handleRegister = ({ username, email, password, password2 }) => {
  return async () => {
    try {
      const { data } = await authAxios.post("/register", { username, email, password, password2 });
      localStorage.setItem("email", email);
      Swal.fire({
        position: "center",
        icon: "success",
        title: data.message,
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error.response.data.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
      throw error;
    }
  };
};

export const handleLogin = ({ email, password }) => {
  return async (dispatch) => {
    try {
      const { data } = await authAxios.post("/login", { email, password });
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("verified", data.verified);
      localStorage.setItem("email", email);
      await dispatch(fetchUserDashboard());
      await dispatch(fetchUserDashboard());
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully logged in",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error.response.data.message);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
      throw error;
    }
  };
};

export const handleGoogleLogin = (response) => {
  return async (dispatch) => {
    try {
      const { data } = await authAxios.post("/google-login", {}, { headers: { google_token: response.credential } });
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("email", data.email);
      localStorage.setItem("verified", data.verified);
      await dispatch(fetchUserDashboard());
      await dispatch(fetchUserDashboard());
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully logged in",
        showConfirmButton: false,
        timer: 3000,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
      throw error;
    }
  };
};

export const handleFacebookLogin = (response) => {
  return async (dispatch) => {
    try {
      const { data } = await authAxios.post("/facebook-login", {}, { headers: { email: response.email, username: response.name } });
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("email", data.email);
      localStorage.setItem("verified", data.verified);
      await dispatch(fetchUserDashboard());
      await dispatch(fetchUserDashboard());
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Successfully logged in",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
      throw error;
    }
  };
};

export const submitLogout = () => {
  return async () => {
    try {
      await authAxios.post(
        "/logout",
        {},
        {
          headers: { access_token: localStorage.access_token },
        }
      );
      localStorage.clear();
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
      throw error;
    }
  };
};

export const resendVerification = () => {
  return async () => {
    try {
      const { data } = await authAxios.patch(
        "/resendVerification",
        {},
        {
          headers: { email: localStorage.getItem("email") },
        }
      );
      Swal.fire("Success!", "Email successfully sent!", "success");
      return data;
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
      throw error;
    }
  };
};
