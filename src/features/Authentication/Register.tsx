// ##################################
// #       IMPORT Components
// ##################################
import HelmetWrapper from '@components/Helmet/HelmetWrapper';

// ##################################
// #       IMPORT Npm
// ##################################
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';

// ##################################
const Register = () => {
    return (
        <Fragment>
            {/* Helmet */}
            <HelmetWrapper
                title="Login"
                description="Login to access and practicing your English Skills"
                canonical="/login"
            />

            {/* Main */}
            <div className="scrollbar flex h-screen items-center justify-center bg-[#f9fafb] phone:overflow-y-auto">
                <form className="w-[31rem] rounded-lg bg-white p-8 shadow phone:min-h-full phone:w-full">
                    <h2 className="mb-4 font-body text-2xl font-bold text-black phone:text-xl">
                        Create Account
                    </h2>

                    {/* Form email */}
                    <div className="mb-4">
                        <div className="mb-4">
                            <span className="mb-2 block font-semibold">Username</span>
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full rounded-md border bg-[#f9fafb] p-2 focus:border-2 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <span className="mb-2 block font-semibold">Email</span>
                            <input
                                type="text"
                                placeholder="Enter your Email"
                                className="w-full rounded-md border bg-[#f9fafb] p-2 focus:border-2 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <span className="mb-2 block font-semibold">Password</span>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full rounded-md border bg-[#f9fafb] p-2 placeholder:tracking-widest  focus:border-2 focus:border-blue-500"
                                required
                            />
                        </div>

                        <div>
                            <span className="mb-2 block font-semibold">Confirm password</span>
                            <input
                                type="password"
                                placeholder="••••••••"
                                className="w-full rounded-md border bg-[#f9fafb] p-2 placeholder:tracking-widest  focus:border-2 focus:border-blue-500"
                                required
                            />
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1">
                        <Checkbox sx={{ '& .MuiSvgIcon-root': { fontSize: 17, padding: '0px' } }} />

                        <p className="text-slate-500">I accept the </p>

                        <Link to={'/policy'} className="text-sm font-semibold text-blue-700">
                            Terms and Conditions
                        </Link>
                    </div>

                    <button className="mt-4 w-full rounded-md bg-blue-500 p-2 font-semibold text-white hover:bg-blue-600">
                        Register
                    </button>

                    <div className="mt-4">
                        <span className="font-sm text-slate-500">Already have an account? </span>

                        <Link to={'/login'} className="ml-1 text-sm font-semibold text-blue-700">
                            Login here
                        </Link>
                    </div>
                </form>
            </div>
        </Fragment>
    );
};

export default Register;
