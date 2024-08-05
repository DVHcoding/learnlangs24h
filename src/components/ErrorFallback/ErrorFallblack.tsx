// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Alert, Button } from 'antd';
import { FallbackProps } from 'react-error-boundary';
import Lottie from 'lottie-react';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import ErrorAnimation from '@assets/animations/error_animation.json';

const ErrorFallback: React.FC<FallbackProps> = ({ error }) => {
    return (
        <div className="h-screen bg-bgCustomCard p-8">
            <div
                className="mx-auto flex h-full max-w-max flex-col items-center gap-4 rounded-md
                bg-bgCustomCardItem p-8"
            >
                <p className="font-body text-lg font-bold">Đã có lỗi xảy ra. Admin sẽ sớm khắc phục điều này!</p>
                <Alert message={`${error.message}`} type="error" />
                <div className="w-[80%]">
                    <Lottie animationData={ErrorAnimation} loop={true} />
                </div>

                <Button type="primary" className="max-w-max" onClick={() => (window.location.href = '/')}>
                    Về trang chủ
                </Button>
            </div>
        </div>
    );
};
export default ErrorFallback;
