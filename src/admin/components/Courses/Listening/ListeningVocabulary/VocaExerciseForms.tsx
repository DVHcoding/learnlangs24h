// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Button, Drawer, Radio, Space, Tabs } from 'antd';
import { Fragment, useState } from 'react';
import { Trash2 } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@store/store';
import { addCard, Card, removeCard, updateCard } from '@store/reducer/vocaReducer';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################

const VocaExerciseForms: React.FC = () => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */
    const dispatch: AppDispatch = useDispatch();
    const { vocabularies } = useSelector((state: RootState) => state.vocabularies);

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const [open, setOpen] = useState<boolean>(false);

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */
    const headerDrawerStyles = {
        header: { padding: '8px', display: 'none' },
    };

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const showDrawer = (): void => {
        setOpen(true);
    };

    const onClose = (): void => {
        setOpen(false);
    };

    const handleAddCard = (): void => {
        dispatch(addCard());
    };

    const handleUpdateCard = (index: number, english: string, vietnamese: string): void => {
        dispatch(updateCard({ index, english, vietnamese }));
    };

    const handleRemoveCard = (index: number): void => {
        dispatch(removeCard(index));
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */
    console.log(vocabularies);
    return (
        <Fragment>
            <Tabs
                defaultActiveKey="1"
                items={[
                    {
                        label: 'Vocabulary',
                        key: '1',
                        children: (
                            <div className="rounded-md bg-bgCustomCard p-4">
                                <div className="flex items-center justify-between">
                                    <Button type="primary">Tạo</Button>
                                    <Button type="dashed" onClick={showDrawer}>
                                        + Nhập
                                    </Button>
                                </div>

                                <div>
                                    {/* List Card */}
                                    <ul className="mt-4 flex flex-col gap-5">
                                        {vocabularies.map((card: Card, index: number) => (
                                            <li key={index} className="rounded-md bg-bgCustomCardItem p-4">
                                                <div className="flex items-center justify-between border-b-2">
                                                    <h3 className="font-sans text-textCustom">{index + 1}</h3>
                                                    <Trash2
                                                        size={18}
                                                        className="cursor-pointer text-textCustom transition-all
                                                        hover:text-yellow-400"
                                                        onClick={() => handleRemoveCard(index)}
                                                    />
                                                </div>

                                                <div className="flex items-center justify-between gap-10">
                                                    {/* Left */}
                                                    <div className="w-full">
                                                        <textarea
                                                            className="mt-10 w-full resize-none border-b-4 border-b-green-200 
                                                            bg-transparent p-1 text-justify text-lg text-textCustom outline-none"
                                                            rows={1}
                                                            spellCheck={false}
                                                            value={card.english}
                                                            onChange={(e) => handleUpdateCard(index, e.target.value, card.vietnamese)}
                                                        />
                                                        <p className="font-sans uppercase text-textCustomGray">Thuật ngữ</p>
                                                    </div>

                                                    {/* Right */}
                                                    <div className="w-full">
                                                        <textarea
                                                            className="mt-10 w-full resize-none border-b-4 border-b-green-200 
                                                            bg-transparent p-1 text-justify text-lg text-textCustom outline-none"
                                                            rows={1}
                                                            spellCheck={false}
                                                            value={card.vietnamese}
                                                            onChange={(e) => handleUpdateCard(index, card.english, e.target.value)}
                                                        />
                                                        <p className="font-sans uppercase text-textCustomGray">Định nghĩa</p>
                                                    </div>
                                                </div>
                                            </li>
                                        ))}
                                    </ul>

                                    {/* Them the */}
                                    <div className="mt-4 rounded-md bg-bgCustomCardItem p-4">
                                        <div
                                            className="group mx-auto max-w-max cursor-pointer border-b-4 
                                          border-b-green-200 transition-all hover:border-b-yellow-400"
                                            onClick={handleAddCard}
                                        >
                                            <h3
                                                className="font-sans uppercase text-textCustom transition-all 
                                              group-hover:text-yellow-400"
                                            >
                                                + Thêm thẻ
                                            </h3>
                                        </div>
                                    </div>
                                </div>

                                {/* Import List words with files */}
                                <Drawer placement={'top'} size="large" styles={headerDrawerStyles} onClose={onClose} open={open}>
                                    <div className="mx-auto w-[85%] p-4">
                                        <button
                                            className="group max-w-max cursor-pointer border-b-4 
                                          border-b-green-200 transition-all hover:border-b-yellow-400"
                                            onClick={onClose}
                                        >
                                            <h3
                                                className="font-sans uppercase text-textCustom transition-all 
                                              group-hover:text-yellow-400"
                                            >
                                                Hủy nhập
                                            </h3>
                                        </button>

                                        <p className="mt-[35px] font-sans text-base font-normal text-textCustom">
                                            <b>Nhập dữ liệu.</b> Chép và dán dữ liệu ở đây (từ Word, Excel, Google Docs, v.v.)
                                        </p>

                                        <textarea
                                            name="area-import-words"
                                            className="mt-2 h-[245px] w-full border-2 border-bdCustom bg-bgCustom 
                                            p-4 font-sans text-lg font-normal text-textCustom focus:border-transparent 
                                            focus:outline-none focus:ring-4 focus:ring-yellow-400 focus:transition-all"
                                            placeholder={`Từ 1 Định nghĩa 1\nTừ 2 Định nghĩa 2\nTừ 3 Định nghĩa 3`}
                                        />

                                        <div className="mt-5 flex justify-between">
                                            {/* left */}
                                            <div className="flex items-center gap-10">
                                                <div>
                                                    <h3 className="font-sans leading-tight text-textCustom">
                                                        Giữa thuật ngữ và định nghĩa
                                                    </h3>
                                                    <Space direction="horizontal">
                                                        <Radio.Group name="radio-group-left" defaultValue={1} className="mt-[22px]">
                                                            <Radio value={1} className="font-sans text-lg font-normal text-textCustom">
                                                                Tab
                                                            </Radio>
                                                            <Radio value={2} className="font-sans text-lg font-normal text-textCustom">
                                                                Phẩy
                                                            </Radio>
                                                        </Radio.Group>
                                                    </Space>
                                                </div>

                                                <div>
                                                    <h3 className="font-sans leading-tight text-textCustom">Giữa các thẻ</h3>
                                                    <Space direction="horizontal">
                                                        <Radio.Group name="radio-group-right" defaultValue={1} className="mt-[22px]">
                                                            <Radio value={1} className="font-sans text-lg font-normal text-textCustom">
                                                                Dòng mới
                                                            </Radio>
                                                            <Radio value={2} className="font-sans text-lg font-normal text-textCustom">
                                                                Dấu phẩy
                                                            </Radio>
                                                        </Radio.Group>
                                                    </Space>
                                                </div>
                                            </div>

                                            {/* right */}
                                            <button
                                                className="rounded-md bg-blue-600 px-20 py-4 font-sans
                                                text-lg text-white"
                                            >
                                                Nhập
                                            </button>
                                        </div>
                                    </div>

                                    {/* Review Card */}
                                    <div className="mt-[25px] min-h-[23rem] bg-bgCustomCard">
                                        <div className="mx-auto w-[85%] p-4">
                                            <h2 className="font-body font-bold leading-tight text-textCustom">Xem trước</h2>

                                            <p className="mt-1 text-base text-textCustom">Không có nội dung để xem trước</p>
                                            <ul>
                                                <li></li>
                                            </ul>
                                        </div>
                                    </div>
                                </Drawer>
                            </div>
                        ),
                    },
                    {
                        label: 'Sentence',
                        key: '2',
                        children: <div>tab2</div>,
                    },
                    {
                        label: 'Quiz',
                        key: '3',
                        children: 'Tab 3',
                    },
                ]}
            />
        </Fragment>
    );
};

export default VocaExerciseForms;
