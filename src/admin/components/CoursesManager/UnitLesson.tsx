// ##################################
// #       IMPORT Npm
// ##################################
import { useSelector } from 'react-redux';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { Space, Table, Popconfirm, Breadcrumb } from 'antd';
import { useState } from 'react';
import dayjs from 'dayjs';
import type { TableProps } from 'antd';

// ##################################
// #       IMPORT Components
// ##################################
import CreateUnit from '@admin/components/Courses/CreateUnit';
import {
    useDeleteUnitLessonAndGrammarExerciseMutation,
    useDeleteUnitLessonAndVideoLectureContentSliceMutation,
    useGetAllUnitLessonsByLessonIdQuery,
} from '@store/api/courseApi';
import { UnitLessonType } from 'types/api-types';
import { RootState } from '@store/store';
import { toastError } from '@components/Toast/Toasts';
import { useAsyncMutation } from '@hooks/useAsyncMutation';
import { LectureType } from '../../../types/types';

// ##################################
// #       IMPORT Components
// ##################################
interface DataType {
    _id: string;
    courseId: string;
    key: string;
    name: string;
    time: string;
    icon: string;
    lectureType: string;
    createAt: string;
}

type TableRowSelection<T> = TableProps<T>['rowSelection'];
// ##################################
const UnitLesson: React.FC = () => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */

    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */

    const { loading: deleteUnitLessonAndFillBlankExerciseLoading } = useSelector(
        (state: RootState) => state.deleteUnitLessonAndFillBlankExercise
    );

    const { data } = useGetAllUnitLessonsByLessonIdQuery(id, { skip: !id });
    const [deleteUnitLessonAndVideoLectureContent, deleteUnitLessonAndVideoLectureContentLoading] = useAsyncMutation(
        useDeleteUnitLessonAndVideoLectureContentSliceMutation
    );
    const [deleteUnitLessonAndGrammarExercise] = useAsyncMutation(useDeleteUnitLessonAndGrammarExerciseMutation);

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */
    const onSelectChange = (newSelectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(newSelectedRowKeys);
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
        },
        {
            title: 'Time',
            dataIndex: 'time',
            key: 'time',
        },
        {
            title: 'Icon',
            dataIndex: 'icon',
            key: 'icon',
        },
        {
            title: 'Lecture Type',
            dataIndex: 'lectureType',
            key: 'lectureType',
        },
        {
            title: 'Create At',
            dataIndex: 'createAt',
            key: 'createAt',
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space size="middle">
                    <Link to={`/admin/course/${record.courseId}/edit/${record.key}`} className="hover:no-underline">
                        <p className="transition-all hover:text-orange-400 hover:underline">Edit</p>
                    </Link>
                    <Popconfirm
                        title="Sure to delete?"
                        disabled={deleteUnitLessonAndVideoLectureContentLoading || deleteUnitLessonAndFillBlankExerciseLoading}
                        onConfirm={() => handleDeleteUnitLesson(record?.lectureType, record?._id)}
                    >
                        <p className="cursor-pointer transition-all hover:text-red-600 hover:underline">Delete</p>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    let dataTable: DataType[] = [];

    if (data && data.unitLessons) {
        dataTable = data.unitLessons.map((unitLesson: UnitLessonType) => ({
            _id: unitLesson._id,
            courseId: unitLesson.course,
            key: unitLesson._id,
            name: unitLesson.title,
            time: unitLesson.time,
            icon: unitLesson.icon,
            lectureType: unitLesson.lectureType,
            createAt: dayjs(unitLesson.createAt).format('DD-MM-YYYY'),
        }));
    }

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const handleDeleteUnitLesson: (lectureType: string, unitId: string) => void = async (lectureType, unitId) => {
        try {
            // Nếu không có lectureType hoặc rỗng thì thông báo lỗi
            if (!lectureType || lectureType === '') {
                toastError('Có lỗi xảy ra!');
            }

            switch (lectureType) {
                case LectureType.videoLecture:
                    await deleteUnitLessonAndVideoLectureContent(unitId);
                    break;
                case LectureType.grammarExercise:
                    await deleteUnitLessonAndGrammarExercise(unitId);
                    break;
                default:
                    break;
            }

            // Nếu lectureType === 'videoLecture' thì call api deleteUnitLessonAndVideoLectureContent
            if (lectureType === 'videoLecture') {
            }

            // Nếu lectureType === 'exercise' thì call api deleteUnitLessonAndFillBLankExercise
            if (lectureType === 'exercise') {
            }
        } catch (error) {
            toastError('Có lỗi xảy ra!');
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
                            title: (
                                <Link to="#" onClick={() => navigate(-1)}>
                                    Lesson Table
                                </Link>
                            ),
                        },
                        {
                            title: 'Unit Lesson',
                        },
                    ]}
                />
            </div>

            <Table
                columns={columns}
                dataSource={dataTable}
                rowSelection={rowSelection}
                pagination={{ pageSize: 10 }}
                className="scrollbar mb-4 overflow-auto"
            />

            <CreateUnit />
        </div>
    );
};

export default UnitLesson;
