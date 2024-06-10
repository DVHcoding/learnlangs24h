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

export const toastLoading = (message: string) => {
    return toast.loading(message, {
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
