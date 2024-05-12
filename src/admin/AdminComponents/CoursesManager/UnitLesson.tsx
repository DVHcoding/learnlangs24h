// ##################################
// #       IMPORT Npm
// ##################################
import { Space, Table, Popconfirm } from 'antd';
import { useState } from 'react';
import dayjs from 'dayjs';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import type { TableProps } from 'antd';

// ##################################
// #       IMPORT Components
// ##################################
import AdminBreadcrumbs from '@admin/AdminComponents/AdminBreadcrumbs/AdminBreadcrumbs';
import CreateUnit from '@admin/AdminComponents/CoursesManager/Grammar/CreateUnit';
import { useGetAllUnitLessonsByLessonIdQuery } from '@store/api/courseApi';
import { UnitLessonType } from 'types/api-types';
import handleDeleteUnitLesson from '@admin/AdminComponents/CoursesManager/Grammar/Delete/DeleteUnit';
import { AppDispatch, RootState } from '@store/store';

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
    const { id } = useParams<{ id: string }>();
    const dispatch: AppDispatch = useDispatch();
    const { loading: deleteUnitLessonAndVideoLectureContentLoading } = useSelector(
        (state: RootState) => state.deleteUnitLessonAndVideoLectureContent
    );

    const { data, isLoading, refetch } = useGetAllUnitLessonsByLessonIdQuery(id || 'undefined');
    // ##########################
    // #      STATE MANAGER     #
    // ##########################
    const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);

    // ##########################
    // #    FUNCTION MANAGER    #
    // ##########################
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
                        disabled={deleteUnitLessonAndVideoLectureContentLoading}
                        onConfirm={() => handleDeleteUnitLesson(record?.lectureType, record?._id, refetch, dispatch)}
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

    return (
        <div className="h-full px-4">
            {/* BreadCrumbs */}
            <div>
                <AdminBreadcrumbs pathNext="Courses" pathEnd="Lesson Table" />
            </div>

            <Table
                columns={columns}
                dataSource={dataTable}
                rowSelection={rowSelection}
                pagination={{ pageSize: 10 }}
                className="scrollbar mb-4 overflow-auto"
            />

            <CreateUnit data={data} isLoading={isLoading} reloadData={() => refetch()} />
        </div>
    );
};

export default UnitLesson;
