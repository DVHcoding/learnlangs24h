// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Fragment, useEffect } from 'react';
import { Tabs } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'rsuite';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { useGetVideoLectureContentQuery, useUpdateUnitLessonAndVideoLectureMutation } from '@store/api/courseApi';
import { toastError } from '@components/Toast/Toasts';
import { AppDispatch, RootState } from '@store/store';
import VideoLectureEditForms from './VideoLectureEditForms';
import VideoDescriptionEditForms from './VideoDescriptionEditForms';
import { changeVideoLecture, resetForm } from '@store/reducer/adminUnitLessonReducer';
import { hasEmptyFields } from '@utils/Helpers';
import { useAsyncMutation } from '@hooks/useAsyncMutation';

const VideoLectureEdiable: React.FC = () => {
    /* ########################################################################## */
    /*                                    HOOKS                                   */
    /* ########################################################################## */
    const dispatch: AppDispatch = useDispatch();

    const { unitForms, videoLecture } = useSelector((state: RootState) => state.adminUnitLesson);
    /* ########################################################################## */
    /*                               REACT ROUTE DOM                              */
    /* ########################################################################## */
    const { unitId } = useParams<string>();

    /* ########################################################################## */
    /*                              STATE MANAGEMENT                              */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                                     RTK                                    */
    /* ########################################################################## */
    const { data: videoLectureContent } = useGetVideoLectureContentQuery(unitId, { skip: !unitId });
    const [updateUnitLessonAndVideoLecture, updateUnitLessonAndVideoLectureLoading] = useAsyncMutation(
        useUpdateUnitLessonAndVideoLectureMutation
    );

    /* ########################################################################## */
    /*                                  VARIABLES                                 */
    /* ########################################################################## */

    /* ########################################################################## */
    /*                             FUNCTION MANAGEMENT                            */
    /* ########################################################################## */
    const handleUpdateForm: (e: React.FormEvent<HTMLFormElement>) => void = async (e) => {
        e.preventDefault();

        if (!unitId) {
            return;
        }

        if (
            hasEmptyFields([
                unitForms.title,
                unitForms.time,
                unitForms.lesson,
                videoLecture.videoUrl,
                videoLecture.totalTime,
                videoLecture.description,
            ])
        ) {
            toastError('Please Enter All Fields');
            return;
        }

        try {
            await updateUnitLessonAndVideoLecture({
                _id: unitId,
                title: unitForms.title,
                time: unitForms.time,
                lesson: unitForms.lesson,
                description: videoLecture.description,
                totalTime: videoLecture.totalTime,
                videoUrl: videoLecture.videoUrl,
            });

            dispatch(resetForm());
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
    useEffect(() => {
        if (videoLectureContent?.success) {
            dispatch(changeVideoLecture({ name: 'description', value: videoLectureContent?.videoLectureContent?.description }));
        }
    }, [unitId, videoLectureContent]);

    return (
        <Fragment>
            <Tabs
                defaultActiveKey="1"
                items={[
                    {
                        label: 'Thông tin chung',
                        key: '1',
                        children: (
                            <div>
                                <form className="flex flex-col gap-4" onSubmit={handleUpdateForm}>
                                    <div className="flex items-center gap-4">
                                        <button
                                            className={`${
                                                updateUnitLessonAndVideoLectureLoading ? 'btn-disabled' : 'btn-primary'
                                            } max-w-max`}
                                            disabled={updateUnitLessonAndVideoLectureLoading}
                                        >
                                            Cập nhật
                                        </button>
                                        {updateUnitLessonAndVideoLectureLoading && <Loader content="Loading..." />}
                                    </div>

                                    <VideoLectureEditForms />
                                </form>
                            </div>
                        ),
                    },
                    {
                        label: 'Mô tả thêm',
                        key: '2',
                        children: <VideoDescriptionEditForms />,
                    },
                    {
                        label: 'Bình luận',
                        key: '3',
                        children: 'Tab 3',
                    },
                ]}
            />
        </Fragment>
    );
};

export default VideoLectureEdiable;
