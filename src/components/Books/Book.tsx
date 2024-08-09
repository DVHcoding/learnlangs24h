// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import React, { Fragment, useState } from 'react';
import { Badge, Breadcrumb, Button, Empty, Pagination, Select } from 'antd';
import { Link } from 'react-router-dom';
const { Option } = Select;

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { useGetAllBookCategoriesQuery, useGetBooksQuery } from '@store/api/book.api';
import { BookCategory, Book as BookTypes } from 'types/book.types';

const Book: React.FC = () => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(12);
    const [bookCategory, setBookCategory] = useState<string>('all');

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */
    const { data: booksData } = useGetBooksQuery(
        { page: currentPage, limit: itemsPerPage, bookCategory },
        { skip: !currentPage || !itemsPerPage || !bookCategory }
    );
    const { data: bookCategoriesData } = useGetAllBookCategoriesQuery();

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */
    const totalItems = booksData?.pagination?.totalBooks || 0;

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (value: string) => {
        setItemsPerPage(parseInt(value));
        setCurrentPage(1);
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */

    return (
        <div className="overflow-hidden pl-4 phone:p-1" style={{ height: 'calc(100% - 3.8rem)' }}>
            {/* Breadcrumbs */}
            <div className="mb-2 flex justify-between">
                <Breadcrumb items={[{ title: <Link to="/">Home</Link> }, { title: 'Books' }]} />
            </div>

            <div className="mb-4 flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                    <p className="text-textCustom">Sắp xếp theo:</p>
                    <Select
                        defaultValue="all"
                        style={{ width: 150 }}
                        className="text-textCustom"
                        onChange={(value: string) => setBookCategory(value)}
                    >
                        <Option value="all">All Categories</Option>
                        {bookCategoriesData?.bookCategories?.map((bookCategory: BookCategory) => (
                            <Option value={bookCategory._id} key={bookCategory._id}>
                                {bookCategory.name}
                            </Option>
                        ))}
                    </Select>
                </div>

                <div className="flex items-center gap-2">
                    <p className="text-textCustom">Hiển thị:</p>
                    <Select defaultValue="12" style={{ width: 70 }} className="text-textCustom" onChange={handleItemsPerPageChange}>
                        <Option value="12">12</Option>
                        <Option value="24">24</Option>
                    </Select>
                </div>
            </div>

            <div className="scrollbar h-[29rem] overflow-auto phone:h-[28rem]">
                {/* Books */}
                <div className="min-h-full bg-bgCustomCard p-2 pb-4">
                    {booksData?.books.length ? (
                        <ul
                            className="grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 
                            phone:grid-cols-1"
                        >
                            {booksData?.books?.map((book: BookTypes) => (
                                <Fragment key={book._id}>
                                    <Badge.Ribbon text="Premium" color="orange" className={`${book.premium ? 'block' : 'hidden'}`}>
                                        <li
                                            className="flex min-h-[26.688rem] flex-col items-center
                                        rounded-md bg-bgCustomCardItem p-4"
                                        >
                                            <img
                                                src={book?.photo?.url}
                                                alt="book"
                                                className="max-h-[300px] min-w-full select-none rounded-md object-cover"
                                            />
                                            <p
                                                className="mt-2 line-clamp-2 cursor-default font-be text-base font-medium 
                                            text-textCustomProcess transition-all hover:text-textCustomProcess"
                                            >
                                                {book.name}
                                            </p>

                                            <div className="mt-auto flex max-w-max flex-wrap justify-center gap-2">
                                                <Button type="primary">Read</Button>
                                                <Button type="primary">View PDF</Button>
                                                <Button disabled={book.premium} type="dashed">
                                                    Download
                                                </Button>
                                            </div>
                                        </li>
                                    </Badge.Ribbon>
                                </Fragment>
                            ))}
                        </ul>
                    ) : (
                        <Empty description="No books found" />
                    )}
                </div>
            </div>

            <div className={`mx-auto mt-4 max-w-max ${booksData?.books.length ? 'block' : 'hidden'}`}>
                <Pagination current={currentPage} total={totalItems} pageSize={itemsPerPage} onChange={handlePageChange} />
            </div>
        </div>
    );
};

export default Book;
