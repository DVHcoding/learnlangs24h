// ##########################
// #      IMPORT NPM        #
// ##########################
import { useEffect } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react'; // Điều chỉnh đường dẫn tới RTK Query

// ##########################
// #    IMPORT Components   #
// ##########################
import { toastError } from '@components/Toast/Toasts';

interface Error {
    isError: boolean;
    error?: FetchBaseQueryError | { message?: string }; // Use FetchBaseQueryError and customize error type if needed
    fallback?: () => void;
}

const useErrors = (errors: Error[] = []) => {
    useEffect(() => {
        errors.forEach(({ isError, error, fallback }) => {
            if (isError || error) {
                if (fallback) fallback();
                else toastError('Something went wrong'); // Thay đổi phần xử lý lỗi tại đây nếu cần thiết
            }
        });
    }, [errors]);
};

export default useErrors;
