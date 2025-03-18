import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useStore from "../store";

const AuthLayout: React.FC = () => {
    const { refreshToken } = useStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkAuth = async () => {
            await refreshToken();
            if (useStore.getState().isAuthenticated) {
                navigate("/");
            } else {
                setLoading(false);
            }
        };

        checkAuth();
    }, [navigate, refreshToken]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Outlet></Outlet>
        </div>
    );
};

export default AuthLayout;
