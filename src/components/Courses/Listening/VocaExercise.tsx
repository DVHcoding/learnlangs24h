// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Alert } from 'antd';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { FaEdit } from 'react-icons/fa';
import { RiQuestionAnswerFill } from 'react-icons/ri';
import { MdOutlineTranslate } from 'react-icons/md';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import Flashcard from '@components/Courses/Listening/FlashCard';
import { Fragment, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const VocaExercise = () => {
    /* ########################################################################## */
    /*                                    HOOK                                    */
    /* ########################################################################## */
    const navigate = useNavigate();
    const location = useLocation();

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const [activeCard, setActiveCard] = useState<number>(1);

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */
    const flashArrays = [
        {
            frontContent: 'Clever',
            backContent: 'Thông minh',
        },
        {
            frontContent: 'Friendly',
            backContent: 'Thân thiện',
        },
        {
            frontContent: 'Cheerful',
            backContent: 'Vui vẻ',
        },
    ];

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const handlePrevCard = () => {
        setActiveCard((prev) => {
            if (prev - 1 <= 0) {
                return 1;
            }
            return prev - 1;
        });
    };

    const handleNextCard = () => {
        setActiveCard((prev) => {
            if (prev + 1 >= flashArrays.length) {
                return flashArrays.length;
            }
            return prev + 1;
        });
    };

    const handleRedirectWrite = () => {
        const newPath = `${location.pathname}/write`;
        navigate(newPath);
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */

    return (
        <Fragment>
            <Alert
                message="Các bạn cần học thuộc các từ vựng này để có thể nghe được bài học tiếp theo. Khi kiểm tra thành công, bài tiếp theo sẽ tự động mở!"
                banner
                className="bg-bgCustomProcess text-textCustom"
            />

            <ul className="grid grid-cols-3 gap-2 overflow-hidden p-2 phone:grid-cols-1">
                <li
                    className="cursor-pointer select-none content-center rounded-md bg-bgCustomCardItem p-3 
                    text-center font-segoe text-base transition-all hover:shadow-md phone:col-span-3"
                    onClick={handleRedirectWrite}
                >
                    <div className="flex items-center justify-center gap-2">
                        <FaEdit size={20} color="#16a815" />
                        <p className="text-lg text-textCustom sm:text-base">Viết</p>
                    </div>
                </li>

                <li
                    className="cursor-pointer select-none rounded-md bg-bgCustomCardItem p-3 text-center 
                    font-segoe text-base transition-all hover:shadow-md phone:col-span-3"
                >
                    <div className="flex content-center items-center justify-center gap-2">
                        <MdOutlineTranslate size={20} color="#16a815" />
                        <p className="text-lg text-textCustom sm:text-base">Dịch cả câu</p>
                    </div>
                </li>

                <li
                    className="cursor-pointer select-none content-center rounded-md bg-bgCustomCardItem p-3 
                    text-center font-segoe text-base transition-all hover:shadow-md phone:col-span-3"
                >
                    <div className="flex items-center justify-center gap-2">
                        <RiQuestionAnswerFill size={20} color="#16a815" />
                        <p className="text-lg text-textCustom sm:text-base">Kiểm tra</p>
                    </div>
                </li>

                {/* FlashCard */}
                <li className="col-span-3">
                    {flashArrays.map((item, index) => (
                        <motion.div
                            key={index}
                            className={`${index + 1 === activeCard ? '' : 'hidden'}`}
                            animate={{
                                opacity: index + 1 === activeCard ? 1 : 0,
                                x: index + 1 === activeCard ? 0 : index === activeCard ? '20%' : '-20%',
                            }}
                            transition={{ duration: 0.2, type: 'spring', stiffness: 200 }}
                        >
                            <Flashcard frontContent={item.frontContent} backContent={item.backContent} />
                        </motion.div>
                    ))}
                </li>
            </ul>

            {/* Handle (Next-Prev) FlashCard */}
            <div className="flex items-center justify-center gap-4">
                <div
                    className="cursor-pointer rounded-full bg-bgCustomCardItem p-2 transition-all 
                    hover:bg-bgHoverGrayDark"
                    onClick={handlePrevCard}
                >
                    <ArrowLeft size={20} className="text-textCustom" />
                </div>

                <h4 className="select-none font-segoe text-base text-textCustom">
                    {activeCard}/{flashArrays.length}
                </h4>

                <div
                    className="cursor-pointer rounded-full bg-bgCustomCardItem p-2 transition-all 
                    hover:bg-bgHoverGrayDark"
                    onClick={handleNextCard}
                >
                    <ArrowRight size={20} className="text-textCustom" />
                </div>
            </div>
        </Fragment>
    );
};

export default VocaExercise;
