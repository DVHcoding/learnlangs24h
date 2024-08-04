// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Breadcrumb, Button } from 'antd';
import { Link } from 'react-router-dom';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################

const Gift: React.FC = () => {
    return (
        <div className="h-full px-4 phone:p-1 ">
            {/* BreadCrumbs */}
            <div className="mb-2 flex justify-between">
                <Breadcrumb
                    items={[
                        {
                            title: <Link to="/">Home</Link>,
                        },
                        {
                            title: 'Gift',
                        },
                    ]}
                />
            </div>

            {/* Content */}
            <ul className="flex flex-wrap items-center gap-4 pb-4">
                {[...Array(6)].map((_, index) => (
                    <li className="max-w-max rounded-md bg-bgCustomGift p-4" key={index}>
                        <div className="flex gap-4">
                            <img src="https://i.imgur.com/cuaCwYj.png" alt="frame" className="h-28 w-28" />

                            <div className="space-y-2">
                                <h4 className="font-be text-base font-medium text-red-500">Khung avatar rực lửa</h4>
                                <p className="font-be text-base text-textCustom">
                                    Hạn sử dụng: <span className="font-medium text-green-400">Vĩnh viễn</span>
                                </p>

                                <div className="space-x-2">
                                    <Button type="primary">Trang bị</Button>

                                    <Button type="primary" danger>
                                        Xóa
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Gift;
