// ##########################
// #      IMPORT NPM        #
// ##########################
import { Outlet, Navigate } from 'react-router-dom';

// ##########################
// #    IMPORT Components   #
// ##########################

const ProtectedRoute: React.FC<{ isAuthenticated: boolean | undefined; isLoading: boolean }> = ({
    isAuthenticated,
    isLoading,
}) => {
    if (!isAuthenticated && !isLoading) {
        return <Navigate to={'/login'} />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
