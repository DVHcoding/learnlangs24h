// ##################################
// #       IMPORT Components
// ##################################
import HelmetWrapper from '@components/Helmet/HelmetWrapper';
import { regexEmail, removeScriptTag } from '@utils/Helpers';
import { useRegisterUserMutation } from '@store/api/userApi';
import { toastError, toastSuccess } from '@components/Toast/Toasts';

// ##################################
// #       IMPORT Npm
// ##################################
import { Fragment, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Checkbox from '@mui/material/Checkbox';
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ##################################

interface IUserInfo {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
    photo: {
        public_id: string;
        url: string;
    };
}

interface ValidateType {
    username: boolean | null;
    email: boolean | null;
    password: boolean | null;
    confirmPassword: boolean | null;
}

const Register = () => {
    const [registerUser, { isLoading }] = useRegisterUserMutation();
    const navigate = useNavigate();

    // state management
    const [isCheckedTerms, setIsCheckedTerms] = useState<boolean>(false);
    const [userInfo, setUserInfo] = useState<IUserInfo>({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        photo: {
            public_id: '',
            url: 'https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=740',
        },
    });
    const [isValid, setIsValid] = useState<ValidateType>({
        username: null,
        email: null,
        password: null,
        confirmPassword: null,
    });
    const allValueCorrect = [
        isValid.username,
        isValid.email,
        userInfo.password === userInfo.confirmPassword,
        isValid.confirmPassword,
    ];

    const registerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const result = allValueCorrect.every((value) => value === true);

        if (!result) {
            return toast.error('Có lỗi xảy ra. Vui lòng kiểm tra lại các giá trị', {
                position: 'top-right',
                autoClose: 1500,
                hideProgressBar: true,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                theme: 'light',
                transition: Bounce,
            });
        }

        try {
            const response = await registerUser({
                username: userInfo.username,
                email: userInfo.email,
                password: userInfo.password,
                photo: {
                    public_id: userInfo.photo.public_id,
                    url: userInfo.photo.url,
                },
            });

            if ('error' in response) {
                toastError(`${response.error}`);
            } else {
                if (response.data.success === false) {
                    toastError(`${response.data.message}`);
                } else {
                    toastSuccess('Đăng ký thành công!');

                    setTimeout(() => {
                        navigate('/');
                    }, 1500);
                }
            }
        } catch (error) {
            toastError('Có lỗi xảy ra vui lòng thử lại!');
        }
    };

    return (
        <Fragment>
            {/* Helmet */}
            <HelmetWrapper
                title="Login"
                description="Login to access and practicing your English Skills"
                canonical="/login"
            />

            {/* Main */}
            <div className="scrollbar flex h-screen items-center justify-center bg-gradient-to-r from-green-100 via-indigo-200 to-purple-100 phone:overflow-y-auto">
                <form
                    onSubmit={registerSubmit}
                    className="w-[31rem] rounded-lg bg-white p-8 shadow phone:min-h-full phone:w-full"
                >
                    <h2 className="mb-4 font-body text-2xl font-bold text-black phone:text-xl">
                        Create an Account
                    </h2>

                    {/* Form email */}
                    <div className="mb-4">
                        <div className="mb-4">
                            <span className="mb-2 block font-semibold">Username</span>
                            <input
                                onBlur={() =>
                                    setIsValid((prevIsValid) => ({
                                        ...prevIsValid,
                                        username: userInfo.username !== '',
                                    }))
                                }
                                onChange={(e) =>
                                    setUserInfo((prevUserInfo) => ({
                                        ...prevUserInfo,
                                        username: removeScriptTag(e.target.value),
                                    }))
                                }
                                type="text"
                                placeholder="Username"
                                className="w-full rounded-md border bg-[#f9fafb] p-2 focus:border-2 focus:border-blue-500"
                                required
                            />

                            {!isValid.username && isValid.username !== null ? (
                                <span className="text-red-400 ">Username không được để trống</span>
                            ) : (
                                ''
                            )}
                        </div>

                        <div className="mb-4">
                            <span className="mb-2 block font-semibold">Email</span>
                            <input
                                type="text"
                                onBlur={() =>
                                    setIsValid((prevIsValid) => ({
                                        ...prevIsValid,
                                        email: regexEmail(userInfo.email),
                                    }))
                                }
                                onChange={(e) =>
                                    setUserInfo((prevUserInfo) => ({
                                        ...prevUserInfo,
                                        email: removeScriptTag(e.target.value),
                                    }))
                                }
                                placeholder="Enter your Email"
                                className="w-full rounded-md border bg-[#f9fafb] p-2 focus:border-2 focus:border-blue-500"
                                required
                            />
                            {!isValid.email && isValid.email !== null ? (
                                <span className={`text-red-400 `}>Email không hợp lệ</span>
                            ) : (
                                ''
                            )}
                        </div>

                        <div className="mb-4">
                            <span className="mb-2 block font-semibold">Password</span>
                            <input
                                onBlur={() =>
                                    setIsValid((prevIsValid) => ({
                                        ...prevIsValid,
                                        password: userInfo.password !== '',
                                    }))
                                }
                                onChange={(e) =>
                                    setUserInfo((prevUserInfo) => ({
                                        ...prevUserInfo,
                                        password: removeScriptTag(e.target.value),
                                    }))
                                }
                                type="password"
                                placeholder="••••••••"
                                className="w-full rounded-md border bg-[#f9fafb] p-2 placeholder:tracking-widest  focus:border-2 focus:border-blue-500"
                                required
                            />

                            {!isValid.password && isValid.password !== null ? (
                                <span className={`text-red-400 `}>
                                    Password không được để trống
                                </span>
                            ) : (
                                ''
                            )}
                        </div>

                        <div>
                            <span className="mb-2 block font-semibold">Confirm password</span>
                            <input
                                onBlur={() =>
                                    setIsValid((prevIsValid) => ({
                                        ...prevIsValid,
                                        confirmPassword:
                                            userInfo.confirmPassword !== '' &&
                                            userInfo.confirmPassword === userInfo.password,
                                    }))
                                }
                                onChange={(e) =>
                                    setUserInfo((prevUserInfo) => ({
                                        ...prevUserInfo,
                                        confirmPassword: removeScriptTag(e.target.value),
                                    }))
                                }
                                type="password"
                                placeholder="••••••••"
                                className="w-full rounded-md border bg-[#f9fafb] p-2 placeholder:tracking-widest  focus:border-2 focus:border-blue-500"
                                required
                            />
                            {!isValid.confirmPassword && isValid.confirmPassword !== null ? (
                                <span className={`text-red-400 `}>
                                    Password nhập lại không chính xác
                                </span>
                            ) : (
                                ''
                            )}
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-1">
                        <Checkbox
                            checked={isCheckedTerms}
                            onChange={(e) => setIsCheckedTerms(e.target.checked)}
                            sx={{ '& .MuiSvgIcon-root': { fontSize: 17, padding: '0px' } }}
                        />

                        <p className="text-slate-500">I accept the </p>

                        <Link to={'/policy'} className="text-sm font-semibold text-blue-700">
                            Terms and Conditions
                        </Link>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading || !isCheckedTerms ? true : false}
                        className={`mt-4 w-full rounded-md ${
                            isCheckedTerms
                                ? 'bg-blue-500 text-white'
                                : 'bg-[#e0e0e0] text-[#a6a6a6]'
                        } p-2 font-semibold disabled:cursor-default`}
                    >
                        Register
                    </button>

                    <div className="mt-4">
                        <span className="font-sm text-slate-500">Already have an account? </span>

                        <Link to={'/login'} className="ml-1 text-sm font-semibold text-blue-700">
                            Login here
                        </Link>
                    </div>

                    {isLoading && <p>isLoading....</p>}
                </form>
            </div>

            <ToastContainer />
        </Fragment>
    );
};

export default Register;
