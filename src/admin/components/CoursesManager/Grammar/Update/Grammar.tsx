// ##########################
// #      IMPORT NPM        #
// ##########################
import { Avatar } from 'antd';
import { AlignLeft } from 'lucide-react';
import { Fragment, useState } from 'react';
import { useParams } from 'react-router-dom';

// ##########################
// #    IMPORT Components   #
// ##########################
import Logo from '@assets/logo.png';
import Sidebar from './Sidebar';
import VideoLecture from './VideoLecture';
import ExerciseLecture from './ExerciseLecture';
import { useGetUnitLessonByIdQuery } from '@store/api/courseApi';

const Grammar: React.FC = () => {
    // React Router Dom
    const { unitId } = useParams<string>();

    // RTK query data
    const { data: unitLesson, isLoading: getUnitLessonByIdLoading } = useGetUnitLessonByIdQuery(unitId || 'undefined');

    /* -------------------------------------------------------------------------- */
    /*                              STATE MANAGEMENT                              */
    /* -------------------------------------------------------------------------- */
    const [open, setOpen] = useState<boolean>(false);

    /* -------------------------------------------------------------------------- */
    /*                             FUNCTION MANAGEMENT                            */
    /* -------------------------------------------------------------------------- */

    return (
        <div className="h-screen">
            {/* overlay */}
            <div
                onClick={() => setOpen(!open)}
                className={`fixed z-10 mt-12 h-full w-full ${open ? 'block' : 'hidden'}`}
                style={{ backgroundColor: 'rgb(11 11 11 / 41%)' }}
            ></div>

            {/* header */}
            <div className="z-50 flex items-center bg-blue-400 px-2 shadow phone:py-2">
                <div className="flex w-[18.5rem] items-center gap-2 phone:hidden">
                    <img src={Logo} alt="Logo" className="w-20 object-cover" />
                    <h3 className="font-body text-lg font-bold text-white">Admin</h3>
                </div>

                <div className="flex w-full items-center justify-between">
                    <AlignLeft color="white" className="hidden cursor-pointer border phone:block pm:block" onClick={() => setOpen(!open)} />

                    <h3 className="font-segoe text-lg text-white phone:text-base pm:text-base">Sửa bài học video</h3>

                    <div className="flex items-center gap-1">
                        <Avatar />
                        <p className="font-segoe text-white">Đỗ Hùng</p>
                    </div>
                </div>
            </div>

            <div className="flex" style={{ height: 'calc(100% - 3.2rem)' }}>
                {/*sidebar  */}
                <Sidebar open={open} />

                {/* content */}
                <div className="h-full flex-1 overflow-auto px-3">
                    <div className="pb-2">
                        {!getUnitLessonByIdLoading && unitLesson?.success && (
                            <Fragment>
                                {unitLesson.unitLesson.lectureType === 'videoLecture' && <VideoLecture />}
                                {unitLesson.unitLesson.lectureType === 'exercise' && <ExerciseLecture />}
                            </Fragment>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Grammar;
