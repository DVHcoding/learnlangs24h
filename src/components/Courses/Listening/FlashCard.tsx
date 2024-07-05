// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import React, { useState } from 'react';
import ReactCardFlip from 'react-card-flip';

const Flashcard: React.FC<{ frontContent: string; backContent: string }> = ({ frontContent, backContent }) => {
    const [isFlipped, setIsFlipped] = useState<boolean>(false);

    const handleFlip = (): void => {
        setIsFlipped(!isFlipped);
    };

    return (
        <ReactCardFlip flipDirection="vertical" isFlipped={isFlipped}>
            <div
                className="h-[20rem] cursor-pointer content-center rounded-md 
                bg-bgCustomCardItem text-center font-segoe text-base"
                onClick={handleFlip}
            >
                <h1 className="select-none text-textBlackGray sm:text-3xl">{frontContent}</h1>
            </div>

            <div
                className="h-[20rem] cursor-pointer content-center rounded-md 
                bg-bgCustomCardItem text-center font-segoe text-base"
                onClick={handleFlip}
            >
                <h1 className="select-none text-textBlackGray sm:text-3xl">{backContent}</h1>
            </div>
        </ReactCardFlip>
    );
};

export default Flashcard;
