// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import React, { Fragment, useState } from 'react';
import { Badge, Breadcrumb, Button, Pagination, Select } from 'antd';
import { Link } from 'react-router-dom';
const { Option } = Select;

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import bookLink from '@assets/books/LamChuTiengAnh.jpg';

const Book: React.FC = () => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */
    const [currentPage, setCurrentPage] = useState<number>(1);
    const totalItems = 37; // Tổng số items
    const itemsPerPage = 10;

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
        // Thêm logic để load dữ liệu tương ứng với trang mới
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */

    return (
        <div className="h-full px-4 phone:p-1">
            {/* Breadcrumbs */}
            <div className="mb-2 flex justify-between">
                <Breadcrumb items={[{ title: <Link to="/">Home</Link> }, { title: 'Books' }]} />
            </div>

            <div>
                <div className="mb-4 flex flex-wrap items-center gap-4">
                    <div className="flex items-center gap-2">
                        <p className="text-textCustom">Sắp xếp theo:</p>
                        <Select defaultValue="all" style={{ width: 150 }} className="text-textCustom">
                            <Option value="all">All Categories</Option>
                            <Option value="travel">Travel</Option>
                            <Option value="grammar">Sách grammar</Option>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2">
                        <p className="text-textCustom">Hiển thị:</p>
                        <Select defaultValue="10" style={{ width: 70 }} className="text-textCustom">
                            <Option value="10">10</Option>
                            <Option value="16">16</Option>
                        </Select>
                    </div>
                </div>

                {/* Books */}
                <div className="bg-bgCustomCard p-2 pb-10">
                    <ul
                        className="grid gap-2 sm:grid-cols-2 
                    md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 phone:grid-cols-1"
                    >
                        {[...Array(8)].map((_, index) => (
                            <Fragment key={index}>
                                <Badge.Ribbon text="Premium" color="orange">
                                    <li
                                        className="flex flex-col items-center rounded-md
                                        bg-bgCustomCardItem p-4"
                                    >
                                        <img src={bookLink} alt="book" className="select-none rounded-md" />
                                        <p
                                            className="mt-2 cursor-default font-be text-base font-medium text-textCustomProcess 
                                        transition-all hover:text-textCustomProcess"
                                        >
                                            Làm chủ kiến thức tiếng anh
                                        </p>

                                        <div className="mt-2 flex max-w-max flex-wrap justify-center gap-2">
                                            <Button type="primary">Read</Button>
                                            <Button type="primary">View PDF</Button>
                                            <Button disabled type="primary">
                                                Download
                                            </Button>
                                        </div>
                                    </li>
                                </Badge.Ribbon>
                            </Fragment>
                        ))}
                    </ul>

                    <div className="mx-auto mt-4 max-w-max">
                        <Pagination current={currentPage} total={totalItems} pageSize={itemsPerPage} onChange={handlePageChange} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Book;
