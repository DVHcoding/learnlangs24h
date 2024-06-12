// ##########################
// #      IMPORT NPM        #
// ##########################
import { useState, useEffect } from 'react';

const userDebounce = (value: string, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState<string>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => clearTimeout(handler);
    }, [value]);

    return debouncedValue;
};

export default userDebounce;
