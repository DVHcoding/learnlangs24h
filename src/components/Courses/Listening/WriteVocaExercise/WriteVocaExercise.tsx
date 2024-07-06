// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { useEffect, useRef, useState } from 'react';
import { Breadcrumb, Modal, Switch } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { Undo2, Settings } from 'lucide-react';
import { Progress } from 'antd';
import type { ProgressProps } from 'antd';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################

const WriteVocaExercise = () => {
    /* ########################################################################## */
    /*                                    HOOK                                    */
    /* ########################################################################## */
    const textAreaRef = useRef<HTMLTextAreaElement>(null);

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */
    const navigate = useNavigate();

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const [answer, setAnswer] = useState<string>('');
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */
    const twoColors: ProgressProps['strokeColor'] = {
        '0%': '#108ee9',
        '100%': '#87d068',
    };

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */
    useEffect(() => {
        if (textAreaRef.current) {
            textAreaRef.current.style.height = '2rem';
            textAreaRef.current.style.height = Math.min(textAreaRef.current.scrollHeight, 126) + 'px';
            textAreaRef.current.style.overflowY = textAreaRef.current.scrollHeight > 126 ? 'auto' : 'hidden';
        }
    }, [answer]);

    return (
        <div className="overflow-hidden px-4 phone:p-1" style={{ height: 'calc(100% - 3.8rem)' }}>
            {/* Breadcrumb */}
            <div className="flex justify-between">
                <Breadcrumb
                    items={[
                        {
                            title: <Link to="/">Home</Link>,
                        },
                        {
                            title: <Link to={`/listening/`}>Listening</Link>,
                        },
                        {
                            title: 'write',
                        },
                    ]}
                />
            </div>

            {/* Body */}
            <div className="mt-2 flex justify-between" style={{ height: 'calc(100% - 1.8rem' }}>
                {/* Box */}
                <div className="w-full">
                    <div className="flex items-center justify-between gap-4">
                        <div
                            className="max-w-max cursor-pointer rounded-full bg-bgCustomCardItem p-2 
                            transition-all hover:bg-bgHoverGrayDark"
                            onClick={() => navigate(-1)}
                        >
                            <Undo2 size={20} className="text-textCustom" />
                        </div>

                        <Progress percent={0} strokeColor={twoColors} />

                        <div
                            className="max-w-max cursor-pointer rounded-full bg-bgCustomCardItem p-2 
                            transition-all hover:bg-bgHoverGrayDark"
                            onClick={showModal}
                        >
                            <Settings size={20} className="text-textCustom" />
                        </div>
                    </div>

                    <div className="rounded-md p-2 shadow-md">
                        <div className="flex items-center justify-between border-b-2 border-b-bdCustom py-4">
                            <h2 className="font-segoe text-2xl">Clever</h2>
                            <button className="min-w-max">Khong biet</button>
                        </div>

                        <form action="">
                            <textarea
                                className="mt-10 w-full resize-none border-b-4 border-b-green-200 
                                bg-transparent p-1 text-justify text-lg outline-none"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                placeholder=""
                                ref={textAreaRef}
                            />
                        </form>
                        <h4 className=" text-gray-500 ">Nhập bằng tiếng việt</h4>
                    </div>
                </div>

                <Modal title="Settings" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                    <div className="grid grid-cols-2 gap-1">
                        <button className="btn-disabled">Hoc het</button>
                        <button className="btn-primary">Học các thuật ngữ có dấu sao</button>
                    </div>

                    <ul className="mt-2">
                        <li className="flex items-center justify-between">
                            <h3>Hiển thị tiếng anh đầu tiên</h3>
                            <Switch size="small" defaultChecked />
                        </li>

                        <li className="flex items-center justify-between">
                            <h3>Đọc nội dung</h3>
                            <Switch size="small" />
                        </li>

                        <li className="flex items-center justify-between">
                            <h3>Ẩn nội dung (Nên bật đọc nội dung để nghe và điền từ)</h3>
                            <Switch size="small" />
                        </li>
                    </ul>
                </Modal>
            </div>
        </div>
    );
};

export default WriteVocaExercise;
