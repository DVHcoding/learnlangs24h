// ##########################################################################
// #                                 IMPORT NPM                             #
// ##########################################################################
import { Editor } from '@tinymce/tinymce-react';
import { useDispatch, useSelector } from 'react-redux';

// ##########################################################################
// #                           IMPORT Components                            #
// ##########################################################################
import { changeVideoLecture } from '@store/reducer/adminUnitLessonReducer';
import { AppDispatch, RootState } from '@store/store';

const VideoDescriptionEditForms: React.FC = () => {
    /* -------------------------------------------------------------------------- */
    /*                                    HOOKS                                   */
    /* -------------------------------------------------------------------------- */
    const dispatch: AppDispatch = useDispatch();
    const { videoLecture } = useSelector((state: RootState) => state.adminUnitLesson);

    /* -------------------------------------------------------------------------- */
    /*                               REACT ROUTE DOM                              */
    /* -------------------------------------------------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                              STATE MANAGEMENT                              */
    /* -------------------------------------------------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                     RTK                                    */
    /* -------------------------------------------------------------------------- */

    /* -------------------------------------------------------------------------- */
    /*                                  FUNCTION                                  */
    /* -------------------------------------------------------------------------- */
    const handleEditorChange = (content: string) => {
        dispatch(changeVideoLecture({ name: 'description', value: content }));
    };

    /* -------------------------------------------------------------------------- */
    /*                                  useEffect                                 */
    /* -------------------------------------------------------------------------- */

    return (
        <div>
            <span className="font-body font-bold">Mô tả (*)</span>

            <div className="mt-4">
                <Editor
                    apiKey={import.meta.env.VITE_TINY_API_KEY}
                    onEditorChange={handleEditorChange}
                    value={videoLecture?.description}
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
    );
};

export default VideoDescriptionEditForms;
