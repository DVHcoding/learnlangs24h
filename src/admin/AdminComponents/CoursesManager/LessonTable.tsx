// ##################################
// #       IMPORT Npm
// ##################################
import { Space, Table, Select, Input, Popconfirm } from 'antd';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { TableProps } from 'antd';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'rsuite';

// ##################################
// #       IMPORT Components
// ##################################
import Navbar from '@pages/Header/Navbar';
import Sidebar from '@admin/AdminPages/AdminSidebar';
import AdminBreadcrumbs from '@admin/AdminComponents/AdminBreadcrumbs/AdminBreadcrumbs';
import { useGetAllCoursesQuery } from '@store/api/courseApi';
import { CourseType, LessonType } from 'types/api-types';
import { toastError } from '@components/Toast/Toasts';
import { RootState, AppDispatch } from '@store/store';
import { createNewLesson } from '@store/reducer/courseReducer';
import { useGetAllLessonsByCourseIdQuery } from '@store/api/courseApi';

interface DataType {
    key: string;
    name: string;
    createAt: string;
}

type TableRowSelection<T> = TableProps<T>['rowSelection'];

// ##################################
const LessonTable: React.FC<{ toggleTheme: () => void }> = ({ toggleTheme }) => {
    const dispatch: AppDispatch = useDispatch();
    const { id } = useParams();

    const { data } = useGetAllCoursesQuery();
    const { data: dataGetAllLessons } = useGetAllLessonsByCourseIdQuery(id || '');
    const { loading } = useSelector((state: RootState) => state.newLesson);

    // ##########################
    // #      STATE MANAGER     #
    // ##########################
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [courseId, setCourseId] = useState<string>('');
    const [lessonName, setLessonName] = useState<string>('');

    // ##########################
    // #    FUNCTION MANAGER    #
    // ##########################
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const handleChangeSelectedCourse = (courseId: string) => {
        setCourseId(courseId);
    };
    const handleSubmitNewLesson = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (courseId === '') {
            return toastError('Vui lòng chọn Khóa học!');
        }

        try {
            await dispatch(createNewLesson({ name: lessonName, courseId }));
            setLessonName('');
            setCourseId('');
        } catch (error) {
            toastError(`${error}`);
        }
    };
    const rowSelection: TableRowSelection<DataType> = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (
                <Link
                    to={`/admin/lesson/${record.key}`}
                    className="transition-none hover:text-orange-400"
                >
                    {record.name}
                </Link>
            ),
        },
        {
            title: 'CreateAt',
            dataIndex: 'createAt',
            key: 'createAt',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link
                        to={`/admin/course/661e3ee0f7cba428a3500a91/${record.key}`}
                        className="hover:no-underline"
                    >
                        <p className="transition-all hover:text-orange-400 hover:underline">Edit</p>
                    </Link>
                    <Popconfirm title="Sure to delete?" /*>onConfirm={() => }*/>
                        <p className="cursor-pointer transition-all hover:text-red-600 hover:underline">
                            Delete
                        </p>
                    </Popconfirm>
                </Space>
            ),

            width: '20%',
        },
    ];

    let dataTable: DataType[] = [];
    if (dataGetAllLessons && dataGetAllLessons.lessons) {
        dataTable = dataGetAllLessons.lessons.map((lesson: LessonType) => ({
            key: lesson._id,
            name: lesson.name,
            createAt: dayjs(lesson.createAt).format('DD-MM-YYYY'),
        }));
    }

    return (
        <div>
            {/* CONTAINER */}
            <div
                className="scrollbar h-screen overflow-auto bg-bgCustom sm:px-0 sm:py-0 md:p-0 
                xl:px-8 xl:py-4"
            >
                {/* BOX */}
                <div className="flex h-full w-full overflow-hidden rounded-md border-2 border-bdCustom sm:rounded-none">
                    {/* SIDE-BAR */}
                    <Sidebar />

                    {/* CONTENT */}
                    <div className={`scrollbar w-full overflow-auto bg-bgCustom `}>
                        {/* Navbar */}
                        <Navbar toggleTheme={toggleTheme} />

                        {/* Body */}
                        <div className="h-full px-4">
                            {/* BreadCrumbs */}
                            <div>
                                <AdminBreadcrumbs pathNext="Courses" pathEnd="Lesson Table" />
                            </div>

                            <form onSubmit={handleSubmitNewLesson}>
                                <Table
                                    columns={columns}
                                    dataSource={dataTable}
                                    rowSelection={rowSelection}
                                    pagination={{ pageSize: 10 }}
                                    className="scrollbar mb-4 overflow-auto"
                                />

                                <div className="flex flex-wrap items-center gap-4">
                                    <Input
                                        placeholder="Lesson Title"
                                        size="large"
                                        className="w-[14.063rem] border-bdCustom bg-bgCustom text-textCustom 
                                        placeholder:text-textCustom hover:bg-bgCustom focus:bg-bgCustom"
                                        onChange={(e) => setLessonName(e.target.value)}
                                        value={lessonName}
                                        required
                                    />
                                    <Select
                                        size="large"
                                        defaultValue="---Select Course---"
                                        style={{ width: 200 }}
                                        onChange={handleChangeSelectedCourse}
                                        options={
                                            data &&
                                            data.courses.map((course: CourseType) => ({
                                                value: course._id,
                                                label: course.name,
                                            }))
                                        }
                                    />
                                    <button
                                        className="btn-primary"
                                        type="submit"
                                        disabled={loading}
                                    >
                                        New Lesson
                                    </button>
                                    {loading && <Loader content="Loading..." />}
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LessonTable;
