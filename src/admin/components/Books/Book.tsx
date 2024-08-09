// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { useState, ChangeEvent, FormEvent } from 'react';
import { Breadcrumb, Button } from 'antd';
import { Link } from 'react-router-dom';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { BookCategory } from 'types/book.types';
import { useGetAllBookCategoriesQuery, useNewBookMutation } from '@store/api/book.api';
import { hasEmptyFields } from '@utils/Helpers';
import { toastError, toastInfo } from '@components/Toast/Toasts';
import { useAsyncMutation } from '@hooks/useAsyncMutation';

// ##########################################################################
// #                               TYPE DEFINITIONS                          #
// ##########################################################################
interface FormData {
    name: string;
    photo: File | null;
    previews: File[];
    pdf: File | null;
    premium: '0' | '1';
    bookCategory: string;
}

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
    const initialFormState: FormData = {
        name: '',
        photo: null,
        previews: [],
        pdf: null,
        premium: '0',
        bookCategory: '',
    };

    const [formData, setFormData] = useState<FormData>(initialFormState);

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */
    const { data: bookCategoryData } = useGetAllBookCategoriesQuery();
    const [newBook, isLoading] = useAsyncMutation(useNewBookMutation);

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (
            hasEmptyFields(
                [formData.name, formData.premium, formData.bookCategory] || !formData.photo || !formData.previews || !formData.pdf
            )
        ) {
            toastInfo('Vui lòng điền đủ thông tin!');
            return;
        }

        try {
            await newBook({
                name: formData.name,
                photo: formData.photo,
                premium: formData.premium,
                previews: formData.previews,
                pdf: formData.pdf,
                bookCategory: formData.bookCategory,
            });

            setFormData(initialFormState);
        } catch (error) {
            toastError(`Có lỗi xảy ra: ${error}`);
        }
    };

    const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, files } = e.target;
        if (name === 'previews' && files) {
            setFormData((prev) => ({
                ...prev,
                [name]: Array.from(files),
            }));
        } else if (files) {
            setFormData((prev) => ({
                ...prev,
                [name]: files[0],
            }));
        }
    };

    /* ########################################################################## */
    /*                                CUSTOM HOOKS                                */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                  useEffect                                 */
    /* ########################################################################## */

    return (
        <div className="h-full px-4">
            {/* BreadCrumbs */}
            <div className="mb-4">
                <Breadcrumb
                    items={[
                        {
                            title: <Link to="/admin">Dashboard</Link>,
                        },
                        {
                            title: 'Book',
                        },
                        {
                            title: 'New Book',
                        },
                    ]}
                />
            </div>

            {/* Forms */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <Button type="primary" htmlType="submit" className="max-w-max" loading={isLoading}>
                    Tạo mới
                </Button>

                <div>
                    <span className="font-body font-bold text-textCustom">Tên (*)</span>
                    <input
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        type="text"
                        className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border border-gray-300 
                        bg-bgCustom p-1 text-textCustom focus:border-blue-400 sm:w-full"
                    />
                </div>

                <div>
                    <span className="font-body font-bold text-textCustom">Photo (*)</span>
                    <input
                        name="photo"
                        onChange={handleFileChange}
                        required
                        type="file"
                        className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border border-gray-300 
                        bg-bgCustom p-1 text-textCustom focus:border-blue-400 sm:w-full"
                    />
                </div>

                <div>
                    <span className="font-body font-bold text-textCustom">Loại (*)</span>
                    <select
                        name="premium"
                        value={formData.premium}
                        onChange={handleInputChange}
                        required
                        id="small"
                        className="mt-2 block w-[21.8rem] rounded-[3px] border border-gray-300 
                        bg-bgCustom p-2 text-sm text-textCustom focus:border-blue-500 focus:ring-blue-500 sm:w-full"
                    >
                        <option value="0">Free</option>
                        <option value="1">Premium</option>
                    </select>
                </div>

                <div>
                    <span className="font-body font-bold text-textCustom">Previews (*)</span>
                    <input
                        name="previews"
                        onChange={handleFileChange}
                        required
                        type="file"
                        multiple
                        className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border border-gray-300 
                        bg-bgCustom p-1 text-textCustom focus:border-blue-400 sm:w-full"
                    />
                </div>

                <div>
                    <span className="font-body font-bold text-textCustom">PDF (*)</span>
                    <input
                        name="pdf"
                        onChange={handleFileChange}
                        required
                        type="file"
                        className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border border-gray-300 
                        bg-bgCustom p-1 text-textCustom focus:border-blue-400 sm:w-full"
                    />
                </div>

                <div>
                    <span className="font-body font-bold text-textCustom">Book Category (*)</span>
                    <select
                        name="bookCategory"
                        value={formData.bookCategory}
                        onChange={handleInputChange}
                        required
                        id="small"
                        className="mt-2 block w-[21.8rem] rounded-[3px] border border-gray-300 
                        bg-bgCustom p-2 text-sm text-textCustom focus:border-blue-500 focus:ring-blue-500 sm:w-full"
                    >
                        <option className="hidden" value="">
                            --- Chọn Book Category ---
                        </option>
                        {bookCategoryData?.bookCategories?.map((bookCategory: BookCategory) => (
                            <option value={bookCategory._id} key={bookCategory._id}>
                                {bookCategory.name}
                            </option>
                        ))}
                    </select>
                </div>
            </form>
        </div>
    );
};

export default Book;
