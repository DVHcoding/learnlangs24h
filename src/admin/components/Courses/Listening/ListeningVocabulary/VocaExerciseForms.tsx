// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Button, Tabs } from 'antd';
import { Fragment } from 'react';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################

const VocaExerciseForms: React.FC = () => {
    return (
        <Fragment>
            <Tabs
                defaultActiveKey="1"
                items={[
                    {
                        label: 'Thông tin chung',
                        key: '1',
                        children: (
                            <div>
                                <Button type="primary">Nhập</Button>

                                <ul>
                                    <li className="">
                                        <div className="flex items-center justify-between">
                                            <h3>1</h3>
                                            <button>Xoa</button>
                                        </div>

                                        <div>
                                            {/* Left */}
                                            <div>
                                                <input type="text" className="border-2" />
                                                <p>Thuat ngu</p>
                                            </div>

                                            {/* Right */}
                                            <div>
                                                <input type="text" />
                                                <p>Dinh nghia</p>
                                            </div>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        ),
                    },
                    {
                        label: 'Mô tả thêm',
                        key: '2',
                        children: <div>tab2</div>,
                    },
                    {
                        label: 'Bình luận',
                        key: '3',
                        children: 'Tab 3',
                    },
                ]}
            />
        </Fragment>
    );
};

export default VocaExerciseForms;
