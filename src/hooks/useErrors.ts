// ##########################
// #      IMPORT NPM        #
// ##########################
import { useEffect } from 'react';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

// ##########################
// #    IMPORT Components   #
// ##########################
import { toastError } from '@components/Toast/Toasts';

interface Error {
    isError: boolean;
    error?: FetchBaseQueryError | { message?: string };
    fallback?: () => void;
}

const useErrors = (errors: Error[] = []) => {
    useEffect(() => {
        errors.forEach(({ isError, error, fallback }) => {
            if (isError || error) {
                if (fallback) fallback();
                else toastError(`${isError || error}`);
            }
        });
    }, [errors]);
};

export default useErrors;
