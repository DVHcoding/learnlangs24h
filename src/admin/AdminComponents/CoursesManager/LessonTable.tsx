// ##################################
// #       IMPORT Npm
// ##################################
import { Space, Table, Select, Input, Popconfirm, Popover, Button } from 'antd';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import type { TableProps } from 'antd';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'rsuite';

// ##################################
// #       IMPORT Components
// ##################################
import AdminBreadcrumbs from '@admin/AdminComponents/AdminBreadcrumbs/AdminBreadcrumbs';
import { useGetAllCoursesQuery } from '@store/api/courseApi';
import { CourseType, LessonType } from 'types/api-types';
import { toastError } from '@components/Toast/Toasts';
import { RootState, AppDispatch } from '@store/store';
import { createNewLesson, updateLesson } from '@store/reducer/courseReducer';
import { useGetAllLessonsByCourseIdQuery } from '@store/api/courseApi';

interface DataType {
    key: string;
    name: string;
    createAt: string;
}

type TableRowSelection<T> = TableProps<T>['rowSelection'];

// ##################################
const LessonTable: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { id } = useParams<{ id: string }>();

    /* -------------------------------------------------------------------------- */
    /*                               RTK QUERY DATA                               */
    /* -------------------------------------------------------------------------- */
    const { data } = useGetAllCoursesQuery();
    const { data: dataGetAllLessons, refetch } = useGetAllLessonsByCourseIdQuery(id || '');
    const { loading } = useSelector((state: RootState) => state.newLesson);
    const { loading: updateLessonLoading } = useSelector((state: RootState) => state.updateLesson);

    /* -------------------------------------------------------------------------- */
    /*                              STATE MANAGEMENT                              */
    /* -------------------------------------------------------------------------- */
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
    const [courseId, setCourseId] = useState<string>('');
    const [lessonName, setLessonName] = useState<string>('');
    const [openPopover, setOpenPopover] = useState<string>('');

    const [name, setName] = useState<string>('');

    /* -------------------------------------------------------------------------- */
    /*                             FUNCTION MANAGEMENT                            */
    /* -------------------------------------------------------------------------- */
    // Hàm này để biết được dòng nào đã click vào ô vuông (ô select)
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };

    // Hàm chọn khóa học khi tạo một lesson mới
    const handleChangeSelectedCourse = (courseId: string) => {
        setCourseId(courseId);
    };

    // Hàm tạo lesson mới
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

    // Hàm UpdateLesson
    const handleUpdateLesson: (lessonId: string) => void = async (lessonId) => {
        if (!lessonId || name === '') {
            toastError('Vui lòng điền đủ thông tin!');
        }

        try {
            await dispatch(updateLesson({ lessonId, lessonName: name }));
            setLessonName('');
            hidePopover();
            refetch();
        } catch (error) {
            toastError('Có lỗi xảy ra!');
        }
    };

    // Hàm để đóng popover
    const hidePopover = () => {
        setOpenPopover('');
    };

    // Columns của bảng
    const columns: TableProps<DataType>['columns'] = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            render: (_, record) => (
                <Link to={`/admin/lesson/${record.key}`} className="transition-none hover:text-orange-400">
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
                    <Popover
                        trigger="click"
                        content={
                            <form>
                                <div>
                                    <span className="font-body font-bold">Tên (*)</span>
                                    <input
                                        onChange={(e) => setName(e.target.value)}
                                        type="text"
                                        className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border border-gray-300 p-1 focus:border-blue-400
                                        sm:w-full"
                                    />
                                </div>

                                <div className="flex items-center gap-2">
                                    <Button type="primary" onClick={hidePopover} className="mt-4">
                                        Close
                                    </Button>

                                    <Button
                                        type="primary"
                                        onClick={() => handleUpdateLesson(record.key)}
                                        loading={updateLessonLoading}
                                        danger
                                        className="mt-4"
                                    >
                                        Update
                                    </Button>
                                </div>
                            </form>
                        }
                        open={record.key === openPopover}
                        onOpenChange={() => setOpenPopover(record.key)}
                    >
                        <p className="cursor-pointer transition-all hover:text-orange-400 hover:underline">Edit</p>
                    </Popover>

                    <Popconfirm title="Sure to delete?" /*>onConfirm={() => }*/>
                        <p className="cursor-pointer transition-all hover:text-red-600 hover:underline">Delete</p>
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
                    <button className="btn-primary" type="submit" disabled={loading}>
                        New Lesson
                    </button>
                    {loading && <Loader content="Loading..." />}
                </div>
            </form>
        </div>
    );
};

export default LessonTable;
