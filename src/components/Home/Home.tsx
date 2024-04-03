// ##################################
// #       IMPORT Components
// ##################################
import HelmetWrapper from '@components/Helmet/HelmetWrapper';

// ##################################
// #       IMPORT Npm
// ##################################
import { Bounce, ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
    const notifySuccess = () =>
        toast.success('Success!', {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: 'light',
            transition: Bounce,
        });

    const notifyError = () =>
        toast.error('Error!', {
            position: 'top-right',
            autoClose: 1500,
            hideProgressBar: true,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            theme: 'light',
            transition: Bounce,
        });

    return (
        <div>
            <HelmetWrapper
                title="Learnlangs24h"
                description="Learnlangs24h makes AI-powered learning tools that let you study anything. Start learning today with our online flashcards, games and expert-written solutions"
                canonical="/"
            />

            <h1 className="text-red-400">Home</h1>
            <button onClick={notifySuccess}>Notify!</button>
            <ToastContainer />
        </div>
    );
};

export default Home;
