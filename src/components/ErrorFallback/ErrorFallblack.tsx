// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Alert, Button } from 'antd';
import { FallbackProps } from 'react-error-boundary';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################

const ErrorFallback: React.FC<FallbackProps> = ({ error }) => {
    return (
        <div className="h-screen bg-bgCustomCard p-8">
            <div
                className="mx-auto flex h-full max-w-max flex-col gap-4 rounded-md
                bg-bgCustomCardItem p-8"
            >
                <p className="font-body text-lg font-bold">Đã có lỗi xảy ra. Admin sẽ sớm khắc phục điều này!</p>
                <Alert message={`${error.message}`} type="error" />
                <Button type="primary" className="max-w-max" onClick={() => (window.location.href = '/')}>
                    Về trang chủ
                </Button>
            </div>
        </div>
    );
};
export default ErrorFallback;
