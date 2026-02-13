import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import config from "../config";

const VerifyEmail = () => {
    const { token } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const verify = async () => {
            try {
                const response = await fetch(
                    `${config.API_URL}/api/auth/verify/${token}`
                );

                const data = await response.json();

                if (response.ok) {
                    navigate("/login?verified=true");
                } else {
                    alert(data.message || "Verification failed");
                    navigate("/login");
                }
            } catch (err) {
                console.error("Verification error:", err);
                navigate("/login");
            }
        };

        verify();
    }, [token, navigate]);

    return <div>Verifying your email...</div>;
};

export default VerifyEmail;