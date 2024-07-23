// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Drawer, Radio, Space } from 'antd';
import { Fragment, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { AppDispatch, RootState } from '@store/store';
import { Card, importPreviewsToVocabularies, updateVocaPreviews } from '@store/reducer/vocaReducer';

interface ImportCardProps {
    open: boolean;
    onClose: () => void;
}

const ImportCard: React.FC<ImportCardProps> = ({ open, onClose }) => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */
    const dispatch: AppDispatch = useDispatch();
    const { vocaPreviews } = useSelector((state: RootState) => state.vocabularies);

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const [inputText, setInputText] = useState<string>('');
    const [separator, setSeparator] = useState<'tab' | 'comma'>('tab');
    const [cardSeparator, setCardSeparator] = useState<'newline' | 'semicolon'>('newline');

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

    // Hàm xử lý khi nhập text ở modal import files
    const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const text: string = e.target.value;
        setInputText(text);
        updatePreview(text);
    };

    // Hàm xử lý khi người dùng nhấp tab trong ô textarea
    const handleKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
            if (e.key === 'Tab') {
                e.preventDefault();
                const target = e.target as HTMLTextAreaElement;
                const start: number = target.selectionStart;
                const end: number = target.selectionEnd;

                // inputText.substring(0, start): Lấy phần văn bản từ đầu đến ngay trước vị trí con trỏ.
                // '\t': Ký tự tab mà bạn muốn chèn vào văn bản.
                // inputText.substring(end): Lấy phần văn bản từ vị trí con trỏ đến cuối văn bản.
                const newText: string = inputText.substring(0, start) + '\t' + inputText.substring(end);
                setInputText(newText);
                updatePreview(newText);

                // Sau khi bạn chèn ký tự tab vào văn bản, bạn cần di chuyển con trỏ tới ngay sau ký tự tab.
                // setTimeout với thời gian 0 đảm bảo rằng cập nhật vị trí con trỏ xảy ra sau khi cập nhật văn bản.
                setTimeout(() => {
                    target.selectionStart = target.selectionEnd = start + 1;
                }, 0);
            }
        },
        [inputText]
    );

    // Hàm render ra card trong preview
    const updatePreview = (text: string) => {
        // Dựa vào cardSeparator để dùng split cắt thành mảng
        const lines: string[] = text.split(cardSeparator === 'newline' ? '\n' : ';');

        const newPreviews: Card[] = lines
            .map((line: string) => {
                const [english, vietnamese] = line.split(separator === 'tab' ? '\t' : ',');
                return { english: english?.trim() || '', vietnamese: vietnamese?.trim() || '' };
            })

            // Chức năng: Loại bỏ các đối tượng Card không có nội dung trong cả hai trường english và vietnamese.
            // card.english || card.vietnamese: Điều kiện lọc để đảm bảo rằng ít nhất một trong các trường english hoặc vietnamese có giá trị.
            .filter((card: Card) => card.english || card.vietnamese);

        dispatch(updateVocaPreviews(newPreviews));
    };

    // Hàm import tất cả preview vào card chính
    const handleImport = () => {
        dispatch(importPreviewsToVocabularies());
        setInputText(''); // Xóa nội dung trong textarea
        onClose();
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */

    return (
        <Fragment>
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
                        placeholder={'Từ 1 Định nghĩa 1\nTừ 2 Định nghĩa 2\nTừ 3 Định nghĩa 3'}
                        value={inputText}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyDown}
                    />

                    <div className="mt-5 flex justify-between gap-4 phone:flex-wrap pm:flex-wrap">
                        {/* left */}
                        <div className="flex flex-wrap items-center gap-10">
                            <div>
                                <h3 className="font-sans leading-tight text-textCustom">Giữa thuật ngữ và định nghĩa</h3>
                                <Radio.Group
                                    name="radio-group-left"
                                    value={separator}
                                    onChange={(e) => setSeparator(e.target.value)}
                                    className="mt-[22px]"
                                >
                                    <Space direction="horizontal">
                                        <Radio value="tab" className="font-sans text-lg font-normal text-textCustom">
                                            Tab
                                        </Radio>
                                        <Radio value="comma" className="font-sans text-lg font-normal text-textCustom">
                                            Phẩy
                                        </Radio>
                                    </Space>
                                </Radio.Group>
                            </div>

                            <div>
                                <h3 className="font-sans leading-tight text-textCustom">Giữa các thẻ</h3>
                                <Radio.Group
                                    name="radio-group-right"
                                    value={cardSeparator}
                                    onChange={(e) => setCardSeparator(e.target.value)}
                                    className="mt-[22px]"
                                >
                                    <Space direction="horizontal">
                                        <Radio value="newline" className="font-sans text-lg font-normal text-textCustom">
                                            Dòng mới
                                        </Radio>
                                        <Radio value="semicolon" className="font-sans text-lg font-normal text-textCustom">
                                            Dấu Chấm phẩy
                                        </Radio>
                                    </Space>
                                </Radio.Group>
                            </div>
                        </div>

                        {/* right */}
                        <button
                            className="self-start rounded-md bg-blue-600 px-20 py-4
                            font-sans text-lg text-white transition-all hover:bg-blue-500"
                            onClick={handleImport}
                        >
                            Nhập
                        </button>
                    </div>
                </div>

                {/* Review Card */}
                <div className="mt-[25px] min-h-[23rem] bg-bgCustomCard">
                    <div className="mx-auto w-[85%] p-4">
                        <h2 className="font-body font-bold leading-tight text-textCustom">
                            Xem trước {vocaPreviews.length <= 0 ? '' : `${vocaPreviews.length} thẻ`}
                        </h2>

                        {vocaPreviews.length > 0 ? (
                            <ul
                                className="pointer-events-none mt-4 flex select-none 
                                flex-col gap-5 pb-[10rem] opacity-80"
                            >
                                {vocaPreviews.map((card: Card, index: number) => (
                                    <li key={index} className="rounded-md bg-bgCustomCardItem p-4">
                                        <div className="flex items-center justify-between border-b-2">
                                            <h3 className="font-sans text-textCustom">{index + 1}</h3>
                                        </div>

                                        <div className="flex items-center justify-between gap-10">
                                            {/* Left */}
                                            <div className="w-full">
                                                <div
                                                    className="mt-10 w-full resize-none border-b-4 border-b-green-200 
                                                    bg-transparent p-1 text-justify text-lg text-textCustom outline-none"
                                                >
                                                    {card.english}
                                                </div>
                                                <p className="mt-2 font-sans font-medium uppercase text-textCustomGray">Thuật ngữ</p>
                                            </div>

                                            {/* Right */}
                                            <div className="w-full">
                                                <div
                                                    className="mt-10 w-full resize-none border-b-4 border-b-green-200 
                                                    bg-transparent p-1 text-justify text-lg text-textCustom outline-none"
                                                >
                                                    {card.vietnamese}
                                                </div>
                                                <p className="mt-2 font-sans font-medium uppercase text-textCustomGray">Định nghĩa</p>
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="mt-1 text-base text-textCustom">Không có nội dung để xem trước</p>
                        )}
                    </div>
                </div>
            </Drawer>
        </Fragment>
    );
};

export default ImportCard;
