import { useState } from 'react';
// ##################################
// #       IMPORT Components
// ##################################
import HelmetWrapper from '@components/Helmet/HelmetWrapper';
import GoogleIcon from '@assets/icons/google.png';
import FacebookIcon from '@assets/icons/facebook.png';

import { removeScriptTag } from '@utils/Helpers';
import { auth } from '../../firebase';
import { useLoginGoogleMutation, useLoginUserMutation } from '@store/api/userApi';
import { toastError, toastSuccess } from '@components/Toast/Toasts';

// ##################################
// #       IMPORT Npm
// ##################################
import { Fragment } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { Loader } from 'rsuite';

// ##################################
const Login: React.FC = () => {
    const navigate = useNavigate();

    const [loginUser, { isLoading: isLoadingEmail }] = useLoginUserMutation();
    const [loginGoogle] = useLoginGoogleMutation();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [userDataResponse, setUserDataResponse] = useState<any>(null);

    // Login With Email
    const loginWithEmail = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        try {
            const response = await loginUser({ email, password });

            if ('error' in response) {
                toastError(`${response.error}`);
            } else {
                if (response.data.success) {
                    setUserDataResponse(response.data);
                    toastSuccess('Đăng nhập thành công!');
                    navigate('/');
                } else {
                    setUserDataResponse(response.data);
                }
            }
        } catch (error) {
            toastError(`${error}`);
        }
    };

    // Login With Google
    const loginWithGoogle: () => Promise<void> = async () => {
        try {
            const provider = new GoogleAuthProvider();

            // Không tự động đăng nhập lại account trước (người dùng tự chọn tài khoản)
            provider.setCustomParameters({
                prompt: 'select_account',
            });

            // data received from firebase
            const { user } = await signInWithPopup(auth, provider);

            // if received data from google then...
            if (user) {
                const { data }: any = await loginGoogle({
                    username: user.displayName,
                    email: user.email,
                    photo: { public_id: '', url: user.photoURL },
                    googleId: user.uid,
                });

                if (data.success === false) {
                    toastError(`${data.message}`);
                } else {
                    toastSuccess('Đăng nhập thành công!');
                    navigate('/');
                }
            }
        } catch (error) {
            toastError('Bạn đã đóng popup? Hãy đăng nhập lại');
        }
    };

    return (
        <Fragment>
            {/* Helmet */}
            <HelmetWrapper title="Login" description="Login to access and practicing your English Skills" canonical="/login" />

            {/* Main */}
            <div className="flex h-screen items-center justify-center bg-gradient-to-r from-green-100 via-indigo-200 to-purple-100">
                <div className="h-[80%] rounded-lg bg-white p-8 shadow phone:h-full phone:w-full">
                    <h2 className="mb-4 font-body text-2xl font-bold text-black phone:text-xl">Welcome Back</h2>

                    <div className="mb-4 flex flex-wrap items-center justify-center gap-4">
                        <button
                            onClick={loginWithGoogle}
                            className="flex items-center gap-2 rounded-lg border border-slate-200 px-8 py-2 hover:bg-[#f3f4f6]"
                        >
                            <img src={GoogleIcon} alt="Google Icon" className="w-5" />
                            <span className="font-body font-semibold text-black">Login with Google</span>
                        </button>

                        <button className="flex items-center gap-2 rounded-lg border border-slate-200 px-6 py-2 hover:bg-[#f3f4f6]">
                            <img src={FacebookIcon} alt="Facebook icon" className="w-5" />
                            <span className="font-body font-semibold text-black">Login with Facebook</span>
                        </button>
                    </div>

                    {/* line */}
                    <div className="mb-4 flex items-center justify-center gap-4">
                        <div className="h-[2px] w-full bg-slate-200"></div>
                        <span className="font-body text-base font-medium text-slate-600">or</span>
                        <div className="h-[2px] w-full bg-slate-200"></div>
                    </div>

                    {/* Form email */}
                    <form onSubmit={loginWithEmail}>
                        <div className="mb-4">
                            <div className="mb-4">
                                <span className="mb-2 block font-semibold">Email</span>
                                <input
                                    type="text"
                                    placeholder="Enter your Email"
                                    className="w-full rounded-md border bg-[#f9fafb] p-2 focus:border-2 focus:border-blue-500"
                                    onChange={(e) => setEmail(removeScriptTag(e.target.value))}
                                    onInput={() => setUserDataResponse(null)}
                                    required
                                />
                            </div>

                            <div>
                                <span className="mb-2 block font-semibold">Password</span>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full rounded-md border bg-[#f9fafb] p-2 placeholder:tracking-widest focus:border-2 focus:border-blue-500"
                                    onChange={(e) => setPassword(removeScriptTag(e.target.value))}
                                    onInput={() => setUserDataResponse(null)}
                                    required
                                />
                            </div>
                        </div>

                        {/* Handler error | success text */}
                        <span className={`mb-2 text-sm text-red-500 ${userDataResponse?.success === false ? 'block' : 'hidden'}`}>
                            Tài khoản hoặc mật khẩu không chính xác!
                        </span>

                        <span className={`mb-2 text-sm text-green-500 ${userDataResponse?.success ? 'block' : 'hidden'}`}>
                            Đăng nhập thành công!
                        </span>

                        <Link to={'/forgot'} className="text-sm font-semibold text-blue-700">
                            Forgot Password
                        </Link>

                        <button
                            type="submit"
                            disabled={isLoadingEmail}
                            className="mt-4 w-full rounded-md bg-blue-500 p-2 font-semibold text-white hover:bg-blue-600"
                        >
                            Login to your account
                        </button>
                    </form>

                    {/* Redirect Register */}
                    <div className="mb-2 mt-4">
                        <span className="font-sm text-slate-500">Don’t have an account yet?</span>

                        <Link to={'/register'} className="ml-2 text-sm font-semibold text-blue-700">
                            Sign up here
                        </Link>
                    </div>

                    <Link to="/" className="font-title text-blue-600">
                        Trang chủ
                    </Link>
                </div>
            </div>

            {isLoadingEmail && (
                <div className="fixed  inset-0 z-50 flex items-center justify-center ">
                    <Loader
                        size={'md'}
                        className="flex h-full w-full items-center justify-center "
                        style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}
                    />
                </div>
            )}
        </Fragment>
    );
};

export default Login;
