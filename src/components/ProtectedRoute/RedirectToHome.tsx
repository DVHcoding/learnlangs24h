import { Navigate, Outlet } from 'react-router-dom';

const RedirectToHome: React.FC<{ isAuthenticated: boolean | undefined; isLoading: boolean }> = ({
    isAuthenticated,
    isLoading,
}) => {
    if (!isLoading) {
        if (isAuthenticated) {
            return <Navigate to="/" />;
        }
        return <Outlet />;
    }
};

export default RedirectToHome;
