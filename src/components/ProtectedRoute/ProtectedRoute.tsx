// ##########################
// #      IMPORT NPM        #
// ##########################
import { Fragment, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

// ##########################
// #    IMPORT Components   #
// ##########################

interface AuthorizationType {
    isAuthenticated: boolean | undefined;
    isLoading: boolean;
    isAdmin?: boolean;
    role?: string;
    children: ReactNode;
}

const ProtectedRoute: React.FC<AuthorizationType> = ({ isAuthenticated, isLoading, isAdmin, role, children }) => {
    if (isLoading === false) {
        if (isAdmin && role !== 'admin') {
            return <Navigate to="/" />;
        }

        if (!isAuthenticated) {
            return <Navigate to="/login" />;
        }
    }

    return <Fragment>{children}</Fragment>;
};

export default ProtectedRoute;
