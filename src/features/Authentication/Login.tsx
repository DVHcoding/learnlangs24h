// ##################################
// #       IMPORT Components
// ##################################
import HelmetWrapper from '@components/Helmet/HelmetWrapper';

// ##################################
// #       IMPORT Npm
// ##################################

const Login = () => {
    return (
        <div>
            <HelmetWrapper
                title="Login"
                description="Login to access and practicing your English Skills"
                canonical="/login"
            />

            <p>Login</p>
        </div>
    );
};

export default Login;
