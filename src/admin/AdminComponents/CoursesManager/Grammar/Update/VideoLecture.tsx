// ##########################
// #      IMPORT NPM        #
// ##########################
import { Fragment, useEffect, useState } from 'react';
import { Tabs, Radio } from 'antd';
import ReactPlayer from 'react-player';
import { Editor } from '@tinymce/tinymce-react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Loader } from 'rsuite';

// ##########################
// #    IMPORT Components   #
// ##########################
import { useGetAllLessonsByCourseIdQuery, useGetUnitLessonByIdQuery, useGetVideoLectureContentQuery } from '@store/api/courseApi';
import { LessonType } from 'types/api-types';
import { toastError } from '@components/Toast/Toasts';
import { AppDispatch, RootState } from '@store/store';
import { updateUnitLessonAndVideoLectureContent } from '@store/reducer/courseReducer';

const VideoLecture: React.FC = () => {
    const { id: courseId, unitId } = useParams<string>();
    const dispatch: AppDispatch = useDispatch();
    const { loading: updateUnitLessonAndVideoLectureContentLoading } = useSelector(
        (state: RootState) => state.updateUnitLessonAndVideoLectureContent
    );

    // RTK query data
    const { data: videoLectureContent, isLoading: getVideoLectureContentLoading } = useGetVideoLectureContentQuery(unitId || 'undefined');
    const { data: unitLesson, isLoading: getUnitLessonByIdLoading } = useGetUnitLessonByIdQuery(unitId || 'undefined');
    const { data: lessons, isLoading: getAllLessonsByCourseIdLoading } = useGetAllLessonsByCourseIdQuery(courseId || 'undefined');

    /* -------------------------------------------------------------------------- */
    /*                              STATE MANAGEMENT                              */
    /* -------------------------------------------------------------------------- */
    // const [title, setTitle] = useState<string>(unitLesson?.unitLesson.title ?? '');
    const [title, setTitle] = useState<string>('');
    const [unitTime, setUnitTime] = useState<string>('');
    const [chapter, setChapter] = useState<string>('');
    const [videoUrl, setVideoUrl] = useState<string>('');
    const [totalTimeVideo, setTotalTimeVideo] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    /* -------------------------------------------------------------------------- */
    /*                             FUNCTION MANAGEMENT                            */
    /* -------------------------------------------------------------------------- */

    const handleUpdateForm: (e: React.FormEvent<HTMLFormElement>) => void = async (e) => {
        e.preventDefault();

        if (
            !unitId ||
            title === '' ||
            unitTime === '' ||
            chapter === '' ||
            videoUrl === '' ||
            totalTimeVideo === '' ||
            description === ''
        ) {
            toastError('Please Enter All Fields');
        }

        try {
            await dispatch(
                updateUnitLessonAndVideoLectureContent({
                    _id: unitId!,
                    title,
                    time: unitTime,
                    lesson: chapter,
                    description,
                    totalTime: totalTimeVideo,
                    videoUrl,
                })
            );

            window.location.reload();
        } catch (error) {
            toastError('Có lỗi xảy ra!');
        }
    };

    useEffect(() => {
        if (unitId) {
            if (unitLesson?.unitLesson) {
                setTitle(unitLesson.unitLesson.title);
                setUnitTime(unitLesson.unitLesson.time);
                setChapter(unitLesson.unitLesson.lesson);
            }
            if (videoLectureContent?.videoLectureContent) {
                setVideoUrl(videoLectureContent.videoLectureContent.videoUrl);
                setTotalTimeVideo(videoLectureContent.videoLectureContent.totalTime);
                setDescription(videoLectureContent.videoLectureContent.description);
            }
        }
    }, [unitId, unitLesson, videoLectureContent]);

    return (
        <Fragment>
            {!getVideoLectureContentLoading &&
                !getUnitLessonByIdLoading &&
                !getAllLessonsByCourseIdLoading &&
                videoLectureContent?.success &&
                unitLesson?.success &&
                lessons?.success && (
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
                                                        updateUnitLessonAndVideoLectureContentLoading ? 'btn-disabled' : 'btn-primary'
                                                    } max-w-max`}
                                                    disabled={updateUnitLessonAndVideoLectureContentLoading}
                                                >
                                                    Cập nhật
                                                </button>
                                                {updateUnitLessonAndVideoLectureContentLoading && <Loader content="Loading..." />}
                                            </div>

                                            <div>
                                                <span className="font-body font-bold">Tên (*)</span>
                                                <input
                                                    onChange={(e) => setTitle(e.target.value)}
                                                    value={title}
                                                    type="text"
                                                    className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border border-gray-300 p-1 focus:border-blue-400
                                                    sm:w-full"
                                                />
                                            </div>

                                            <div>
                                                <span className="font-body font-bold">Thời gian (*)</span>
                                                <input
                                                    onChange={(e) => setUnitTime(e.target.value)}
                                                    value={unitTime}
                                                    type="text"
                                                    className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border border-gray-300 p-1 focus:border-blue-400
                                                    sm:w-full"
                                                />
                                            </div>

                                            <div>
                                                <span className="font-body font-bold">Chương học (*)</span>
                                                <select
                                                    id="small"
                                                    className="mt-2 block w-[21.8rem] rounded-[3px] border border-gray-300 bg-white p-2 text-sm focus:border-blue-500 focus:ring-blue-500 sm:w-full"
                                                    value={chapter} // select trùng với value option nào thì cái đó tự select
                                                    onChange={(e) => setChapter(e.target.value)}
                                                >
                                                    <option disabled>--- Chọn chương ---</option>
                                                    {lessons.lessons.map((lesson: LessonType) => (
                                                        <option value={lesson._id} key={lesson._id}>
                                                            {lesson.name}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>

                                            <div>
                                                <span className="font-body font-bold">Tổng giời gian video (*)</span>
                                                <input
                                                    onChange={(e) => setTotalTimeVideo(e.target.value)}
                                                    value={totalTimeVideo}
                                                    type="text"
                                                    className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border border-gray-300 p-1 focus:border-blue-400
                                                        sm:w-full"
                                                />
                                            </div>

                                            <div>
                                                <span className="font-body font-bold">Bài học video (*)</span>

                                                <div className="mt-2">
                                                    <Radio.Group>
                                                        <Radio value={1}>Tải lên</Radio>
                                                        <Radio value={2}>Youtube</Radio>
                                                    </Radio.Group>
                                                </div>

                                                <input
                                                    onChange={(e) => setVideoUrl(e.target.value)}
                                                    value={videoUrl}
                                                    type="text"
                                                    className="text-segoe mt-2 block w-[21.8rem] rounded-[3px] border border-gray-300 p-1
                                                      focus:border-blue-400 sm:w-full"
                                                    placeholder="https://www.youtube.com"
                                                />

                                                <div className="mt-4 max-w-[35rem] overflow-hidden rounded-[3px] sm:h-[20rem] sm:w-full">
                                                    <ReactPlayer controls={true} url={videoUrl} width={'100%'} />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                ),
                            },
                            {
                                label: 'Mô tả thêm',
                                key: '2',
                                children: (
                                    <div>
                                        <div>
                                            <span className="font-body font-bold">Mô tả (*)</span>

                                            <div className="mt-4">
                                                <Editor
                                                    onEditorChange={(value) => setDescription(value)}
                                                    apiKey={import.meta.env.VITE_TINY_API_KEY}
                                                    value={description}
                                                    init={{
                                                        height: 700,
                                                        menubar: true,
                                                        plugins: [
                                                            'advlist',
                                                            'autolink',
                                                            'lists',
                                                            'link',
                                                            'image',
                                                            'charmap',
                                                            'preview',
                                                            'anchor',
                                                            'searchreplace',
                                                            'visualblocks',
                                                            'code',
                                                            'fullscreen',
                                                            'insertdatetime',
                                                            'media',
                                                            'table',
                                                            'code',
                                                            'help',
                                                            'wordcount',
                                                            'blockquote',
                                                            'fontsize',
                                                            'lineheight',
                                                        ],

                                                        toolbar:
                                                            'undo redo | blocks | ' +
                                                            'bold italic forecolor | alignleft aligncenter' +
                                                            'alignright alignjustify | bullist numlist outdent indent blockquote | ' +
                                                            'removeformat | fontsize | lineheight | help |',
                                                        content_style:
                                                            'body { font-family:QuickSand,Arial,sans-serif; font-size:14px; font-weight: 500; line-height: 1.5;}',
                                                        font_size_formats: '8pt 10pt 12pt 14pt 16pt 18pt 24pt 36pt 48pt',
                                                    }}
                                                />
                                            </div>
                                        </div>
                                    </div>
                                ),
                            },
                            {
                                label: 'Bình luận',
                                key: '3',
                                children: 'Tab 3',
                            },
                        ]}
                    />
                )}
        </Fragment>
    );
};

export default VideoLecture;
