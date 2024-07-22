// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { useDispatch, useSelector } from 'react-redux';
import { Trash2 } from 'lucide-react';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { AppDispatch, RootState } from '@store/store';
import { addCard, Card, removeCard, updateCard } from '@store/reducer/vocaReducer';

const ListCard = () => {
    const dispatch: AppDispatch = useDispatch();
    const { vocabularies } = useSelector((state: RootState) => state.vocabularies);

    const handleAddCard = (): void => {
        dispatch(addCard());
    };

    const handleUpdateCard = (index: number, english: string, vietnamese: string): void => {
        dispatch(updateCard({ index, english, vietnamese }));
    };

    const handleRemoveCard = (index: number): void => {
        dispatch(removeCard(index));
    };

    return (
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
    );
};

export default ListCard;
