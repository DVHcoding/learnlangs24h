// ##########################
// #      IMPORT NPM        #
// ##########################
import { Tabs, Button, message, Popconfirm } from 'antd';
import { X } from 'lucide-react';
import type { PopconfirmProps } from 'antd';

// ##########################
// #    IMPORT Components   #
// ##########################

const ExerciseLecture: React.FC = () => {
    const confirm: PopconfirmProps['onConfirm'] = (e) => {
        console.log(e);
        message.success('Click on Yes');
    };

    const cancel: PopconfirmProps['onCancel'] = (e) => {
        console.log(e);
        message.error('Click on No');
    };

    return (
        <Tabs
            defaultActiveKey="1"
            items={[
                {
                    label: 'Thông tin chung',
                    key: '1',
                    children: (
                        <form className="flex flex-col gap-4">
                            <button className="btn-primary max-w-max">Cập nhật</button>
                            <div>
                                <span className="font-body font-bold">Tên bài học (*)</span>
                                <input
                                    type="text"
                                    className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border border-gray-300 p-1 focus:border-blue-400
                                        sm:w-full"
                                />
                            </div>

                            <div>
                                <span className="font-body font-bold">Thời gian (*)</span>
                                <input
                                    type="text"
                                    className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border border-gray-300 p-1 focus:border-blue-400
                                        sm:w-full"
                                />
                            </div>

                            <div>
                                <span className="font-body font-bold">Ngày tạo (*)</span>
                                <input
                                    type="text"
                                    className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border border-gray-300 p-1 focus:border-blue-400
                                        sm:w-full"
                                />
                            </div>

                            <div>
                                <span className="font-body font-bold">Loại bài học (*)</span>
                                <select
                                    id="small"
                                    className="mt-2 block w-[21.8rem] rounded-[3px] border border-gray-300 bg-white 
                                        p-2 text-sm focus:border-blue-500 focus:ring-blue-500 sm:w-full"
                                >
                                    <option value="FillBlank" selected>
                                        Thực hành
                                    </option>
                                </select>
                            </div>

                            <div>
                                <span className="font-body font-bold">Loại bài tập (*)</span>
                                <select
                                    id="small"
                                    className="mt-2 block w-[21.8rem] rounded-[3px] border border-gray-300 bg-white 
                                                      p-2 text-sm focus:border-blue-500 focus:ring-blue-500 sm:w-full"
                                >
                                    <option selected>Điền vào chỗ trống</option>
                                </select>
                            </div>

                            <div>
                                <span className="font-body font-bold">Chương học (*)</span>
                                <select
                                    id="small"
                                    className="mt-2 block w-[21.8rem] rounded-[3px] border border-gray-300 bg-white 
                                                      p-2 text-sm focus:border-blue-500 focus:ring-blue-500 sm:w-full"
                                >
                                    <option className="hidden"> --- Chọn chương --- </option>
                                    <option value="US">United States</option>
                                    <option value="CA">Canada</option>
                                    <option value="FR">France</option>
                                    <option value="DE">Germany</option>
                                </select>
                            </div>
                        </form>
                    ),
                },
                {
                    label: 'Câu hỏi',
                    key: '2',
                    children: (
                        <div className="flex flex-col gap-4">
                            <div>
                                <Button type="primary">Thêm câu hỏi</Button>
                            </div>

                            <ul className="flex flex-wrap items-center gap-2">
                                {[...Array(20)].map((_item, index: number) => (
                                    <li key={index} className="relative grow border-2 border-dotted p-4">
                                        <Popconfirm
                                            title="Delete the task"
                                            description="Are you sure to delete this task?"
                                            onConfirm={confirm}
                                            onCancel={cancel}
                                            okText="Yes"
                                            cancelText="No"
                                        >
                                            <X className="absolute right-1 top-1 cursor-pointer text-red-500" size={19} />
                                        </Popconfirm>

                                        <div>
                                            <div>
                                                <span className="select-none font-body font-bold">Câu hỏi (*)</span>
                                                <input
                                                    type="text"
                                                    className="text-segoe mt-1 block w-full rounded-[3px] border border-gray-300 p-1
                                                focus:border-blue-400"
                                                />
                                            </div>

                                            <div>
                                                <span className="select-none font-body font-bold">Đáp án (*)</span>
                                                <input
                                                    type="text"
                                                    className="text-segoe mt-1 block w-full rounded-[3px] border border-gray-300 p-1
                                                focus:border-blue-400"
                                                />
                                            </div>

                                            <div>
                                                <span className="select-none font-body font-bold">Đáp án khác (*)</span>
                                                <input
                                                    type="text"
                                                    className="text-segoe mt-1 block w-full rounded-[3px] border border-gray-300
                                                p-1 focus:border-blue-400"
                                                />
                                            </div>
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ),
                },
                {
                    label: 'Bình luận',
                    key: '3',
                    children: 'Tab 3',
                },
            ]}
        />
    );
};

export default ExerciseLecture;
