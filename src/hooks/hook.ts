// ##########################
// #      IMPORT NPM        #
// ##########################
import { useState } from 'react';

// ##########################
// #    IMPORT Components   #
// ##########################
import { toastError, toastLoading, toastSuccess } from '@components/Toast/Toasts';

type MutationHook<T, U> = () => [(...args: U[]) => Promise<T>, unknown];

const useAsyncMutation = <T, U>(mutationHook: MutationHook<T, U>) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<T | null>(null);

    const [mutate] = mutationHook();

    const executeMutation = async (toastMessage: string, ...args: U[]) => {
        setIsLoading(true);

        // Your toastLoading function implementation goes here
        toastLoading(toastMessage || 'Updating data...');

        try {
            const res: any = await mutate(...args);

            if ('error' in res) {
                toastError('Something went wrong!');
            } else {
                toastSuccess(res?.data?.message);
                setData(res.data);
            }
        } catch (error) {
            toastError('Something went wrong!');
        } finally {
            setIsLoading(false);
        }
    };

    return [executeMutation, isLoading, data];
};

export { useAsyncMutation };
