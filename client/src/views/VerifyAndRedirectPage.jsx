import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Loader } from "../components/Loader";
import { useDispatch } from "react-redux";
import { fetchUserDashboard, fetchUserProfile } from "../store/actions/userActionCreators";

export const VerifyAccount = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const access_token = localStorage.getItem("access_token");
        const email = localStorage.getItem("email");
        const verified = localStorage.getItem("verified");

        if (access_token && email && verified === "true") {
            navigate("/");
        } else {
            // If not, proceed with the verification logic
            const token = new URLSearchParams(location.search).get("token");
            const emailParam = new URLSearchParams(location.search).get("email");
            const verifiedParam = new URLSearchParams(location.search).get("verified");

            if (token && emailParam && verifiedParam === "true") {
                localStorage.setItem("access_token", token);
                localStorage.setItem("email", emailParam);
                localStorage.setItem("verified", verifiedParam);

                dispatch(fetchUserDashboard());
                dispatch(fetchUserProfile());
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Email successfully verified!",
                    showConfirmButton: false,
                    timer: 3000
                });
                navigate("/");
            } else {
                navigate("/resendVerification");
            }
        }
    }, []);

    return <Loader />;
};