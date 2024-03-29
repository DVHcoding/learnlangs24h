// ##################################
// #       IMPORT Components
// ##################################
import HelmetWrapper from '@components/Helmet/HelmetWrapper';
import GoogleIcon from '@assets/icons/google.png';
import FacebookIcon from '@assets/icons/facebook.png';

// ##################################
// #       IMPORT Npm
// ##################################
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

// ##################################
const Login = () => {
    return (
        <Fragment>
            {/* Helmet */}
            <HelmetWrapper
                title="Login"
                description="Login to access and practicing your English Skills"
                canonical="/login"
            />

            {/* Main */}
            <div className="flex h-screen items-center justify-center bg-[#f9fafb]">
                <div className="h-[80%] rounded-lg bg-white p-8 shadow phone:h-full phone:w-full">
                    <h2 className="mb-4 font-body text-2xl font-bold text-black phone:text-xl">
                        Welcome Back
                    </h2>

                    <div className="mb-4 flex flex-wrap items-center justify-center gap-4">
                        <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-8 py-2 hover:bg-[#f3f4f6]">
                            <img src={GoogleIcon} alt="Google Icon" className="w-5" />
                            <span className="font-body font-semibold text-black">
                                Login with Google
                            </span>
                        </button>

                        <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-6 py-2 hover:bg-[#f3f4f6]">
                            <img src={FacebookIcon} alt="Facebook icon" className="w-5" />
                            <span className="font-body font-semibold text-black">
                                Login with Facebook
                            </span>
                        </button>
                    </div>

                    {/* line */}
                    <div className="mb-4 flex items-center justify-center gap-4">
                        <div className="h-[2px] w-full bg-slate-200"></div>
                        <span className="font-body text-base font-medium text-slate-600">or</span>
                        <div className="h-[2px] w-full bg-slate-200"></div>
                    </div>

                    {/* Form email */}
                    <form className="mb-4">
                        <div className="mb-4">
                            <span className="mb-2 block font-semibold">Email</span>
                            <input
                                type="text"
                                placeholder="Enter your Email"
                                className="w-full rounded-md border bg-[#f9fafb] p-2 focus:border-2 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <span className="mb-2 block font-semibold">Password</span>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full rounded-md border bg-[#f9fafb] p-2 placeholder:tracking-widest  focus:border-2 focus:border-blue-500"
                                required
                            />
                        </div>
                    </form>

                    <Link to={'/forgot'} className="text-sm font-semibold text-blue-700">
                        Forgot Password
                    </Link>

                    <button className="mt-4 w-full rounded-md bg-blue-500 p-2 font-semibold text-white hover:bg-blue-600">
                        Login to your account
                    </button>

                    <div className="mt-4">
                        <span className="font-sm text-slate-500">Don’t have an account yet?</span>

                        <Link to={'/register'} className="ml-2 text-sm font-semibold text-blue-700">
                            Sign up here
                        </Link>
                    </div>
                </div>
            </div>
        </Fragment>
    );
};

export default Login;
