// ##########################
// #      IMPORT NPM        #
// ##########################
import { useEffect } from 'react';

// ##########################
// #    IMPORT Components   #
// ##########################
import { toastError } from '@components/Toast/Toasts';

interface Error {
    isError: boolean;
    error?: { data?: { message?: string } };
    fallback?: () => void;
}

const useErrors = (errors: Error[] = []) => {
    useEffect(() => {
        errors.forEach(({ isError, error, fallback }) => {
            if (isError) {
                if (fallback) fallback();
                else toastError(error?.data?.message || 'Something went wrong');
            }
        });
    }, [errors]);
};

export default useErrors;
