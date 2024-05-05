// ##########################
// #      IMPORT NPM        #
// ##########################
import { Tabs } from 'antd';

// ##########################
// #    IMPORT Components   #
// ##########################

const ExerciseLecture:React.FC = () => {
    return (
        <Tabs
            defaultActiveKey="1"
            items={[
                {
                    label: 'Thông tin chung',
                    key: '1',
                    children: (
                        <div>
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
                                    <span className="font-body font-bold">Loại bài tập (*)</span>
                                    <select
                                        id="small"
                                        className="mt-2 block w-[21.8rem] rounded-[3px] border border-gray-300 bg-white 
                                        p-2 text-sm focus:border-blue-500 focus:ring-blue-500 sm:w-full"
                                    >
                                        <option value="FillBlank" selected>
                                            Điền vào chỗ trống
                                        </option>
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
                        </div>
                    ),
                },
                {
                    label: 'Câu hỏi',
                    key: '2',
                    children: (
                        <div>
                            <div>
                                <span className="font-body font-bold">Mô tả (*)</span>
                            </div>
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
