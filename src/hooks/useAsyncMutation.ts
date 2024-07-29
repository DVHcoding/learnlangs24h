// ##########################
// #      IMPORT NPM        #
// ##########################
import { useState } from 'react';

// ##########################
// #    IMPORT Components   #
// ##########################
import { toastError, toastSuccess } from '@components/Toast/Toasts';

const useAsyncMutation = <TData, TVariables>(mutationHook: any) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [data, setData] = useState<TData | null | any>(null);

    const [mutate] = mutationHook();

    const executeMutation = async (variables: TVariables) => {
        setIsLoading(true);

        try {
            const response = await mutate(variables);

            if (response.data.success === false) {
                toastError(response.data.message);
            } else {
                if (response.data.message) {
                    toastSuccess(response.data?.message || 'Success');
                }

                setData(response.data);
            }
        } catch (error) {
            toastError('Something went wrong!');
        } finally {
            setIsLoading(false);
        }
    };

    return [executeMutation, isLoading, data] as const;
};

export { useAsyncMutation };
