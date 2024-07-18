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
const ConversationTest: React.FC = () => {
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
                            Listen to a conversations where people talk about their plans and choose the correct answers.
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
                <li className="grid grid-cols-2 gap-8 sm:grid-cols-1">
                    <div>
                        <h3 className="font-sans font-medium leading-tight text-textCustomName">
                            What is Mark planning to do with the lottery money?
                        </h3>

                        <Radio.Group className="mt-2">
                            <Space direction="vertical">
                                <Radio value={1} className="text-base text-textCustom">
                                    Buy a new car
                                </Radio>
                                <Radio value={2} className="text-base text-textCustom">
                                    Plan a family vacation
                                </Radio>
                                <Radio value={3} className="text-base text-textCustom">
                                    Buy new furniture for his daughter
                                </Radio>
                            </Space>
                        </Radio.Group>
                    </div>

                    <div>
                        <h3 className="font-sans font-medium leading-tight text-textCustomName">
                            Why is Mark not going to buy a new car right now?
                        </h3>

                        <Radio.Group className="mt-2">
                            <Space direction="vertical">
                                <Radio value={1} className="text-base text-textCustom">
                                    Because their family car is very old
                                </Radio>
                                <Radio value={2} className="text-base text-textCustom">
                                    Because their family car is very new
                                </Radio>
                                <Radio value={3} className="text-base text-textCustom">
                                    Because he wants to save money
                                </Radio>
                            </Space>
                        </Radio.Group>
                    </div>

                    <div>
                        <h3 className="font-sans font-medium leading-tight text-textCustomName">
                            What is Mark going to buy for his son, Richy?
                        </h3>

                        <Radio.Group className="mt-2">
                            <Space direction="vertical">
                                <Radio value={1} className="text-base text-textCustom">
                                    A new bike
                                </Radio>
                                <Radio value={2} className="text-base text-textCustom">
                                    A new car
                                </Radio>
                                <Radio value={3} className="text-base text-textCustom">
                                    New furniture for his room
                                </Radio>
                            </Space>
                        </Radio.Group>
                    </div>

                    <div>
                        <h3 className="font-sans font-medium leading-tight text-textCustomName">
                            What is Mark going to do for his daughter?
                        </h3>

                        <Radio.Group className="mt-2">
                            <Space direction="vertical">
                                <Radio value={1} className="text-base text-textCustom">
                                    Buy a new bike
                                </Radio>
                                <Radio value={2} className="text-base text-textCustom">
                                    Plan a family vacation
                                </Radio>
                                <Radio value={3} className="text-base text-textCustom">
                                    Buy new furniture for her room
                                </Radio>
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

export default ConversationTest;
