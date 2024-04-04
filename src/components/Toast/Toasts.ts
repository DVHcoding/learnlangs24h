import { Bounce, toast } from 'react-toastify';

export const toastError = (message: string) => {
    return toast.error(message, {
        position: `top-center`,
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
        transition: Bounce,
    });
};

export const toastSuccess = (message: string) => {
    return toast.success(message, {
        position: `bottom-center`,
        autoClose: 1500,
        hideProgressBar: true,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: 'light',
        transition: Bounce,
    });
};
