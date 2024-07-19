// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Button } from 'antd';
import { Fragment } from 'react';
import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
const MatchingTest: React.FC = () => {
    const onChange = (key: string | string[]) => {
        console.log(key);
    };

    const items: CollapseProps['items'] = [
        {
            key: '1',
            label: <h3 className="select-none font-sans text-base leading-tight text-textCustomName">Transcript</h3>,
            children: (
                <p
                    className="font-sans text-base font-normal leading-7 text-textCustom 
                    selection:bg-bgCustomProcess"
                >
                    TINA: Mark, what are you going to do with the lottery money? <br />
                    MARK: I'm going to plan an amazing family vacation. I want to take my wife and kids to an exotic place. It's going to be
                    a surprise. <br />
                    TINA: Are you going to buy a new car? <br />
                    MARK: Not now, because our family car is very new, but I'm going to buy a really nice bike for my son, Richy. He loves
                    riding bikes. <br />
                    TINA: Are you going to buy a new bike for your daughter, too? <br />
                    MARK: No, she doesn't like bikes. I'm going to buy new furniture for her room. She'll love that
                </p>
            ),
        },
    ];

    return (
        <Fragment>
            <ul className="flex flex-col gap-4 rounded-md bg-bgCustomCardItem p-4">
                {/* Title */}
                <li className="flex flex-wrap justify-between gap-2">
                    <div>
                        <h3 className="font-sans text-lg leading-tight text-textCustom">Listening Test</h3>
                    </div>

                    <Button type="primary">Kiểm Tra</Button>
                </li>

                {/* Audio */}
                <li>
                    <audio controls className="w-full" controlsList="nodownload noplaybackrate">
                        <source
                            src="https://res.cloudinary.com/dvwdfsdkp/video/upload/v1720942162/listening_attachments/jzzwamf9iq62whryccmp.mp3"
                            type="audio/mpeg"
                        />
                    </audio>
                </li>

                {/* Content */}
                <li className="grid grid-cols-3 gap-4 sm:grid-cols-1">
                    <div className="col-span-2">
                        <img src="https://cdreasy.com/upload/images/image_content_1024_image_991_1629370380.jpg" alt="test" />
                    </div>

                    <div className="flex flex-col gap-4">
                        {[...Array(5)].map((_, index) => (
                            <div className="flex items-center gap-2" key={index}>
                                <p className="mt-1 text-[1rem] leading-tight text-textCustom">{index}.</p>
                                <div className="w-full max-w-[21rem]">
                                    <select
                                        required
                                        id="small"
                                        className="mt-2 block w-full rounded-[3px] border border-gray-300 
                                        bg-bgCustom p-2 text-sm text-textCustom focus:border-blue-500 
                                       focus:ring-blue-500"
                                    >
                                        <option className="hidden">--- Chọn đáp án đúng ---</option>
                                        <option>A</option>
                                        <option>B</option>
                                        <option>C</option>
                                        <option>D</option>
                                        <option>E</option>
                                        <option>F</option>
                                    </select>
                                </div>
                            </div>
                        ))}
                    </div>
                </li>
            </ul>

            <ul className="mt-4 rounded-md bg-bgCustomCardItem p-4">
                <div>
                    <Collapse items={items} defaultActiveKey={['1']} onChange={onChange} />
                </div>
            </ul>
        </Fragment>
    );
};

export default MatchingTest;
