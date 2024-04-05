// ##################################
// #       IMPORT Components
// ##################################
import HelmetWrapper from '@components/Helmet/HelmetWrapper';
import { regexEmail, removeScriptTag } from '@utils/Helpers';

// ##################################
// #       IMPORT Npm
// ##################################
import { Fragment, useState } from 'react';

// ##################################
const ForgotPassword: React.FC = () => {
    const [email, setEmail] = useState<string>('');
    const [validEmail, setValidEmail] = useState<boolean | null>(null);

    const resetPassword = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (validEmail) {
        }
    };

    return (
        <Fragment>
            {/* Helmet */}
            <HelmetWrapper
                title="Forgot Password"
                description="You can retrieve your password via email"
                canonical="/forgot"
            />

            {/* Main */}
            <div className="scrollbar flex h-screen items-center justify-center bg-gradient-to-r from-green-100 via-indigo-200 to-purple-100 phone:overflow-y-auto">
                <form
                    onSubmit={resetPassword}
                    className="w-[31rem] rounded-lg bg-white p-8 shadow phone:min-h-full phone:w-full"
                >
                    <h2 className="mb-4 font-body text-2xl font-bold text-black phone:text-xl">
                        Forgot Password
                    </h2>

                    {/* Form email */}

                    <div className="mb-2">
                        <span className="mb-2 block font-semibold">Email</span>
                        <input
                            onInput={() => setValidEmail(null)}
                            onBlur={() => setValidEmail(regexEmail(email))}
                            onChange={(e) => setEmail(removeScriptTag(e.target.value))}
                            type="text"
                            placeholder="Enter your Email"
                            className="w-full rounded-md border bg-[#f9fafb] p-2 focus:border-2 focus:border-blue-500"
                            required
                        />
                    </div>
                    {!validEmail && validEmail !== null ? (
                        <span className="text-red-400">Email không hợp lệ</span>
                    ) : (
                        ''
                    )}

                    <button
                        type="submit"
                        className="mt-4 w-full rounded-md bg-blue-500 p-2 font-semibold text-white 
                        disabled:cursor-default"
                    >
                        Reset Password
                    </button>
                </form>
            </div>
        </Fragment>
    );
};

export default ForgotPassword;
