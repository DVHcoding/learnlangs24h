// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Button, Radio, Space } from 'antd';
import { Fragment } from 'react';
import { Collapse } from 'antd';
import type { CollapseProps } from 'antd';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
const PicturesTest: React.FC = () => {
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
                        <p className="mt-2 font-sans text-base font-normal text-textCustom">
                            You will hear five short conversations. <br />
                            You will hear each conversation twice. <br />
                            There is one question for each conversation
                        </p>
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
                <li className="flex flex-col gap-8">
                    <div>
                        <h3 className="font-sans font-medium leading-tight text-textCustomName">1. What have they forgotten?</h3>

                        <Radio.Group className="mt-2">
                            <Space direction="horizontal">
                                <div>
                                    <div className="max-w-[12rem]">
                                        <img
                                            src="https://cdreasy.com/upload/images/image_content_1024_image_746_1629258179.jpg"
                                            alt="image"
                                        />
                                    </div>

                                    <Radio value={1} className="text-base text-textCustom">
                                        A.
                                    </Radio>
                                </div>

                                <div>
                                    <div className="max-w-[12rem]">
                                        <img
                                            src="https://cdreasy.com/upload/images/image_content_1024_image_987_1629258189.jpg"
                                            alt="image"
                                        />
                                    </div>

                                    <Radio value={2} className="text-base text-textCustom">
                                        B.
                                    </Radio>
                                </div>

                                <div>
                                    <div className="max-w-[12rem]">
                                        <img
                                            src="https://cdreasy.com/upload/images/image_content_1024_image_623_1629258191.jpg"
                                            alt="image"
                                        />
                                    </div>

                                    <Radio value={3} className="text-base text-textCustom">
                                        C.
                                    </Radio>
                                </div>
                            </Space>
                        </Radio.Group>
                    </div>

                    <div>
                        <h3 className="font-sans font-medium leading-tight text-textCustomName">2. Where is Room 22?</h3>

                        <Radio.Group className="mt-2">
                            <Space direction="horizontal">
                                <div>
                                    <div className="max-w-[12rem]">
                                        <img
                                            src="https://cdreasy.com/upload/images/image_content_1024_image_178_1629258547.jpg"
                                            alt="image"
                                        />
                                    </div>

                                    <Radio value={1} className="text-base text-textCustom">
                                        A.
                                    </Radio>
                                </div>

                                <div>
                                    <div className="max-w-[12rem]">
                                        <img
                                            src="https://cdreasy.com/upload/images/image_content_1024_image_735_1629258550.jpg"
                                            alt="image"
                                        />
                                    </div>

                                    <Radio value={2} className="text-base text-textCustom">
                                        B.
                                    </Radio>
                                </div>

                                <div>
                                    <div className="max-w-[12rem]">
                                        <img
                                            src="https://cdreasy.com/upload/images/image_content_1024_image_18_1629258553.jpg"
                                            alt="image"
                                        />
                                    </div>

                                    <Radio value={3} className="text-base text-textCustom">
                                        C.
                                    </Radio>
                                </div>
                            </Space>
                        </Radio.Group>
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

export default PicturesTest;
