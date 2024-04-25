// ##########################
// #      IMPORT NPM        #
// ##########################
import { Outlet, Navigate } from 'react-router-dom';

// ##########################
// #    IMPORT Components   #
// ##########################

interface AuthorizationType {
    isAuthenticated: boolean | undefined;
    isLoading: boolean;
    isAdmin?: boolean;
    role?: string;
}

const ProtectedRoute: React.FC<AuthorizationType> = ({
    isAuthenticated,
    isLoading,
    isAdmin,
    role,
}) => {
    if (isLoading === false) {
        if (isAdmin && role !== 'admin') {
            return <Navigate to="/" />;
        }

        if (!isAuthenticated) {
            return <Navigate to="/login" />;
        }
    }

    return <Outlet />;
};

export default ProtectedRoute;
