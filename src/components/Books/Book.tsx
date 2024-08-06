// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Breadcrumb } from 'antd';
import { Link } from 'react-router-dom';
import { IoListSharp } from 'react-icons/io5';
import { BsGrid3X3GapFill } from 'react-icons/bs';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################

const Book: React.FC = () => {
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
                            title: 'Books',
                        },
                    ]}
                />
            </div>

            {/* Content */}
            <div>
                {/* Filter */}
                <div className="flex items-center gap-4">
                    <div className="flex items-center">
                        <div className="cursor-pointer border border-bdCustom2 p-1">
                            <IoListSharp size={20} className="text-textCustom transition-all hover:text-orange-500" />
                        </div>

                        <div className="cursor-pointer border border-bdCustom2 p-1">
                            <BsGrid3X3GapFill size={20} className="text-textCustom transition-all hover:text-orange-500" />
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        <p className="text-textCustom">Sắp xếp theo:</p>
                        <select
                            name="icon"
                            required
                            id="small"
                            className="block max-w-max rounded-[3px] border border-gray-300 bg-bgCustom 
                            p-2 text-sm text-textCustom focus:border-blue-500 focus:ring-blue-500 sm:w-full"
                        >
                            <option>All Categories</option>
                            <option>Travel</option>
                            <option>Sác h grammar</option>
                        </select>
                    </div>

                    <div className="flex items-center gap-2">
                        <p className="text-textCustom">Hiển thị:</p>
                        <select
                            name="icon"
                            required
                            id="small"
                            className="block max-w-max rounded-[3px] border border-gray-300 bg-bgCustom 
                            p-2 text-sm text-textCustom focus:border-blue-500 focus:ring-blue-500 sm:w-full"
                        >
                            <option>10</option>
                            <option>16</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Book;
