import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import useStore from "../store";

const RootLayout: React.FC = () => {
    const { refreshToken } = useStore();
    const navigate = useNavigate();
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkAuth = async () => {
            await refreshToken();
            if (!useStore.getState().isAuthenticated) {
                navigate("/login");
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

export default RootLayout;
