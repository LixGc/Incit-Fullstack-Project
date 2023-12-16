//This page is when verification success then update localStorage and redirect to dashboard
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import { useDispatch } from "react-redux";
import { fetchUserDashboard, fetchUserProfile } from "../store/actions/userActionCreators";
export const VerifyAccount = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    useEffect(() => {
        const access_token = new URLSearchParams(location.search).get("token");
        const email = new URLSearchParams(location.search).get("email");
        const verified = new URLSearchParams(location.search).get("verified");
        if(!access_token || !email || verified === null){
            navigate("/")
        } else {
            localStorage.setItem("access_token", access_token)
            localStorage.setItem("email", email)
            localStorage.setItem("verified", verified)
            navigate("/")
            dispatch(fetchUserDashboard())
            dispatch(fetchUserProfile())
            Swal.fire({
                position: "center",
                icon: "success",
                title: "Email successfully verified!",
                showConfirmButton: false,
                timer: 3000
              });
        }
    }, []);
    return (
        <Loader/>
    )
}