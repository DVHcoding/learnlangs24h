// ##########################
// #      IMPORT NPM        #
// ##########################
import { Outlet, Navigate } from 'react-router-dom';

// ##########################
// #    IMPORT Components   #
// ##########################

const ProtectedRoute: React.FC<{ isLogin: boolean | undefined; isLoading: boolean }> = ({
    isLogin,
    isLoading,
}) => {
    if (!isLogin && !isLoading) {
        return <Navigate to={'/login'} />;
    }

    return <Outlet />;
};

export default ProtectedRoute;
