// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Editor } from '@tinymce/tinymce-react';
import { Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { changeVideoLecture, VideoLectureState } from '@store/reducer/adminUnitLessonReducer';
import { AppDispatch, RootState } from '@store/store';

const VideoLectureForms = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { videoLecture } = useSelector((state: RootState) => state.adminUnitLesson);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        dispatch(changeVideoLecture({ name: name as keyof VideoLectureState, value }));
    };

    const handleEditorChange = (content: string) => {
        dispatch(changeVideoLecture({ name: 'description', value: content }));
    };
    return (
        <Fragment>
            {/* Video URL */}
            <div>
                <span className="font-body font-bold text-textCustom">Video URL (*)</span>
                <input
                    name="videoUrl"
                    value={videoLecture.videoUrl}
                    onChange={handleChange}
                    required
                    type="text"
                    placeholder="https://youtube.com"
                    className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border border-gray-300 
                    bg-bgCustom p-1 text-textCustom focus:border-blue-400 sm:w-full"
                />
            </div>

            {/* Video total time */}
            <div>
                <span className="font-body font-bold text-textCustom">Tổng thời gian video (*)</span>
                <input
                    name="totalTime"
                    value={videoLecture.totalTime}
                    onChange={handleChange}
                    required
                    type="text"
                    placeholder="00:00:00"
                    className="text-segoe mt-1 block w-[21.8rem] rounded-[3px] border border-gray-300 
                    bg-bgCustom p-1 text-textCustom focus:border-blue-400 sm:w-full"
                />
            </div>

            {/* Descriptions */}
            <div className="">
                <span className="font-body font-bold text-textCustom">Mô tả (*)</span>

                <div className="mt-2">
                    <Editor
                        apiKey={import.meta.env.VITE_TINY_API_KEY}
                        initialValue=""
                        onEditorChange={handleEditorChange}
                        value={videoLecture.description}
                        init={{
                            height: 500,
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
        </Fragment>
    );
};

export default VideoLectureForms;
