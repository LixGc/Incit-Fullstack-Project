import { redirect } from "react-router-dom";
import { USER_DASHBOARD_FETCH_SUCCESS, USER_PROFILE_FETCH_SUCCESS } from "./actionTypes";
export const userProfileFetchSuccess = (payload) => {
  return { type: USER_PROFILE_FETCH_SUCCESS, payload };
};

export const userDashboardFetchSuccess = (payload) => {
  return { type: USER_DASHBOARD_FETCH_SUCCESS, payload };
};

const url = "https://incit-exam.flixy.online";

//Example using Fetch for APIs
export const fetchUserProfile = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(url + "/user/profile", {
        headers: { access_token: localStorage.access_token },
      });
      const resData = await response.json();
      if (!response.ok) {
        throw resData;
      }
      dispatch(userProfileFetchSuccess(resData));
    } catch (error) {
      console.log(error);
      if (error.message === "Invalid Token") {
        localStorage.clear();
        redirect("/login");
      }
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message + "!",
      });
    }
  };
};
export const fetchUserDashboard = (username) => {
  return async (dispatch) => {
    try {
      let query = "";
      if (username) {
        query = username;
      }
      const response = await fetch(url + `/user/dashboard?name=${query}`, {
        headers: { access_token: localStorage.access_token },
      });
      const resData = await response.json();
      if (!response.ok) {
        throw resData;
      }
      dispatch(userDashboardFetchSuccess(resData));
    } catch (error) {
      console.log(error);
      if (error.message === "Invalid Token") {
        localStorage.clear();
        redirect("/login");
      }
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message + "!",
      });
      throw error;
    }
  };
};
export const resetPassword = (data) => {
  return async (dispatch) => {
    try {
      const response = await fetch(url + "/user/resetPassword", {
        method: "PATCH",
        headers: { access_token: localStorage.access_token, "Content-Type": "application/json" },
        body: JSON.stringify({ oldPassword: data.oldPassword, newPassword: data.newPassword, confirmPassword: data.confirmPassword }),
      });
      const resData = await response.json();
      if (!response.ok) {
        throw resData;
      }
      Swal.fire("Success!", "Password successfully resetted!", "success");
      await dispatch(fetchUserDashboard(resData));
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message + "!",
      });
      throw error;
    }
  };
};
export const resetName = (username) => {
  return async (dispatch) => {
    try {
      const response = await fetch(url + "/user/resetName", {
        method: "PATCH",
        headers: { access_token: localStorage.access_token, "Content-Type": "application/json" },
        body: JSON.stringify({ newName: username }),
      });
      const resData = await response.json();
      if (!response.ok) {
        throw resData;
      }
      await dispatch(fetchUserDashboard(resData));
      await dispatch(fetchUserProfile(resData));
      console.log(dispatch(fetchUserDashboard(resData)));
      Swal.fire("Success!", "Name successfully resetted!", "success");
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message + "!",
      });
      throw error;
    }
  };
};
