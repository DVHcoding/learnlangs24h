import BookLoader from '@assets/videos/Loader-unscreen.gif';

const Loader: React.FC = () => {
    return (
        <div className="flex h-screen w-full items-center justify-center">
            <img className=" w-[20%] object-cover" src={BookLoader} alt="" />
        </div>
    );
};

export default Loader;
