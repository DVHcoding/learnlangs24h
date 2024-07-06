import { IoIosHelpCircle } from 'react-icons/io';

const HelpComments = () => {
    return (
        <div
            className="sticky bottom-2 ml-auto mr-2 flex max-w-max cursor-pointer items-center 
                        gap-2 rounded-lg bg-slate-100 p-2 shadow-md"
        >
            <IoIosHelpCircle className="text-orange-400" size={20} />
            <p className="text-title select-none text-nowrap font-bold">Hỏi đáp</p>
        </div>
    );
};

export default HelpComments;
